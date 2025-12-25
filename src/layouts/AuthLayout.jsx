import React, { useEffect } from 'react'
import {useAuth} from "../context/authContext.jsx"
import { useNavigate } from 'react-router-dom';

function AuthLayout(props) {

    const {authentication, children} = props;
    const {user} = useAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        if ((authentication && !user)){
            navigate("/auth");
        } else if (!authentication && user){
            navigate("/");
        }
    }, [authentication, user]);

  return (
    <>
      {children}
    </>
  )
}

export default AuthLayout