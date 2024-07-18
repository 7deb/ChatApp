import { useState } from "react";
import toast from "react-hot-toast";

const useLogin = () => {
    const [loading, setLoading] = useState(false);

    const login = async (username, password) => {
        const success = handleInputErrors({ username, password });
        if (!success) return;
        setLoading(true);
        try {
            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "Login failed");
            }

            const data = await res.json();
            console.log(data);
            // localStorage.setItem("chat-user", JSON.stringify(data));
            // setAuthUser(data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, login };
};

export default useLogin;

function handleInputErrors({ username, password }) {
    if (!username || !password) {
        toast.error("Please fill in all the fields");
        return false;
    }
    return true;
}
