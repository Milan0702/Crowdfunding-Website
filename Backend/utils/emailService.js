const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();

// Create reusable transporter object using environment variables
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT || 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Send thank you email to donor
 * @param {Object} donor - Donor information
 * @param {string} donor.email - Donor's email address
 * @param {string} donor.name - Donor's name
 * @param {number} donor.amount - Donation amount
 * @param {number} treesPlanted - Number of trees to be planted
 * @returns {Promise<Object>} - Email sending result
 */
const sendThankYouEmail = async (donor, treesPlanted) => {
  try {
    const certificatePath = path.join(__dirname, '../../ecf2/src/assets/certificate.pdf');
    
    const mailOptions = {
      from: `"Team Trees" <${process.env.EMAIL_USER}>`,
      to: donor.email,
      subject: "Thank You for Your Contribution!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <h2 style="color: #6FBA0D;">Thank You for Your Contribution!</h2>
          <p>Dear ${donor.name},</p>
          <p>Thank you for contributing to Team Trees! Your generous donation of ${donor.amount} INR will help us plant <strong>${treesPlanted} trees</strong>.</p>
          <p>Your support makes a meaningful difference in our mission to restore forests and combat climate change.</p>
          <p>We've attached a certificate acknowledging your contribution.</p>
          <p>With gratitude,<br>The Team Trees Family</p>
        </div>
      `,
      attachments: [{
        filename: "certificate.pdf",
        path: certificatePath,
        cid: "certificate"
      }]
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendThankYouEmail
}; 