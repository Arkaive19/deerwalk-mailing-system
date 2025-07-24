import nodemailer from "nodemailer";
import config from "../../../config.js";

let transporterInfo = {
  host: "smtp.gmail.com",
  port: 587,
  secure: false,

  auth: {
    user: config.MAIL_DOMAIN,
    pass: config.MAIL_API_KEY,
  },
};

export let sendEmail = async (mailInfo) => {
  try {
    let transporter = nodemailer.createTransport(transporterInfo);
    await transporter.sendMail(mailInfo);
  } catch (error) {
    console.log("error has occurred", error.message);
  }
};
