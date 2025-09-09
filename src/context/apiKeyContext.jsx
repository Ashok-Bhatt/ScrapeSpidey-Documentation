import { createContext, useContext, useEffect, useState } from "react";

const apiKeyContext = createContext();

export default function ApiKeyProvider({children}){

    const [apiKey, setApiKey] = useState("");
    const [apiKeyAutoAttach, setApiKeyAutoAttach] = useState((()=>{
        if (localStorage.getItem("apiKeyAutoAttach")) return Boolean(localStorage.getItem("apiKeyAutoAttach"));
        else return false;
    })());

    useEffect(()=>{
        localStorage.setItem("apiKeyAutoAttach", apiKeyAutoAttach);
    }, [apiKeyAutoAttach]);

    const toggleApiKeyAutoAttach = () => {
        setApiKeyAutoAttach(!apiKeyAutoAttach);
    }

    return (<apiKeyContext.Provider value={{apiKey, setApiKey, apiKeyAutoAttach, toggleApiKeyAutoAttach}}>
        {children}
    </apiKeyContext.Provider>)
}

function useApi(){
    return useContext(apiKeyContext);
}

export {useApi};