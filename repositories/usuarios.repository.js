import Usuarios from "../models/usuarios.model.js";

async function insertUsuario(usuario) {
    try {
        const data = await Usuarios.create(usuario);
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
            where: {
                idUsuario: id
            }
        });
        return await resFrame("Usuário Excluído");
    } catch (err) {
        throw "Usuário possui endereço cadastrado";
    }
}

async function updateUsuario(usuario) {
    try {
        await Usuarios.update(usuario, {
            where: {
                idUsuario: usuario.id_usuario
            }
        })
        return await getUsuario(usuario.id_usuario);
    } catch (err) {
        throw err;
    }
}

async function isThereEmailCpf(user_data, method) {
    try {
        let data = [2]
        let aux;

        if (method == 'PUT') {

            aux = await Usuarios.findAll({
                where: {
                    email: user_data.email
                }
            })

            if (aux[0].idUsuario != user_data.id_usuario) {
                data.error = true
                data[0] = { count: 1 };
            } else {
                data[0] = { count: 0 };
            }

            aux = await Usuarios.findAll({
                where: {
                    cpf: user_data.cpf
                }
            })

            if (aux[0].idUsuario != user_data.id_usuario) {
                data.error = true
                data[1] = { count: 1 };
            } else {
                data[1] = { count: 0 };
            }

            if (data.error) {
                delete data.error;
                return data;
            }

            return;

        }

        data[0] = (await Usuarios.findAndCountAll({
            where: {
                email: user_data.email,
            }
        }));

        data[1] = (await Usuarios.findAndCountAll({
            where: {
                cpf: user_data.cpf,
            }
        }));



        if (data[0].count > 0 || data[1].count > 0) {
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
    insertUsuario,
    getUsuarios,
    getUsuario,
    updateUsuario,
    deleteUsuario,
    updateUsuario,
    isThereEmailCpf
}