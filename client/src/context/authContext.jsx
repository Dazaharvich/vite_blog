import { createContext, useEffect, useState } from "react";
//import axios from "axios";
import axios from "@/axiosConfig";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    const res = await axios.post("/api/auth/login", inputs,{
        withCredentials: true, // Si estás manejando cookies o autenticación basada en sesiones
      });
    setCurrentUser(res.data);
    return res.data;
  };

  const logout = async (inputs) => {
    await axios.post("/api/auth/logout", {
      withCredentials: true, // Si estás manejando sesiones
    });
      
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
