import UsuariosService from "../services/usuarios.service.js";
import EmailValidator from "email-validator";

async function createUsuarios(req, res, next) {
    try {
        let usuario = req.body;
        let err;
        if (!usuario.nome || !usuario.sobrenome || !usuario.email || !usuario.telefone || !usuario.cpf) {
            err = { error: "Todos os dados são necessários" };
            logger.info(`${req.method} /usuarios - ${err}`);
            return next(err);

        } else if (!EmailValidator.validate(usuario.email)) {
            err = { error: "Email Inválido" };
            logger.info(`${req.method} /usuarios - ${err}`);
            return next(err);
        }

        err = await checkDataLenght(usuario, req.method);
        if(err.error){
            delete err.error
            return next(err);
        }

        usuario = await UsuariosService.createUsuarios(usuario)

        if (usuario.error) {
            delete usuario.error
            logger.info(`${req.method} /usuarios - ${JSON.stringify(usuario.message)}`);
            return next(usuario);
        }

        res.send(usuario);
        logger.info(`${req.method} /usuarios - ${JSON.stringify(usuario)}`);

    } catch (err) {
        next(err);
    }

}

async function getUsuarios(req, res, next) {
    try {
        res.send(await UsuariosService.getUsuarios());
        logger.info(`${req.method} /usuarios`);
    } catch (err) {
        next(err);
    }

}

async function getUsuario(req, res, next) {
    try {
        const data = await UsuariosService.getUsuario(req.params.id_usuario);
        if (data.error) {
            logger.info(`${req.method} /usuarios - ${data.error}`);
            return next(data);
        }
        res.send(await UsuariosService.getUsuario(req.params.id_usuario));
        logger.info(`${req.method} /usuarios`);
    } catch (err) {
        next(err);
    }
}

async function deleteUsuarios(req, res, next) {
    try {
        const data = await UsuariosService.getUsuario(req.params.id_usuario);
        if (data.error) {
            logger.info(`${req.method} /usuarios - ${data.error}`);
            return next(data);
        }
        res.send(await UsuariosService.deleteUsuarios(req.params.id_usuario))
        logger.info(`${req.method} /usuarios - id_usuario: ${req.params.id_usuario}`);
    } catch (err) {
        next(err);
    }
}

async function updateUsuarios(req, res, next) {
    try {
        let usuario = {
            id_usuario: req.params.id_usuario,
            ...req.body
        }

        if (!usuario.id_usuario || !usuario.nome || !usuario.sobrenome || !usuario.email || !usuario.telefone || !usuario.cpf) {
            const err = { message: "Todos os dados são necessários" };
            logger.info(`${req.method} /usuarios - ${err.message}`);
            return next(err);
        } else if (!EmailValidator.validate(usuario.email)) {
            const err = { message: "Email Inválido" };
            logger.info(`${req.method} /usuarios - ${err.message}`);
            return next(err);
        }
        
        err = await checkDataLenght(usuario);
        if(err.error){
            delete err.error
            return next(err);
        }

        err = await UsuariosService.getUsuario(req.params.id_usuario);
        if (err.error) {
            logger.info(`${req.method} /usuarios - ${err.error}`);
            return next(data);
        }

        usuario = await UsuariosService.updateUsuarios(usuario);

        if (usuario.error) {
            delete usuario.error
            logger.info(`${req.method} /usuarios - ${JSON.stringify(usuario.message)}`);
            return next(usuario);
        }

        res.send(usuario);
        logger.info(`${req.method} /usuarios - ${JSON.stringify(usuario)}`);

    } catch (err) {
        next(err);
    }
}

async function checkDataLenght(data, method){
    
    let err={};

    if(data.nome.length > 255 || data.sobrenome.length > 255 || data.email.length > 255){
        err.error = true
        err.error255 = "Nome, Sobrenome ou email excederam 255 caracteres"
        logger.info(`${method} /usuarios - ${JSON.stringify(err.error255)}`);
    }
    if(data.cpf.length > 45 || data.telefone.length > 45){
        err.error = true
        err.error45 = "Cpf ou Telefone excederam 45 caracteres"
        logger.info(`${method} /usuarios - ${JSON.stringify(err.error45)}`);
    }
   
    if(err.error){
        return err;
    }
}

export default {
    createUsuarios,
    getUsuarios,
    getUsuario,
    deleteUsuarios,
    updateUsuarios
}