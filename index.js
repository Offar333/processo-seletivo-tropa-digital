import dotenv from "dotenv";
dotenv.config()
import express from "express";
import winston from "winston";
import usuariosRouter from "./routes/usuarios.route.js";
import endUsuariosRouter from "./routes/enderecosusuario.router.js";
import cors from "cors";


//winston config
const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level} ${message}`;
});

global.logger = winston.createLogger({
    level: "silly",
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: "api-processo-seletivo.log" })
    ],
    format: combine(
        label({ label: "api-processo-seletivo" }),
        timestamp(),
        myFormat
    )
});
//winston config (end)

const app = express();
app.use(express.json());
app.use(cors());
app.use("/usuarios", usuariosRouter);
app.use("/enderecos-usuario", endUsuariosRouter);

//NOTE - this will manage all the error responses to the client 
app.use((err, req, res, next) => {
    logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
    res.send({ 
    "codigo": 400,
    "status": "erro",
    "mesagem": "Erro ao realizar Ação",
    "dados": [
        err
    ]});
})


app.listen(8000, async () => {
    try {
        console.log("Server Online");
    } catch (err) {
        throw new Error(err);
    }
});
