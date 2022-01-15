import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStethoscope } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "../hooks/useForm";
import { useDispatch } from "react-redux";
import { startLogin } from "../actions/auth";
import "../index.css";

export const LoginScreen = () => {
    const dispatch = useDispatch();
    const [formValues, handleformValues] = useForm();

    const { user, password } = formValues;

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(startLogin(user, password));
    };

    return (
        <div className="w-screen h-screen bg-image">
            <div className="container mx-auto w-full h-full flex justify-center items-center">
                <div className="w-3/4 md:w-1/3 h-96 min-h-96">
                    <form
                        className="w-full h-full bg-white px-10 py-4 rounded-md shadow-lg text-center"
                        onSubmit={handleLogin}
                    >
                        <FontAwesomeIcon
                            className="text-7xl text-blue-400 m-5"
                            icon={faStethoscope}
                        />

                        <input
                            className="w-full focus:outline-blue-400 p-2 rounded mb-8 border border-gray-300"
                            type="text"
                            placeholder="Usuario"
                            name="user"
                            onChange={handleformValues}
                            autoComplete="off"
                        />

                        <input
                            className="w-full focus:outline-blue-400 p-2 rounded mb-8 border border-gray-300"
                            type="password"
                            placeholder="Contraseña"
                            name="password"
                            onChange={handleformValues}
                        />

                        <button
                            className="w-28 p-3 bg-blue-400 rounded text-white font-extrabold hover:bg-blue-500"
                            type="submit"
                        >
                            Entrar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
