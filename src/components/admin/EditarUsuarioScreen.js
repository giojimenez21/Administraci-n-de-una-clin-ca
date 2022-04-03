import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { startSetActiveUser, startUpdateUser } from "../../actions/admin";
import { useForm } from "../../hooks/useForm";
import { Date } from "../ui/Date";
import { Box } from "@mui/system";
import { useNavigate, useParams } from "react-router-dom";

export const EditarUsuarioScreen = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector((state) => state.ui);
    const { activeUser } = useSelector((state) => state.admin);
    const [f_nacimiento, setF_nacimiento] = useState(activeUser?.f_nacimiento);
    const [formValues, handleFormValue, , setValues] = useForm({
        nombre:"",
        ap_paterno:"",
        ap_materno:"",
        f_nacimiento:"",
        especialidad:"",
        user:"",
        password: ""
    })

    useEffect(() => {
        dispatch(startSetActiveUser(id));
    }, [])

    useEffect(() => {
        setValues({ ...activeUser, password: "" });
        setF_nacimiento(activeUser?.f_nacimiento)
    }, [activeUser])

    const handleSubmit = async(e) => {
        e.preventDefault();
        formValues.f_nacimiento = f_nacimiento;
        const res = await dispatch(startUpdateUser(formValues));
        if(res){
            navigate('/admin/usuarios');
        }
    };


    if (loading) {
        return <div className="loader">Loading...</div>;
    }

    return (
        <div className="w-full">
            <div className="flex justify-center items-center py-5">
                <div className="w-full sm:w-1/2 bg-white shadow-lg border border-gray-200 rounded-md p-5">
                    <form
                        className="w-full grid grid-cols-2 auto-rows-auto gap-4"
                        onSubmit={handleSubmit}
                    >
                        <TextField
                            className="col-span-2"
                            fullWidth
                            id="outlined-basic1"
                            label="Nombre"
                            variant="outlined"
                            name="nombre"
                            onChange={handleFormValue}
                            value={formValues?.nombre}
                            autoComplete="off"
                            required={true}
                        />
                        <TextField
                            fullWidth
                            id="outlined-basic2"
                            label="Apellido Paterno"
                            variant="outlined"
                            name="ap_paterno"
                            onChange={handleFormValue}
                            value={formValues?.ap_paterno}
                            autoComplete="off"
                            required={true}
                        />
                        <TextField
                            fullWidth
                            id="outlined-basic3"
                            label="Apellido Materno"
                            variant="outlined"
                            name="ap_materno"
                            onChange={handleFormValue}
                            value={formValues?.ap_materno}
                            autoComplete="off"
                            required={true}
                        />
                        <Date
                            fecha={f_nacimiento}
                            setFecha={setF_nacimiento}
                            mensaje="Fecha de nacimiento"
                        />
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Sexo</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Rol"
                                onChange={handleFormValue}
                                name="especialidad"
                                value={formValues?.especialidad}
                                required={true}
                            >
                                <MenuItem value={""}>Rol</MenuItem>
                                <MenuItem value={"Admin"}>Admin</MenuItem>
                                <MenuItem value={"Doctor"}>Doctor</MenuItem>
                                <MenuItem value={"Recepcionista"}>Recepcionista</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            fullWidth
                            id="outlined-basic4"
                            label="Usuario"
                            variant="outlined"
                            name="user"
                            onChange={handleFormValue}
                            value={formValues?.user}
                            autoComplete="off"
                            required={true}
                        />
                        <TextField
                            fullWidth
                            type="password"
                            id="outlined-basic5"
                            label="Contraseña"
                            variant="outlined"
                            name="password"
                            onChange={handleFormValue}
                            value={formValues?.password}
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
                                onClick={handleSubmit}
                            >
                                Editar Paciente
                            </Button>
                        </Box>
                    </form>
                </div>
            </div>
        </div>
    );
};
