import { pool } from "../database/conexion.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
export const cargarImage = upload.single("image");

export const registerPets = async (req, res) => {
  try {
    const { nombre, raza, genero, categoria, fk_user } = req.body;
    let image = req.file.originalname;

    let sql = `INSERT INTO mascotas (nombre_mascota,fk_raza, fk_categoria, image, fk_genero, fk_user) VALUES (?, ?, ?, ?, ?, ?)`;

    const [rows] = await pool.query(sql, [ nombre, raza, categoria, image, genero, fk_user, ]);

    if (rows.affectedRows > 0) {
      res.status(200).json({message: "Se registro con éxito la mascota",});
    } else {
      res.status(403).json({message: "Hubo un error al registrar la mascota",});
    }
  } catch (error) {
    res.status(500).json({message: "Error del servidor" + error,});
  }
};

export const Listpets = async (req, res) => {
  try {
    let sql = `SELECT id, nombre_mascota, r.*, nombre_categoria AS categoria, nombre_genero AS genero, image 
      FROM mascotas
      JOIN razas r ON fk_raza = id_raza 
      JOIN categorias ON fk_categoria = id_categoria 
      JOIN generos ON fk_genero = id_genero
    `;

    const [result] = await pool.query(sql);
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({message: "No se encontraron mascotas",});
    }
  } catch (error) {
    res.status(500).json({message: "Error del servidor" + error,});
  }
};

export const UpdatePets = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, raza, genero, categoria } = req.body;
    let image = req.file ? req.file.originalname : null;

    let sql = `
      UPDATE mascotas SET 
      nombre_mascota = IFNULL(?, nombre_mascota),  
      fk_raza = IFNULL(?, fk_raza),  
      fk_genero = IFNULL(?, fk_genero),  
      fk_categoria = IFNULL(?, fk_categoria)
    `;

    const params = [nombre, raza, genero, categoria];
    if (image) {
      sql += `, image = ?`;
      params.push(image);
    }

    sql += ` WHERE id = ?`;
    params.push(id);

    const [rows] = await pool.query(sql, params);

    if (rows.affectedRows > 0) {
      res.status(200).json({message: "Mascota actualizada éxitosamente",});
    } else {
      res.status(404).json({message: "Error al actualizar la mascota",});
    }
  } catch (error) {
    res.status(500).json({ message: "Error del servidor" + error,});
  }
};

export const searchPets = async (req, res) => {
  try {
    const { id } = req.params;

    let sql = `
      SELECT id, nombre_mascota, image, r.*, c.*, g.* 
      FROM mascotas 
      
      JOIN razas r ON fk_raza = id_raza 
      JOIN categorias c ON fk_categoria = id_categoria 
      JOIN generos g ON fk_genero = id_genero  

      WHERE id = ?
    `;

    const [rows] = await pool.query(sql, [id]);
    if (rows.length > 0) {
      res.status(200).json(rows);
    } else {
      res.status(404).json({message: "Error no se encontro a ninguna mascota con ese ID",});
    }
  } catch (error) {
    res.status(500).json({message: "Error del servidor" + error,});
  }
};

export const deletePets = async (req, res) => {
  try {
    const { id } = req.params;
    let sql = `DELETE FROM mascotas WHERE id = '${id}'`;
    const [rows] = await pool.query(sql);
    if (rows.affectedRows > 0) {
      res.status(200).json({ message: "Mascota eliminada éxitosamente" });
    } else {
      res.status(404).json({ message: "Error al eliminar la mascota" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error del servidor" + error });
  }
};
