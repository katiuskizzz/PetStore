import { Router } from "express";
import { listCategories } from "../controllers/categoria.controller.js";
import { validarToken } from "../controllers/user.controller.js";

const routeCategorias = Router();

routeCategorias.get("/categorias", validarToken, listCategories);

export default routeCategorias;
