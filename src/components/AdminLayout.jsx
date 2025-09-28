import React, { useEffect } from 'react'
import {useAuth} from "../context/authContext.jsx"
import { useNavigate } from 'react-router-dom';

function AdminLayout(props) {

    const {children} = props;
    const {user, checkingAuth} = useAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        if (checkingAuth) return;
        if (!user?.isAdmin){
            navigate("/");
        }
    }, [user, checkingAuth]);

  return (
    <>
      {checkingAuth ? <div>Loading</div> : children}
    </>
  )
}

export default AdminLayout;