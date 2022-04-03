import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { Box } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { startCrearPaciente } from '../../actions/recep'
import { useForm } from '../../hooks/useForm'
import { Date } from '../ui/Date'

export const CrearPacienteScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formValues, handleChange] = useForm({
        name: "",
        apellido1: "",
        apellido2: "",
        sexo: "",
    });
    const [fecha_nacimiento, setFecha] = useState();

    const { name, apellido1, apellido2, sexo } = formValues;

    const handleSubmit = async () => {
        if (name === "" || apellido1 === "" || apellido2 === "" || sexo === "" || fecha_nacimiento === "") {
            Swal.fire("Error", "Debe completar todos los campos", "error");
        } else {
            const res = await dispatch(startCrearPaciente({ ...formValues, fecha_nacimiento }))
            if (res.ok) {
                Swal.fire('Paciente creado', 'El paciente fue creado de manera correcta', 'success')
                    .then(result => {
                        navigate(`/recepcionista/calendar/${res.paciente.id}`);
                    })
            }

        }
    }

    return (
        <div className='flex justify-center items-center my-5'>
            <div className='w-full md:w-1/3 bg-white rounded shadow py-5 px-14'>
                <h1 className='text-2xl text-center text-blue-400 font-bold mb-6'>Crear paciente</h1>
                <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Nombre"
                    variant="outlined"
                    name="name"
                    onChange={handleChange}
                    autoComplete="off"
                    margin='dense'
                />
                <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Apellido Paterno"
                    variant="outlined"
                    name="apellido1"
                    onChange={handleChange}
                    autoComplete="off"
                    margin='dense'
                />
                <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Apellido Materno"
                    variant="outlined"
                    name="apellido2"
                    onChange={handleChange}
                    autoComplete="off"
                    margin='dense'
                />
                <FormControl fullWidth margin='dense'>
                    <InputLabel id="demo-simple-select-label">Sexo</InputLabel>
                    <Select
                        className='mb-3'
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
                <Box textAlign="center" mt={1}>
                    <Button
                        mt={2}
                        variant="contained"
                        onClick={handleSubmit}
                    >
                        Crear Paciente
                    </Button>
                </Box>
            </div>


        </div>
    )
}
