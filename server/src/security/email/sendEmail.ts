import nodemailer from "nodemailer";
import handlebars from "handlebars";
import fs from "fs";
import path from "path";

export default async (
  email: string,
  subject: string,
  payload: { link: string; name: string },
  template: string,
) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const source = fs.readFileSync(path.join(__dirname, template), "utf8");
  const compiledTemplate = handlebars.compile(source);
  const options = () => {
    return {
      from: process.env.FROM_EMAIL,
      to: email,
      subject: subject,
      html: compiledTemplate(payload),
    };
  };

  // Send email
  transporter.sendMail(options());
};
