import { Router } from "express";
import { listGenders } from "../controllers/genero.controller.js";
import { validarToken } from "../controllers/user.controller.js";

const routeGeneros = Router();

routeGeneros.get("/generos", validarToken, listGenders);

export default routeGeneros;
