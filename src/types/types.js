export const types = {
    authCheckingFinish: '[auth] Finish Checking',
    authStartLogin: '[auth] Start Login',
    authLogin: '[auth] Login',
    authLogout: '[auth] Logout',
    authStartRegister:'[auth] start register',
    authRenew:'[auth] renew token',
    checkingFinish: '[auth] checking finish',

    getUsers:'[admin] get users',
    cleanAdmin: '[admin] clean info',
    registerUser:'[admin] registerUser',
    searchUser: '[admin] SearchUser',
    cleanActiveUser:'[admin] clean ActiveUser',
    getInfoAdmin:'[admin] getInfoAdmin',
    getIngresosAdmin: '[admin] getIngresosAdmin',
    getPacientes:'[admin] get Pacientes',
    getHistorialPaciente: '[admin] getHistorial',
    getServicios: '[admin] getServicios',
    addService: '[admin] addService',
    lockUser: '[admin] lockUser',
    unlockUser: '[admin] unlockUser',

    startGetMedicos: '[recep] getMedicos',
    createPaciente: '[recep] crearPaciente',
    getInfoPaciente: '[recep] getInfoPaciente',
    getAgenda: '[recep] getAgendaCompleta',
    addServicePaciente: '[recep] Servicio paciente agregado',
    activeEvent: '[recep] ActiveEvent',
    clearActiveEvent: '[recep] ClearActiveEvent',
    clearActivePaciente: '[recep] ClearActivePaciente',
    updateEvent: '[recep] updateEvent',
    deleteEvent: '[recep] deleteEvent',

    finalizarCita: '[medico] finalizarCita',

    startLoading: '[ui] Start Loading',
    finishLoading: '[ui] Finish Loading',
    startLoadingPDF: '[ui] Start loading pdf',
    finishLoadingPDF: '[ui] Finish Loading pdf',
    openModal: '[ui] Open Modal',
    closeModal: '[ui] Close Modal'

}
