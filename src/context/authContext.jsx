import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";

const AuthContext = createContext();

export default function AuthProvider ({children}) {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState((()=>{
        if (localStorage.getItem("token")) return localStorage.getItem("token");
        else return null;
    })());

    useEffect(()=>{
        console.log(token, typeof token)
        localStorage.setItem("token", token);
    }, [token]);

    const checkAuth = () => {
        if (token){
            axiosInstance
            .get(
                `/api/v1/user/auth/check`, 
                {withCredentials: true, headers: {Authorization: `Bearer ${token}`}}
            )
            .then((res)=>{
                console.log(res.data);
            })
            .catch((error)=>{
                console.log("no logged in user");
            })
        } else {
            console.log("Token not present");
        }
    }

    const signUp = async (data) => {
        axiosInstance
        .post("/api/v1/user/signup", data)
        .then((res)=>{
            toast.success('Account created successfully!');
        })
        .catch((error)=>{
            toast.success('Unable to create account!');
        })
    }

    const login = async (data) => {
        axiosInstance
        .post("/api/v1/user/login", data)
        .then((res)=>{
            if (res.status < 400){
                const data = res.data;
                setUser(data.data);
                setToken(data.token);
                toast.success('Successfully logged in!');
            } else {
                setUser(null);
                setToken(null);
                toast.error('Unable to login!');
            }
        })
        .catch((error)=>{
            setUser(null);
            setToken(null);
            toast.error('Unable to login!');
        })
    }

    const logout = () => {
        axiosInstance
        .post("/api/v1/user/logout")
        .then((res)=>{

        })
        .catch((error)=>{

        })
    }

    return (
        <AuthContext.Provider value={{user, setUser, checkAuth, signUp, login, logout}}>
            {children},
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}