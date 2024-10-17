import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Menu = ({ cat }) => {

  const [posts, setPosts] = useState([]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/posts/?cat=${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  
    return (
      <div className="flex flex-col gap-8">
        <h2 className="text-2xl font-bold mb-4 text-sky-950">Posts Relacionados</h2>
        {posts.map((post) => (
          <div className="flex items-start gap-4" key={post.id}>
            {/* Imagen del post */}
            <img
              className="w-24 h-24 lg:w-32 lg:h-32 object-cover rounded-lg shadow-md"
              src={`/uploads/${post?.img}`}
              alt="Imagen destacada del post relacionado"
            />
            <div className="flex flex-col">
              {/* Título del post */}
              <h3 className=" text-stone-800 text-lg font-semibold">{post.title}</h3>
              {/* Botón Leer Más */}
              <Link to={`/post/${post.id}`}>
                <button className="mt-2 text-blue-500 hover:underline font-semibold">
                  Leer Más...
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default Menu;
  