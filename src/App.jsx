import { Toaster } from "react-hot-toast";
import {Navbar} from "./components/export.js";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import {useAuth} from "./context/authContext.jsx"
import classNames from "classnames";
import { themeColors } from "./constants/classes.js";

function App() {

  const {checkAuth} = useAuth();

  useEffect(()=>{
    const fn = async () => {
      await checkAuth();
    }

    fn();
  }, []);

  return (
      <div className="flex flex-col h-screen w-full items-center">
          <Navbar/>
          <div className={`flex-grow w-full px-[10%] overflow-y-auto no-scrollbar ${themeColors["text"]} ${themeColors["bg-gradient"]}`}>
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
