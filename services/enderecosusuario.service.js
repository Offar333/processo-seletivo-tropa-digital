import EndUsuarioRepository from "../repositories/enderecosusuario.repository.js";
import UsuariosRepository from "../repositories/usuarios.repository.js";

async function getUsuEnderecos(id_usuario){
    const data = await EndUsuarioRepository.getUsuEnderecos(id_usuario);
    if (data.dados[0].length == 0){
        const err = { message: "O Id informado não existe"}
        return err
    }
    return data;
}


async function getEndUsuario(id_endereco) {
    const data = await EndUsuarioRepository.getEndUsuario(id_endereco);
    if (data.dados[0] == null){
        const err = { message: "O Id informado não existe"}
        return err
    }
    return data;
}

async function createEndUsuario(endereco) {
    const data = await UsuariosRepository.getUsuario(endereco.idUsuario);
    if (data.dados[0] == null){
        const err = { message: "O Id informado não existe"}
        return err
    }
    return await EndUsuarioRepository.insertEndUsuario(endereco);
}

async function deleteEndUsuario(id) {
    return await EndUsuarioRepository.deleteEndUsuario(id);
}

async function updateEndUsuario(usuario) {
    let data = [];
    data = await EndUsuarioRepository.isThereEmailCpf(usuario)
    if (data != undefined && (data[0].count > 0 || data[1].count > 0)) {
        return data
    }

    return await EndUsuarioRepository.updateUsuario(usuario);
}

export default {
    createEndUsuario,
    getEndUsuario,
    getUsuEnderecos,
    deleteEndUsuario,
    updateEndUsuario
}