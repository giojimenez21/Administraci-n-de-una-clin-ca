import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { startCrearPaciente } from '../../actions/recep'
import { useForm } from '../../hooks/useForm'
import { Date } from '../ui/Date'

export const CrearPacienteScreen = () => {
    const navigate = useNavigate();
    const { activePaciente } = useSelector(state => state.recep);
    const dispatch = useDispatch();
    const [formValues, handleChange] = useForm({
        name: "",
        apellido1: "",
        apellido2: "",
        sexo: "",
    });
    const [fecha_nacimiento, setFecha] = useState();

    const { name, apellido1, apellido2, sexo } = formValues;

    const handleSubmit = () => {
        if (name === "" || apellido1 === "" || apellido2 === "" || sexo === "" || fecha_nacimiento === "") {
            Swal.fire("Error", "Debe completar todos los campos", "error");
        } else {
            dispatch(startCrearPaciente({ ...formValues, fecha_nacimiento }));
            Swal.fire('Paciente creado', 'El paciente fue creado de manera correcta', 'success')
        }
    }

    useEffect(() => {
        if (activePaciente.id !== undefined) {
            navigate(`/recepcionista/calendar/${activePaciente.id}`);
        }
        return () => {
            activePaciente.id = undefined;
        }
    }, [activePaciente.id]);

    return (
        <div className='flex justify-center items-center my-5'>
            <div className='w-full md:w-1/2 bg-white rounded shadow py-5 px-14'>
                <h1 className='text-2xl text-center text-blue-400 font-bold mb-6'>Crear paciente</h1>
                <input className='w-full px-5 py-3 mb-4 rounded-lg border border-gray-300 focus: outline-blue-400 hover:border-black' placeholder="Nombre" type="text" name="name" onChange={handleChange} autoComplete="off" />
                <input className='w-full px-5 py-3 mb-4 rounded-lg border border-gray-300 focus: outline-blue-400 hover:border-black' placeholder="Apellido Paterno" type="text" name="apellido1" onChange={handleChange} autoComplete="off" />
                <input className='w-full px-5 py-3 mb-4 rounded-lg border border-gray-300 focus: outline-blue-400 hover:border-black' placeholder="Apellido Materno" type="text" name="apellido2" onChange={handleChange} autoComplete="off" />
                <FormControl fullWidth >
                    <InputLabel id="demo-simple-select-label">Sexo</InputLabel>
                    <Select
                        className='mb-4'
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Sexo"
                        onChange={handleChange}
                        name="sexo"
                        value={formValues.sexo}
                    >
                        <MenuItem value={"M"}>Masculino</MenuItem>
                        <MenuItem value={"F"}>Femenino</MenuItem>
                    </Select>
                </FormControl>

                <Date fecha={fecha_nacimiento} setFecha={setFecha} mensaje="Fecha de nacimiento" />

                <button className='block mx-auto p-4 rounded-lg bg-green-400 mt-4 text-white hover:bg-green-500' onClick={handleSubmit}>
                    Crear Paciente
                </button>
            </div>


        </div>
    )
}
