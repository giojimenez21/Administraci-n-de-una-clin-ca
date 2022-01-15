import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { cleanInfoAdmin } from "../actions/admin";
import { startLogout } from "../actions/auth";

export const Navbar = () => {
    const dispatch = useDispatch();
    const { rol } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(startLogout());
        dispatch(cleanInfoAdmin());
    };
    return (
        <nav className="w-full bg-blue-400 p-4 text-white flex items-center">
            <Link to="/">
                <h1 className="text-xl font-semibold">ClinicaAdmin</h1>
            </Link>
            <ul className="flex mx-2 ml-auto">
                {rol === "Admin" ? (
                    <li>
                        <Link
                            className="mx-2 rounded-md hover:bg-blue-500 p-4"
                            to="/admin/usuarios"
                        >
                            Usuarios
                        </Link>
                    </li>
                ) : (
                    <li>
                        <Link
                            className="mx-2 rounded-md hover:bg-blue-500 p-4"
                            to="/medico/pacientes"
                        >
                            Pacientes
                        </Link>
                        <Link
                            className="mx-2 rounded-md hover:bg-blue-500 p-4"
                            to="/medico/agenda"
                        >
                            Agenda
                        </Link>
                    </li>
                )}
            </ul>

            <button
                className="px-4 py-2 rounded border border-white hover:bg-white hover:text-blue-400"
                type="submit"
                onClick={handleLogout}
            >
                Salir
            </button>
        </nav>
    );
};
