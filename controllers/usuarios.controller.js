import UsuariosService from "../services/usuarios.service.js";
import EmailValidator from "email-validator";

async function createUsuarios(req, res, next) {
    try {
        let usuario = req.body;
        if (!usuario.nome || !usuario.sobrenome || !usuario.email || !usuario.telefone || !usuario.cpf) {
            const err = "Todos os dados são necessários";
            logger.info(`POST /usuarios - ${err}`);
            return next(err);
            
        }else if(!EmailValidator.validate(usuario.email)){
            const err = "Email Inválido";
            logger.info(`POST /usuarios - ${err}`);
            return next(err);
        }else{
            res.send(await UsuariosService.createUsuarios(usuario));
            logger.info(`POST /usuarios - ${JSON.stringify(usuario)}`);
        };
    } catch (err) {
        next(err);
    }

}

async function getUsuarios(req, res, next){
    try{
        res.send(await UsuariosService.getUsuarios());
        logger.info(`GET /usuarios`);
    }catch(err){
       next(err); 
    }

}

async function getUsuario(req, res, next){
    try{
        res.send(await UsuariosService.getUsuario(req.params.id_usuario));
        logger.info(`GET /usuarios`);
    }catch(err){
       next(err); 
    }
}

async function deleteUsuarios(req, res, next){
    try{
        await UsuariosService.deleteUsuarios(req.params.id_usuario)
        res.end();
        logger.info(`DELETE /usuarios`);
    }catch(err){
       next(err); 
    }
}

async function updateUsuarios(req, res, next){
    try{
        let usuarios = req.body;
        if (!usuarios.usuarios_id || !usuarios.name || !usuarios.phone) {
            throw new Error("All data needed");
        }
        usuarios = await UsuariosService.updateUsuarios(usuarios);
        res.send(usuarios);
        logger.info(`PUT /usuarios - ${JSON.stringify(usuarios)}`);
    }catch(err){
       next(err); 
    }
}

export default {
    createUsuarios,
    getUsuarios,
    getUsuario,
    deleteUsuarios,
    updateUsuarios
}