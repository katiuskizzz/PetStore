import { Router } from "express";
import { registerPets, Listpets,UpdatePets,deletePets, searchPets,cargarImage } from "../controllers/mascotas.controller.js";

import { validarToken } from "../controllers/user.controller.js";

const routePets = Router();

routePets.get("/mascotas", validarToken, Listpets);
routePets.post("/mascotas", validarToken, cargarImage, registerPets);
routePets.put("/mascotas/:id", validarToken, cargarImage, UpdatePets);
routePets.get("/mascotas/:id", validarToken, searchPets);
routePets.delete("/mascotas/:id", validarToken, deletePets);

export default routePets;
