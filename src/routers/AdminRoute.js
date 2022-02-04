import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { AdminScreen } from "../components/AdminScreen";
import { CrearUsuarioScreen } from "../components/admin/CrearUsuarioScreen";
import { EditarUsuarioScreen } from "../components/admin/EditarUsuarioScreen";
import { IngresosScreen } from "../components/admin/IngresosScreen";
import { ListaEmpleadosScreen } from "../components/admin/ListaEmpleadosScreen";
import { PacientesScreen } from "../components/admin/PacientesScreen";
import { HistorialPacienteScreen } from "../components/admin/HistorialPacienteScreen";
import { ServicioScreen } from "../components/admin/ServicioScreen";

export const AdminRoute = () => {
    return (
        <>
            <Navbar />

            <div className="container mx-auto">
                <Routes>
                    <Route path="/" element={<AdminScreen />} />
                    <Route
                        path="/admin/usuarios"
                        element={<ListaEmpleadosScreen />}
                    />
                    <Route
                        path="/admin/crearUsuario"
                        element={<CrearUsuarioScreen />}
                    />
                    <Route
                        path="/admin/editar/:id"
                        element={<EditarUsuarioScreen />}
                    />
                    <Route
                        path="/admin/ingresos"
                        element={<IngresosScreen />}
                    />

                    <Route
                        path="/admin/pacientes"
                        element={<PacientesScreen />}
                    />

                    <Route
                        path="/admin/pacientes/historial/:id"
                        element={<HistorialPacienteScreen />}
                    />

                    <Route
                        path="/admin/servicios/"
                        element={<ServicioScreen />}
                    />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </>
    );
};
