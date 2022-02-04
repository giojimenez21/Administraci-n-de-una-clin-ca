import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { cleanInfoAdmin } from "../actions/admin";
import { startLogout } from "../actions/auth";

export const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { rol } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(startLogout());
        dispatch(cleanInfoAdmin());
    };

    const goBack = () =>{
        navigate(-1);
    }

    return (
        <nav className="w-full bg-blue-400 p-4 text-white flex items-center">
            <FontAwesomeIcon 
                className="mr-10 cursor-pointer" 
                icon={faArrowLeft} 
                onClick={goBack}
            />
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
                        <Link
                            className="mx-2 rounded-md hover:bg-blue-500 p-4"
                            to="/admin/servicios"
                        >
                            Servicios
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
