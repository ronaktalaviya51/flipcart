const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const SETTINGS_FILE = path.join(__dirname, "../data/settings.json");

const sendEmail = async (to, subject, html) => {
  try {
    let settings = {};
    if (fs.existsSync(SETTINGS_FILE)) {
      settings = JSON.parse(fs.readFileSync(SETTINGS_FILE, "utf8"));
    }

    const { admin_email, admin_email_password, company_name } = settings;

    if (!admin_email || !admin_email_password) {
      console.warn("SMTP settings missing. Skipping email send.");
      return { success: false, message: "SMTP settings missing" };
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: admin_email,
        pass: admin_email_password,
      },
    });

    const mailOptions = {
      from: `"${company_name || "Admin"}" <${admin_email}>`,
      to: to || admin_email,
      subject: subject || "Notification",
      html: html || "",
    };

    const info = await transporter.sendMail(mailOptions);
    return { success: true, info };
  } catch (error) {
    console.error("Email error:", error);
    return { success: false, error };
  }
};

module.exports = sendEmail;
