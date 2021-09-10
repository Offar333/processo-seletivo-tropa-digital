import EndUsuarioRepository from "../repositories/enderecosusuario.repository.js";
import UsuariosRepository from "../repositories/usuarios.repository.js";

async function getUsuEnderecos(id_usuario){
    const data = await EndUsuarioRepository.getUsuEnderecos(id_usuario);
    if (data.dados[0].length == 0){
        const err = { error: "O Id de Usuário informado não existe"}
        return err
    }
    return data;
}

async function getEndUsuario(id_endereco) {
    const data = await EndUsuarioRepository.getEndUsuario(id_endereco);
    if (data.dados[0] == null){
        const err = { error: "O Id de Endereço informado não existe"}
        return err
    }
    return data;
}

async function createEndUsuario(endereco) {
    const data = await UsuariosRepository.getUsuario(endereco.idUsuario);
    if (data.dados[0] == null){
        const err = { error: "O Id de Usuário informado não existe"}
        return err
    }
    return await EndUsuarioRepository.insertEndUsuario(endereco);
}

async function deleteEndUsuario(id) {
    return await EndUsuarioRepository.deleteEndUsuario(id);
}

async function updateEndUsuario(endereco) {
    if(!endereco.complemento){
        endereco.complemento = ""
    }
    return await EndUsuarioRepository.updateEndUsuario(endereco);
}

export default {
    createEndUsuario,
    getEndUsuario,
    getUsuEnderecos,
    deleteEndUsuario,
    updateEndUsuario
}