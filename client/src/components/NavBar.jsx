import Logo from "../public/img/hplus_logo.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext.jsx";
import { useContext } from "react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "@radix-ui/react-icons";


const categories = [
  { id: 1, name: 'Correos', path: '?cat=correos'},
  { id: 2, name: 'VPS', path: '?cat=vps'},
  { id: 3, name: 'Wordpress', path: '?cat=wordpress'},
  { id: 4, name: 'Seguridad', path: '?cat=seguridad'},
];

const NavBar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div>
      <div className="container px-3 flex justify-evenly items-center">
        {/* Logo */}
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="hplus_logo" className="max-h-80 max-w-80" />
          </Link>
        </div>

        {/* Menu */}
        <div className="links flex gap-8 items-center">
          {/* DropdownMenu for Categorias */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="text-xl flex items-center">
                Categorias
                <ChevronDownIcon className="ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {categories.map((category) => (
                <DropdownMenuItem key={category.id} asChild>
                  <Link to={`/${category.path}`}>
                    {category.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            className="no-underline text-xl"
            to="https://blog.hostingplus.cl/"
          >
            Blog
          </Link>
          <Link
            className="no-underline text-xl"
            to="https://www.hostingplus.cl/"
          >
            Hostingplus
          </Link>
        </div>

        {/* User Menú */}
        <div className="menu flex gap-6">
          <span>{currentUser?.username}</span>
          {currentUser ? (
            <span onClick={logout}>Logout</span>
          ) : (
            <Link className="no-underline text-2xl hover:" to="/login">
              Login
            </Link>
          )}
          <Link
            to="/crear"
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
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
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
