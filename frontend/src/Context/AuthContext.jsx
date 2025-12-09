import React,{useContext, createContext, useState} from 'react'

const GlobalContext = createContext(null);

export const useAuth = () => {
    return useContext(GlobalContext);
}

export default function AuthContext({children}) {
const [token, setToken] = useState(localStorage.getItem("token"));
    const loggedIn = (data) => {
      localStorage.setItem("username", data.username);
      localStorage.setItem("email", data.email);
      const tok = localStorage.getItem("token")
      setToken(tok);
    }
    
    const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("allMeals");
    localStorage.removeItem("token");
    setToken(null);
    }
  return <GlobalContext.Provider value={{ token, loggedIn, logout }}>
    {children}
  </GlobalContext.Provider>
}
