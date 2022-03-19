const fs = require('fs');
const pug = require('pug');
const pdf = require('html-pdf');
const { db } = require("../config/db");

const generarFacturaIngresos = async (req, res) => {
    const { fechaInicial, fechaFinal } = req.params;
    let html = "";
    let reporte;
    try {
        const info = await db.query(
            `
            SELECT
                *
            FROM
                (
                SELECT
                    SUM(s.precio) AS ingresosTotales
                FROM
                    paciente_servicios AS ps
                JOIN servicios AS s
                ON
                    (ps.id_servicio = s.id)
                WHERE
                    ps.fecha BETWEEN '${fechaInicial}' AND '${fechaFinal}'
            ) AS ingresosTotales,
            (
                SELECT
                    ps.id AS id,
                    p.nombre AS paciente,
                    s.nombre AS servicio,
                    s.precio AS precio,
                    e.nombre AS doctor,
                    ps.fecha AS fecha
                FROM
                    paciente_servicios AS ps
                JOIN pacientes AS p
                ON
                    (ps.id_paciente = p.id)
                JOIN servicios AS s
                ON
                    (ps.id_servicio = s.id)
                JOIN empleados AS e
                ON
                    (ps.id_empleado = e.id)
                WHERE
                    ps.fecha BETWEEN '${fechaInicial}' AND '${fechaFinal}'
            ) AS info;
            `,
            {
                type: db.QueryTypes.SELECT,
            }
        );

        html = pug.renderFile(`${__dirname}/../views/ingresos.pug`, {
            fechaInicial,
            fechaFinal,
            info
        });

        pdf.create(html, {
            format: 'Letter',
            orientation: "portrait",
            border: {
                "top": "1cm",
                "right": "1cm",
                "bottom": "1cm",
                "left": "1cm"
            },
        }).toFile(`${__dirname}/../reports/reporteIngresos.pdf`, (err) => {
            if (err) {
                return console.log(err);
            }
            reporte = fs.readFileSync(`${__dirname}/../reports/reporteIngresos.pdf`);
            res.contentType('application/pdf');
            return res.send(reporte);
        });
    } catch (error) {
        return res.json({
            ok: false,
            msg: error
        })
    }
}

const historialPacientePDF = async (req, res) => {
    const { id } = req.params;
    let html = "";
    let reporte;
    try {
        const info = await db.query(
            `
            select concat_ws(' ',p.nombre,p.ap_paterno,p.ap_materno) as nombre, s.nombre as servicio,s.precio as precio, concat('Dr(a) ',e.nombre,e.ap_paterno) as doctor,fecha as fecha from paciente_servicios as ps join pacientes as p on(p.id = ps.id_paciente) join servicios as s on(s.id = ps.id_servicio) join empleados as e on(e.id = ps.id_empleado)
            where ps.id_paciente = ${id}
            order by 5 desc;
        `,
            { type: db.QueryTypes.SELECT }
        );

        html = pug.renderFile(`${__dirname}/../views/historial.pug`, {
            info
        });

        pdf.create(html, {
            format: 'Letter',
            orientation: "portrait",
            border: {
                "top": "1cm",
                "right": "1cm",
                "bottom": "1cm",
                "left": "1cm"
            },
        }).toFile(`${__dirname}/../reports/reporteHistorial.pdf`, (err) => {
            if (err) {
                return console.log(err);
            }
            reporte = fs.readFileSync(`${__dirname}/../reports/reporteHistorial.pdf`);
            res.contentType('application/pdf');
            return res.send(reporte);
        });

    } catch (error) {
        return res.json({
            ok: false,
            msg: error
        })
    }
}

module.exports = {
    generarFacturaIngresos,
    historialPacientePDF,
}