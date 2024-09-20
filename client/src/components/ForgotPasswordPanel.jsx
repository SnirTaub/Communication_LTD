import InputField from "./InputField";
import SubmitButton from "./SubmitButton";
import { useState } from "react";
import Axios from "axios";

const IMG_URL = "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDVoaHYwNmt0dmhveXlyZXZweDNxMW5ueHh1cjIwcXhkODM4bGZ1cSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/5QhWuxxILxPd0kWoL1/giphy.gif";

const FORGOT_PASSWORD_API = "http://localhost:3000/forgot-password";

const ForgotPasswordPanel = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const validateEmail = (email) => {
        // Simple email validation regex pattern
        return /\S+@\S+\.\S+/.test(email);
    };

    const handleForgotPassword = async () => {
        setError("");
        setSuccess("");

        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        try {
            const response = await Axios.post(FORGOT_PASSWORD_API, { email });
            if (response.data.success) {
                setSuccess("An email to reset your password has been sent.");
            } else {
                setError(response.data.message || "Error sending reset email.");
            }
        } catch (err) {
            setError("Error sending reset email. Please try again.");
        }
    };

    return (
        <div className="forgot-password-panel">
            <div className="forgot-password-form">
                <h1 className="forgot-password-title">Forgot Password</h1>
                {error && <h3 className="error-message">{error}</h3>}
                {success && <h3 className="success-message">{success}</h3>}

                <div className="form">
                    <InputField
                        fieldName="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <SubmitButton onClick={handleForgotPassword} buttonText="Send Reset Email" />
                </div>
            </div>
            <div>
                <img className="forgot-password-pic" src={IMG_URL} alt="Forgot Password" />
            </div>
        </div>
    );
};

export default ForgotPasswordPanel;
