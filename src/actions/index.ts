import { defineAction, ActionError } from 'astro:actions';
import { z } from 'zod';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
// No need to import ContactFormErrors, it's globally available via App.Locals

// Define a single schema for the entire form input, including captcha
const contactFormSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  email: z.string().trim().email('Please enter a valid email address'),
  message: z.string().trim().min(1, 'Message is required'),
  captchaToken: z.string().min(1, 'Captcha verification is required. Please complete the challenge.'),
});

// Helper function for captcha verification
async function verifyCaptcha(token: string, secret: string, ip: string): Promise<boolean> {
  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: secret,
        response: token,
        remoteip: ip, // Include remote IP if available and desired
      }),
    });
    if (!response.ok) {
      console.error(`Captcha verification failed with status: ${response.status}`);
      return false;
    }
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('Error during captcha verification request:', error);
    return false;
  }
}

// Helper function to forward data to n8n
async function forwardToN8n(
  url: string,
  secret: string,
  data: { name: string; email: string; message: string }
): Promise<boolean> {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-N8N-API-KEY': secret, // Use the correct header name if needed
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      console.error(`n8n webhook request failed with status: ${response.status}`);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error forwarding data to n8n:', error);
    return false;
  }
}

export const server = {
  submitContactForm: defineAction({
    accept: 'form', // Add this line
    // Use the combined schema for automatic input validation by Astro Actions
    input: contactFormSchema,
    handler: async (validatedInput, context): Promise<object> => {
      // validatedInput is already parsed and validated against contactFormSchema
      const { name, email, message, captchaToken } = validatedInput;

      // Access server-side environment variables via import.meta.env
      // This works consistently in dev and production (Vercel)
      const {
        CAPTCHA_SECRET_KEY,
        N8N_WEBHOOK_URL,
        N8N_WEBHOOK_SECRET,
        UPSTASH_REDIS_REST_URL, // Added
        UPSTASH_REDIS_REST_TOKEN, // Added
      } = import.meta.env;

      try {
        // 1. Initialize Redis client inside the handler using context variables
        if (!UPSTASH_REDIS_REST_URL || !UPSTASH_REDIS_REST_TOKEN) {
          console.error('Upstash Redis URL or Token is not configured in environment variables.');
          throw new ActionError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Server configuration error (Redis Env). Please try again later.',
          });
        }

        let redis: Redis;
        try {
          redis = new Redis({
            url: UPSTASH_REDIS_REST_URL,
            token: UPSTASH_REDIS_REST_TOKEN,
          });
        } catch (e) {
          console.error('Failed to initialize Redis client:', e);
          throw new ActionError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Server configuration error (Redis Init). Please try again later.',
          });
        }

        // 2. Rate limiting (using the initialized Redis client)
        const ip = context.request.headers.get('x-forwarded-for') || context.clientAddress || 'unknown';
        const ratelimit = new Ratelimit({
          redis: redis, // Use the instance created above
          limiter: Ratelimit.slidingWindow(5, '5 m'), // 5 requests per 5 minutes per IP
          analytics: true,
          prefix: 'ratelimit:contact', // Optional prefix for Redis keys
        });

        try {
          const { success: notLimited } = await ratelimit.limit(ip);
          if (!notLimited) {
            throw new ActionError({
              code: 'TOO_MANY_REQUESTS',
              message: 'Too many requests. Please try again later.',
            });
          }
        } catch (error) {
          console.error('Rate limiting check failed:', error);
          throw new ActionError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Could not verify request rate. Please try again later.',
          });
        }

        // 3. Captcha verification (only in production)
        if (import.meta.env.PROD) {
          if (!CAPTCHA_SECRET_KEY) {
            console.error('CAPTCHA_SECRET_KEY is not configured for production.');
            throw new ActionError({
              code: 'INTERNAL_SERVER_ERROR',
              message: 'Server configuration error (Captcha). Please try again later.',
            });
          }
          const isCaptchaValid = await verifyCaptcha(captchaToken, CAPTCHA_SECRET_KEY, ip);
          if (!isCaptchaValid) {
            // Return captcha-specific error consistent with ContactFormErrors
            throw new ActionError({
              code: 'BAD_REQUEST',
              message: 'Captcha verification failed. Please try again.',
            });
          }
        }

        // 4. Forward to n8n webhook
        if (!N8N_WEBHOOK_URL || !N8N_WEBHOOK_SECRET) {
          console.error('n8n webhook URL or secret is not configured.');
          throw new ActionError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Server configuration error (n8n). Please try again later.',
          });
        }
        const n8nSuccess = await forwardToN8n(N8N_WEBHOOK_URL, N8N_WEBHOOK_SECRET, { name, email, message });
        if (!n8nSuccess) {
          throw new ActionError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to submit your message due to a server issue. Please try again later.',
          });
        }

        // 5. Success - return empty object (no errors)
        // Astro Actions will typically handle success by re-rendering the page or redirecting
        // We don't need to explicitly return a success message here unless we want to pass specific data back via locals
        return {};
      } catch (error) {
        console.error('Unexpected error in submitContactForm:', error);
        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An unexpected server error occurred. Please try again later.',
        });
      }
    },
  }),
  // Add other actions here if needed
};
