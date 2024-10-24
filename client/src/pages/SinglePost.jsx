import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
//import axios from "axios";
import axios from "@/axiosConfig";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { AuthContext } from "../context/authContext";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
//PhotoView Lightbox
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

// Importar componentes de shadcn/ui
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import EditIcon from "/img/icons8-editar-64.svg";
import DeleteIcon from "/img/icons8-borrar-para-siempre-64.png";

const SinglePost = () => {
  dayjs.extend(relativeTime);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  //variables de estado
  const [post, setPost] = useState({});
  const [open, setOpen] = useState(false); // Estado para el diálogo

  const { currentUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];

  // Sanitizar el contenido del post
  const sanitizedContent = DOMPurify.sanitize(post.desc, {
    ADD_TAGS: ["iframe"], // Permitir etiquetas adicionales si es necesario
    ADD_ATTR: [
      "allow",
      "allowfullscreen",
      "frameborder",
      "scrolling",
      "class",
      "style",
    ],
  });

   // Función para reemplazar las imágenes por PhotoView
   const options = {
    replace: (domNode) => {
      if (domNode.name === "img") {
        let src = domNode.attribs.src;
        const alt = domNode.attribs.alt || "";

        // Ajustar la URL de la imagen si es relativa
        if (src.startsWith("/uploads/")) {
          src = `${backendUrl}${src}`;
        } else if (src.startsWith("uploads/")) {
          src = `${backendUrl}/${src}`;
        }

        // Asegurarse de que devolvemos el componente
        return (
          <PhotoView src={src}>
            <img
              src={src}
              alt={alt}
              style={{ maxWidth: "100%", cursor: "pointer" }}
            />
          </PhotoView>
        );
      }
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  //Función Delete
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/posts/${postId}`, {
        withCredentials: true, // Importante para enviar cookies
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  

  return (
    <div className="container mx-auto px-4 py-8 mt-10">
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-20">
        {/* Contenido del Post */}
        <div className="content lg:col-span-4">
          {/* Imagen Destacada */}
          {post.img && (
            <img
              className="w-full h-72 lg:h-96 object-cover rounded-lg shadow-md"
              src={`${backendUrl}/uploads/${post.img}`}
              alt="Imagen destacada del post"
            />
          )}

          {/* Información del Usuario y Controles del Post */}
          <div className="user flex items-center gap-4 text-sm my-8">
            {post.userImg && (
              <img
                className="w-12 h-12 rounded-full object-cover"
                src={post.userImg}
                alt="Foto de perfil"
              />
            )}
            <div className="info mb-10">
              <span className="font-bold text-lg">{post.username}</span>
              <p className="text-gray-400">{dayjs(post.date).fromNow()}</p>
            </div>
            {currentUser?.username === post.username && (
              <div className="edit flex gap-8 ml-auto">
                <Link to={`/crear?edit=2`} state={post}>
                  <img
                    className="w-9 h-9 cursor-pointer bg-gray-200 hover:w-11 hover:h-11 p-1 focus:outline-none focus:ring-1 focus:ring-gray-300 hover:shadow-[0_0_10px_rgb(0,255,255)] transition-all duration-300 rounded-full"
                    src={EditIcon}
                    alt="Editar post"
                  />
                </Link>

                {/* Dialogo de Confirmación para Eliminar */}
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <img
                      className="w-9 h-9 cursor-pointer bg-gray-200 hover:w-11 hover:h-11 p-1 focus:outline-none focus:ring-1 focus:ring-gray-300 hover:shadow-[0_0_10px_rgb(0,255,255)] transition-all duration-300 rounded-full"
                      src={DeleteIcon}
                      alt="Eliminar post"
                    />
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Confirmar eliminación</DialogTitle>
                      <DialogDescription>
                        ¿Estás seguro de que deseas eliminar este post? Esta
                        acción no se puede deshacer.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button
                        variant="destructive"
                        onClick={() => {
                          handleDelete();
                          setOpen(false);
                        }}
                      >
                        Eliminar
                      </Button>
                      <DialogClose asChild>
                        <Button variant="secondary">Cancelar</Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </div>

          {/* Título del Post */}
          <div className="shadow-2xl pb-1 pl-3"><h1 className="font-bold text-3xl lg:text-5xl mb-6 ">{post.title}</h1></div>
          

          {/* Contenido del Post */}
          <PhotoProvider>
            <div className="editor-content prose dark:prose-invert max-w-none mt-10 text-xl">
              {parse(sanitizedContent, options)}
            </div>
          </PhotoProvider>
        </div>

        {/* Menú o Sidebar */}
        <div className="menu lg:col-span-2">
          <div className="bg-slate-950 px-6 pb-10 pt-6  rounded-lg shadow-md">
            <h2 className="font-bold text-2xl mb-4 text-white">
              Posts Relacionados
            </h2>
            {post.cat && <Menu cat={post.cat} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
