import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { startGetHistorial } from '../../actions/admin';

export const HistorialPacienteScreen = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.ui);
    const { historialPaciente } = useSelector((state) => state.admin);
    useEffect(() => {
        dispatch(startGetHistorial(id));
    }, []);

    if (loading) {
        return <div className="loader">Loading...</div>;
    }

    if (historialPaciente.length === 0) {
        return <h1 className='my-4 p-4 w-full md:w-1/2 mx-auto bg-red-400 rounded shadow-lg text-white text-xl font-semibold'>El paciente aún no tiene historial, es posible que haya sido dado de alta recientemente.</h1>
    }
    return (
        <div className='my-4 p-4 w-full md:w-1/2 mx-auto bg-white rounded shadow-lg'>
            <h1 className='text-2xl font-bold text-blue-500'>Paciente: {historialPaciente[0]?.nombre}</h1>

            {historialPaciente?.map(paciente => {
                return (

                    <div className='w-full text-lg my-4 border-b-2 pb-4'>
                        <p><strong>Servicio:</strong> {paciente?.servicio}</p>
                        <p><strong>Precio:</strong> {paciente?.precio}</p>
                        <p><strong>Doctor:</strong> {paciente?.doctor}</p>
                        <p><strong>Fecha:</strong> {paciente?.fecha}</p>
                    </div>

                )
            })}

        </div>

    )
};
