const puppeteer = require('puppeteer');

const generarPDF = async(url) =>{
    const navegador = await puppeteer.launch();

    const pagina = await navegador.newPage();

    await pagina.goto(url);

    const pdf = await pagina.pdf();

    navegador.close();

    return pdf;
}

module.exports = {
    generarPDF
}