import Logo from "../public/img/hplus_logo.png";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <div className="container px-3 flex justify-evenly items-center">
        <div className="logo">
          <img src={Logo} alt="hplus_logo" className="max-h-80 max-w-80" />
        </div>
        <div className="links flex gap-6">
          <Link className="no-underline text-2xl hover:">Categorias</Link>
          <Link
            className="no-underline text-2xl"
            to="https://blog.hostingplus.cl/"
          >
            Blog
          </Link>
          <Link
            className="no-underline text-2xl"
            to="https://www.hostingplus.cl/"
          >
            Hostingplus
          </Link>
        </div>
        <div className="menu flex gap-6">
        <span>Jhon</span>
          <span>Logout</span>
          <button class="btn relative inline-flex items-center justify-start overflow-hidden font-medium transition-all bg-indigo-100 rounded-lg hover:bg-white group py-1.5 px-2.5 border-neutral-400">
            <span class="w-56 h-48 rounded-lg border-transparent bg-blue-600 absolute bottom-0 left-0 translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0 group-hover:border-neutral-400"></span>
            <span class="border-transparent relative w-full text-left text-blue-700 transition-colors duration-300 ease-in-out group-hover:text-white group-hover:border-neutral-400">
              <Link to="/crear" className="">
                Crear Caso
              </Link>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
