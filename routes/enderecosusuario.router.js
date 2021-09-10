import express from "express";
import EndUsuarioController from "../controllers/enderecosusuario.controller.js"

const router = express.Router();
router.use(express.json());

router.get("/usuario/:id_usuario", EndUsuarioController.getUsuEnderecos);
router.get("/:id_endereco_usuario", EndUsuarioController.getEndUsuario);
router.post("/", EndUsuarioController.createEndUsuario);
router.delete("/:id_endereco_usuario", EndUsuarioController.deleteEndUsuario);
router.put("/:id_endereco_usuario", EndUsuarioController.updateEndUsuario);


export default router;