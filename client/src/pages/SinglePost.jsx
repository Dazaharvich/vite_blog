import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { AuthContext } from "../context/authContext";
import DOMPurify from "dompurify";

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

  const [post, setPost] = useState({});
  const [open, setOpen] = useState(false); // Estado para el diálogo

  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/api/posts/${postId}`
        );
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8800/api/posts/${postId}`, {
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
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Contenido del Post */}
        <div className="content lg:col-span-4">
          {/* Imagen Destacada */}
          <img
            className="w-full h-72 lg:h-96 object-cover rounded-lg shadow-md"
            src={`/uploads/${post?.img}`}
            alt="Imagen destacada del post"
          />

          {/* Información del Usuario y Controles del Post */}
          <div className="user flex items-center gap-4 text-sm my-8">
            {post.userImg && (
              <img
                className="w-12 h-12 rounded-full object-cover"
                src={post.userImg}
                alt="Foto de perfil"
              />
            )}
            <div className="info">
              <span className="font-bold text-lg">{post.username}</span>
              <p className="text-gray-500">{dayjs(post.date).fromNow()}</p>
            </div>
            {currentUser?.username === post.username && (
              <div className="edit flex gap-3 ml-auto">
                <Link to={`/crear?edit=2`} state={post}>
                  <img
                    className="w-7 h-7 cursor-pointer bg-gray-200 hover:bg-gray-300 rounded-full p-1 shadow-md"
                    src={EditIcon}
                    alt="Editar post"
                  />
                </Link>

                {/* Dialogo de Confirmación para Eliminar */}
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <img
                      className="w-7 h-7 cursor-pointer bg-gray-200 hover:bg-gray-300 rounded-full p-1 shadow-md"
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
          <h1 className="font-bold text-3xl lg:text-5xl mb-6">{post.title}</h1>

          {/* Contenido del Post */}
          <div className="text-lg leading-relaxed text-gray-400 space-y-4">
            <p
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.desc),
              }}
            ></p>
          </div>
        </div>

        {/* Menú o Sidebar */}
        <div className="menu bg-slate-400 hidden lg:block lg:col-span-1 p-4 rounded-lg shadow-md max-h-fit">
          <Menu cat={post.cat} />
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
