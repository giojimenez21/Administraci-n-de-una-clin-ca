import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { startRegister } from "../../actions/admin";
import { useForm } from "../../hooks/useForm";

export const CrearUsuarioScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formValue, handleFormValue] = useForm();

    const {
        name,
        apellido1,
        apellido2,
        fecha_nacimiento,
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
            fecha_nacimiento === "" ||
            espec === "" ||
            usuario === "" ||
            contraseña === ""
        ) {
            Swal.fire("Error", "Complete todos los campos", "error");
            return;
        }

        dispatch(startRegister(formValue));
        Swal.fire('Usuario Creado','El usuario fue creado de manera correcta','success')
            .then(result =>{
                navigate("/admin/usuarios");
            });
        
    };
    return (
        <div className="flex justify-center items-center my-5">
            <div className="w-full sm:w-1/2  bg-white rounded-md p-5 border border-gray-200 shadow-lg">
                <form className="w-full grid grid-cols-2 auto-rows-auto gap-4" onSubmit={handleSubmit}>
                    <input
                        className="block border border-gray-400 w-full rounded-md p-4 focus:outline-none focus:outline-blue-400 col-span-2"
                        type="text"
                        placeholder="Nombre"
                        name="name"
                        autoComplete="off"
                        onChange={handleFormValue}
                    />
                    <input
                        className="block border border-gray-400 w-full rounded-md p-4 focus:outline-none focus:outline-blue-400"
                        type="text"
                        placeholder="Apellido Paterno"
                        name="apellido1"
                        autoComplete="off"
                        onChange={handleFormValue}
                    />
                    <input
                        className="block border border-gray-400 w-full rounded-md p-4 focus:outline-none focus:outline-blue-400"
                        type="text"
                        placeholder="Apellido Materno"
                        name="apellido2"
                        autoComplete="off"
                        onChange={handleFormValue}
                    />
                    <input
                        className="block border border-gray-400 w-full rounded-md p-4 focus:outline-none focus:outline-blue-400"
                        type="date"
                        placeholder="Fecha de nacimiento"
                        name="fecha_nacimiento"
                        onChange={handleFormValue}
                    />
                    <select
                        className="block border border-gray-400 w-full rounded-md p-4 focus:outline-none focus:outline-blue-400"
                        name="espec"
                        onChange={handleFormValue}
                    >
                        <option value="">Especialidad o Rol</option>
                        <option value="Admin">Admin</option>
                        <option value="Doctor">Doctor</option>
                        <option value="Recepcionista">Recepcionista</option>
                    </select>

                    <input
                        className="block border border-gray-400 w-full rounded-md p-4 focus:outline-none focus:outline-blue-400"
                        type="text"
                        placeholder="Usuario"
                        name="usuario"
                        autoComplete="off"
                        onChange={handleFormValue}
                    />
                    <input
                        className="block border border-gray-400 w-full rounded-md p-4 focus:outline-none focus:outline-blue-400"
                        type="password"
                        placeholder="Contraseña"
                        name="contraseña"
                        autoComplete="off"
                        onChange={handleFormValue}
                    />

                    <div className="flex justify-center col-span-2">
                        <button
                            className="block rounded-md p-4 bg-green-400 hover:bg-green-600"
                            type="submit"
                        >
                            Crear usuario
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
