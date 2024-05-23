import { Router } from 'express'; 
import { registroUsuario } from '../controller/Usuario.js';

const rutaUsuario = Router(); 

rutaUsuario.post('/Registrosuario', registroUsuario); 
export default rutaUsuario; 