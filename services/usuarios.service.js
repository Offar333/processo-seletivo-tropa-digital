import UsuariosRepository from "../repositories/usuarios.repository.js";

async function createUsuarios(usuario) {
    let data = [];
    data = await UsuariosRepository.isThereEmailCpf(usuario);
    if (data != undefined && (data[0].count > 0 || data[1].count > 0)) {
        return data
    }
    return await UsuariosRepository.insertUsuario(usuario);
}

async function getUsuarios() {
    return await UsuariosRepository.getUsuarios();
}

async function getUsuario(id) {
    return await UsuariosRepository.getUsuario(id);
}

async function deleteUsuarios(id) {
    return await UsuariosRepository.deleteUsuario(id);
}

async function updateUsuarios(usuario) {
    let data = [];
    data = await UsuariosRepository.isThereEmailCpf(usuario)
    if (data != undefined && (data[0].count > 0 || data[1].count > 0)) {
        return data
    }

    return await UsuariosRepository.updateUsuario(usuario);
}

export default {
    createUsuarios,
    getUsuarios,
    getUsuario,
    deleteUsuarios,
    updateUsuarios
}