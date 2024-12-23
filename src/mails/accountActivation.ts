import { mailer } from "../config/mailer";

export function sendActivationEmail(email: string, activationToken: string) {
  const htmBody = `
        <h1>Activate your account</h1> 
        <p>Click the link below to activate your account</p> 
        <a href="${""}/activate/  ${activationToken}  ">Activate</a>`;

  const mailOptions = {
    from: `"Activate your account" <${""}>`,
    to: email,
    subject: "Activate your account",
    text: "Activate your account",
    html: htmBody,
  };

  return mailer.sendMail(mailOptions).then(() => {
    console.log("Activation email sent to:", email);
  });
}
