import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMoneyBillAlt,
    faUsers,
    faHospitalUser,
    faUsersSlash,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { startGetInfoAdmin } from "../actions/admin";
import { Link } from "react-router-dom";
import { Date } from "./ui/Date";

export const AdminScreen = () => {
    const dispatch = useDispatch();
    const [fechaInicial, setFechaInicial] = useState(moment().format("YYYY-MM-DD"));
    const [fechaFinal, setFechaFinal] = useState(moment().format("YYYY-MM-DD"));
    const { infoAdmin } = useSelector((state) => state.admin);
    const { nombre } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(startGetInfoAdmin(fechaInicial, fechaFinal));
        localStorage.setItem('fecha-consulta-inicial', fechaInicial);
        localStorage.setItem('fecha-consulta-final', fechaFinal);
    }, [fechaInicial, fechaFinal, dispatch]);



    return (
        <div className="p-5 grid grid-cols-4 auto-rows-auto gap-4">
            <div className="bg-white rounded-md shadow-md p-5 col-span-4 mx-auto">
                <h1 className="text-2xl text-center uppercase font-bold text-gray-600">
                    Bienvenido {nombre}
                </h1>
            </div>

            <div className="col-span-4 ml-auto">
                <div className="grid grid-cols-2 auto-rows-auto gap-3">
                    <Date fecha={fechaInicial} setFecha={setFechaInicial} variant="filled" mensaje="Fecha Inicial" />
                    <Date fecha={fechaFinal} setFecha={setFechaFinal} variant="filled" mensaje="Fecha Final" />
                </div>
            </div>

            <div className="bg-white rounded-md shadow-md p-5 col-span-4 md:col-span-2 lg:col-span-1">
                <Link to="/admin/ingresos" className="flex items-center w-full">
                    <div className="mr-auto">
                        <h1 className="uppercase text-gray-500 font-bold">
                            Dinero recaudado
                        </h1>
                        <span className="font-bold text-2xl">
                            {infoAdmin?.ingresos}
                        </span>
                    </div>

                    <div className="bg-green-400 p-3 rounded-full">
                        <FontAwesomeIcon
                            icon={faMoneyBillAlt}
                            className="text-4xl text-white"
                        />
                    </div>
                </Link>
            </div>

            <div className="bg-white rounded-md shadow-md p-5 col-span-4 md:col-span-2 lg:col-span-1">
                <div className="flex items-center w-full">
                    <div className="mr-auto">
                        <h1 className="uppercase text-gray-500 font-bold">
                            Usuarios activos
                        </h1>
                        <span className="font-bold text-2xl">
                            {infoAdmin?.activos}
                        </span>
                    </div>

                    <div className="bg-blue-400 p-3 rounded-full">
                        <FontAwesomeIcon
                            icon={faUsers}
                            className="text-4xl text-white"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-md shadow-md p-5 col-span-4 md:col-span-2 lg:col-span-1">
                <div className=" flex items-center w-full">
                    <div className="mr-auto">
                        <h1 className="uppercase text-gray-500 font-bold">
                            Usuarios inactivos
                        </h1>
                        <span className="font-bold text-2xl">
                            {infoAdmin?.inactivos}
                        </span>
                    </div>

                    <div className="bg-gray-400 p-3 rounded-full">
                        <FontAwesomeIcon
                            icon={faUsersSlash}
                            className="text-4xl text-white"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-md shadow-md p-5 col-span-4 md:col-span-2 lg:col-span-1">
                <Link className="flex items-center w-full" to="/admin/pacientes">
                    <div className="mr-auto">
                        <h1 className="uppercase text-gray-500 font-bold">
                            Pacientes
                        </h1>
                        <span className="font-bold text-2xl">
                            {infoAdmin?.numeroPacientes}
                        </span>
                    </div>

                    <div className="bg-red-500 p-3 rounded-full">
                        <FontAwesomeIcon
                            icon={faHospitalUser}
                            className="text-4xl text-white"
                        />
                    </div>
                </Link>
            </div>
        </div>
    );
};
