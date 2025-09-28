import React, { useEffect } from 'react'
import {useAuth} from "../context/authContext.jsx"

function AdminRenderer(props) {

    const {children} = props;
    const {user} = useAuth();

    return (
        (user?.isAdmin) ? children : null
    )
}

export default AdminRenderer