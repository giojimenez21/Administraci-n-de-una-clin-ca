import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import moment from 'moment';
import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { startCloseModal } from '../../actions/ui';
import { DateTime } from './DateTime';

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
    },
};

Modal.setAppElement("#root");

export const ModalEvent = () => {
    const { activePaciente, medicos } = useSelector(state => state.recep);
    const { stateModal } = useSelector(state => state.ui);
    const edad = moment().diff(moment(activePaciente.f_nacimiento), 'years');
    const [fecha, setFecha] = useState(moment());
    const dispatch = useDispatch();

    const closeModal = () => {
        dispatch(startCloseModal());
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
            <form className='container p-4 mx-auto text-xl'>
                <h1 className='text-2xl font-bold text-center mb-2'>Nueva cita</h1>
                <p>Nombre del paciente: {activePaciente?.nombre} {activePaciente?.ap_paterno} {activePaciente?.ap_materno}</p>
                <p>Sexo: {activePaciente?.sexo === "M" ? "Masculino" : "Femenino"}</p>
                <p>Edad: {edad} años</p>
                <div className='my-4'>
                    <DateTime fecha={fecha} setFecha={setFecha} mensaje="Fecha Inicial" />
                </div>
                <div className='my-4'>
                    <DateTime fecha={fecha} setFecha={setFecha} mensaje="Fecha Final" />
                </div>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Medico</InputLabel>
                    <Select
                        className='mb-4'
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Medico"
                        // onChange={handleChange}
                        name="medico"
                    // value={formValues.medico}
                    >
                        <MenuItem value={"Todos"}>Todos</MenuItem>
                        {medicos?.map(medico => {
                            return (
                                <MenuItem value={medico?.id} key={medico?.id}>Dr(a) {medico?.nombre}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
                <button className='mx-auto block bg-red-500 p-4 rounded-md text-white'>Crear cita</button>
            </form>
        </Modal>
    )
}
