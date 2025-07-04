
import React, { useState } from "react";
import bcrypt from "bcryptjs";
import {
    Box,
    Button,
    Card,
    CardContent,
    Checkbox,
    Container,
    FormControlLabel,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
    Alert,
    Snackbar,
    CircularProgress,
    Divider,
    useTheme,
    useMediaQuery
} from "@mui/material";
import { styled } from "@mui/system";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, linkWithPopup } from "firebase/auth";
import { auth } from "../../../firebase"; // Adjust the import path as necessary
import { useNavigate } from "react-router-dom";
import "./Login.css"
import axios from "axios";
import CONFIG from "../../../config-global";

const StyledCard = styled(Card)(({ theme }) => ({
    maxWidth: 450,
    width: "100%",
    padding: theme.spacing(3),
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    borderRadius: 12,
    background: "linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)"
}));

const StyledButton = styled(Button)(({ theme }) => ({
    borderRadius: 25,
    padding: theme.spacing(1.5),
    textTransform: "none",
    fontSize: "1rem",
    marginTop: theme.spacing(2)
}));

const Login = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const ApiBaseURL = CONFIG.apiBaseUrl || "http://localhost:3000/api"; // Use the global config for API base URL
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });

    const validateForm = async () => {
        const newErrors = {};
        if (!email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Invalid email format";
        }
        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            if (result) {
                await new Promise(resolve => setTimeout(resolve, 1500));
                setSnackbar({
                    open: true,
                    message: "Login successful!",
                    severity: "success"
                });
                console.log("User signed in:", result.user);
                console.log(snackbar);
                navigate("/home");
            }

        } catch (error) {
            setSnackbar({
                open: true,
                message: `Login failed: ${error.message}`,
                severity: "error"
            });
            console.log("Login error:", error);
            console.log(snackbar);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const googleAuthProvider = new GoogleAuthProvider();
            googleAuthProvider.addScope('email');
            googleAuthProvider.addScope('profile');
            signInWithPopup(auth, googleAuthProvider)
                .then((result) => {
                    console.log(result.user.email);
                    const credential = GoogleAuthProvider.credentialFromResult(result);
                    const token = credential.accessToken;
                    // The signed-in user info.
                    const user = result.user;
                    user.providerData.forEach((profile) => {
                        console.log("Sign-in provider: " + profile.providerId);
                        console.log("  Provider-specific UID: " + profile.uid);
                        console.log("  Name: " + profile.displayName);
                        console.log("  Email: " + profile.email);
                        console.log("  Photo URL: " + profile.photoURL);
                    });
                    console.log("Google login successful:", user);
                    setSnackbar({
                        open: true,
                        message: "Google login successful!",
                        severity: "success"
                    });

                    navigate("/home");
                })
        }
        catch (error) {
            console.error("Google login error:", error);
            setSnackbar({
                open: true,
                message: "Google login failed. Please try again.",
                severity: "error"
            });
        }
    };

    // const handleGoogleLogin = async () => {
    //     try {
    //         await signInWithPopup(auth, googleAuthProvider);
    //         // success
    //         setSnackbar({
    //             open: true,
    //             message: "Google login successful!",
    //             severity: "success"
    //         });
    //         navigate("/home");
    //     } catch (error) {
    //         if (error.code === 'auth/account-exists-with-different-credential') {
    //             const pendingCred = GoogleAuthProvider.credentialFromError(error);
    //             const email = error.customData.email;
    //             try {
    //                 // Ask user to login with password
    //                 const password = prompt(`An account already exists with email ${email}. Please enter your password to link Google:`);
    //                 const userCredential = await signInWithEmailAndPassword(auth, email, password);
    //                 // Link Google to existing user
    //                 await linkWithCredential(userCredential.user, pendingCred);
    //                 console.log("✅ Successfully linked Google to existing account");
    //                 setSnackbar({
    //                     open: true,
    //                     message: "Google account linked! You can now login both ways.",
    //                     severity: "success"
    //                 });
    //                 navigate("/home");
    //             } catch (linkError) {
    //                 console.error("Error linking Google:", linkError);
    //                 setSnackbar({
    //                     open: true,
    //                     message: `Failed to link Google account: ${linkError.message}`,
    //                     severity: "error"
    //                 });
    //             }
    //         } else {
    //             console.error("Google login error:", error);
    //             setSnackbar({
    //                 open: true,
    //                 message: "Google login failed. Please try again.",
    //                 severity: "error"
    //             });
    //         }
    //     }
    // };


    const handlesignupRoute = () => {
        navigate("/signup");
    };

    const handleResetPassword = () => {
        navigate("/reset-password")
    }

    return (
        <Container
            maxWidth="sm"
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                py: 3
            }}
        >
            <StyledCard>
                <CardContent>
                    <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 700 }}>
                        Welcome Back
                    </Typography>
                    <Typography variant="body1" color="text.secondary" align="center" gutterBottom>
                        Please sign in to continue
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
                        <TextField
                            fullWidth
                            label="Email Address"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={!!errors.email}
                            helperText={errors.email}
                            margin="normal"
                            required
                            autoComplete="email"
                        />

                        <TextField
                            fullWidth
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={!!errors.password}
                            helperText={errors.password}
                            margin="normal"
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
                                )
                            }}
                        />

                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        color="primary"
                                    />
                                }
                                label="Remember me"
                            />
                            <Button color="primary" sx={{ textTransform: "none" }} onClick={handleResetPassword}>
                                Forgot Password?
                            </Button>
                        </Box>

                        <StyledButton
                            fullWidth
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} /> : "Sign In"}
                        </StyledButton>

                        <Divider sx={{ my: 3 }}>OR</Divider>

                        <StyledButton
                            fullWidth
                            variant="outlined"
                            onClick={handleGoogleLogin}
                            startIcon={<FcGoogle />}
                        >
                            Continue with Google
                        </StyledButton>

                        <Box sx={{ mt: 3, textAlign: "center" }}>
                            <Typography variant="body2" color="text.secondary">
                                Don't have an account?{" "}
                                <Button color="primary" onClick={handlesignupRoute} sx={{ textTransform: "none" }}>
                                    Create Account
                                </Button>
                            </Typography>
                        </Box>
                    </Box>
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

export default Login;