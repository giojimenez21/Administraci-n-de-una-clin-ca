import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { RecepcionistaScreen } from "../components/RecepcionistaScreen";
import { PacientesScreen } from "../components/recepcionist/PacientesScreen";
import { HistorialPacienteScreen } from "../components/admin/HistorialPacienteScreen";
import { CrearPacienteScreen } from "../components/recepcionist/CrearPacienteScreen";
import { ServicioPacienteScreen } from "../components/recepcionist/ServicioPacienteScreen";
import { AgendaScreen } from "../components/recepcionist/AgendaScreen";

export const RecepcionistaRoute = () => {
    return (
        <>
            <Navbar />

            <div className="container mx-auto">
                <Routes>
                    <Route path="/" element={<RecepcionistaScreen />} />
                    <Route
                        path="/recepcionista/pacientes"
                        element={<PacientesScreen />}
                    />

                    <Route
                        path="/recepcionista/nuevoPaciente"
                        element={<CrearPacienteScreen />}
                    />

                    <Route
                        path="/recepcionista/pacientes/historial/:id"
                        element={<HistorialPacienteScreen />}
                    />

                    <Route
                        path="/recepcionista/calendar/:id"
                        element={<ServicioPacienteScreen />}
                    />

                    <Route
                        path="/recepcionista/agenda"
                        element={<AgendaScreen />}
                    />

                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </>
    );
};
