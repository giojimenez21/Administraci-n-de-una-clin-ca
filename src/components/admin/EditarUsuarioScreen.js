import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { startUpdateUser } from "../../actions/admin";
import { useForm } from "../../hooks/useForm";

export const EditarUsuarioScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { activeUser } = useSelector((state) => state.admin);
    const [formValues, handleFormValue] = useForm({
        ...activeUser,
        password: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(startUpdateUser(formValues));
    };


    if (activeUser === null) {
        return <h1>No hay nada que mostrar</h1>;
    }

    return (
        <div className="w-full">
            <div className="flex justify-center items-center py-5">
                <div className="w-full sm:w-1/2 bg-white shadow-lg border border-gray-200 rounded-md p-5">
                    <form
                        className="w-full grid grid-cols-2 auto-rows-auto gap-4"
                        onSubmit={handleSubmit}
                    >
                        <input
                            className="block border border-gray-400 w-full rounded-md p-4 focus:outline-none focus:outline-blue-400 col-span-2"
                            type="text"
                            placeholder="Nombre"
                            name="nombre"
                            autoComplete="off"
                            onChange={handleFormValue}
                            value={formValues.nombre}
                            required="true"
                        />
                        <input
                            className="block border border-gray-400 w-full rounded-md p-4 focus:outline-none focus:outline-blue-400"
                            type="text"
                            placeholder="Apellido Paterno"
                            name="ap_paterno"
                            autoComplete="off"
                            onChange={handleFormValue}
                            value={formValues.ap_paterno}
                            required="true"
                        />
                        <input
                            className="block border border-gray-400 w-full rounded-md p-4 focus:outline-none focus:outline-blue-400"
                            type="text"
                            placeholder="Apellido Materno"
                            name="ap_materno"
                            autoComplete="off"
                            onChange={handleFormValue}
                            value={formValues.ap_materno}
                            required="true"
                        />
                        <input
                            className="block border border-gray-400 w-full rounded-md p-4 focus:outline-none focus:outline-blue-400"
                            type="date"
                            placeholder="Fecha de nacimiento"
                            name="f_nacimiento"
                            onChange={handleFormValue}
                            value={formValues.f_nacimiento}
                            required="true"
                        />
                        <select
                            className="block border border-gray-400 w-full rounded-md p-4 focus:outline-none focus:outline-blue-400"
                            name="especialidad"
                            onChange={handleFormValue}
                            value={formValues.especialidad}
                            required="true"
                        >
                            <option value="">Especialidad o Rol</option>
                            <option value="Admin">Admin</option>
                            <option value="Doctor">Doctor</option>
                            <option value="Recepcionista">Recepcionista</option>
                        </select>
                        <input
                            className="block border border-gray-400 w-full rounded-md p-4 focus:outline-none focus:outline-blue-400"
                            type="text"
                            placeholder="Usuario"
                            name="user"
                            autoComplete="off"
                            onChange={handleFormValue}
                            value={formValues.user}
                            required="true"
                        />
                        
                        <input
                            className="block border border-gray-400 w-full rounded-md p-4 focus:outline-none focus:outline-blue-400"
                            type="password"
                            placeholder="Contraseña"
                            name="password"
                            autoComplete="off"
                            onChange={handleFormValue}
                            value={formValues.password}
                            required="true"
                        />
                        
                        <div className="flex justify-center col-span-2 h-16">
                            <button
                                className="block rounded-md p-4 bg-green-400 hover:bg-green-600"
                                type="submit"
                            >
                                Editar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
