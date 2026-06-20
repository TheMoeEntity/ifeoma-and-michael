import nodemailer from "nodemailer";
import Handlebars from "handlebars";
import fs from "fs";
import path from "path";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT ?? 587),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const RECIPIENT = process.env.NOTIFY_EMAIL!;
const FROM = `"Ifeoma & Michael Wedding" <${process.env.SMTP_USER}>`;

function loadTemplate(name: string) {
  const filePath = path.join(process.cwd(), "lib", "emails", `${name}.hbs`);
  const source = fs.readFileSync(filePath, "utf-8");
  return Handlebars.compile(source);
}

// Compile once at module load (cached across requests in production)
const blessingTemplate = loadTemplate("blessing");
const rsvpTemplate = loadTemplate("rsvp");

export async function sendBlessingNotification(data: {
  name: string;
  message: string;
}) {
  const html = blessingTemplate(data);
  await transporter.sendMail({
    from: FROM,
    to: RECIPIENT,
    subject: `New Blessing from ${data.name} — Ifeoma & Michael`,
    html,
  });
}

export async function sendRsvpNotification(data: {
  fullName: string;
  phone: string;
  guests: string;
  message?: string;
}) {
  const html = rsvpTemplate(data);
  await transporter.sendMail({
    from: FROM,
    to: RECIPIENT,
    subject: `New RSVP from ${data.fullName} (${data.guests}) — Ifeoma & Michael`,
    html,
  });
}
