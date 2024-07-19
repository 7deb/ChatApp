import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext.jsx";

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const [setAuthUser]= useAuthContext();

    const signup = async ({ username, email, password, confirmPassword, gender }) => {
        const success = handleInputErrors({ username, email, password, confirmPassword, gender });
        if (!success) return;

        setLoading(true);
        try {
            const res = await fetch("http://localhost:5000/api/auth/signup", { 
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password, confirmPassword, gender }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "Signup failed");
            }
    
            const data = await res.json();
            console.log(data); 
            //localstorage
            localStorage.setItem("chat-app", JSON.stringify(data));
            //context
            setAuthUser(data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, signup };
};

export default useSignup;

function handleInputErrors({ username, password, confirmPassword, gender }) {
	if (!username || !password || !confirmPassword || !gender) {
		toast.error("Please fill in all fields");
		return false;
	}
	if (password !== confirmPassword) {
		toast.error("Passwords do not match");
		return false;
	}
	if (password.length < 6) {
		toast.error("Password must be at least 6 characters");
		return false;
	}
	return true;
}
