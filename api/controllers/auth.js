import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  // Check existing User
  const q = "SELECT * FROM users WHERE email = ? OR username = ?";

  db.query(q, [req.body.email, req.body.username], (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json("El usuario ya existe!");

    //Hash the Password and create a User

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    // Store hash in your password DB.

    const q = "INSERT INTO users(`username`,`email`,`password`) VALUES (?)";
    const values = [req.body.username, req.body.email, hash];

    db.query(q, [values], (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json("El usuario ha sido creado");
    });
  });
};

export const login = (req, res) => {
  //CHECK USER

  const q = "SELECT * FROM users WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    };
    if (data.length === 0) return res.status(404).json("El usuario no existe");

    //CHECK PASSWORD
    // Load hash from your password DB.
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    ); // true

    if (!isPasswordCorrect)
      return res.status(400).json("Usuario o contraseña incorrectos");

    const token = jwt.sign({ id: data[0].id }, "jwtkey");
    const { password, ...other } = data[0];


    // Configurar la cookie del token

    res
      .cookie("access_token", token, {
        httpOnly: true,
        //secure: true, // Solo si estás usando HTTPS
        sameSite: "none", // Permitir solicitudes entre sitios
      })
      .status(200)
      .json(other);
  },

  console.log("Datos de login recibidos:", req.body),
  console.log("Datos recuperados de la base de datos:", data)
)
};

export const logout = (req, res) => {
  res.clearCookie("access_token", {
    sameSite: "none",
    secure: true,
  }).status(200).json("Usuario ha cerrado sesión correctamente.");
};
