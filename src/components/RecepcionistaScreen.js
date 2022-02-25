import React from 'react';
import { useSelector } from 'react-redux';

export const RecepcionistaScreen = () => {
    const { nombre } = useSelector((state) => state.auth);
    return (
        <div className="flex justify-center items-center p-5">
            <div className="w-3/4 md:w-1/3 bg-white rounded-md shadow-md p-5">
                <h1 className="text-2xl text-center uppercase font-bold text-gray-600">Bienvenido {nombre}</h1>
            </div>
        </div>
    )
}
