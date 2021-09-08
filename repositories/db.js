import mysql from "mysql";


async function connect() {
    try {
        if (global.connection && global.connection.state !== "disconnected") {
            return global.connection;
        } else {
            const pool = mysql.createPool({
                "host": process.env.DB_HOST,//process.env.DB_HOST,
                "user": process.env.DB_USER,//process.env.DB_USER,
                "password": process.env.DB_PASS,//process.env.DB_PASS,
                "database": process.env.DB_NAME,//process.env.DB_NAME,
                "port": process.env.DB_PORT,//3000
                "dialect": "mysql" 
            });

            global.connection = pool;
            return pool;
           
        }
    } catch (err) {
        throw new Error(err)
    }

}

export {
    connect
}