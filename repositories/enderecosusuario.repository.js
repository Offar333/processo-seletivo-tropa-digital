import EndUsuario from "../models/enderecosusuarios.model.js";

async function getUsuEnderecos(user_id) {
    try {
        const data = await EndUsuario.findAll({
            where:{
                idUsuario: user_id
            }
        });
        return await resFrame(data);
    } catch (err) {
        throw new Error(err)
    }
}


async function getEndUsuario(id_endereco) {
    try {
        const data = await EndUsuario.findByPk(id_endereco);
        return await resFrame(data);
    } catch (err) {
        throw new Error(err);
    }
}


async function insertEndUsuario(endereco) {
    try {
        const data = await EndUsuario.create(endereco);
        return resFrame(data);
    } catch (err) {
        throw new Error(err);
    }
}


async function deleteEndUsuario(id) {
    try {
        await EndUsuario.destroy({
            where: {
                idEnderecoUsuario: id
            }
        });
        return await resFrame(`Endereço Excluído`);
    } catch (err) {
        throw err;
    }
}

async function updateEndUsuario(endereco) {
    try {
        await EndUsuario.update(endereco, {
            where: {
                idEnderecoUsuario: endereco.idEnderecoUsuario
            }
        })
        return await getEndUsuario(endereco.idEnderecoUsuario);
    } catch (err) {
        throw err;
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
    getUsuEnderecos,
    insertEndUsuario,
    getEndUsuario,
    getEndUsuario,
    updateEndUsuario,
    deleteEndUsuario,
}