import React, { useState, useEffect } from "react";
import bcrypt from "bcryptjs";
import {
    Box,
    Card,
    CardContent,
    TextField,
    Button,
    Typography,
    IconButton,
    InputAdornment,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    FormHelperText,
    Link,
    CircularProgress,
    LinearProgress,
    Snackbar,
    Alert,
} from "@mui/material";
import { Container, styled } from "@mui/system";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { auth, Authdb } from "../../../firebase"; // Adjust the import path as necessary
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

const StyledCard = styled(Card)(({ theme }) => ({
    maxWidth: 600,
    margin: "40px auto",
    padding: "20px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
}));

const StyledButton = styled(Button)(({ theme }) => ({
    borderRadius: 25,
    padding: theme.spacing(1.5),
    textTransform: "none",
    fontSize: "1rem",
    marginTop: theme.spacing(2)
}));

const FormContainer = styled(Box)({
    display: "flex",
    flexDirection: "column",
    gap: "20px",
});

const GoogleButton = styled(Button)({
    backgroundColor: "#fff",
    color: "#757575",
    border: "1px solid #dadce0",
    "&:hover": {
        backgroundColor: "#f1f3f4",
        border: "1px solid #dadce0",
    },
});

const countryCodes = [
    { code: "+1", country: "USA" },
    { code: "+44", country: "UK" },
    { code: "+91", country: "India" },
];

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        countryCode: "+1",
        phone: "",
        password: "",
        confirmPassword: "",
    });
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });
    const provider = new GoogleAuthProvider();

    // const handleGoogleSignup = () => {
    //     try {
    //         signInWithPopup(auth, provider)
    //             .then(async (result) => {
    //                 const credential = GoogleAuthProvider.credentialFromResult(result);
    //                 const token = credential.accessToken;
    //                 const user = result.user;
    //                 console.log("Google User:", user);

    //                 await setDoc(doc(Authdb, "users", user.uid), {
    //                     uid: user.uid,
    //                     email: user.email,
    //                     emailVerified: user.emailVerified,
    //                     provider: user.providerData[0].providerId,
    //                     displayName: user.displayName,
    //                     photoURL: user.photoURL,
    //                     createdAt: user.metadata.createdAt,              // timestamp in ms as string
    //                     creationTime: user.metadata.creationTime,        // human-readable string
    //                     lastLoginAt: user.metadata.lastLoginAt,          // timestamp in ms as string
    //                     lastSignInTime: user.metadata.lastSignInTime     // human-readable string

    //                 });
    //                 setSnackbar({
    //                     open: true,
    //                     message: `Google Signup successful! Welcome ${user.displayName || user.email}`,
    //                     severity: "success"
    //                 });
    //                 navigate("/home"); // Redirect to Home page after successful registration
    //             })
    //     }
    //     catch (error) {
    //         console.error("Google Signup error:", error);
    //         setSnackbar({
    //             open: true,
    //             message: "Google Signup failed. Please try again.",
    //             severity: "error"
    //         });
    //     }
    // }

    const handleGoogleSignup = async () => {
        try {
            // Create provider with explicit scopes
            const provider = new GoogleAuthProvider();
            provider.addScope('email');
            provider.addScope('profile');

            // Force account selection
            provider.setCustomParameters({
                prompt: 'select_account'
            });

            console.log("🔍 Starting Google Sign-in...");

            const result = await signInWithPopup(auth, provider);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const user = result.user;

            console.log("Google User:", user);

            // Get email from the most reliable source (providerData)
            const userEmail = user.providerData[0]?.email || user.email;
            const emailVerified = user.emailVerified;

            console.log("✅ Email found:", userEmail);
            console.log("✅ Email verified:", emailVerified);

            if (!userEmail) {
                console.error("❌ No email found from any source!");
                setSnackbar({
                    open: true,
                    message: "Google account must have a verified email address.",
                    severity: "error"
                });
                return;
            }

            // Clean document data - avoid undefined values
            const userData = {
                uid: user.uid,
                email: userEmail,
                emailVerified: emailVerified,
                provider: user.providerData[0]?.providerId || 'google.com',
                displayName: user.displayName || '',
                photoURL: user.photoURL || '',
                createdAt: user.metadata.createdAt || '',
                creationTime: user.metadata.creationTime || '',
                lastLoginAt: user.metadata.lastLoginAt || '',
                lastSignInTime: user.metadata.lastSignInTime || ''
            };

            console.log("💾 Saving user data:", userData);

            // Save to Firestore
            await setDoc(doc(Authdb, "users", user.uid), userData);

            setSnackbar({
                open: true,
                message: `Google Signup successful! Welcome ${user.displayName || userEmail}`,
                severity: "success"
            });

            console.log("✅ User successfully saved to Firestore");
            navigate("/home");

        } catch (error) {
            console.error("❌ Google Signup error:", error);

            setSnackbar({
                open: true,
                message: `Google Signup failed: ${error.message}`,
                severity: "error"
            });
        }
    };


    const validateField = (name, value) => {
        const newErrors = { ...errors };

        switch (name) {
            case "firstName":
            case "lastName":
                if (!value) {
                    newErrors[name] = "This field is required";
                } else if (value.length < 2) {
                    newErrors[name] = "Minimum 2 characters required";
                } else if (!/^[A-Za-z]+$/.test(value)) {
                    newErrors[name] = "Only letters are allowed";
                } else {
                    delete newErrors[name];
                }
                break;

            case "email":
                if (!value) {
                    newErrors.email = "Email is required";
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                    newErrors.email = "Invalid email address";
                } else {
                    delete newErrors.email;
                }
                break;

            case "phone":
                if (!value) {
                    newErrors.phone = "Phone number is required";
                } else if (!/^\d{10}$/.test(value)) {
                    newErrors.phone = "Invalid phone number";
                } else {
                    delete newErrors.phone;
                }
                break;

            case "password":
                if (!value) {
                    newErrors.password = "Password is required";
                } else if (value.length < 8) {
                    newErrors.password = "Password must be at least 8 characters";
                } else if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/.test(value)) {
                    newErrors.password =
                        "Password must contain uppercase, lowercase, number and special character";
                } else {
                    delete newErrors.password;
                }
                setPasswordStrength(calculatePasswordStrength(value));
                break;

            case "confirmPassword":
                if (value !== formData.password) {
                    newErrors.confirmPassword = "Passwords do not match";
                } else {
                    delete newErrors.confirmPassword;
                }
                break;

            default:
                break;
        }

        setErrors(newErrors);
    };

    const calculatePasswordStrength = (password) => {
        let strength = 0;
        if (password.length >= 8) strength += 25;
        if (/[A-Z]/.test(password)) strength += 25;
        if (/[a-z]/.test(password)) strength += 25;
        if (/[0-9]/.test(password)) strength += 25;
        return strength;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        validateField(name, value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            console.log("Form submitted:", formData);
            setLoading(false);
        } catch (error) {
            console.error("Error:", error);
            setLoading(false);
        }

        try {
            const result = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            console.log("User created successfully:", result.user);
            const user = result.user;
            await updateProfile(user, {
                displayName: `${formData.firstName} ${formData.lastName}`,
            });
            await setDoc(doc(Authdb, "users", user.uid), {
                uid: user.uid,
                email: user.email,
                provider: user.providerData[0].providerId,
                emailVerified: user.emailVerified,
                firstName: formData.firstName,
                lastName: formData.lastName,
                password: bcrypt.hashSync(formData.password, 13),
                phone: formData.phone,
                countryCode: formData.countryCode,
                createdAt: user.metadata.createdAt,               // timestamp in ms as string
                creationTime: user.metadata.creationTime,        // human-readable string
                lastLoginAt: user.metadata.lastLoginAt,          // timestamp in ms as string
                lastSignInTime: user.metadata.lastSignInTime     // human-readable string
            });
            setSnackbar({
                open: true,
                message: `Registration successful! Welcome. ${result.user.displayName || result.user.email}`,
                severity: "success"
            });

            navigate("/home"); // Redirect to Home page after successful registration

        }
        catch (error) {
            console.error("Error creating user:", error);
            setSnackbar({
                open: true,
                message: "Registration failed. error: " + error.message,
                severity: "error"
            });
            setLoading(false);
            return;
        }
    };

    const isFormValid = () => {
        return (
            Object.keys(errors).length === 0 &&
            Object.values(formData).every((value) => value !== "")
        );
    };

    return (
        <Container maxWidth="sm" sx={{ padding: 2 }}>
            <StyledCard>
                <CardContent>
                    <Typography variant="h4" align="center" gutterBottom>
                        Create Account
                    </Typography>

                    <FormContainer component="form" onSubmit={handleSubmit}>

                        <Box sx={{ display: "flex", gap: 2 }}>
                            <TextField
                                name="firstName"
                                label="First Name"
                                value={formData.firstName}
                                onChange={handleChange}
                                error={!!errors.firstName}
                                helperText={errors.firstName}
                                fullWidth
                                required
                            />

                            <TextField
                                name="lastName"
                                label="Last Name"
                                value={formData.lastName}
                                onChange={handleChange}
                                error={!!errors.lastName}
                                helperText={errors.lastName}
                                fullWidth
                                required
                            />
                        </Box>

                        <TextField
                            name="email"
                            type="email"
                            label="Email"
                            value={formData.email}
                            onChange={handleChange}
                            error={!!errors.email}
                            helperText={errors.email}
                            fullWidth
                            required
                        />

                        <Box sx={{ display: "flex", gap: 2 }}>
                            <FormControl sx={{ width: "30%" }}>
                                <InputLabel>Code</InputLabel>
                                <Select
                                    name="countryCode"
                                    value={formData.countryCode}
                                    onChange={handleChange}
                                    label="Code"
                                >
                                    {countryCodes.map((country) => (
                                        <MenuItem key={country.code} value={country.code}>
                                            {country.code} ({country.country})
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <TextField
                                name="phone"
                                label="Phone Number"
                                value={formData.phone}
                                onChange={handleChange}
                                error={!!errors.phone}
                                helperText={errors.phone}
                                fullWidth
                                required
                            />
                        </Box>

                        <TextField
                            name="password"
                            type={showPassword ? "text" : "password"}
                            label="Password"
                            value={formData.password}
                            onChange={handleChange}
                            error={!!errors.password}
                            helperText={errors.password}
                            fullWidth
                            required
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                        >
                                            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        {formData.password && (
                            <Box sx={{ width: "100%" }}>
                                <LinearProgress
                                    variant="determinate"
                                    value={passwordStrength}
                                    sx={{
                                        height: 8,
                                        borderRadius: 5,
                                        backgroundColor: "#e0e0e0",
                                        "& .MuiLinearProgress-bar": {
                                            backgroundColor:
                                                passwordStrength <= 25
                                                    ? "#f44336"
                                                    : passwordStrength <= 50
                                                        ? "#ff9800"
                                                        : passwordStrength <= 75
                                                            ? "#2196f3"
                                                            : "#4caf50",
                                        },
                                    }}
                                />
                                <Typography variant="caption" color="textSecondary">
                                    Password Strength: {passwordStrength}%
                                </Typography>
                            </Box>
                        )}

                        <TextField
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            label="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword}
                            fullWidth
                            required
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            edge="end"
                                        >
                                            {showConfirmPassword ? (
                                                <AiOutlineEyeInvisible />
                                            ) : (
                                                <AiOutlineEye />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={!isFormValid() || loading}
                            sx={{ height: 56 }}
                            onClick={handleSubmit}
                        >
                            {loading ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                "Register"
                            )}
                        </Button>
                        <Typography variant="body1" align="center">
                            or register with Social accounts
                        </Typography>

                        <StyledButton
                            fullWidth
                            variant="outlined"
                            onClick={handleGoogleSignup}
                            startIcon={<FcGoogle />}
                        >
                            Continue with Google
                        </StyledButton>

                        <Typography variant="body2" align="center">
                            Already have an account?{" "}
                            <Link href="/auth" underline="hover">
                                Sign in
                            </Link>
                        </Typography>

                        <Typography variant="caption" align="center" color="textSecondary">
                            By registering, you agree to our{" "}
                            <Link href="#" underline="hover">
                                Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link href="#" underline="hover">
                                Privacy Policy
                            </Link>
                        </Typography>
                    </FormContainer>
                </CardContent>
            </StyledCard>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    severity={snackbar.severity}
                    sx={{ width: "100%" }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default RegistrationForm;