import { connect } from "./db.js";

async function insertUsuario(usuario) {
    const conn = await connect();
    try {
        const sql = "INSERT INTO usuarios (nome, telefone) VALUES ($1, $2) RETURNING *"
        const values = [usuario.name, usuario.phone];
        const res = await conn.query(sql, values);
        return res.rows[0];

    } catch (err) {
        throw err;
    } finally {
        conn.release();
    }

}

async function getUsuarios() {
    try {
        const sql = "SELECT * FROM usuarios"
        const conn = await connect();
        
        conn.query(sql, (err, results)=>{
            console.log(results);
        })

        const res = ({
            "codigo": 200,
            "status": "sucesso",
            "mesagem": "Ação Realizada com sucesso",
            "dados": [
                
            ]
        });

        return res

    } catch (err) {
        throw new Error(err)
    }
}
/* await conn.getConnection((err, connection)=>{
    if(err) throw err;
    const res = connection.query(sql, (err, rows)=>{
        console.log(res)
        try{
            //console.log(rows);
            const res = ({
                "codigo": 200,
                "status": "sucesso",
                "mesagem": "Ação Realizada com sucesso",
                "dados": [
                    rows
                ]
            });
            //console.log(res);
            return res;
        }catch(err){
            throw new Error(err);
        }finally{
            connection.release();
        }
    }) 
});*/

async function getUsuario(id) {
    const conn = await connect();
    try {
        const res = await conn.query("SELECT * FROM usuarios WHERE usuario_id = $1", [id]);
        return res.rows[0];
    } catch (err) {
        throw err;
    } finally {
        conn.release();
    }
}

async function deleteUsuario(id) {
    const conn = await connect();
    try {
        const res = await conn.query("DELETE FROM usuarios WHERE usuario_id = $1", [id]);
    } catch (err) {
        throw err;
    } finally {
        conn.release();
    }
}

async function updateUsuario(usuario) {
    const conn = await connect();
    try {
        const sql = "UPDATE usuarios SET nome = $1, telefone = $2 WHERE usuario_id = $3 RETURNING *"
        const values = [usuario.name, usuario.phone, usuario.usuario_id];
        const res = await conn.query(sql, values);
        return res.rows[0]
    } catch (err) {
        throw err;
    } finally {
        conn.release();
    }
}


export default {
    insertUsuario,
    getUsuarios,
    getUsuario,
    updateUsuario,
    deleteUsuario,
    updateUsuario
}