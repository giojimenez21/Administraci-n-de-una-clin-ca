import { Card, CardContent, Typography } from '@mui/material';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { startGetConsultasPaciente } from '../../actions/medico';

export const ConsultasPaciente = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.ui);
    const { consultasPaciente } = useSelector(state => state.md);

    useEffect(() => {
        dispatch(startGetConsultasPaciente(id));
    }, [dispatch, id]);



    if (loading) {
        return <div className="loader">Loading...</div>;
    }

    if (consultasPaciente.length === 0) {
        return <h1 className='my-4 p-4 w-full md:w-1/2 mx-auto bg-red-400 rounded shadow-lg text-white text-xl font-semibold'>No hay datos que mostrar</h1>
    }

    return (
        <div className='w-full'>
            <div className='w-2/3 mx-auto'>
                {consultasPaciente?.map(consulta => {
                    return (
                        <Card className='mb-2'>
                            <CardContent>
                                <div className='flex justify-between'>
                                    <Typography variant="h6" component="div">
                                        Diagnostico: {consulta?.diagnostico}
                                    </Typography>
                                    <Typography variant="h6" component="div">
                                        Fecha: {moment(consulta?.f_consulta).format("DD-MM-YYYY")}
                                    </Typography>
                                </div>
                                <Typography variant="h6" component="div">
                                    Sintomas: {consulta?.sintomas}
                                </Typography>
                                <Typography variant="h6" component="div">
                                    Medico que atendió: {consulta?.nombre_medico}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    Tratamiento: {consulta?.receta}
                                </Typography>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}
