import UsuariosRepository from "../repositories/usuarios.repository.js";

async function createUsuarios(usuarios){
    return await UsuariosRepository.insertUsuarios(usuarios);
}

async function getUsuarios(){
    return await UsuariosRepository.getUsuarios();
}

async function getUsuario(id){
    return await UsuariosRepository.getUsuario(id);
}

async function deleteUsuarios(id){
    return await UsuariosRepository.deleteUsuarios(id);
}

async function updateUsuarios(usuarios){
    return await UsuariosRepository.updateUsuarios(usuarios);
}

export default {
    createUsuarios,
    getUsuarios,
    getUsuario,
    deleteUsuarios,
    updateUsuarios
}