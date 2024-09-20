const UserModel = require("../model/UserModel");
const crypto = require("crypto");
const SibApiV3Sdk = require('sib-api-v3-sdk');
const { hashPassword } = require("../helpers");

async function forgotPassword(req, res) {
    const { email } = req.body;

    // Check if user exists
    const users = await UserModel.getUserByEmail(email);
    if (!users.length) {
        return res.status(404).send({ message: "User not found." });
    }

    // Generate a random token
    const token = crypto.randomBytes(20).toString('hex');

    // Save the token to the user record or a separate password reset table
    // Implement token storage logic if necessary (e.g., set expiration time)

    // Configure the API client
    const defaultClient = SibApiV3Sdk.ApiClient.instance;
    const apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = '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'; // Replace with your actual API key

    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    // Create email parameters
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.sender = { email: "snirtaub@gmail.com", name: "Communication LTD" }; // Update with your name
    sendSmtpEmail.to = [{ email: email }];
    sendSmtpEmail.subject = "Password Reset Request";
    sendSmtpEmail.htmlContent = `
        <p>You are receiving this because you (or someone else) have requested the reset of the password for your account.</p>
        <p>Please click on the following link to reset your password:</p>
        <a href="http://localhost:5173/reset_password/${token}">Reset Password</a>
        <p>If you did not request this, please ignore this email.</p>
    `;

    try {
        await apiInstance.sendTransacEmail(sendSmtpEmail);
        res.send({ message: "Password reset email sent." });
    } catch (error) {
        console.error("Error sending email:", error);
        return res.status(500).send({ message: "Error sending email." });
    }
}

async function resetPassword(req, res) {
    const { token } = req.params;
    const { newPassword } = req.body;

    // Here you should validate the token and check its expiration
    // For simplicity, let's assume you have already done that

    // Hash the new password
    const hashedPassword = hashPassword(newPassword);

    // Update the user's password in the database
    await UserModel.updatePasswordByToken(token, hashedPassword);

    res.send({ message: "Password has been reset successfully." });
}

module.exports = {
    forgotPassword,
    resetPassword
};
