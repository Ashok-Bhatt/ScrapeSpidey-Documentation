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
        localStorage.setItem("token", token);
    }, [token]);

    const checkAuth = async () => {
        if (token){
            axiosInstance
            .get(
                `/api/v1/user/auth/check`, 
                {headers: {Authorization: `Bearer ${token}`}}
            )
            .then((res)=>{
                const data = res.data;
                setUser(data);
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
            if (res.status < 400){
                toast.success('Account created successfully!');   
            } else {
                toast.error('Unable to create account!');
            }
        })
        .catch((error)=>{
            toast.error('Unable to create account!');
        })
    }

    const login = async (data, callback) => {
        axiosInstance
        .post("/api/v1/user/login", data)
        .then((res)=>{
            if (res.status < 400){
                const data = res.data;
                setUser(data.user);
                setToken(data.token);
                toast.success('Successfully logged in!');
                callback();
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

    const logout = async () => {
        axiosInstance
        .post("/api/v1/user/logout")
        .then((res)=>{
            if (res.status < 400){
                setToken(null);
                setUser(null);
                toast.success('Successfully logged out!');
            } else {
                toast.error('Unable to logout!');
            }
        })
        .catch((error)=>{
            toast.error('Unable to logout!');
        })
    }

    return (
        <AuthContext.Provider value={{user, setUser, checkAuth, signUp, login, logout, token,  setToken}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}