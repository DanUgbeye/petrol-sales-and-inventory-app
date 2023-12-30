import { ServerException } from "@/server/exceptions";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your-email@gmail.com",
    pass: "your-email-password",
  },
});

export type EmailData = {
  from: string;
  to: string;
  subject: string;
  text?: string;
};

export async function sendEmail(data: EmailData) {
  try {
    await transporter.sendMail(data);
    return true;
  } catch (error: any) {
    throw new ServerException(error.message);
  }
}
