import { Toaster } from "react-hot-toast";
import {Navbar} from "./components/export.js";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import axiosInstance from "./utils/axiosInstance.js";
import {useAuth} from "./context/authContext.jsx"

function App() {

  const {checkAuth} = useAuth();

  useEffect(()=>{
    checkAuth();
  }, []);

  return (
      <div className="flex flex-col h-screen w-full items-center">
          <Navbar/>
          <div className="flex-grow w-full px-[10%] overflow-y-auto no-scrollbar">
            <Outlet/>
          </div>
          <Toaster
            position="top-center"
            reverseOrder={false}
          />
      </div>
  )
}

export default App
