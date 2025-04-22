import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';

// Define Zod schema for validation (moved from contact.astro)
const contactSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Please enter a valid email'),
    message: z.string().min(1, 'Message is required'),
    captcha: z.string().min(1, 'Please answer the captcha'),
    captchaAnswer: z.string(), // Hidden field with the correct answer
  })
  .refine((data) => parseInt(data.captcha) === parseInt(data.captchaAnswer), {
    message: 'Incorrect captcha answer',
    path: ['captcha'], // Associate error with the captcha field
  });

// Define the server actions
export const server = {
  submitContactForm: defineAction({
    input: contactSchema,
    handler: async ({ name, email, message }, { request }) => {
      const ipAddress = request.headers.get('x-forwarded-for') || 'unknown';

      // Security checks - basic spam protection
      if (message.includes('http') && (message.includes('.ru') || message.includes('viagra'))) {
        console.log(`Potential spam detected from ${ipAddress}: ${message.substring(0, 50)}...`);
        // We still return success to avoid giving feedback to spammers
        // Consider adding a slight delay here
        await new Promise((resolve) => setTimeout(resolve, 500));
        return { success: true, message: 'Message received. We will review it shortly.' };
      }

      // Log the submission (in production, you might want to store this in a database or send an email)
      console.log('New contact form submission:');
      console.log(`- Name: ${name}`);
      console.log(`- Email: ${email}`);
      console.log(`- Message: ${message.substring(0, 100)}${message.length > 100 ? '...' : ''}`);
      console.log(`- IP: ${ipAddress}`);
      console.log(`- Date: ${new Date().toISOString()}`);

      // In a real implementation, you would likely:
      // 1. Store the submission in a database
      // 2. Send an email notification
      // 3. Implement more robust spam protection (e.g., Turnstile, hCaptcha)
      // 4. Add proper rate limiting

      return { success: true, message: "Your message has been sent successfully! I'll get back to you soon." };
    },
  }),
  // Add other actions here if needed
};
