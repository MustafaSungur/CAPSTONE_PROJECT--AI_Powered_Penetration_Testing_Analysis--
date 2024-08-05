import nodemailer from "nodemailer";
import "dotenv/config";
export default async function sendMail(name, email, message) {
  try {
    const outputMessage = `
    <h1>Message Details</h1>
    <ul>
      <li>Name:${name}</li>
      <li>Email:${email}</li>
    </ul>
    <h1>Message</h1>
    <p>${message}</p>
  `;
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAILPASSWORD,
      },
    });

    // async..await is not allowed in global scope, must use a wrapper

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: `"AlazSec" <${process.env.EMAIL}>`, // sender address
      to: process.env.ToEMAIL, // list of receivers
      subject: "Osint completed", // Subject line
      html: outputMessage, // html body
    });
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    throw new Error("Email Error:", error);
  }
}
