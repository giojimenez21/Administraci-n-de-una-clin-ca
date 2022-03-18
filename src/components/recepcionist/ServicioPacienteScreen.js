import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { startGetAgendaById, startGetAgendaCompleta, startGetInfoPaciente, startGetMedicos } from '../../actions/recep';
import { prepararEventos } from '../../helpers/prepararEventos';
import { useForm } from '../../hooks/useForm';
import { CalendarScreen } from '../ui/CalendarScreen'

export const ServicioPacienteScreen = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { loading } = useSelector(state => state.ui);
    const { medicos, eventos } = useSelector(state => state.recep);
    const [eventosCalendar, setEventosCalendar] = useState();
    const [formValues, handleChange] = useForm({
        medico: ""
    });
    const { medico } = formValues;

    useEffect(() => {
        dispatch(startGetInfoPaciente(id));
        dispatch(startGetMedicos());
    }, [dispatch])

    useEffect(() => {
        if(medico === "" || medico === "Todos"){
            dispatch(startGetAgendaCompleta());
        }else{
            dispatch(startGetAgendaById(medico));
        }
    }, [medico,dispatch])



    if (loading) {
        return <div className="loader">Loading...</div>;
    }

    return (
        <div className='bg-white'>
            <div className='px-4 pt-4'>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Medico</InputLabel>
                    <Select
                        className='mb-4'
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Medico"
                        onChange={handleChange}
                        name="medico"
                        value={formValues.medico}
                    >
                        <MenuItem value={"Todos"}>Todos</MenuItem>
                        {medicos?.map(medico => {
                            return (
                                <MenuItem value={medico?.id} key={medico?.id}>Dr(a) {medico?.nombre}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
            </div>
            <CalendarScreen  eventos={eventos}/>
        </div>
    )
}
