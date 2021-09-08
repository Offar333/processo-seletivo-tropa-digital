import Sequelize from "sequelize";
import db from "../repositories/db.js";
import Usuarios from "./usuarios.model";

const EnderecosUsuarios = db.define("usuarios", {
    idEnderecoUsuario: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    logradouro: {
        type: Sequelize.STRING,
        allowNull: false
    },
    numero: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cidade: {
        type: Sequelize.STRING,
        allowNull: false
    },
    uf: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cep: {
        type: Sequelize.STRING,
        allowNull: false
    },
    bairro:{
        type: Sequelize.STRING,
        allowNull: false
    },
    complemento:{
        type: Sequelize.STRING,
        allowNull: true
    }
}, { underscored: true });

EnderecosUsuarios.belongsTo(Usuarios, { foreignKey: "idUsuario"})

export default EnderecosUsuarios