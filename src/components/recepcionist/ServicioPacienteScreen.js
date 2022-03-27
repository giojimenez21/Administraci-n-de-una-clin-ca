import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { startGetServicios } from '../../actions/admin';
import { clearActiveEvent, clearActivePaciente, setActiveEvent, startGetAgendaById, startGetAgendaCompleta, startGetInfoPaciente, startGetMedicos } from '../../actions/recep';
import { useForm } from '../../hooks/useForm';
import { CalendarScreen } from '../ui/CalendarScreen'
import { DeleteEvent } from '../ui/DeleteEvent';
import { ModalEvent } from '../ui/ModalEvent';
import { NewEvent } from '../ui/NewEvent';

export const ServicioPacienteScreen = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { loading } = useSelector(state => state.ui);
    const { medicos, eventos, activeEvent } = useSelector(state => state.recep);
    const [formValues, handleChange] = useForm({
        medico: ""
    });
    const { medico } = formValues;

    useEffect(() => {
        dispatch(startGetInfoPaciente(id));
        dispatch(startGetMedicos());
        dispatch(startGetServicios());

        return () =>{
            dispatch(clearActivePaciente());
        }
    }, [dispatch])

    useEffect(() => {
        if (medico === "" || medico === "Todos") {
            dispatch(startGetAgendaCompleta());
        } else {
            dispatch(startGetAgendaById(medico));
        }
    }, [medico, dispatch])

    
    const onSelect = (e) => {
        dispatch(setActiveEvent(e));
    };

    const onSelectSlot = () => {
        dispatch(clearActiveEvent());
    }

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

            <CalendarScreen eventos={eventos} onSelect={onSelect} onSelectSlot={onSelectSlot} />

            <NewEvent />

            {
                (Object.keys(activeEvent).length > 0 && <DeleteEvent />)
            }

            <ModalEvent />
        </div>
    )
}
