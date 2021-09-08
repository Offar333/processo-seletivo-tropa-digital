import UsuariosService from "../services/usuarios.service.js";

//controller is responsible for all the validations

async function createUsuarios(req, res, next) {
    try {
        let usuarios = req.body;
        if (!usuarios.name || !usuarios.phone) {
            throw new Error("All data needed");
        }
        res.send(await UsuariosService.createUsuarios(usuarios));
        logger.info(`POST /usuarios - ${JSON.stringify(usuarios)}`);

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
        res.send(await UsuariosService.getUsuario(req.params.id));
        logger.info(`GET /usuarios`);
    }catch(err){
       next(err); 
    }
}

async function deleteUsuarios(req, res, next){
    try{
        await UsuariosService.deleteUsuarios(req.params.id)
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
    getUsuarios,
    deleteUsuarios,
    updateUsuarios
}