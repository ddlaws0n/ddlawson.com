/**
 * Contact Form Handler
 *
 * A Vercel serverless function to process contact form submissions.
 * Validates user input, logs submissions, and handles potential errors.
 */

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Extract form data from request body
    const { name, email, message, captcha } = req.body;

    // Basic validation
    if (!name || !email || !message || !captcha) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address' });
    }

    // Simple rate limiting through headers (can be enhanced with proper rate limiting)
    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    // Security checks - basic spam protection
    if (message.includes('http') && (message.includes('.ru') || message.includes('viagra'))) {
      console.log(`Potential spam detected from ${ipAddress}: ${message.substring(0, 50)}...`);
      // We still return success to avoid giving feedback to spammers
      return res.status(200).json({ message: 'Message received' });
    }

    // Log the submission (in production, you might want to store this in a database)
    console.log('New contact form submission:');
    console.log(`- Name: ${name}`);
    console.log(`- Email: ${email}`);
    console.log(`- Message: ${message.substring(0, 100)}${message.length > 100 ? '...' : ''}`);
    console.log(`- IP: ${ipAddress}`);
    console.log(`- Date: ${new Date().toISOString()}`);

    // In a real implementation, you would likely:
    // 1. Store the submission in a database
    // 2. Send an email notification
    // 3. Implement more robust spam protection
    // 4. Add proper rate limiting

    // Success response
    return res.status(200).json({
      message: "Your message has been received! I'll get back to you soon.",
    });
  } catch (error) {
    console.error('Error processing contact form submission:', error);
    return res.status(500).json({
      message: 'Something went wrong. Please try again later.',
    });
  }
}
