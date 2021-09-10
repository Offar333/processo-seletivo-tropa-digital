import UsuariosService from "../services/usuarios.service.js";
import EmailValidator from "email-validator";

async function createUsuarios(req, res, next) {
    try {
        let usuario = req.body;
        if (!usuario.nome || !usuario.sobrenome || !usuario.email || !usuario.telefone || !usuario.cpf) {
            const err = "Todos os dados são necessários";
            logger.info(`POST /usuarios - ${err}`);
            return next(err);

        } else if (!EmailValidator.validate(usuario.email)) {
            const err = "Email Inválido";
            logger.info(`POST /usuarios - ${err}`);
            return next(err);
        }

        usuario = await UsuariosService.createUsuarios(usuario)

        if(usuario.error){
            delete usuario.error
            logger.info(`POST /usuarios - ${JSON.stringify(usuario.message)}`);
            return next(usuario);
        }

        res.send(usuario);
        logger.info(`POST /usuarios - ${JSON.stringify(usuario)}`);

    } catch (err) {
        next(err);
    }

}

async function getUsuarios(req, res, next) {
    try {
        res.send(await UsuariosService.getUsuarios());
        logger.info(`GET /usuarios`);
    } catch (err) {
        next(err);
    }

}

async function getUsuario(req, res, next) {
    try {
        const usuarioExists = await UsuariosService.getUsuario(req.params.id_usuario);
        if (usuarioExists.dados[0] == null) {
            const err = { message: "Id de Usuário Inexistente" };
            logger.info(`POST /usuarios - ${err}`);
            return next(err);
        }
        res.send(await UsuariosService.getUsuario(req.params.id_usuario));
        logger.info(`GET /usuarios`);
    } catch (err) {
        next(err);
    }
}

async function deleteUsuarios(req, res, next) {
    try {
        const usuarioExists = await UsuariosService.getUsuario(req.params.id_usuario);
        if (usuarioExists.dados[0] == null) {
            const err = { message: "Id de Usuário Inexistente" };
            logger.info(`POST /usuarios - ${err}`);
            return next(err);
        }
        res.send(await UsuariosService.deleteUsuarios(req.params.id_usuario))
        logger.info(`DELETE /usuarios - id_usuario: ${req.params.id_usuario}`);
    } catch (err) {
        next(err);
    }
}

async function updateUsuarios(req, res, next) {
    try {
        let usuario = {
            id_usuario: req.params.id_usuario,
            nome: req.body.nome,
            sobrenome: req.body.sobrenome,
            email: req.body.email,
            telefone: req.body.telefone,
            cpf: req.body.cpf
        }

        const usuarioExists = await UsuariosService.getUsuario(usuario.id_usuario);
        if (usuarioExists.dados[0] == null) {
            const err = { message: "Id de Usuário Inexistente" };
            logger.info(`PUT /usuarios - ${err.message}`);
            return next(err);
        }

        if (!usuario.id_usuario || !usuario.nome || !usuario.sobrenome || !usuario.email || !usuario.telefone || !usuario.cpf) {
            const err = { message: "Todos os dados são necessários" };
            logger.info(`PUT /usuarios - ${err.message}`);
            return next(err);
        } else if (!EmailValidator.validate(usuario.email)) {
            const err = { message: "Email Inválido" };
            logger.info(`PUT /usuarios - ${err.message}`);
            return next(err);
        }

        usuario = await UsuariosService.updateUsuarios(usuario);

        if(usuario.error){
            delete usuario.error
            logger.info(`PUT /usuarios - ${JSON.stringify(usuario.message)}`);
            return next(usuario);
        }

        res.send(usuario);
        logger.info(`PUT /usuarios - ${JSON.stringify(usuario)}`);

    } catch (err) {
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