import React, { useEffect } from 'react'
import {useAuth} from "../context/authContext.jsx"

function AuthRenderer(props) {

    const {authentication, children} = props;
    const {user} = useAuth();

    return (
        ((authentication && user) || (!authentication && !user)) ? children : null
    )
}

export default AuthRenderer