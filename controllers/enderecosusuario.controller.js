import EndUsuarioService from "../services/enderecosusuario.service.js";

async function getUsuEnderecos(req, res, next) {
    try {
        const data = await EndUsuarioService.getUsuEnderecos(req.params.id_usuario)
        if (data.error) {
            logger.info(`${req.method} /enderecos-usuario - ${JSON.stringify(data.error)}`);
            return next(data);
        }
        res.send(data);
        logger.info(`${req.method} /enderecos-usuario`);
    } catch (err) {
        next(err);
    }

}

async function getEndUsuario(req, res, next) {
    try {
        const data = await EndUsuarioService.getEndUsuario(req.params.id_endereco_usuario)
        if (data.error) {
            logger.info(`${req.method} /enderecos-usuario - ${JSON.stringify(data.error)}`);
            return next(data);
        }
        res.send(data);
        logger.info(`${req.method} /enderecos-usuario`);
    } catch (err) {
        next(err);
    }

}


async function createEndUsuario(req, res, next) {
    try {
        let endereco = req.body;
        let err;
        if (!endereco.idUsuario || endereco.idUsuario == "") {
            const err = { error: "Id do usuário necessário" };
            logger.info(`${req.method} /enderecos-usuario - ${err}`);
            return next(err);
        }
        else if (!endereco.logradouro || !endereco.numero || !endereco.cidade || !endereco.uf || !endereco.cep || !endereco.bairro) {
            const err = { error: "Todos os dados são necessários" };
            logger.info(`${req.method} /enderecos-usuario - ${err}`);
            return next(err);
        }

        if(!endereco.complemento){
            endereco.complemento = ""
        }

        err = await checkDataLenght(endereco, req.method);
        if(err){
            delete err.error
            return next(err);
        }

        endereco = await EndUsuarioService.createEndUsuario(endereco)

        if (endereco.error) {
            logger.info(`${req.method} /enderecos-usuario - ${JSON.stringify(endereco.error)}`);
            return next(endereco);
        }

        res.send(endereco);
        logger.info(`${req.method} /enderecos-usuario - ${JSON.stringify(endereco)}`);

    } catch (err) {
        next(err);
    }

}


async function deleteEndUsuario(req, res, next) {
    try {
        const err = await EndUsuarioService.getEndUsuario(req.params.id_endereco_usuario);
        if (err.error) {
            logger.info(`${req.method} /enderecos-usuario - ${err.error}`);
            return next(err);
        }
        res.send(await EndUsuarioService.deleteEndUsuario(req.params.id_endereco_usuario))
        logger.info(`${req.method} /enderecos-usuario - id_endereco: ${req.params.id_endereco_usuario}`);
    } catch (err) {
        next(err);
    }
}


async function updateEndUsuario(req, res, next) {
    try {
        let err;
        let endereco = {
            idEnderecoUsuario: req.params.id_endereco_usuario,
            ...req.body
        }

        if (!endereco.idUsuario || !endereco.logradouro || !endereco.numero || !endereco.cidade || !endereco.uf || !endereco.cep || !endereco.bairro) {
            const err = { error: "Todos os dados são necessários" } ;
            logger.info(`${req.method} /enderecos-usuario  - ${err}`);
            return next(err);
        } 

        if(!endereco.complemento){
            endereco.complemento = ""
        }

        err = await checkDataLenght(endereco, req.method);
        if(err.error){
            delete err.error
            return next(err);
        }

        err = await EndUsuarioService.getEndUsuario(endereco.idEnderecoUsuario);
        if (err.error) {
            logger.info(`${req.method} /enderecos-usuario  - ${err.error}`);
            return next(err);
        }

        err = await EndUsuarioService.getUsuEnderecos(endereco.idUsuario);
        if (err.error) {
            logger.info(`${req.method} /enderecos-usuario  - ${err.error}`);
            return next(err);
        }

        endereco = await EndUsuarioService.updateEndUsuario(endereco);

        res.send(endereco);
        logger.info(`${req.method} /enderecos-usuario  - ${JSON.stringify(endereco)}`);

    } catch (err) {
        next(err);
    }
}


async function checkDataLenght(data, method){
    
    let err={};

    if(data.logradouro.length > 255 || data.cidade.length > 255 || data.bairro.length > 255 || data.complemento.length > 255){
        err.error = true;
        err.error255 = "Logradouro, Cidade, bairro ou complemento excederam 255 caracteres"
        logger.info(`${method} /usuarios - ${JSON.stringify(err.error255)}`);
    }
    if(data.cep.length > 45 || data.numero.length > 45){
        err.error = true;
        err.error45 = "Cep ou numero excederam 45 caracteres"
        logger.info(`${method} /usuarios - ${JSON.stringify(err.error45)}`);
    }
    if(data.uf.length > 2){
        err.error = true;
        err.error2 = "Uf excedeu 2 caracteres"
        logger.info(`${method} /usuarios - ${JSON.stringify(err.error2)}`);
    }
   
    if(err.error){
        return err;
    }
    return false;
}

export default {
    getUsuEnderecos,
    createEndUsuario,
    getEndUsuario,
    deleteEndUsuario,
    updateEndUsuario
}