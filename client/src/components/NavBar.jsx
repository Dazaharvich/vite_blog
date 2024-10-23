import Logo from "/img/hplus_logo.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext.jsx";
import { useContext, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, X } from "lucide-react";
//Dark mode selector
import { ModeToggle } from "@/components/mode-toggle";

// Importar componentes de diálogo de shadcn/ui
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

// Importar sheets de shadcn/ui
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";

const categories = [
  { id: 1, name: "Correos", path: "?cat=correos" },
  { id: 2, name: "VPS", path: "?cat=vps" },
  { id: 3, name: "Wordpress", path: "?cat=wordpress" },
  { id: 4, name: "Seguridad", path: "?cat=seguridad" },
];

const NavBar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const [openDialog, setOpenDialog] = useState(false); // Estado para controlar el diálogo de Logout

  const handleLogout = () => {
    logout();
    setOpenDialog(false);
  };

  return (
    <div className="bg-slate-900 shadow-md">
      <div className="container mx-auto px-4 py-3 flex flex-wrap justify-between items-center">
        {/* Logo */}
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="hplus_logo" className="h-20 w-auto" />
          </Link>
        </div>

        {/* Menú Desktop */}
        <div className="hidden md:flex md:items-center md:gap-6">
          {/* DropdownMenu for Categorías */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="text-base bg-[#225ed8] flex items-center focus:outline-none focus:ring-1 focus:ring-gray-300 hover:shadow-[0_0_10px_rgb(0,255,255)] transition-shadow duration-300 rounded-full">
                Categorías
                <ChevronDown className="ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {categories.map((category) => (
                <DropdownMenuItem key={category.id} asChild>
                  <Link to={`/${category.path}`}>{category.name}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Enlaces */}
          <Link to="https://blog.hostingplus.cl/">
            <Button
              variant="ghost"
              className="text-base text-slate-100 hover:shadow-[0_0_10px_rgb(0,255,255)] transition-shadow duration-300 rounded-full"
            >
              Blog
            </Button>
          </Link>
          <Link to="https://www.hostingplus.cl/">
            <Button
              variant="ghost"
              className="text-base text-slate-100 hover:shadow-[0_0_10px_rgb(0,255,255)] transition-shadow duration-300 rounded-full mr-32"
            >
              Hostingplus
            </Button>
          </Link>

          {/* User Menu */}
          {currentUser ? (
            <>
              <span className="username text-base">{currentUser.username}</span>

              {/* Dialogo de Confirmación para Logout */}
              <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="text-base hover:shadow-[0_0_10px_rgb(0,255,255)] transition-shadow duration-300 rounded-full"
                  >
                    Logout
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirmar cierre de sesión</DialogTitle>
                    <DialogDescription>
                      ¿Estás seguro de que deseas cerrar sesión?
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="destructive" onClick={handleLogout}>
                      Cerrar sesión
                    </Button>
                    <DialogClose asChild>
                      <Button variant="secondary">Cancelar</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </>
          ) : (
            <Link to="/login">
              <Button
                variant="outline"
                className="text-base hover:shadow-[0_0_10px_rgb(0,255,255)] transition-shadow duration-300 rounded-full"
              >
                Login
              </Button>
            </Link>
          )}
          <Link to="/crear">
            <Button className="text-base hover:shadow-[0_0_10px_rgb(0,255,255)] bg-[#225ed8] transition-shadow duration-300 rounded-full">
              Crear Caso
            </Button>
          </Link>
          <div className="flex items-center">
            {/* Otros elementos */}
            <ModeToggle />
          </div>
        </div>

        {/* Menú Móvil */}
        <div className="md:hidden bg-slate-900 movil-menu">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="p-2">
                <Menu className="h-6 w-6 " />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-slate-900">
              <SheetHeader>
                <SheetTitle>
                  <Link to="/">
                    <img src={Logo} alt="hplus_logo" className="h-12 w-auto" />
                  </Link>
                </SheetTitle>
                <SheetDescription>
                  <Button variant="ghost" className="p-2" asChild>
                    <SheetClose asChild>
                      <X className="h-6 w-6" />
                    </SheetClose>
                  </Button>
                </SheetDescription>
              </SheetHeader>
              <div className="mt-8 flex flex-col gap-4">
                {/* Categorías */}
                <DropdownMenu className="transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                  <DropdownMenuTrigger asChild>
                    <Button className="text-base flex items-center justify-between w-full focus:outline-none focus:ring-1 focus:ring-gray-300 hover:shadow-[0_0_10px_rgb(0,255,255)] transition-shadow duration-300 rounded-full">
                      Categorías
                      <ChevronDown className="ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {categories.map((category) => (
                      <DropdownMenuItem key={category.id} asChild>
                        <Link to={`/${category.path}`}>{category.name}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Enlaces */}
                <Link to="https://blog.hostingplus.cl/">
                  <Button
                    variant="ghost"
                    className="text-base w-full hover:shadow-[0_0_10px_rgb(0,255,255)] transition-shadow duration-300 rounded-full"
                  >
                    Blog
                  </Button>
                </Link>
                <Link to="https://www.hostingplus.cl/">
                  <Button
                    variant="ghost"
                    className="text-base w-1/2 hover:shadow-[0_0_10px_rgb(0,255,255)] transition-shadow duration-300 rounded-full"
                  >
                    Hostingplus
                  </Button>
                </Link>

                {/* User Menu */}
                {currentUser ? (
                  <>
                    <span className="text-base font-bold"><p className="bg-slate-50 text-slate-100 font-bold">{currentUser.username}</p></span>

                    {/* Dialogo de Confirmación para Logout */}
                    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="text-base w-full hover:shadow-[0_0_10px_rgb(0,255,255)] transition-shadow duration-300 rounded-full"
                        >
                          Logout
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Confirmar cierre de sesión</DialogTitle>
                          <DialogDescription>
                            ¿Estás seguro de que deseas cerrar sesión?
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button variant="destructive" onClick={handleLogout}>
                            Cerrar sesión
                          </Button>
                          <DialogClose asChild>
                            <Button variant="secondary">Cancelar</Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </>
                ) : (
                  <Link to="/login">
                    <Button
                      variant="outline"
                      className="text-base w-full hover:shadow-[0_0_10px_rgb(0,255,255)] transition-shadow duration-300 rounded-full"
                    >
                      Login
                    </Button>
                  </Link>
                )}
                <Link to="/crear">
                  <Button className="text-base w-full hover:shadow-[0_0_10px_rgb(0,255,255)] transition-shadow duration-300 rounded-full">
                    Crear Caso
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
