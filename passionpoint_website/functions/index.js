const functions = require("firebase-functions");
const sgMail = require("@sendgrid/mail");

// Set your SendGrid API key here (secure way: use Firebase environment config)
sgMail.setApiKey(functions.config().sendgrid.key);

// Contact Message Trigger
exports.sendContactEmail = functions.firestore
  .document("contacts/{docId}")
  .onCreate(async (snap, context) => {
    const data = snap.data();

    const msg = {
      to: "sathisumds@gmail.com", // Your email
      from: "no-reply@passionpoint.com", // Verified sender in SendGrid
      subject: `New Contact Message from ${data.name}`,
      text: `
Name: ${data.name}
Email: ${data.email}
Message: ${data.message}
      `,
    };

    try {
      await sgMail.send(msg);
      console.log("Contact email sent!");
    } catch (error) {
      console.error("Error sending contact email:", error);
    }
  });

// Recruitment Application Trigger
exports.sendRecruitmentEmail = functions.firestore
  .document("recruitments/{docId}")
  .onCreate(async (snap, context) => {
    const data = snap.data();

    const msg = {
      to: "sathisumds@gmail.com",
      from: "no-reply@passionpoint.com",
      subject: `New Recruitment Application - ${data.role}`,
      text: `
Username: ${data.username}
Email: ${data.email}
Role: ${data.role}
Experience: ${data.experience}
      `,
    };

    try {
      await sgMail.send(msg);
      console.log("Recruitment email sent!");
    } catch (error) {
      console.error("Error sending recruitment email:", error);
    }
  });
