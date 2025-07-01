import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { Button, TextField } from '@mui/material';
import { auth } from '../../../firebase'; // Adjust the import path as necessary

// ResetPasswordPage.jsx
// This component allows users to reset their password by entering their email address. 
const Reset = () => {
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({});

    const validateEmail = (email) => {
        const newError = {};
        if (!email) {
            newError.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newError.email = "Email is invalid";
        }

        setErrors(newError); // update state
        return Object.keys(newError).length === 0;
    };

    const handleResetPassword = async (email) => {
        if (!validateEmail(email)) {
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email);
            alert("Password reset email sent successfully!");
        } catch (error) {
            console.error("Error sending password reset email:", error);
            alert("Failed to send password reset email. Please try again.");
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: "auto" }}>
            <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
                required
                margin="normal"
            />
            <Button
                variant="contained"
                color="primary"
                onClick={() => handleResetPassword(email)}
                fullWidth
            >
                Reset Password
            </Button>
        </div>
    );
};

export default Reset;
