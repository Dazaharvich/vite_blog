import express from "express";
import postRoutes from "./routes/posts.js"
import userRoutes from "./routes/users.js"
import authRoutes from "./routes/auth.js"
import cors from "cors";
import cookieParser from "cookie-parser";


const app = express();

// Configuración de CORS para permitir solicitudes de localhost:5173
app.use(cors({
  origin: "http://localhost:5173", // Aquí especificamos el origen que queremos permitir
  methods: ["GET", "POST", "PUT", "DELETE"], // Métodos HTTP permitidos
  credentials: true // Permitir cookies y encabezados relacionados
}));

app.use(express.json());
app.use(cookieParser())
app.use("/posts", postRoutes)
app.use("/users", userRoutes)
app.use("/auth", authRoutes)



app.listen(8800,() =>{
    console.log("Connected!")
});