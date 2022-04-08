import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { startRegister } from "../../actions/admin";
import { useForm } from "../../hooks/useForm";
import { Date } from "../ui/Date";
import moment from "moment";
import { Box } from "@mui/system";

export const CrearUsuarioScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formValue, handleFormValue] = useForm();
    const [fecha_nacimiento, setfecha_nacimiento] = useState(moment());

    const {
        name,
        apellido1,
        apellido2,
        espec,
        usuario,
        contraseña,
    } = formValue;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            name === "" ||
            apellido1 === "" ||
            apellido2 === "" ||
            espec === "" ||
            usuario === "" ||
            contraseña === ""
        ) {
            Swal.fire("Error", "Complete todos los campos", "error");
            return;
        }

        dispatch(startRegister({ ...formValue, fecha_nacimiento }));
        Swal.fire('Usuario Creado', 'El usuario fue creado de manera correcta', 'success')
            .then(result => {
                navigate("/admin/usuarios");
            });

    };
    return (
        <div className="flex justify-center items-center my-5">
            <div className="w-full sm:w-1/2  bg-white rounded-md p-5 border border-gray-200 shadow-lg">
                <form className="w-full grid grid-cols-2 auto-rows-auto gap-4" onSubmit={handleSubmit}>
                    <TextField
                        className="col-span-2"
                        fullWidth
                        id="outlined-basic2"
                        label="Nombre"
                        variant="outlined"
                        name="name"
                        onChange={handleFormValue}
                        autoComplete="off"
                        required={true}
                    />
                    <TextField
                        fullWidth
                        id="outlined-basic2"
                        label="Apellido Paterno"
                        variant="outlined"
                        name="apellido1"
                        onChange={handleFormValue}
                        autoComplete="off"
                        required={true}
                    />
                    <TextField
                        fullWidth
                        id="outlined-basic2"
                        label="Apellido Materno"
                        variant="outlined"
                        name="apellido2"
                        onChange={handleFormValue}
                        autoComplete="off"
                        required={true}
                    />
                    <Date
                        fecha={fecha_nacimiento}
                        setFecha={setfecha_nacimiento}
                        mensaje="Fecha de nacimiento"
                    />
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Sexo</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Rol"
                            onChange={handleFormValue}
                            name="espec"
                            required={true}
                        >
                            <MenuItem value={"Admin"}>Admin</MenuItem>
                            <MenuItem value={"Doctor"}>Doctor</MenuItem>
                            <MenuItem value={"Recepcionista"}>Recepcionista</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        fullWidth
                        id="outlined-basic2"
                        label="Usuario"
                        variant="outlined"
                        name="usuario"
                        onChange={handleFormValue}
                        autoComplete="off"
                        required={true}
                    />
                    <TextField
                        fullWidth
                        type="password"
                        id="outlined-basic2"
                        label="Contraseña"
                        variant="outlined"
                        name="contraseña"
                        onChange={handleFormValue}
                        autoComplete="off"
                        required={true}
                    />

                    <Box
                        textAlign="center"
                        className="col-span-2"
                        mt={1}
                    >
                        <Button
                            mt={2}
                            variant="contained"
                            type="submit"
                        >
                            Crear Usaurio
                        </Button>
                    </Box>
                </form>
            </div>
        </div>
    );
};
