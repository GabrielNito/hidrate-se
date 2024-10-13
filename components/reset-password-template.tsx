import * as React from "react";

interface ResetPasswordTemplateProps {
  resetUrl: string;
}

export const ResetPasswordTemplate: React.FC<
  Readonly<ResetPasswordTemplateProps>
> = ({ resetUrl }) => (
  <div>
    <h1>Recuperação de Senha</h1>
    <p>Você solicitou a recuperação de senha da sua conta.</p>
    <p>Clique no link abaixo para definir uma nova senha:</p>
    <a href={resetUrl}>Redefinir Senha</a>
    <p>Se você não solicitou esta recuperação, ignore este email.</p>
    <p>Este link expira em 1 hora.</p>
  </div>
);
