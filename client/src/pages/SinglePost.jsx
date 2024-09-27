import Edit from "../public/img/icons8-editar-64.svg";
import Delete from "../public/img/icons8-borrar-para-siempre-64.png";
import { Link } from "react-router-dom";
import Menu from "../components/Menu";

const SinglePost = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Post Content */}
        <div className="content lg:flex-5">
          {/* Featured Image */}
          <img
            className="w-full h-72 lg:h-96 object-cover rounded-lg shadow-md"
            src="https://plus.unsplash.com/premium_photo-1689977968861-9c91dbb16049?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zm90byUyMGRlJTIwcGVyZmlsfGVufDB8fDB8fHww"
            alt="Imagen destacada del post"
          />

          {/* User Information and Post Controls */}
          <div className="user flex items-center gap-4 text-sm my-8">
            <img
              className="w-12 h-12 rounded-full object-cover"
              src="https://upload.wikimedia.org/wikipedia/commons/b/bf/Foto_Perfil_.jpg"
              alt="Foto de perfil"
            />
            <div className="info">
              <span className="font-bold text-lg">Jhon</span>
              <p className="text-gray-500">Creado hace 2 Días</p>
            </div>
            <div className="edit flex gap-3 ml-auto">
              <Link to={`/crear?edit=2`}>
                <img
                  className="w-7 h-7 cursor-pointer bg-gray-200 hover:bg-gray-300 rounded-full p-1 shadow-md"
                  src={Edit}
                  alt="Editar post"
                />
              </Link>
              <img
                className="w-7 h-7 cursor-pointer bg-gray-200 hover:bg-gray-300 rounded-full p-1 shadow-md"
                src={Delete}
                alt="Eliminar post"
              />
            </div>
          </div>

          {/* Post Title */}
          <h1 className="font-bold text-3xl lg:text-5xl mb-6">Título Genérico</h1>

          {/* Post Content */}
          <div className="text-lg leading-relaxed text-gray-700 space-y-4">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque
              unde delectus doloribus blanditiis ipsam quisquam, beatae aperiam
              quis? Aliquam incidunt, ipsa fugiat natus ut eos dolores architecto
              pariatur iure iste ratione culpa et deserunt quod voluptas unde
              reprehenderit distinctio id repellendus vero...
            </p>

            <p>
              Aliquam ducimus nam necessitatibus maiores! Quo beatae corporis
              necessitatibus ut eum aut temporibus quam placeat expedita magni sed
              illo, nostrum officiis eius ratione!
            </p>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque,
              molestiae facilis. Eveniet, asperiores voluptatibus...
            </p>
          </div>
        </div>

        {/* Sidebar or Additional Menu (Optional) */}
        <div className="bg-slate-300 menu hidden lg:block lg:flex-2 p-4 rounded-lg shadow-md">
          <Menu />
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
