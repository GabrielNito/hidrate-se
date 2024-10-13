import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import crypto from "crypto";
import { Resend } from "resend";
import { ResetPasswordTemplate } from "@/components/reset-password-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({
        message:
          "Se uma conta existir com este email, você receberá um link de recuperação.",
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetExpires = new Date(Date.now() + 3600000); // 1 hour from now

    // Save token to database
    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordResetToken: resetToken,
        passwordResetExpires: resetExpires,
      },
    });

    // Create reset URL
    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password/${resetToken}`;

    try {
      // Send email
      await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: email,
        subject: "Recuperação de Senha",
        react: ResetPasswordTemplate({ resetUrl }),
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return NextResponse.json(
        { error: "Ocorreu um erro ao enviar o email de recuperação." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message:
        "Se uma conta existir com este email, você receberá um link de recuperação.",
    });
  } catch (error) {
    console.error("Password reset error:", error);
    return NextResponse.json(
      { error: "Ocorreu um erro ao processar sua solicitação." },
      { status: 500 }
    );
  }
}
