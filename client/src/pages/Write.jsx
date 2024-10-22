import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

// Importar componentes de shadcn/ui
import { Button } from "@/components/ui/button";

//Importar botones de menu herramientas de Editor de Texto
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaImage,
  FaCode,
  FaListOl,
  FaListUl,
  FaLink,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
} from "react-icons/fa";

//Importar Dialog desde ShadcnUi
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

// Importar TipTap y extensiones necesarias
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import CodeBlock from "@tiptap/extension-code-block";
import TextAlign from "@tiptap/extension-text-align";

const Write = () => {
  const navigate = useNavigate();
  const state = useLocation().state;
  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");

  //Estados para validar Insercion de URL
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");

  //Estado para desactivar Botones mientras se sube una imagen
  const [isUploading, setIsUploading] = useState(false);

  // Configurar el editor de TipTap
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link,
      CodeBlock,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      // Puedes agregar más extensiones si es necesario
    ],
    content: state?.desc || "",
  });

  // Función para subir la imagen destacada
  const uploadFeaturedImage = async () => {
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

  // Función para manejar la publicación del post
  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = file
      ? await uploadFeaturedImage()
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
              desc: editor.getHTML(),
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
              desc: editor.getHTML(),
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

  // Función para agregar imágenes dentro del editor
  const addImage = async () => {
    if (isUploading) return; // Evita múltiples clics
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async () => {
      const file = input.files[0];

      if (!file) {
        // El usuario canceló la selección del archivo
        return;
      }

      // Iniciar carga
      setIsUploading(true);

      // Validar el tipo de archivo
      if (!file.type.startsWith("image/")) {
        alert("Por favor, selecciona un archivo de imagen válido.");
        return;
      }

      // Validar el tamaño del archivo (opcional, por ejemplo, máximo 20MB)
      const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSizeInBytes) {
        alert("La imagen es demasiado grande. El tamaño máximo es de 5MB.");
        return;
      }

      // Crear FormData y subir la imagen al servidor
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await axios.post(
          "http://localhost:8800/api/uploads",
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // Validar la respuesta del servidor
        if (res.status === 200 && res.data) {
          const imageUrl = `http://localhost:8800/uploads/${res.data}`;
          // Insertar la imagen en el editor
          try {
            editor.chain().focus().setImage({ src: imageUrl }).run();
          } catch (error) {
            console.error("Error al insertar la imagen en el editor:", error);
            alert(
              "Ocurrió un error al insertar la imagen. Por favor, intenta de nuevo."
            );
          }
        } else {
          alert(
            "Ocurrió un error al subir la imagen. Por favor, intenta de nuevo."
          );
        }
      } catch (err) {
        console.error("Error al subir la imagen:", err);
        alert(
          "Ocurrió un error al subir la imagen. Por favor, intenta de nuevo."
        );
      } finally {
        // Finalizar carga
        setIsUploading(false);
      }
    };
    input.click();
  };

  // Limpiar el editor al desmontar el componente
  useEffect(() => {
    return () => {
      if (editor) {
        editor.destroy();
      }
    };
  }, [editor]);

  //Funcion para modal de URL
  const openLinkModal = () => {
    setLinkUrl("");
    setIsLinkModalOpen(true);
  };

  //Funcion para Validar inserción de Link
  const handleInsertLink = () => {
    if (linkUrl.trim() === "") {
      alert("La URL no puede estar vacía.");
      return;
    }

    try {
      const validatedUrl = new URL(linkUrl);
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: validatedUrl.href })
        .run();
      setIsLinkModalOpen(false);
    } catch (err) {
      alert("Por favor, ingresa una URL válida.");
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
          {/* Editor TipTap */}
          <div className="mt-6">
            {/* Barra de herramientas personalizada */}
            <div className="mb-4 flex gap-2 flex-wrap">
              {/* Negrita */}
              <Button
                variant="outline"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={editor.isActive("bold") ? "bg-gray-300" : ""}
              >
                <FaBold />
              </Button>

              {/* Cursiva */}
              <Button
                variant="outline"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={editor.isActive("italic") ? "bg-gray-300" : ""}
              >
                <FaItalic />
              </Button>

              {/* Subrayado */}
              <Button
                variant="outline"
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={editor.isActive("underline") ? "bg-gray-300" : ""}
              >
                <FaUnderline />
              </Button>

              {/* Agregar Imagen */}
              <Button variant="outline" onClick={addImage} disabled={isUploading}>
                <FaImage />
              </Button>

              {/* Insertar Código */}
              <Button
                variant="outline"
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={editor.isActive("codeBlock") ? "bg-gray-300" : ""}
              >
                <FaCode />
              </Button>

              {/* Lista Ordenada */}
              <Button
                variant="outline"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={editor.isActive("orderedList") ? "bg-gray-300" : ""}
              >
                <FaListOl />
              </Button>

              {/* Lista Desordenada */}
              <Button
                variant="outline"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editor.isActive("bulletList") ? "bg-gray-300" : ""}
              >
                <FaListUl />
              </Button>

              {/* Añadir Enlace */}
              <Button
                variant="outline"
                onClick={openLinkModal}
                className={editor.isActive("link") ? "bg-gray-300" : ""}
              >
                <FaLink />
              </Button>

              {/* Herramientas de Formato de Texto */}
              {/* Encabezado */}
              <Button
                variant="outline"
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                className={
                  editor.isActive("heading", { level: 2 }) ? "bg-gray-300" : ""
                }
              >
                H2
              </Button>

              {/* Alinear a la Izquierda */}
              <Button
                variant="outline"
                onClick={() =>
                  editor.chain().focus().setTextAlign("left").run()
                }
                className={
                  editor.isActive({ textAlign: "left" }) ? "bg-gray-300" : ""
                }
              >
                <FaAlignLeft />
              </Button>

              {/* Centrar */}
              <Button
                variant="outline"
                onClick={() =>
                  editor.chain().focus().setTextAlign("center").run()
                }
                className={
                  editor.isActive({ textAlign: "center" }) ? "bg-gray-300" : ""
                }
              >
                <FaAlignCenter />
              </Button>

              {/* Alinear a la Derecha */}
              <Button
                variant="outline"
                onClick={() =>
                  editor.chain().focus().setTextAlign("right").run()
                }
                className={
                  editor.isActive({ textAlign: "right" }) ? "bg-gray-300" : ""
                }
              >
                <FaAlignRight />
              </Button>
            </div>

            {/* Contenido del editor */}
            <EditorContent
              editor={editor}
              className="border rounded-lg p-4 min-h-[400px]"
            />
          </div>
        </div>

        {/* Modal para insertar enlace */}
        {isLinkModalOpen && (
          <Dialog open={isLinkModalOpen} onOpenChange={setIsLinkModalOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Insertar Enlace</DialogTitle>
                <DialogDescription>
                  Ingresa la URL a la que deseas enlazar.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  type="text"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://ejemplo.com"
                />
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsLinkModalOpen(false)}
                >
                  Cancelar
                </Button>
                <Button onClick={handleInsertLink}>Insertar Enlace</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

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
                  Subir Imagen Destacada
                </label>
              </Button>
            </div>
            {/* Buttons */}
            <div className="mt-14 gap-4 flex flex-col">
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
