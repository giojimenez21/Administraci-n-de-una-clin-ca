import React from "react";
import AdapterDateFns from "@mui/lab/AdapterMoment";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import { TextField } from "@mui/material";
import moment from "moment";

export const Date = ({ fecha, setFecha,variant }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                inputFormat="DD/MM/YYYY"
                label="Fecha de información"
                value={fecha}
                onChange={(nuevaFecha) => {
                    setFecha(moment(nuevaFecha).format("YYYY-MM-DD"));
                }}
                renderInput={(params) => (
                    <TextField variant={variant} {...params} />
                )}
            />
        </LocalizationProvider>
    );
};
