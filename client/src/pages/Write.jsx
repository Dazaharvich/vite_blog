import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const Write = () => {
  const navigate = useNavigate();
  const state = useLocation().state;
  const [title, setTitle] = useState(state?.title || "");
  const [value, setValue] = useState(state?.desc || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post(
        "http://localhost:8800/api/uploads",
        formData,
        {
          withCredentials: true, // Si estás manejando cookies o autenticación basada en sesiones
        }
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = file ? await upload() : "";

    try {
      state
        ? // Actualizar un post existente
          await axios.patch(
            `http://localhost:8800/api/posts/${state.id}`,
            {
              title,
              desc: value,
              cat,
              img: file ? imgUrl : "",
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
              img: file ? imgUrl : "",
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
        <div className="menu w-1/5 lg:flex-2 flex flex-col gap-6">
          {/* Publicar Options */}
          <div className="item bg-slate-900 p-6 rounded-lg shadow-md">
            <h3 className="font-bold text-lg mb-4">Publicar</h3>
            <span className="block mb-2">
              <b>Status: </b> Borrador
            </span>
            <span className="block mb-4">
              <b>Visibilidad: </b> Publicado
            </span>

            <input
              className="hidden"
              type="file"
              name=""
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label
              htmlFor="file"
              className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
              Subir Imagen
            </label>
            {/* Buttons */}
            <div className="mt-14 gap-4 flex flex-col">
              <button className="bg-blue-500 px-4 py-2 rounded-md hover:bg-gray-400 transition">
                Guardar Borrador
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                onClick={handleClick}
              >
                Publicar
              </button>
            </div>
          </div>

          {/* Categoría Options */}
          <div className="item bg-slate-900 p-6 rounded-lg shadow-md">
            <h3 className="font-bold text-lg mb-4">Categoría</h3>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <input
                  className="cursor-pointer"
                  type="radio"
                  checked={cat === "vps"}
                  name="category"
                  value="vps"
                  id="vps"
                  onChange={(e) => setCat(e.target.value)}
                />
                <label htmlFor="vps" className="cursor-pointer">
                  VPS
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  className="cursor-pointer"
                  type="radio"
                  checked={cat === "correos"}
                  name="category"
                  value="correos"
                  id="correos"
                  onChange={(e) => setCat(e.target.value)}
                />
                <label htmlFor="correos" className="cursor-pointer">
                  Correos
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  className="cursor-pointer"
                  type="radio"
                  checked={cat === "wordpress"}
                  name="category"
                  value="wordpress"
                  id="wordpress"
                  onChange={(e) => setCat(e.target.value)}
                />
                <label htmlFor="wordpress" className="cursor-pointer">
                  Wordpress
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  className="cursor-pointer"
                  type="radio"
                  checked={cat === "seguridad"}
                  name="category"
                  value="seguridad"
                  id="seguridad"
                  onChange={(e) => setCat(e.target.value)}
                />
                <label htmlFor="seguridad" className="cursor-pointer">
                  Seguridad
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
