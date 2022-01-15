import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


export const PublicRoute = ({children}) => {
    const { id } = useSelector(state => state.auth);
    return (!!id)
        ? <Navigate to="/"/>
        : children
};


