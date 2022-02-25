import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


export const PrivateRoute = ({children}) => {

    const {id} = useSelector(state => state.auth)
    return (!!id)
        ? children
        : <Navigate to="/login"/>
};


