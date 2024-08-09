import { useState } from "react"
import { useAuthContext } from "../context/AuthContext";


const useLogout = () => {
    const [loading,setLoading ]= useState();
    const [setAuthUser] = useAuthContext();

    const logout = async ()=>{
        setLoading(true);
        try {
            const res = await fetch("localhost:5000/api/auth/logout",{
                method:"POST",
                headers: {"Content-Type":"application/json"}
            })
            const data = await res.json();
            if (data.error){
                throw new Error(data.error)
            }

            localStorage.removeItem("chat-app")
            setAuthUser(null);
        } catch (error) {
            toast
        }finally{
            setLoading(false);
        }
    }
}