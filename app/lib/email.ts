import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendPasswordResetEmail(email: string, resetLink: string) {
  const { data, error } = await resend.emails.send({
    from: "Water Tracker <noreply@yourdomain.com>",
    to: email,
    subject: "Reset Your Password",
    html: `
            <h1>Reset Your Password</h1>
            <p>Click the link below to reset your password. This link will expire in 1 hour.</p>
            <a href="${resetLink}">ResetPassword</a>
            <p>If you didn't request this, please ignore this email.</p>
        `,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
