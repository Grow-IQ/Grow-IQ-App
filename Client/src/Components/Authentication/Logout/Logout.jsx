import React from "react";
import { useNavigate } from "react-router-dom";
import {
    Button, Container, Snackbar, Alert
} from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase"; // Adjust the import path as necessary
import { useState } from "react";
const Logout = () => {
    const navigate = useNavigate();
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });
    const handleLogout = () => {
        try {
            signOut(auth);
            navigate("/");

        }
        catch (error) {
            console.error("Logout failed:", error);
            setSnackbar({
                open: true,
                message: "Logout failed. Please try again.",
                severity: "error"
            });
            console.log("snackbar", snackbar);
        }

    };

    return (
        <Container style={{ textAlign: "center", marginTop: "20px" }}>
            <Button variant="contained"
                onClick={handleLogout}
            >
                Logout
            </Button>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={10000}
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
}

export default Logout;