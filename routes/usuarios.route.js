import express from "express";
import UsuariosController from "../controllers/usuarios.controller.js"

const router = express.Router();
router.use(express.json());

router.get("/", UsuariosController.getUsuarios);
router.get("/:id_usuario", UsuariosController.getUsuario);
router.post("/", UsuariosController.createUsuarios);
router.delete("/:id_usuario", UsuariosController.deleteUsuarios);
router.put("/:id_usuario", UsuariosController.updateUsuarios);


export default router;