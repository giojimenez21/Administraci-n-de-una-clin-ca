import React, { useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment';
import { messages } from '../../helpers/calendar-config';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { startGetMedicos } from '../../actions/recep';

moment.locale('es', {
	months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
	monthsShort: 'Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.'.split('_'),
	weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
	weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
	weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_')
}
);

const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {
	const { loading } = useSelector(state => state.ui);
	const { medicos } = useSelector(state => state.recep);
	const dispatch = useDispatch();
	const events = [{
		id: new Date().getTime(),
		title: "Operacion",
		start: moment().toDate(),
		end: moment().add(5, "hours").toDate(),
		bgcolor: "#fafafa",
		notes: "Comprar",
		user: {
			_id: "123",
			name: "Gio",
		},
	}]

	const openModal = () => {
		console.log('abremodal');
	}

	useEffect(() => {
		dispatch(startGetMedicos());
	}, [dispatch])

	if (loading) {
		return <div className="loader">Loading...</div>;
	}
	return (
		<div className='calendar-screen'>
			<FormControl>
				<InputLabel id="demo-simple-select-label">Medico</InputLabel>
				<Select
					className='mb-4'
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					label="Medico"
					// onChange={handleChange}
					name="Medico"
					// value={formValues.sexo}
				>
					<MenuItem value={"Todos"}>Todos</MenuItem>
					{medicos?.map(medico => {
						return (
							<>
								<MenuItem value={medico?.id} key={medico?.id}>Dr(a) {medico?.nombre}</MenuItem>
							</>
						)
					})}
				</Select>
			</FormControl>
			<Calendar
				localizer={localizer}
				events={events}
				startAccessor="start"
				endAccessor="end"
				messages={messages}
			/>

			<button
				className='fixed bottom-5 right-5 rounded-full bg-red-500 text-center px-6 py-4 text-white text-2xl z-10'
				onClick={openModal}
			>
				+
			</button>
		</div>
	)
}
