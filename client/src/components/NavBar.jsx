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
          <Link to="/crear"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Crear Caso
                  <svg
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
