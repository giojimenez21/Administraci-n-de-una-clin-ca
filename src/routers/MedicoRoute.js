import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { MedicoScreen } from "../components/MedicoScreen";
import { HistorialPacienteScreen } from "../components/admin/HistorialPacienteScreen";
import { AgendaMedico } from "../components/medico/AgendaMedico";
import { NuevaConsulta } from "../components/medico/NuevaConsulta";

export const MedicoRoute = () => {
    return (
        <>
            <Navbar />

            <div className="container mx-auto mt-2">
                <Routes>
                    <Route path="/" element={<MedicoScreen />} />
                    <Route path="/medico/pacientes" element={<h1>Pacientes</h1>} />
                    <Route path="/medico/agenda" element={<AgendaMedico />} />
                    <Route path="/medico/consulta/:id" element={<NuevaConsulta />} />
                    <Route path="/medico/historial/:id" element={<HistorialPacienteScreen />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </>
    );
};
