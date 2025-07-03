import KVClient from "@/lib/kabeer-cloud";
import type { APIContext } from "astro";
import nodemailer from "nodemailer";

const client = new KVClient(import.meta.env.STORAGE_CLIENT);

export async function POST(context: APIContext): Promise<Response> {
  const data = await context.request.json();
  const email = data.email;

  if (!email || !/^[\w.-]+@[\w.-]+\.\w+$/.test(email)) {
    return new Response("Invalid email", { status: 400 });
  }

  try {
    await client.create(import.meta.env.KABEERCLOUD_BUCKET, email, JSON.stringify({ subscribed: true, source: 'web.frontend' }));

    // Create a test account or replace with real credentials.
    const transporter = nodemailer.createTransport({
      host: import.meta.env.SMTP_HOST,
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: import.meta.env.SMTP_USERNAME,
        pass: import.meta.env.SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: 'Kabeer from Other Dev <kabeer@otherdev.com>',
      to: email,
      subject: "Thanks for subscribing!",
      text: "You're now on our list. Welcome to the future.",
    });
    await transporter.sendMail({
      from: 'Kabeer from Other Dev <noreply@otherdev.com>',
      to: import.meta.env.NOTIFICATION_EMAIL,
      subject: `${email} subscribed to Other Dev's Website`,
      text: "",
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e: any) {
    console.log(e)
    return new Response(e.message, { status: 500 });
  }
};