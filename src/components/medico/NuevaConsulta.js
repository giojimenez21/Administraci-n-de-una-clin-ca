import moment from 'moment';
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm';
import { startGetInfoPaciente } from '../../actions/recep';
import { finalizarConsulta } from '../../actions/medico';
import Swal from 'sweetalert2';

export const NuevaConsulta = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const f_consulta = moment();
    const { loading } = useSelector(state => state.ui);
    const { id: id_empleado } = useSelector(state => state.auth);
    const { activePaciente } = useSelector(state => state.recep);
    const [formValue, handleInputChange] = useForm();

    useEffect(() => {
        dispatch(startGetInfoPaciente(id));
    }, [dispatch, id])

    const crearConsulta = async() => {
        if (Object.values(formValue).length > 2) {
            console.log(Object.keys(formValue));
            const { id: id_paciente } = activePaciente;
            const res = await dispatch(finalizarConsulta({ ...formValue, id_empleado, id_paciente, f_consulta }));
            
            if(res){
                navigate("/");
            }

        } else {
            Swal.fire('Error', 'Debe completar todos los campos', 'error');
        }
    }


    if (loading) {
        return <div className="loader">Loading...</div>;
    }

    return (
        <div className='bg-white w-3/4 mx-auto p-4 rounded-lg shadow-lg mt-3 text-lg'>
            <h1 className='text-3xl font-bold text-center text-blue-400 mb-4'>Nueva Consulta</h1>
            <div className='flex flex-wrap'>
                <div className='w-full md:w-1/3 p-2'>
                    <p>
                        <strong>Nombre:</strong> {activePaciente?.nombre} {activePaciente?.ap_paterno} {activePaciente?.ap_materno}
                    </p>

                    <p>
                        <strong>Sexo:</strong> {activePaciente?.sexo === "M" ? "Masculino" : "Femenino"}
                    </p>

                    <p>
                        <strong>Edad: </strong> {moment().diff(moment(activePaciente?.f_nacimiento), 'years')} años
                    </p>
                </div>
                <div className='w-full md:w-2/3 p-2'>
                    <TextField
                        fullWidth
                        id="outlined-basic"
                        label="Diagnostico"
                        variant="outlined"
                        name="diagnostico"
                        onChange={handleInputChange}
                        autoComplete="off"
                    />
                    <TextField
                        label="Sintomas"
                        multiline
                        fullWidth
                        rows={3}
                        margin="dense"
                        name="sintomas"
                        onChange={handleInputChange}
                        autoComplete="off"
                    />
                    <TextField
                        label="Tratamiento"
                        multiline
                        fullWidth
                        rows={5}
                        margin="dense"
                        name="receta"
                        onChange={handleInputChange}
                        autoComplete="off"
                    />
                    <Button
                        variant="contained"
                        onClick={crearConsulta}
                    >
                        Finalizar Consulta
                    </Button>
                </div>
            </div>
        </div>
    )
}
