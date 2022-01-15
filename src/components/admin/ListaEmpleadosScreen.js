import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveUser, startGetUsers } from "../../actions/admin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";

export const ListaEmpleadosScreen = () => {
    const [searchValues, handleInputChange] = useForm();

    const dispatch = useDispatch();
    const { users } = useSelector((state) => state.admin);
    const { loading } = useSelector((state) => state.ui);

    useEffect(() => {
        dispatch(startGetUsers());
    }, [dispatch]);

    const handleActiveUser = (id) => {
        dispatch(setActiveUser(Number(id)));
    };

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
                                <h3 className="font-semibold text-base text-blueGray-700">
                                    Usuarios
                                </h3>
                            </div>

                            <Link
                                className="bg-green-500 p-3 rounded-md text-white font-semibold hover:bg-green-600 mx-3"
                                to="/admin/crearUsuario"
                            >
                                <h3>Crear usuario</h3>
                            </Link>

                            <input
                                onChange={handleInputChange}
                                className="p-3 border border-gray-400 rounded-md focus:outline-none focus:outline-blue-400 mt-3 md:mt-0 w-full md:w-auto"
                                name="search"
                                type="search"
                                placeholder="Buscar Usuario"
                                autoComplete="off"
                            />
                        </div>
                    </div>

                    <div className="block w-full overflow-x-auto">
                        <table className="items-center bg-transparent w-full border-collapse ">
                            <thead>
                                <tr>
                                    <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Usuario
                                    </th>
                                    <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Nombre
                                    </th>
                                    <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Apellido Paterno
                                    </th>
                                    <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Apellido Materno
                                    </th>
                                    <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Fecha de nacimiento
                                    </th>
                                    <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Especialidad
                                    </th>
                                    <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Editar
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {users
                                    .filter(
                                        (u) =>
                                            u.nombre
                                                .toLowerCase()
                                                .includes(
                                                    searchValues.search
                                                ) || !searchValues.search
                                    )
                                    .map((user) => {
                                        return (
                                            <tr
                                                key={user.id}
                                                className="hover:bg-gray-200"
                                            >
                                                <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                    {user.user}
                                                </td>
                                                <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                    {user.nombre}
                                                </td>
                                                <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                    {user.ap_paterno}
                                                </td>
                                                <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                    {user.ap_materno}
                                                </td>
                                                <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                    {user.f_nacimiento}
                                                </td>
                                                <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                    {user.especialidad}
                                                </td>
                                                <td className="text-center">
                                                    <Link
                                                        to={`/admin/editar/${user.id}`}
                                                        onClick={() =>
                                                            handleActiveUser(
                                                                user.id
                                                            )
                                                        }
                                                    >
                                                        <FontAwesomeIcon
                                                            className="mx-2 text-blue-500"
                                                            icon={faEdit}
                                                        />
                                                    </Link>
                                                    {/* <Link to="#">
                                                        <FontAwesomeIcon
                                                            className="mx-2 text-red-500"
                                                            icon={faTrashAlt}
                                                        />
                                                    </Link> */}
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
