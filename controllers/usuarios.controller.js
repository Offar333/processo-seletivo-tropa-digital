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

        let err = []

        if (Array.isArray(usuario)) {
            if (usuario[0].count > 0) {
                err.push({ email: "Email já está sendo utilizado" })
            }

            if (usuario[1].count > 0) {
                err.push({ cpf: "Cpf em uso" })
            }

            if (err != '') {
                logger.info(`POST /usuarios - ${err}`);
                return next(err);
            }
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
        if (usuarioExists.dados[0] == null){
            const err = "Id de Usuário Inexistente";
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
        if (usuarioExists.dados[0] == null){
            const err = "Id de Usuário Inexistente";
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
        if (usuarioExists.dados[0] == null){
            const err = "Id de Usuário Inexistente";
            logger.info(`POST /usuarios - ${err}`);
            return next(err);
        }

        if (!usuario.id_usuario || !usuario.nome || !usuario.sobrenome || !usuario.email || !usuario.telefone || !usuario.cpf) {
            const err = "Todos os dados são necessários";
            logger.info(`POST /usuarios - ${err}`);
            return next(err);
        } else if (!EmailValidator.validate(usuario.email)) {
            const err = "Email Inválido";
            logger.info(`POST /usuarios - ${err}`);
            return next(err);
        }

        usuario = await UsuariosService.updateUsuarios(usuario);

        let err = []
        if (Array.isArray(usuario)) {
            if (usuario[0].count > 0) {
                err.push({ email: "Email já está sendo utilizado" })
            }

            if (usuario[1].count > 0) {
                err.push({ cpf: "Cpf em uso" })
            }

            if (err != '') {
                logger.info(`POST /usuarios - ${err}`);
                return next(err);
            }
        }
        res.send(usuario);
        logger.info(`PUT /usuario - ${JSON.stringify(usuario)}`);

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