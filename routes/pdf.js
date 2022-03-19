const express = require("express");
const routerPDF = express.Router();
const { generarFacturaIngresos, historialPacientePDF } = require("../controllers/pdfController");

routerPDF.get("/facturaIngresos/:fechaInicial/:fechaFinal", generarFacturaIngresos)

routerPDF.get("/historialPacientePDF/:id", historialPacientePDF)

module.exports = {
    routerPDF
}