import EndUsuarioService from "../services/enderecosusuario.service.js";

async function getUsuEnderecos(req, res, next) {
    try {
        const data = await EndUsuarioService.getUsuEnderecos(req.params.id_usuario)
        if (data.message) {
            logger.info(`GET /usuarios - ${JSON.stringify(data.message)}`);
            return next(data);
        }
        res.send(data);
        logger.info(`GET /usuarios`);
    } catch (err) {
        next(err);
    }

}

async function getEndUsuario(req, res, next) {
    try {
        const data = await EndUsuarioService.getEndUsuario(req.params.id_endereco_usuario)
        if (data.message) {
            logger.info(`GET /usuarios - ${JSON.stringify(data.message)}`);
            return next(data);
        }
        res.send(data);
        logger.info(`GET /usuarios`);
    } catch (err) {
        next(err);
    }

}

async function createEndUsuario(req, res, next) {
    try {
        let endereco = req.body;
        if (!endereco.idUsuario || endereco.idUsuario == "") {
            const err = { message: "Id do usuário necessário" };
            logger.info(`POST /usuarios - ${err}`);
            return next(err);
        }
        else if (!endereco.logradouro || !endereco.numero || !endereco.cidade || !endereco.uf || !endereco.cep || !endereco.bairro) {
            const err = { message: "Todos os dados são necessários" };
            logger.info(`POST /usuarios - ${err}`);
            return next(err);
        }

        endereco = await EndUsuarioService.createEndUsuario(endereco)

        if (endereco.message) {
            logger.info(`POST /usuarios - ${JSON.stringify(endereco.message)}`);
            return next(endereco);
        }

        res.send(endereco);
        logger.info(`POST /usuarios - ${JSON.stringify(endereco)}`);

    } catch (err) {
        next(err);
    }

}


async function deleteEndUsuario(req, res, next) {
    try {
        const err = await EndUsuarioService.getEndUsuario(req.params.id_endereco_usuario);
        if (err.message) {
            logger.info(`DELETE /usuarios - ${err.message}`);
            return next(err);
        }
        res.send(await EndUsuarioService.deleteEndUsuario(req.params.id_endereco_usuario))
        logger.info(`DELETE /usuarios - id_usuario: ${req.params.id_usuario}`);
    } catch (err) {
        next(err);
    }
}


async function updateEndUsuario(req, res, next) {
    try {
        let usuario = {
            idUsuario: req.params.idUsuario,
            logradouro: req.body.logradouro,
            numero: req.body.numero,
            cidade: req.body.cidade,
            uf: req.body.uf,
            cep: req.body.cep,
            bairro: req.body.bairro,
            complemento: req.body.complemento
        }

        const usuarioExists = await EndUsuarioService.getUsuario(usuario.id_usuario);
        if (usuarioExists.dados[0] == null) {
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

        usuario = await EndUsuarioService.updateEndUsuario(usuario);

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
    getUsuEnderecos,
    createEndUsuario,
    getEndUsuario,
    deleteEndUsuario,
    updateEndUsuario
}