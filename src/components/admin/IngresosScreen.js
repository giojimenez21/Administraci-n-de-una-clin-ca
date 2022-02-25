import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generatePDFIngresos, startGetIngresosAdmin } from "../../actions/admin";
import { Date } from "../ui/Date";

export const IngresosScreen = () => {
    const fechaConsultaInicial = localStorage.getItem("fecha-consulta-inicial") || undefined;
    const fechaConsultaFinal = localStorage.getItem("fecha-consulta-final") || undefined;
    const dispatch = useDispatch();
    const [fechaInicial, setFechaInicial] = useState(moment(fechaConsultaInicial).format("YYYY-MM-DD"));
    const [fechaFinal, setFechaFinal] = useState(moment(fechaConsultaFinal).format("YYYY-MM-DD"));
    const { ingresosAdmin } = useSelector((state) => state.admin);
    const { loading, loadingPDF } = useSelector((state) => state.ui);


    useEffect(() => {
        dispatch(startGetIngresosAdmin(fechaInicial, fechaFinal));
    }, [fechaInicial, fechaFinal, dispatch]);

    const generatePDF = (fechaInicial, fechaFinal) => {
        dispatch(generatePDFIngresos(fechaInicial, fechaFinal));
    }


    if (loading) {
        return <div className="loader">Loading...</div>;
    }

    return (
        <section className="py-4">
            <div className="w-full mb-12 xl:mb-0 px-4 mx-auto">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                        <div className="flex flex-wrap items-center">
                            <div className="relative w-full px-2 max-w-full flex-grow flex-1">
                                <h3 className="font-semibold uppercase text-green-600 mb-3 md:mb-0 text-xl">
                                    Ingresos Totales:
                                    {ingresosAdmin[0]?.ingresosTotales ===
                                        undefined
                                        ? " No hay ingresos "
                                        : ` ${ingresosAdmin[0]?.ingresosTotales} pesos`}
                                </h3>
                            </div>
                            <div className={
                                `
                                        grid auto-rows-auto gap-2
                                        ${ingresosAdmin[0]?.ingresosTotales === undefined ? "grid-cols-2" : "grid-cols-3"}
                                    `
                            }>
                                <Date fecha={fechaInicial} setFecha={setFechaInicial} />
                                <Date fecha={fechaFinal} setFecha={setFechaFinal} />
                                <button
                                    className={
                                        `
                                                bg-green-500 rounded font-bold text-white 
                                                ${ingresosAdmin[0]?.ingresosTotales === undefined ? "hidden" : ""}
                                            `
                                    }
                                    onClick={() => generatePDF(fechaInicial, fechaFinal)}
                                >
                                    <p className={loadingPDF === true ? "hidden" : ""}>Descargar PDF</p>
                                    <div className={`loader2 ${loadingPDF === false ? "hidden" : ""}`}>Loading...</div>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="block w-full overflow-x-auto">
                        <table className="items-center bg-transparent w-full border-collapse ">
                            <thead>
                                <tr>
                                    <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Servicio
                                    </th>
                                    <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Paciente
                                    </th>
                                    <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Medico
                                    </th>
                                    <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Precio
                                    </th>
                                    <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Fecha
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {ingresosAdmin?.map((ingreso) => {
                                    return (
                                        <tr
                                            key={ingreso?.id}
                                            className="hover:bg-gray-200"
                                        >
                                            <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                {ingreso?.servicio}
                                            </td>
                                            <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                {ingreso?.paciente}
                                            </td>
                                            <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                {ingreso?.doctor}
                                            </td>
                                            <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                {ingreso?.precio}
                                            </td>
                                            <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                {ingreso?.fecha}
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
