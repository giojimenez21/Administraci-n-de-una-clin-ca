import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { cleanInfoAdmin } from "../actions/admin";
import { startLogout } from "../actions/auth";

export const Navbar = () => {
    const dispatch = useDispatch();
    const { rol } = useSelector((state) => state.auth);
    const menu = useRef("");
    const handleLogout = () => {
        dispatch(startLogout());
        dispatch(cleanInfoAdmin());
    };

    const showMenu = () => {
        menu.current.classList.toggle('hidden');
    }

    return (
        <nav className="w-full bg-blue-400 p-4 text-white flex flex-wrap items-center">
            <Link to="/">
                <h1 className="text-xl font-semibold">ClinicaAdmin</h1>
            </Link>

            <button className="px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white block lg:hidden ml-auto" onClick={showMenu}>
                <FontAwesomeIcon
                    className="text-white"
                    icon={faBars}
                />
            </button>

            <div className="hidden lg:w-auto lg:block ml-auto w-full lg:w-auto" ref={menu}>
                {rol === "Admin" && (
                    <ul className="block lg:flex lg:items-center" >
                        <li className="mx-2 rounded-md hover:bg-blue-500 p-4 block lg:inline-block">
                            <Link to="/">
                                Inicio
                            </Link>
                        </li>
                        <li className="mx-2 rounded-md hover:bg-blue-500 p-4 block lg:inline-block">
                            <Link to="/admin/usuarios">
                                Usuarios
                            </Link>
                        </li>
                        <li className="mx-2 rounded-md hover:bg-blue-500 p-4 block lg:inline-block">
                            <Link to="/admin/servicios">
                                Servicios
                            </Link>
                        </li>

                        <button
                            className="mx-2 px-4 py-2 rounded border border-white hover:bg-white hover:text-blue-400"
                            type="submit"
                            onClick={handleLogout}
                        >
                            Salir
                        </button>
                    </ul>
                )}
                {rol === "Recepcionista" && (
                    <ul className="block lg:flex lg:items-center" >
                        <li className="mx-2 rounded-md hover:bg-blue-500 p-4 block lg:inline-block">
                            <Link to="/">
                                Inicio
                            </Link>
                        </li>
                        <li className="mx-2 rounded-md hover:bg-blue-500 p-4 block lg:inline-block">
                            <Link to="/recepcionista/pacientes">
                                Pacientes
                            </Link>
                        </li>
                        <li className="mx-2 rounded-md hover:bg-blue-500 p-4 block lg:inline-block">
                            <Link to="/recepcionista/agenda">
                                Agenda
                            </Link>
                        </li>

                        <button
                            className="mx-2 px-4 py-2 rounded border border-white hover:bg-white hover:text-blue-400"
                            type="submit"
                            onClick={handleLogout}
                        >
                            Salir
                        </button>
                    </ul>
                )}
            </div>
        </nav>
    );
};
