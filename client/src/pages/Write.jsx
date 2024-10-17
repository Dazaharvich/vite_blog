import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

// Importar componentes de shadcn/ui
import { Button } from "@/components/ui/button";

const Write = () => {
  const navigate = useNavigate();
  const state = useLocation().state;
  const [title, setTitle] = useState(state?.title || "");
  const [value, setValue] = useState(state?.desc || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");

  console.log(state); // Agrega esta línea para depurar

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post(
        "http://localhost:8800/api/uploads",
        formData,
        {
          withCredentials: true, // Manejo de cookies o autenticación basada en sesiones
        }
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = file 
    ? await upload()
    : typeof state?.img === "string" 
    ? state.img
    : "";

    try {
      state
        ? // Actualizar un post existente
          await axios.patch(
            `http://localhost:8800/api/posts/${state.id}`,
            {
              title,
              desc: value,
              cat,
              img: imgUrl,
            },
            {
              withCredentials: true, // Asegura que las cookies se envíen
            }
          )
        : // Crear un nuevo post
          await axios.post(
            `http://localhost:8800/api/posts`,
            {
              title,
              desc: value,
              cat,
              img: imgUrl,
              date: dayjs(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
              withCredentials: true, // Asegura que las cookies se envíen
            }
          );
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-14">
        {/* Content */}
        <div className="content w-full lg:flex-5">
          {/* Input Text */}
          <Input
            type="text"
            value={title}
            placeholder="Titulo del Caso"
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg px-4 py-3 mb-4 border border-gray-300 focus:border-blue-500 focus:outline-none"
          />
          {/* Rich Text Editor */}
          <div className="mt-6">
            <ReactQuill
              className="h-96 border rounded-lg"
              theme="snow"
              value={value}
              onChange={setValue}
            />
          </div>
        </div>

        {/* Create Menu */}
        <div className="menu w-full lg:w-1/5 flex flex-col gap-6">
          {/* Publicar Options */}
          <div className="item bg-slate-900 p-6 rounded-lg shadow-md">
            <h3 className="font-bold text-lg mb-4">Publicar</h3>
            <span className="block mb-2">
              <b>Status: </b> Borrador
            </span>
            <span className="block mb-4">
              <b>Visibilidad: </b> Publicado
            </span>

            <div>
              {/* Input para subir imagen oculto */}
              <input
                className="hidden"
                type="file"
                name="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
              />

              {/* Botón estilizado que actúa como label */}
              <Button
                asChild
                variant="outline"
                className="w-full hover:shadow-[0_0_10px_rgb(0,255,255)] transition-shadow duration-300 rounded-full"
              >
                <label htmlFor="file" className="w-full cursor-pointer">
                  Subir Imagen
                </label>
              </Button>
            </div>
            {/* Buttons */}
            <div className="mt-14 gap-4 flex flex-col">
              {/* <Button
                variant="ghost"
                className="hover:shadow-[0_0_10px_rgb(0,255,255)] transition-shadow duration-300 rounded-full"
              >
                Guardar Borrador
              </Button> */}
              <Button
                className="text-white bg-[#225ed8] hover:shadow-[0_0_10px_rgb(0,255,255)] transition-shadow duration-300 rounded-full"
                onClick={handleClick}
              >
                Publicar
              </Button>
            </div>
          </div>

          {/* Categoría Options */}
          <div className="item bg-slate-900 p-6 rounded-lg shadow-md">
            <h3 className="font-bold text-lg mb-4">Categoría</h3>
            <div className="flex flex-col gap-4">
              {["vps", "correos", "wordpress", "seguridad"].map((category) => (
                <div key={category} className="flex items-center gap-2">
                  <input
                    className="cursor-pointer"
                    type="radio"
                    checked={cat === category}
                    name="category"
                    value={category}
                    id={category}
                    onChange={(e) => setCat(e.target.value)}
                  />
                  <label htmlFor={category} className="cursor-pointer">
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
