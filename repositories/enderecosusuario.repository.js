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
        return await resFrame("Usuário Excluído");
    } catch (err) {
        throw err;
    }
}

async function updateEndUsuario(endereco) {
    try {
        await EndUsuario.update(idEnderecoUsuario, {
            where: {
                idEnderecoUsuario: endereco.id_endereco
            }
        })
        return await getEndUsuario(usuario.id_usuario);
    } catch (err) {
        throw err;
    }
}

async function isThereEmailCpf(user_data) {
    try {
        let data = []
        data.push(await EndUsuario.findAndCountAll({
            where: {
                email: user_data.email,
            }
        }));

        data.push(await EndUsuario.findAndCountAll({
            where: {
                cpf: user_data.cpf,
            }
        }));

        if (data[0].count > 0 || data[1].count > 0){
            return data;
        }
        return;

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
    updateEndUsuario,
    isThereEmailCpf
}