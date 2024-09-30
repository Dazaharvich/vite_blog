import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = e => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault()

    try{
    const res = await axios.post("/auth/register", inputs, {  //"http://localhost:8800/api/auth/register"  --ruta completa
      withCredentials: true, // Si estás manejando cookies o autenticación basada en sesiones
    });
      console.log(res);
    }catch(err){
      console.log(err);
    }
  }

  const [error, setError] = useState(null);

  return (
    <div>
      <div className='register flex flex-col justify-center items-center h-screen '>
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
          <Button onClick={handleSubmit} className="mt-4 mb-4 rounded-lg">Registrar</Button>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <div className="text-center mt-4">
            <span>¿Ya tienes una cuenta? <Link to="/login" className="text-blue-500 hover:underline">Iniciar sesión</Link></span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
