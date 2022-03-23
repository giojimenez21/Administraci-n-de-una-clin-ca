import moment from 'moment';

export const prepararEventos = (eventos) =>{
    return eventos.map(evento=>{
        return {
            id: evento.id,
            title: evento.motivo,
            start: moment(evento.fechaInicio).toDate(),
            end: moment(evento.fechaFinal).toDate()
        }
    })
}