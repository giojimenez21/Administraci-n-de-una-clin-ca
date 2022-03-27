import moment from 'moment';

export const prepararEventos = (eventos) =>{
    return eventos.map(evento=>{
        return {
            id: evento.id,
            title: (evento.nombreDoctor ? evento.motivo + " - Doctor(a) " + evento.nombreDoctor : evento.motivo),
            start: moment(evento.fechaInicio).toDate(),
            end: moment(evento.fechaFinal).toDate(),
            id_servicio: evento.id_servicio,
            id_empleado: evento.id_empleado,
            id_paciente: evento.id_paciente,
            nombrePaciente: evento.nombrePaciente,
            sexo: evento.sexo,
            f_nacimiento: evento.f_nacimiento
        }
    })
}