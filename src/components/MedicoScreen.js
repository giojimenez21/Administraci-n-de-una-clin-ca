import React from 'react'
import { useSelector } from 'react-redux';

export const MedicoScreen = () => {
    const { nombre } = useSelector((state) => state.auth);
    return (
        <div className="flex justify-center items-center p-5">
            <div className="w-3/4 md:w-1/3 bg-white rounded-md shadow-md p-5">
                <h1 className="text-2xl text-center">Bienvenido {nombre}</h1>
            </div>
        </div>
    );
}
