import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import "../index.css";

const Login = () => {
  return (
    <div>
    <div className='auth flex flex-col justify-center items-center h-screen '>
      <h1 className="text-4xl mb-8">Login</h1>
      <form className="rounded-lg shadow-lg shadow-cyan-500/50 p-8">
      <Input type="text" placeholder="Username" className="mt-4 mb-4 rounded-lg px-4 py-4 hover:cursor-pointer"/>
      <Input type="password" placeholder="Password" className="mt-4 mb-4 rounded-lg px-4 py-4 hover:cursor-pointer"/>
      <Button className="mt-4 mb-4 rounded-lg">Login</Button>
      <p>Hay un error en el usuario o la contraseña</p>
      </form>
    </div>
    </div>
  )
}

export default Login