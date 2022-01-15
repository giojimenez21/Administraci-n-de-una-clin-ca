import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { startChecking } from "../actions/auth";
import { LoginScreen } from "../components/LoginScreen";
import { AdminRoute } from "./AdminRoute";
import { DashboardRoute } from "./DashboardRoute";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {
    const dispatch = useDispatch();
    const { checking, rol } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(startChecking());
    }, [dispatch]);

    if (checking) {
        return (
            // <div className="container mx-auto h-screen">
            //     <div className="flex justify-center items-center h-full">
            //         <h1 className="text-white text-5xl">Cargando...</h1>
            //     </div>
            // </div>
            null
        );
    }

    return (
        <Router>
            <Routes>
                <Route
                    exact
                    path="/login"
                    element={
                        <PublicRoute>
                            <LoginScreen />
                        </PublicRoute>
                    }
                />
                {rol !== "Admin" && (
                    <Route
                        exact
                        path="/*"
                        element={
                            <PrivateRoute>
                                <DashboardRoute />
                            </PrivateRoute>
                        }
                    />
                )}
                {rol === "Admin" && (
                    <Route
                        exact
                        path="/*"
                        element={
                            <PrivateRoute>
                                <AdminRoute />
                            </PrivateRoute>
                        }
                    />
                )}
            </Routes>
        </Router>
    );
};
