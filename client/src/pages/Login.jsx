import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import "../index.css";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext.jsx";


const Login = () => {

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const [err, setErr] = useState(null);

  const navigate = useNavigate();


  const { login } = useContext(AuthContext);



  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputs.username || !inputs.password) {
      setErr("Por favor, completa todos los campos");
      return;
    }

    try{
    await login(inputs);
    navigate("/");
    
    }catch(err){
      console.error(err);
      setErr(err.response ? err.response.data : "Error de conexión al servidor");
    }
  };



  return (
    <div>
    <div className='auth flex flex-col justify-center items-center h-screen '>
      <h1 className="text-4xl mb-8">Login</h1>
      <form className="rounded-lg shadow-lg shadow-cyan-500/50 p-8">
      <Input type="text" placeholder="Username" name="username" onChange={handleChange} className="mt-4 mb-4 rounded-lg px-4 py-4 hover:cursor-pointer"/>
      <Input type="password" placeholder="Password" name="password" onChange={handleChange} className="mt-4 mb-4 rounded-lg px-4 py-4 hover:cursor-pointer"/>
      <Button onClick={handleSubmit} className="mt-4 mb-4 rounded-lg">Login</Button>
      {err && <p className="text-red-500 text-sm mt-2">Hay un error en el usuario o la contraseña</p>}
      </form>
    </div>
    </div>
  )
}

export default Login