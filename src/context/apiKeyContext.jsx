import { createContext, useContext, useState } from "react";

const apiKeyContext = createContext();

export default function ApiKeyProvider({children}){

    const [apiKey, setApiKey] = useState("");
    const [apiKeyAutoAttach, setApiKeyAutoAttach] = useState(false);

    const toggleApiKeyAutoAttach = () => {
        setApiKeyAutoAttach((prev)=>!prev);
    }

    return (<apiKeyContext.Provider value={{apiKey, setApiKey, apiKeyAutoAttach, toggleApiKeyAutoAttach}}>
        {children}
    </apiKeyContext.Provider>)
}

function useApi(){
    return useContext(apiKeyContext);
}

export {useApi};