import { Link, useLocation } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const cat = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/posts${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  const getText = (html) => {
    if (!html) return "";
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };


    // Filtrar los posts según la búsqueda
    const filteredPosts = posts.filter((post) => {
      const query = searchQuery.toLowerCase();
      const title = post.title.toLowerCase();
      const desc = getText(post.desc).toLowerCase();
      const category = post.cat ? post.cat.toLowerCase() : "";
  
      return (
        title.includes(query) ||
        desc.includes(query) ||
        category.includes(query)
      );
    });


    return (
      <div className="container mx-auto px-4 py-10">
        {/* Contenedor del título y la barra de búsqueda */}
        <div className="mt-3 mb-20 flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/" className="font-bold text-4xl md:text-5xl text-white">
            Knowledge <span className="text-primary">Base</span>
          </Link>
          {/* Barra de búsqueda */}
          <div className="w-full md:w-1/2 lg:w-1/3">
            <input
              type="text"
              placeholder="Buscar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 rounded-md bg-slate-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
        {/* Grid de tarjetas */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="bg-slate-900 text-white">
              <Link to={`/post/${post.id}`}>
                <img
                  className="rounded-t-lg w-full h-48 object-cover"
                  src={`/uploads/${post?.img}`}
                  alt={post.title}
                />
              </Link>
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  <Link to={`/post/${post.id}`} className="hover:underline">
                    {post.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  {getText(post.desc).substring(0, 100)}...
                </CardDescription>
                <Link
                  to={`/post/${post.id}`}
                  className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                >
                  Leer más
                  <svg
                    className="rtl:rotate-180 w-4 h-4 ml-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };
  
  export default Home;