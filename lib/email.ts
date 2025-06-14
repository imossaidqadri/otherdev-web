// lib/email.ts

// Assuming KVClient is a default export from the JS file.
// Adjust if it's a named export.
import KVClient from '../src/lib/kabeer-cloud.js';
import nodemailer from 'nodemailer';

export interface SubscriptionRequest {
  email: string;
}

export interface SubscriptionResponse {
  success: boolean;
  error?: string;
}

export async function handleNewsletterSubscription(
  data: SubscriptionRequest
): Promise<SubscriptionResponse> {
  // Validate email
  if (!data.email || !/^[\w.-]+@[\w.-]+\.\w+$/.test(data.email)) {
    return { success: false, error: "Invalid email" };
  }

  // Environment variable checks for KV store
  if (!process.env.STORAGE_CLIENT || !process.env.KABEERCLOUD_BUCKET) {
    console.error("Missing KV store environment variables (STORAGE_CLIENT or KABEERCLOUD_BUCKET)");
    return { success: false, error: "Server configuration error regarding data storage." };
  }

  // Environment variable checks for SMTP
  if (!process.env.SMTP_HOST || !process.env.SMTP_USERNAME || !process.env.SMTP_PASSWORD || !process.env.NOTIFICATION_EMAIL) {
    console.error("Missing SMTP environment variables (SMTP_HOST, SMTP_USERNAME, SMTP_PASSWORD, or NOTIFICATION_EMAIL)");
    return { success: false, error: "Server configuration error regarding email services." };
  }

  const kvClient = new KVClient(process.env.STORAGE_CLIENT);

  try {
    // Store email in KV Store
    await kvClient.create(
      process.env.KABEERCLOUD_BUCKET,
      data.email,
      JSON.stringify({ subscribed: true, source: 'web.utility.email' })
    );

    // Configure nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 465, // As per original API route
      secure: true, // true for 465
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Send confirmation email to the user
    await transporter.sendMail({
      from: 'Kabeer from Other Dev <kabeer@otherdev.com>', // Consider making sender email an env var
      to: data.email,
      subject: "Thanks for subscribing!",
      text: "You're now on our list. Welcome to the future.",
      // html: "<b>You're now on our list. Welcome to the future.</b>" // Optional HTML version
    });

    // Send notification email to admin
    await transporter.sendMail({
      from: 'Kabeer from Other Dev <noreply@otherdev.com>', // Consider making sender email an env var
      to: process.env.NOTIFICATION_EMAIL,
      subject: `${data.email} subscribed to Other Dev's Website`,
      text: `The email address ${data.email} has subscribed via the website utility.`,
      // html: `The email address <b>${data.email}</b> has subscribed via the website utility.` // Optional HTML
    });

    return { success: true };

  } catch (e: any) {
    console.error("Error during newsletter subscription process:", e);
    // Provide a more generic error message to the client for security/simplicity
    return { success: false, error: "An error occurred while processing your subscription." };
  }
}
