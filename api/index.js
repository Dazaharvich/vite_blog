import express from "express";
import dotenv from "dotenv";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";


// Cargar variables de entorno desde .env
dotenv.config(); 

// Definir __filename y __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Inicializar la aplicación Express
const app = express();

// Configurar CORS
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173", // Variable de entorno
  credentials: true, // Permitir cookies y encabezados relacionados
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // Métodos HTTP permitidos
};

// Configuración de CORS para permitir solicitudes de localhost:5173
app.use(
  cors(corsOptions));

// Middleware para analizar JSON y cookies
app.use(express.json());
app.use(cookieParser());

// Configuración de multer para almacenar las imágenes
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "uploads")); // Almacenar en la carpeta 'uploads' del backend
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname); // Nombre del archivo
  },
});

const upload = multer({ storage });

// Ruta para manejar la subida de imágenes
app.post("/api/uploads", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

// Servir la carpeta uploads como estática con CORS
app.use("/uploads", cors(corsOptions), express.static(path.join(__dirname, "uploads")));

// Rutas de la API
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
