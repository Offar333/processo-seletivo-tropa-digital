import EndUsuarioService from "../services/enderecosusuario.service.js";

async function getUsuEnderecos(req, res, next) {
    try {
        const data = await EndUsuarioService.getUsuEnderecos(req.params.id_usuario)
        if (data.message) {
            logger.info(`GET /enderecos-usuario - ${JSON.stringify(data.message)}`);
            return next(data);
        }
        res.send(data);
        logger.info(`GET /enderecos-usuario`);
    } catch (err) {
        next(err);
    }

}

async function getEndUsuario(req, res, next) {
    try {
        const data = await EndUsuarioService.getEndUsuario(req.params.id_endereco_usuario)
        if (data.message) {
            logger.info(`GET /enderecos-usuario - ${JSON.stringify(data.message)}`);
            return next(data);
        }
        res.send(data);
        logger.info(`GET /enderecos-usuario`);
    } catch (err) {
        next(err);
    }

}

async function createEndUsuario(req, res, next) {
    try {
        let endereco = req.body;
        if (!endereco.idUsuario || endereco.idUsuario == "") {
            const err = { message: "Id do usuário necessário" };
            logger.info(`POST /enderecos-usuario - ${err}`);
            return next(err);
        }
        else if (!endereco.logradouro || !endereco.numero || !endereco.cidade || !endereco.uf || !endereco.cep || !endereco.bairro) {
            const err = { message: "Todos os dados são necessários" };
            logger.info(`POST /enderecos-usuario - ${err}`);
            return next(err);
        }

        endereco = await EndUsuarioService.createEndUsuario(endereco)

        if (endereco.message) {
            logger.info(`POST /enderecos-usuario - ${JSON.stringify(endereco.message)}`);
            return next(endereco);
        }

        res.send(endereco);
        logger.info(`POST /enderecos-usuario - ${JSON.stringify(endereco)}`);

    } catch (err) {
        next(err);
    }

}


async function deleteEndUsuario(req, res, next) {
    try {
        const err = await EndUsuarioService.getEndUsuario(req.params.id_endereco_usuario);
        if (err.message) {
            logger.info(`DELETE /enderecos-usuario - ${err.message}`);
            return next(err);
        }
        res.send(await EndUsuarioService.deleteEndUsuario(req.params.id_endereco_usuario))
        logger.info(`DELETE /enderecos-usuario - id_endereco: ${req.params.id_endereco_usuario}`);
    } catch (err) {
        next(err);
    }
}


async function updateEndUsuario(req, res, next) {
    try {
        let endereco = {
            idEnderecoUsuario: req.params.id_endereco_usuario,
            idUsuario: req.body.idUsuario,
            logradouro: req.body.logradouro,
            numero: req.body.numero,
            cidade: req.body.cidade,
            uf: req.body.uf,
            cep: req.body.cep,
            bairro: req.body.bairro,
            complemento: req.body.complemento
        }

        if (!endereco.idUsuario || !endereco.logradouro || !endereco.numero || !endereco.cidade || !endereco.uf || !endereco.cep || !endereco.bairro || !endereco.complemento) {
            const err = { message: "Todos os dados são necessários" } ;
            logger.info(`PUT /enderecos-usuario  - ${err}`);
            return next(err);
        } 

        let err = await EndUsuarioService.getEndUsuario(endereco.idEnderecoUsuario);
        if (err.message) {
            logger.info(`PUT /enderecos-usuario  - ${err.message}`);
            return next(err);
        }

        err = await EndUsuarioService.getUsuEnderecos(endereco.idUsuario);
        if (err.message) {
            logger.info(`PUT /enderecos-usuario  - ${err.message}`);
            return next(err);
        }

        endereco = await EndUsuarioService.updateEndUsuario(endereco);

        res.send(endereco);
        logger.info(`PUT /enderecos-usuario  - ${JSON.stringify(endereco)}`);

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