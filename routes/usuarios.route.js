import express from "express";
import UsuariosController from "../controllers/usuarios.controller.js"

const router = express.Router();
router.use(express.json());

router.get("/", UsuariosController.getUsuarios);
router.post("/", UsuariosController.createUsuarios);
router.get("/:id", UsuariosController.getUsuarios);
router.delete("/:id", UsuariosController.deleteUsuarios);
router.put("/", UsuariosController.updateUsuarios);


export default router;