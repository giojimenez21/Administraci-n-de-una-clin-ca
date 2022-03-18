export const prepararEventos = (eventos) =>{
    return eventos.map(evento=>{
        return {
            id: evento.id,
            title: evento.motivo,
            start: evento.fechaInicio,
            end: evento.fechaFinal
        }
    })
}