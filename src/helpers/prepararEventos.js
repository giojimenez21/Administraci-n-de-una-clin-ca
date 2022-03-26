import moment from 'moment';

export const prepararEventos = (eventos) =>{
    return eventos.map(evento=>{
        return {
            id: evento.id,
            title: (evento.nombre ? evento.motivo + " - Doctor(a) " + evento.nombre : evento.motivo),
            start: moment(evento.fechaInicio).toDate(),
            end: moment(evento.fechaFinal).toDate(),
            id_servicio: evento.id_servicio,
            id_empleado: evento.id_empleado
        }
    })
}