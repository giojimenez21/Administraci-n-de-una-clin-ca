import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { startGetAgendaById } from '../actions/recep';

export const MedicoScreen = () => {
    const dispatch = useDispatch();
    const { id, nombre } = useSelector((state) => state.auth);
    const { eventos } = useSelector((state) => state.recep);
    const { loading } = useSelector((state) => state.ui);

    useEffect(() => {
        dispatch(startGetAgendaById(id));
    }, [dispatch, id]);


    if (loading) {
        return <div className="loader">Loading...</div>;
    }

    return (
        <div className="w-full p-5 text-gray-600">
            <div className="w-3/4 md:w-2/3 bg-white rounded-md shadow-md p-5 mb-3 mx-auto">
                <h1 className="text-2xl text-center uppercase font-bold mb-3">Bienvenido {nombre}</h1>
                <p className='text-xl text-center font-semibold uppercase'>Citas de hoy: </p>
            </div>

            <div className='w-full flex flex-wrap'>
                {
                    eventos?.filter(e => e.start >= moment() && e.start <= moment().add(1, 'd'))
                        .map(evento => {
                            return (
                                <div className='w-1/3 p-2'>
                                    <Card>
                                        <CardContent>
                                            <Typography variant="h5" component="div">
                                                {evento?.title}
                                            </Typography>
                                            <Typography variant="h6" component="div">
                                                {evento?.nombrePaciente}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {moment(evento?.start).format("DD/MM/YYYY h:mm A")}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Link to={`/medico/historial/${evento.id_paciente}`}>
                                                <Button variant="contained" size="medium">Historial</Button>
                                            </Link>
                                        </CardActions>
                                    </Card>
                                </div>
                            )
                        })
                }
            </div>
        </div>
    );
}
