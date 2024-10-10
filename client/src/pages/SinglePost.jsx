import Edit from "../public/img/icons8-editar-64.svg";
import Delete from "../public/img/icons8-borrar-para-siempre-64.png";
import { Link, useLocation } from "react-router-dom";
import Menu from "../components/Menu";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { AuthContext } from "../context/authContext";

const SinglePost = () => {
  dayjs.extend(relativeTime);

  const [post, setPost] = useState({});

  const location = useLocation();

  const postId = location.pathname.split("/")[2];
  console.log(postId);

  const { currentUser } = useContext(AuthContext);

  console.log(location);

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Post Content */}
        <div className="content lg:flex-5">
          {/* Featured Image */}
          <img
            className="w-full h-72 lg:h-96 object-cover rounded-lg shadow-md"
            src={post?.img}
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
              <span className="font-bold text-lg">{post.username}</span>
              <p className="text-gray-500">{dayjs(post.date).fromNow()}</p>
            </div>
            {currentUser?.username === post.username && (
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
            )}
          </div>

          {/* Post Title */}
          <h1 className="font-bold text-3xl lg:text-5xl mb-6">{post.title}</h1>

          {/* Post Content */}
          <div className="text-lg leading-relaxed text-gray-700 space-y-4">
            {post.desc}
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
