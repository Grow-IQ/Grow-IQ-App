
import react, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, fetchSignInMethodsForEmail } from "firebase/auth";
import { auth } from "../../firebase"; // Adjust the import path as necessary
import Logout from "../Authentication/Logout/Logout"; // Adjust the import path as necessary
const Home = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                // console.log("User is logged in:", currentUser);
                setUser(currentUser);
            } else {
                setUser(null);
            }
        });
    }, []);

    // useEffect(() => {

    //     const checkProviders = async () => {
    //         if (user) {
    //             try {
    //                 user.providerData.forEach((profile) => {
    //                     console.log("Sign-in provider: " + profile.providerId);
    //                     console.log("  Provider-specific UID: " + profile.uid);
    //                     console.log("  Name: " + profile.displayName);
    //                     console.log("  Email: " + profile.email);
    //                     console.log("  Photo URL: " + profile.photoURL);
    //                 });
    //             } catch (error) {
    //                 console.error("Error fetching sign-in methods:", error);
    //             }
    //         }
    //     };
    //     checkProviders()

    // }, [user]);

    return (
        <div>
            {console.log("User state:", user)}
            {user ? <div><h1>Home Page</h1><Logout /></div> : "Please Login to access Home Page"}
        </div>

    )

}

export default Home;