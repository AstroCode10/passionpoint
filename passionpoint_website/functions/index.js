const {onDocumentCreated} = require("firebase-functions/v2/firestore");
const {setGlobalOptions} = require("firebase-functions/v2/options");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
require("dotenv").config();

// Init Admin SDK
admin.initializeApp();

// Optional: set defaults (e.g., region, memory, timeout)
setGlobalOptions({region: "us-central1"});

// Gmail transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_PASS,
  },
});

// Contact Form Trigger
exports.sendContactEmail = onDocumentCreated("contacts/{docId}",
    async (event) => {
      const data = event.data.data(); // snapshot in v2

      const mailOptions = {
        from: `"${data.username}" <noreply@passionpointsocial.com>`,
        to: process.env.GMAIL_EMAIL,
        subject: `New Contact Message from ${data.username}`,
        text: `Name:   ${data.username}
Email: ${data.email}
Message: ${data.message}`,
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log("Contact email sent!");
      } catch (error) {
        console.error("Error sending contact email:", error);
      }
    });

// Recruitment Form Trigger
exports.sendRecruitmentEmail = onDocumentCreated("recruitments/{docId}",
    async (event) => {
      const data = event.data.data();

      const mailOptions = {
        from: `"${data.username}" <no-reply@passionpointsocial.com>`,
        to: process.env.GMAIL_EMAIL,
        subject: `New Recruitment Application - ${data.role}`,
        text: `Username: ${data.username}
Email: ${data.email}
Role: ${data.role}
Experience: ${data.experience}
Contribution: ${data.contribution}`,
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log("Recruitment email sent!");
      } catch (error) {
        console.error("Error sending recruitment email:", error);
      }
    });
