import express from "express";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
import path from 'path';
import { fileURLToPath } from 'url';

// Definir __filename y __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Inicializar la aplicación Express
const app = express();

// Middleware para CORS
/* app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // Cambia a tu frontend en producción
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.options("http://localhost:5173", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.sendStatus(200);
}); */


// Configuración de CORS para permitir solicitudes de localhost:5173
app.use(
  cors({
    origin: "http://localhost:5173", // Especifica el origen permitido (frontend)
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // Métodos HTTP permitidos
    credentials: true, // Permitir cookies y encabezados relacionados
  })
);

// Middleware para analizar JSON y cookies
app.use(express.json());
app.use(cookieParser());

// Configuración de multer para almacenar las imágenes
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/uploads"); //Carpeta destino
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname); //Nombre del archivo
  },
});

const upload = multer({ storage });

// Ruta para manejar la subida de imágenes
app.post("/api/uploads", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

// Servir la carpeta uploads como estática
app.use("/api/uploads", express.static(path.join(__dirname, "uploads")));

// Rutas de la API
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);


// Iniciar el servidor
app.listen(8800, () => {
  console.log("Connected!");
});
