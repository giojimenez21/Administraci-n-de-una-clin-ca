import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Swal from "sweetalert2";
import { useDispatch, useSelector } from 'react-redux';
import { startCloseModal } from '../../actions/ui';
import { useForm } from '../../hooks/useForm';
import { DateTime } from './DateTime';
import { startAddServicePaciente } from '../../actions/recep';

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
    },
};

Modal.setAppElement("#root");


export const ModalEvent = () => {
    const dispatch = useDispatch();
    const { activePaciente, medicos, activeEvent } = useSelector(state => state.recep);
    const { servicios } = useSelector(state => state.admin);
    const { stateModal } = useSelector(state => state.ui);
    const edad = moment().diff(moment(activePaciente.f_nacimiento), 'years');
    const fecha = moment();
    const [fechaInicio, setFechaInicio] = useState(moment());
    const [fechaFinal, setFechaFinal] = useState(moment());
    const initSetEvent = { medico: "", servicio: "" };
    const [formValue, handleChange] = useForm(initSetEvent);

    const closeModal = () => {
        dispatch(startCloseModal());
    }

    useEffect(() => {
        if (Object.keys(activeEvent).length > 0) {
            setFechaInicio(moment(activeEvent.start));
            setFechaFinal(moment(activeEvent.end));
            formValue.medico = activeEvent.id_empleado;
            formValue.servicio = activeEvent.id_servicio;
        } else {
            setFechaInicio(moment());
            setFechaFinal(moment());
            formValue.medico = initSetEvent.medico;
            formValue.servicio = initSetEvent.servicio;
            console.log(formValue.medico,formValue.servicio);
        }
    }, [activeEvent]);

    const { medico, servicio } = formValue;
    const { id: paciente } = activePaciente;


    const handleSubmit = (e) => {
        e.preventDefault();
        if (fechaInicio.isSameOrAfter(fechaFinal)) {
            Swal.fire('Error', 'La fecha inicial no puede ser mayor a la final', 'error');
            return;
        }

        if (formValue.medico === "" || formValue.servicio === "") {
            Swal.fire('Error', 'Debe completar todos los campos', 'error');
            return;
        } else {
            dispatch(startAddServicePaciente({ fechaInicio, fechaFinal, medico, servicio }, { fecha, paciente, medico, servicio }));
        }


    }

    return (
        <Modal
            isOpen={stateModal}
            onRequestClose={closeModal}
            style={customStyles}
            closeTimeoutMS={200}
            className="modal"
            overlayClassName="modal-fondo"
        >
            <form className='container p-4 mx-auto text-xl' onSubmit={handleSubmit}>
                <h1 className='text-2xl font-bold text-center mb-2'>{Object.keys(activeEvent).length === 0 ? "Nueva cita" : "Editar cita"}</h1>
                <p>Nombre del paciente: {activePaciente?.nombre} {activePaciente?.ap_paterno} {activePaciente?.ap_materno}</p>
                <p>Sexo: {activePaciente?.sexo === "M" ? "Masculino" : "Femenino"}</p>
                <p>Edad: {edad} años</p>
                <div className='my-4'>
                    <DateTime fecha={fechaInicio} setFecha={setFechaInicio} mensaje="Fecha Inicial" />
                </div>
                <div className='my-4'>
                    <DateTime fecha={fechaFinal} setFecha={setFechaFinal} mensaje="Fecha Final" />
                </div>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Medico</InputLabel>
                    <Select
                        className='mb-4'
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Medico"
                        onChange={handleChange}
                        name="medico"
                        value={formValue.medico}
                    >
                        <MenuItem value={""}>Todos</MenuItem>
                        {medicos?.map(medico => {
                            return (
                                <MenuItem value={medico?.id} key={medico?.id}>Dr(a) {medico?.nombre}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Servicio o Motivo</InputLabel>
                    <Select
                        className='mb-4'
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Servicio o Motivo"
                        onChange={handleChange}
                        name="servicio"
                        value={formValue.servicio}
                    >
                        <MenuItem value={""}>Ninguno</MenuItem>
                        {servicios?.map(servicio => {
                            return (
                                <MenuItem
                                    value={servicio?.id}
                                    key={servicio?.id}
                                >
                                    {servicio?.nombre}
                                </MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
                <button
                    className='mx-auto block bg-red-500 p-4 rounded-md text-white'
                >
                    {Object.keys(activeEvent).length === 0 ? "Crear cita" : "Editar Cita"}
                </button>
            </form>
        </Modal>
    )
}
