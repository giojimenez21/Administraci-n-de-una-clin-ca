import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { startGetAgendaById } from '../../actions/recep';
import { CalendarScreen } from '../ui/CalendarScreen';

export const AgendaMedico = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useSelector(state => state.auth);
    const { loading } = useSelector(state => state.ui);
    const { eventos } = useSelector(state => state.recep);

    useEffect(() => {
        dispatch(startGetAgendaById(id));
    }, [dispatch, id])

    const onDoubleClickEvent = (e) => {
        navigate(`/medico/consulta/${e.id_paciente}`);
    }


    if (loading) {
        return <div className="loader">Loading...</div>;
    }

    return (
        <>
            <CalendarScreen eventos={eventos} onDoubleClickEvent={onDoubleClickEvent} />
        </>
    )
}
