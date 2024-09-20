import React, { useState, useEffect } from "react";
import InputField from "./InputField"; // Assuming you have this component
import SubmitButton from "./SubmitButton"; // Assuming you have this component
import Axios from "axios";

const RESET_PASSWORD_API = "http://localhost:3000/reset-password"; // Update with your API endpoint

const ResetPasswordPanel = () => {
    const [token, setToken] = useState(""); // Store token from URL path
    const [newPassword, setNewPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Effect to get the token from the URL path
    useEffect(() => {
        const pathParts = window.location.pathname.split("/");
        const tokenFromURL = pathParts[pathParts.length - 1]; // Extract token from URL path
        if (tokenFromURL) {
            setToken(tokenFromURL);
        }
    }, []);

    const handleResetPassword = async () => {
        setError("");
        setSuccess("");

        if (newPassword !== repeatPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const response = await Axios.post(`${RESET_PASSWORD_API}/${token}`, { newPassword });
            setSuccess(response.data.message || "Password reset successfully.");
        } catch (err) {
            setError("Error resetting password. Please try again.");
        }
    };

    return (
        <div className="reset-password-panel">
            <h1 className="reset-password-title">Reset Password</h1>
            {error && <h3 className="error-message">{error}</h3>}
            {success && <h3 className="success-message">{success}</h3>}

            <div className="form">
                <InputField
                    fieldName="New Password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <InputField
                    fieldName="Repeat Password"
                    type="password"
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                />
                <SubmitButton onClick={handleResetPassword} buttonText="Reset Password" />
            </div>
        </div>
    );
};

export default ResetPasswordPanel;
