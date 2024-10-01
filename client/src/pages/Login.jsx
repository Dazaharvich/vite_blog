import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import "../index.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


const Login = () => {

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  const handleChange = e => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault()

    try{
      await axios.post("/api/auth/login", inputs, {  //"http://localhost:8800/api/auth/register"  --ruta completa
      withCredentials: true, // Si estás manejando cookies o autenticación basada en sesiones
    });
    navigate("/");
    
    }catch(err){
      setErr(err.response.data)
    }
  };



  return (
    <div>
    <div className='auth flex flex-col justify-center items-center h-screen '>
      <h1 className="text-4xl mb-8">Login</h1>
      <form className="rounded-lg shadow-lg shadow-cyan-500/50 p-8">
      <Input type="text" placeholder="Username" name="username" onClick={handleChange} className="mt-4 mb-4 rounded-lg px-4 py-4 hover:cursor-pointer"/>
      <Input type="password" placeholder="Password" name="password" onClick={handleChange} className="mt-4 mb-4 rounded-lg px-4 py-4 hover:cursor-pointer"/>
      <Button onClick={handleSubmit} className="mt-4 mb-4 rounded-lg">Login</Button>
      {err && <p className="text-red-500 text-sm mt-2">Hay un error en el usuario o la contraseña</p>}
      </form>
    </div>
    </div>
  )
}

export default Login