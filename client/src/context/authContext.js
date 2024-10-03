import { createContext } from "react";


export const AuthContext = createContext();

export const AuthContextProvider = ({children})=>{
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null)

    const login = async(inputs) => {
        const res = await axios.post("/api/auth/login", inputs, {  //"http://localhost:8800/api/auth/register"  --ruta completa
            withCredentials: true, // Si estás manejando cookies o autenticación basada en sesiones
          });
    }
}