import UsuariosRepository from "../repositories/usuarios.repository.js";

async function createUsuarios(usuario) {
    let data = [];
    let err = {};

    data = await UsuariosRepository.isThereEmailCpf(usuario);

    if (data != undefined && data[0].count > 0) {
        err.error = true
        err.email = "Email já está sendo utilizado";
    }

    if (data != undefined && data[1].count > 0) {
        err.error = true
        err.cpf = "Cpf em uso";
    }

    if (data != undefined && data.length > 0) {
        return err;
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
    let err = {};
    data = await UsuariosRepository.isThereEmailCpf(usuario)
    if (data != undefined && data[0].count > 0) {
        err.error = true
        err.email = "Email já está sendo utilizado";
    }

    if (data != undefined && data[1].count > 0) {
        err.error = true
        err.cpf = "Cpf em uso";
    }

    if (data != undefined && data.length > 0) {
        return err;
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