import { Link } from "react-router-dom";

const Menu = () => {
    const posts = [
      {
        id: 1,
        title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
        desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
        img: "https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
      {
        id: 2,
        title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
        desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
        img: "https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
      {
        id: 3,
        title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
        desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
        img: "https://images.pexels.com/photos/4230630/pexels-photo-4230630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
      {
        id: 4,
        title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
        desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
        img: "https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
    ];
  
    return (
      <div className="flex flex-col gap-8">
        <h2 className="text-2xl font-bold mb-4 text-sky-950">Posts Relacionados</h2>
        {posts.map((post) => (
          <div className="flex items-start gap-4" key={post.id}>
            {/* Imagen del post */}
            <img
              className="w-24 h-24 lg:w-32 lg:h-32 object-cover rounded-lg shadow-md"
              src={post.img}
              alt="Imagen destacada del post relacionado"
            />
            <div className="flex flex-col">
              {/* Título del post */}
              <h3 className=" text-stone-800 text-lg font-semibold">{post.title}</h3>
              {/* Botón Leer Más */}
              <Link to={`/post/${post.id}`}>
                <button className="mt-2 text-blue-500 hover:underline">
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
  