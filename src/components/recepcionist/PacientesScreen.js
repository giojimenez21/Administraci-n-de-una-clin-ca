import { faHistory, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { startGetPacientes } from "../../actions/admin";
import { useForm } from "../../hooks/useForm";

export const PacientesScreen = () => {
    const [searchValues, handleInputChange] = useForm();
    const { loading } = useSelector((state) => state.ui);
    const { pacientes } = useSelector((state) => state.admin);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(startGetPacientes());
    }, [dispatch]);

    if (loading) {
        return <div className="loader">Loading...</div>;
    }

    return (
        <section className="py-4">
            <div className="w-full mb-12 xl:mb-0 px-4 mx-auto">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                        <div className="flex flex-wrap items-center">
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                <h3 className="font-semibold text-lg text-blueGray-700">
                                    Pacientes
                                </h3>
                            </div>
                            <Link 
                                className="p-3 mr-3 bg-green-400 rounded text-white hover:bg-green-500 font-bold"
                                to={'/recepcionista/nuevoPaciente'}
                            >
                                Nuevo Paciente
                            </Link>
                            <input
                                onChange={handleInputChange}
                                className="p-3 border border-gray-400 rounded-md focus:outline-none focus:outline-blue-400 mt-3 md:mt-0 w-full md:w-auto"
                                name="search"
                                type="search"
                                placeholder="Buscar Paciente"
                                autoComplete="off"
                            />
                        </div>
                    </div>

                    <div className="block w-full overflow-x-auto">
                        <table className="items-center bg-transparent w-full border-collapse ">
                            <thead>
                                <tr>
                                    <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                                        Nombre
                                    </th>
                                    <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                                        Apellido Paterno
                                    </th>
                                    <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                                        Apellido Materno
                                    </th>
                                    <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                                        Sexo
                                    </th>
                                    <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                                        Fecha de nacimiento
                                    </th>
                                    <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                                        Historial
                                    </th>
                                    <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                                        Nuevo servicio
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {pacientes?.filter((p) =>
                                    p.nombre.toLowerCase().includes(searchValues.search) || !searchValues.search)
                                    .map((paciente) => {
                                        return (
                                            <tr className="hover:bg-gray-200">
                                                <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                                                    {paciente?.nombre}
                                                </td>
                                                <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                                                    {paciente?.ap_paterno}
                                                </td>
                                                <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                                                    {paciente?.ap_materno}
                                                </td>
                                                <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                                                    {paciente?.sexo === "M"
                                                        ? "Hombre"
                                                        : "Mujer"}
                                                </td>
                                                <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                                                    {paciente?.f_nacimiento}
                                                </td>
                                                <td className="text-center">
                                                    <Link to={`/recepcionista/pacientes/historial/${paciente?.id}`}>
                                                        <FontAwesomeIcon
                                                            className="mx-2 text-blue-500"
                                                            icon={faHistory}
                                                        />
                                                    </Link>
                                                </td>
                                                <td className="text-center">
                                                    <Link to={'/recepcionista/nuevo/'}>
                                                        <FontAwesomeIcon
                                                            className="mx-2 text-red-500"
                                                            icon={faPlus}
                                                        />
                                                    </Link>
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};
