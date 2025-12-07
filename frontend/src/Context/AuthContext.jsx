import React,{useContext, createContext, useState} from 'react'

const GlobalContext = createContext(null);

export const useAuth = () => {
    return useContext(GlobalContext);
}

export default function AuthContext({children}) {

    const loggedIn = (data) => {
      localStorage.setItem("username", data.username);
    }
    
    const logout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("expiry");
    }
  return <GlobalContext.Provider value={{ loggedIn}}>
    {children}
  </GlobalContext.Provider>
}
