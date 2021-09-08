import Usuarios from "../models/usuarios.model.js";

async function insertUsuario(usuario) {
    try {
        const data = await Usuarios.create(usuario)
        return resFrame(data);
    } catch (err) {
        throw new Error(err);
    }
}


async function getUsuarios() {
    try {
        const data = await Usuarios.findAll();
        return await resFrame(data);
    } catch (err) {
        throw new Error(err)
    }
}


async function getUsuario(id_usuario) {
    try {
        const data = await Usuarios.findByPk(id_usuario);
        return await resFrame(data);
    } catch (err) {
        throw err;
    }
}

async function deleteUsuario(id) {
    try {
        await Usuarios.destroy({
            where:{
                clientId: id
            }
        })
    } catch (err) {
        throw err;
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

async function resFrame(data) {

    const res = ({
        "codigo": 200,
        "status": "sucesso",
        "mesagem": "Ação Realizada com sucesso",
        "dados": [
            data
        ]
    });

    return res;
}


export default {
    insertUsuario,
    getUsuarios,
    getUsuario,
    updateUsuario,
    deleteUsuario,
    updateUsuario
}