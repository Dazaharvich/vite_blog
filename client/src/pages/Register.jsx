import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8800/api/auth/register", inputs, {
        //"http://localhost:8800/api/auth/register"  --ruta completa
        withCredentials: true, // Si estás manejando cookies o autenticación basada en sesiones
      });
      navigate("/login");
    } catch (err) {
      setErr(err.response.data);
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center min-h-screen px-4">
        <div className="max-w-md w-full light:bg-white p-8 rounded-lg">
          <h1 className="text-4xl mb-8">Registrarse</h1>
          <form className="rounded-lg shadow-lg shadow-cyan-500/50 p-8">
            <Input
              type="text"
              placeholder="Nombre de usuario"
              name="username"
              onChange={handleChange}
              className="mt-4 mb-4 rounded-lg px-4 py-4 hover:cursor-pointer"
            />
            <Input
              type="email"
              placeholder="Correo electrónico"
              name="email"
              onChange={handleChange}
              className="mt-4 mb-4 rounded-lg px-4 py-4 hover:cursor-pointer"
            />
            <Input
              type="password"
              placeholder="Contraseña"
              name="password"
              onChange={handleChange}
              className="mt-4 mb-4 rounded-lg px-4 py-4 hover:cursor-pointer"
            />
            <Button onClick={handleSubmit} className="mt-4 mb-4 rounded-full bg-[#225ed8] text-white hover:bg-sky-600 transition-colors duration-300">
              Registrar
            </Button>
            {err && <p className="text-red-500 text-sm mt-2">{err}</p>}
            <div className="text-center mt-4">
              <span>
                ¿Ya tienes una cuenta?{" "}
                <Link to="/login" className="text-blue-500 hover:underline">
                  Iniciar sesión
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
