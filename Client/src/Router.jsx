import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

const LandingPage = lazy(() => import("./Components/LandingPage/LandingPage"));
const Login = lazy(() => import("./Components/Authentication/Login/Login"));
const Register = lazy(() => import("./Components/Authentication/Register/Register"));
const NotFound = lazy(() => import("./Components/Not Found/Not Found"));
const Home = lazy(() => import("./Components/HomePage/Home"));
const ResetPassword = lazy(() => import("./Components/Authentication/ResetPassword/ResetPasswordPage"));

const AppRouter = () => {
    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/auth" element={<Login />} />
                    <Route path="/signup" element={<Register />} />
                    <Route path="*" element={<NotFound />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                </Routes>
            </Suspense>
        </Router>
    );
}

export default AppRouter;