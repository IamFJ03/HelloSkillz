import React,{useContext, createContext, useState} from 'react'

const GlobalContext = createContext(null);

export const useAuth = () => {
    return useContext(GlobalContext);
}

export default function AuthContext({children}) {

    const loggedIn = (data) => {
      localStorage.setItem("username", data.username);
      localStorage.setItem("email", data.email);
    }
    
    const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("allMeals");
    localStorage.removeItem("token");
    }
  return <GlobalContext.Provider value={{ loggedIn, logout }}>
    {children}
  </GlobalContext.Provider>
}
