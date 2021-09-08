import dotenv from "dotenv";
dotenv.config()
import express from "express";
import winston from "winston";
import proprietarioRouter from "./routes/proprietario.route.js"
import animalRouter from "./routes/animal.route.js"
import cors from "cors"

//test
import { connect } from "./repositories/db.js";


//winston config
const { combine, timestamp, label, printf} = winston.format;
const myFormat = printf(( { level, message, label, timestamp })=> {
    return `${timestamp} [${label}] ${level} ${message}`;
});

global.logger = winston.createLogger({
    level: "silly",
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: "api-processo-seletivo.log"})
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
app.use("/proprietario", proprietarioRouter);
app.use("/animal", animalRouter);

//test
const conn = await connect();

    try {
        const sql = "SELECT * FROM usuarios"
        //const values = [animal.name, animal.type, animal.proprietario_id];
       await conn.getConnection((err, connection)=>{
            if(err) throw err;
            console.log('connected as id ' + global.connection.threadId);
            connection.query(sql, (err, rows)=>{
                if(err) throw err;
                console.log(rows);
            })
        });
    } catch (err) {
        throw err;
    }
//test end


app.use((err, req, res, next)=>{
    logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
    res.status(400).send({ error: err.message });
})

app.listen(8000, ()=> console.log("server online"));