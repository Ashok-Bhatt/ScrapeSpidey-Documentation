import React, { useEffect, useState } from 'react'
import {themeColors} from '../constants/classes.js';
import {useTheme} from "../context/themeContext.jsx"

function Loader() {

    const [dotNo, setDotNo] = useState(0);
    const {theme} = useTheme();
    const totalDots = 3;

    useEffect(()=>{
        const timer = setInterval(()=>{
            setDotNo((prev)=>(prev+1) % totalDots);
        }, 500);

        return () => clearInterval(timer);
    }, [])

    return (
        <div className={`flex justify-center items-center w-full gap-1 mt-5 p-4 rounded-lg text-sm h-100 ${themeColors["bg-secondary"]}`}>
            <div className={`w-2 h-2 border border-gray-500 rounded-full ${dotNo==0 ? themeColors["bg-reverse"] : themeColors["bg"]}`}></div>
            <div className={`w-2 h-2 border border-gray-500 rounded-full ${dotNo==1 ? themeColors["bg-reverse"] : themeColors["bg"]}`}></div>
            <div className={`w-2 h-2 border border-gray-500 rounded-full ${dotNo==2 ? themeColors["bg-reverse"] : themeColors["bg"]}`}></div>
        </div>
    )
}

export default Loader;
