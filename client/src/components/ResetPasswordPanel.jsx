import React, { useState, useEffect, useContext } from "react";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";
import { validateByConfig } from "../helpers";
import Axios from "axios";
import { UserContext } from "../App.jsx";

const RESET_PASSWORD_API = "http://localhost:3000/reset-password";

const ResetPasswordPanel = () => {
    const [token, setToken] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [formData, setFormData] = useState({
        password: "",
        repeatPassword: "",
    });

    const userContextData = useContext(UserContext);

    // Effect to get the token from the URL path
    useEffect(() => {
        const pathParts = window.location.pathname.split("/");
        const tokenFromURL = pathParts[pathParts.length - 1];
        if (tokenFromURL) {
            setToken(tokenFromURL);
        }
    }, []);

    const handleResetPassword = async () => {
        setError("");
        setSuccess("");

        let validationObject = validateByConfig(formData);
        if (!validationObject.isValid) {
            setError(validationObject.errorMsg);
            return;
        }

        try {
            const response = await Axios.post(`${RESET_PASSWORD_API}/${token}`, { newPassword: formData.password });
            setSuccess(response.data.message || "Password reset successfully.");
            userContextData.setLoggedInStatus(false);
        } catch (err) {
            setError(err.response?.data?.message || "Error resetting password. Please try again.");
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
                    hide
                    onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                    }
                />
                <InputField
                    fieldName="Repeat Password"
                    type="password"
                    hide
                    onChange={(e) =>
                        setFormData({ ...formData, repeatPassword: e.target.value })
                    }
                />
                <SubmitButton onClick={handleResetPassword} buttonText="Reset Password" />
            </div>
        </div>
    );
};

export default ResetPasswordPanel;