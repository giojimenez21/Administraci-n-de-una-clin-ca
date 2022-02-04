import { faHospital } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startAddService, startGetServicios } from '../../actions/admin';
import { useForm } from '../../hooks/useForm';

export const ServicioScreen = () => {
    const [alerta, setAlerta] = useState(true);
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.ui);
    const { servicios } = useSelector((state) => state.admin);
    const [formValues, handleInputChange, reset] = useForm({ nombre: "", precio: "" });

    useEffect(() => {
        dispatch(startGetServicios());
    }, []);

    const { nombre, precio } = formValues;

    const addService = (e) => {
        e.preventDefault();
        if (nombre === "" || precio === "") {
            setAlerta(false)

            setTimeout(() => {
                setAlerta(true);
            }, 1500);

            return
        }
        dispatch(startAddService(formValues))
        reset()
    }

    if (loading) {
        return <div className="loader">Loading...</div>;
    }

    return (
        <div className='grid grid-cols-12 gap-2 auto-rows-auto'>
            <div className='w-full h-full mx-auto bg-white my-4 p-5 rounded-lg shadow-lg text-lg col-span-12 lg:col-span-3 md:h-96 '>
                <div className='h-full'>
                    <div className='w-full p-2 bg-red-300 border-2 border-red-400 rounded-lg text-white font-semibold text-center' hidden={alerta}>
                        <p>Error, complete todos los campos.</p>
                    </div>
                    <h1 className='text-center text-2xl font-bold mb-4 text-green-500'>Agregar servicio</h1>
                    <input className='w-full p-4 my-2 focus:outline-gray-200 rounded-lg' type="text" placeholder='Nombre' name='nombre' onChange={handleInputChange} autoComplete='off' />
                    <input className='w-full p-4 my-2 focus:outline-gray-200 rounded-lg' type="text" placeholder='Precio' name='precio' onChange={handleInputChange} autoComplete='off' />
                    <div className='w-full'>
                        <button className='mx-auto block bg-green-400 p-4 rounded-lg mt-4 text-white font-semibold' onClick={addService} type='submit' disabled={!alerta}>Agregar</button>
                    </div>
                </div>
            </div>
            <div className='mx-auto w-full bg-white my-4 p-4 rounded-lg shadow-lg text-lg col-span-12 lg:col-span-9'>
                <h1 className='text-center text-2xl font-bold mb-4'>Servicios Disponibles</h1>
                {
                    servicios?.map((servicio) => {
                        return (
                            <div className='w-full flex justify-center items-center p-4 border-b-2 hover:bg-gray-200' key={servicio?.id}>
                                <FontAwesomeIcon
                                    className="text-blue-500 text-4xl mr-3"
                                    icon={faHospital}
                                />

                                <div>
                                    <p>Nombre: {servicio?.nombre}</p>
                                    <p>Precio: {servicio?.precio}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
};
