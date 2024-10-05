import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    const res = await axios.post("/auth/login", inputs, {
      //"http://localhost:8800/api/auth/register"  --ruta completa
      withCredentials: true, // Si estás manejando cookies o autenticación basada en sesiones
    });
    setCurrentUser(res.data);
  };

  const logout = async (inputs) => {
    await axios.post("/auth/logout"
      //"http://localhost:8800/api/auth/register"  --ruta completa
      //{withCredentials: true, // Si estás manejando cookies o autenticación basada en sesiones}
      );
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
