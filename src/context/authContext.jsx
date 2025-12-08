import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";

const AuthContext = createContext();

export default function AuthProvider ({children}) {

    const [user, setUser] = useState(null);
    const [checkingAuth, setCheckingAuth] = useState(true);
    const [token, setToken] = useState((()=>{
        if (localStorage.getItem("token")) return localStorage.getItem("token");
        else return null;
    })());

    useEffect(()=>{
        localStorage.setItem("token", token);
    }, [token]);

    const checkAuth = async () => {
        
        setCheckingAuth(true);

        if (token){
            axiosInstance
            .get(
                `/api/v1/user/check`, 
                {headers: {Authorization: `Bearer ${token}`}}
            )
            .then((res)=>{
                const data = res.data;
                setUser(data);
            })
            .catch((error)=>{
                console.log("no logged in user");
                console.log(error.stack);
                setUser(null);
            })
            .finally(()=>{
                setCheckingAuth(false);
            });
        } else {
            console.log("Token not present");
            setCheckingAuth(false);
            setUser(null);
        }
    }

    const signUp = async (data, callback) => {
        axiosInstance
        .post("/api/v1/user/signup", data)
        .then((res)=>{
            const data = res.data;
            setUser(data.user);
            setToken(data.token);
            toast.success('Account created successfully!');   
            callback();
        })
        .catch((error)=>{
            console.log(error.stack);
            toast.error(error.response.data.message);
        })
    }

    const login = async (data, callback) => {
        axiosInstance
        .post("/api/v1/user/login", data)
        .then((res)=>{
            const data = res.data;
            setUser(data.user);
            setToken(data.token);
            toast.success('Successfully logged in!');
            callback();
        })
        .catch((error)=>{
            setUser(null);
            setToken(null);
            console.log(error.stack);
            toast.error(error.response.data.message);
        })
    }

    const logout = async () => {
        axiosInstance
        .post("/api/v1/user/logout")
        .then((res)=>{
            setToken(null);
            setUser(null);
            toast.success('Successfully logged out!');
        })
        .catch((error)=>{
            toast.error(error.response.data.message);
        })
    }

    return (
        <AuthContext.Provider value={{user, setUser, checkAuth, signUp, login, logout, token,  setToken, checkingAuth, setCheckingAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}