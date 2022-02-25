const express = require("express");
const routerPDF = express.Router();
const { generarFacturaIngresos, descargarFacturaIngresos, historialPacientePDF, descargarHistorialPacientePDF } = require("../controllers/pdfController");

routerPDF.get("/facturaIngresos/:fechaInicial/:fechaFinal", generarFacturaIngresos)

routerPDF.get("/descargarFacturaIngresos/:fechaInicial/:fechaFinal", descargarFacturaIngresos)

routerPDF.get("/historialPacientePDF/:id", historialPacientePDF)

routerPDF.get("/descargarHistorialPacientePDF/:id", descargarHistorialPacientePDF)

module.exports = {
    routerPDF
}