import { Router } from "express";
import { listRaces } from "../controllers/raza.controller.js";
import { validarToken } from "../controllers/user.controller.js";

const routeRazas = Router();

routeRazas.get("/razas", validarToken, listRaces);

export default routeRazas;
