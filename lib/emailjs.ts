import emailjs from "@emailjs/browser";

export const EMAILJS_SERVICE_ID =
  process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
export const EMAILJS_TEMPLATE_ID =
  process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
export const EMAILJS_PUBLIC_KEY =
  process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  budget: string;
  message: string;
}

export async function sendContactEmail(data: ContactFormData) {
  return emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    {
      from_name: data.name,
      from_email: data.email,
      title: data.subject,
      budget: data.budget,
      message: data.message,
    },
    EMAILJS_PUBLIC_KEY,
  );
}
