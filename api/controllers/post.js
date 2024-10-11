import jwt from "jsonwebtoken";
import { db } from "../db.js";

export const getPosts = (req, res) => {
  const q = req.query.cat
    ? "SELECT * FROM posts WHERE cat=?"
    : "SELECT * FROM posts";

  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};

export const getPost = (req, res) => {
  const q =
    "SELECT u.username, p.title, p.desc, p.img, u.img AS userImg, p.cat, p.date FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("Caso no encontrado");

    return res.status(200).json(data[0]); // Retorna el primer post
  });
};

export const addPost = (req, res) => {
  res.json("from controller");
};

export const deletePost = (req, res) => {
  
  const token = req.cookies.access_token
  if(!token) return res.status(401).json("Usuario no autenticado");

  jwt.verify(token, "jwtkey", (err, userInfo) =>{
    if(err) return res.status(403).json("EL token de autenticación no es válido");

    const postId = req.params.id
    const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?"

    db.query(q,[postId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);

      if (data.affectedRows > 0) {
        return res.status(200).json("El post ha sido eliminado!");
      } else {
        return res.status(403).json("Sólo puedes borrar tus propios posts!");
      }
    });
  });

};

export const updatePost = (req, res) => {
  res.json("from controller");
};
