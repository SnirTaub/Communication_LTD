const UserModel = require("../model/UserModel");
const crypto = require("crypto");
const SibApiV3Sdk = require('sib-api-v3-sdk');
const { hashPassword } = require("../helpers");
const tokens = {}; // In-memory store for tokens

async function forgotPassword(req, res) {
    const { email } = req.body;

    // Check if user exists
    const users = await UserModel.getUserByEmail(email);
    if (!users.length) {
        return res.status(404).send({ message: "User not found." });
    }

    const hashedToken = crypto.createHash("sha1").update(email + Date.now().toString()).digest("hex");

    tokens[hashedToken] = { email, expires: Date.now() + 15 * 60 * 1000 }; // 15 minutes

    // Configure the API client
    const defaultClient = SibApiV3Sdk.ApiClient.instance;
    const apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = '<YOUR_API_KEY>';

    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    // Create email parameters and send the email with the hashed token
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.sender = { email: "snirtaub@gmail.com", name: "Communication LTD" };
    sendSmtpEmail.to = [{ email: email }];
    sendSmtpEmail.subject = "Password Reset Request";
    sendSmtpEmail.htmlContent = `
        <p>You are receiving this because you (or someone else) have requested the reset of the password for your account.</p>
        <p>Please click on the following link to reset your password:</p>
        <a href="http://localhost:5173/reset_password/${hashedToken}">Reset Password</a>
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

    // Hash the new password
    const hashedPassword = hashPassword(newPassword);

    const tokenData = tokens[token];
    if (!tokenData || Date.now() > tokenData.expires) {
        return res.status(400).json({ success: false, message: "Token is invalid or has expired." });
    }

    // Find user by email and update password
    const user = await UserModel.getUserByEmail(tokenData.email);
    if (!user) {
        return res.status(404).json({ success: false, message: "User not found." });
    }
    // Update the user's password in the database
    await UserModel.updatePasswordByEmail(tokenData.email, hashedPassword);

    // Delete the token from the in-memory store
    delete tokens[token];

    res.status(200).json({ success: true, message: "Password reset successfully." });
}

module.exports = {
    forgotPassword,
    resetPassword
};
