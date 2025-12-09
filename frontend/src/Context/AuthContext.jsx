import React, { useContext, createContext, useState } from 'react'
import axios from "axios";
const GlobalContext = createContext(null);

export const useAuth = () => {
  return useContext(GlobalContext);
}

export default function AuthContext({ children }) {
  const [userData, setUserData] = useState({});
  const loggedIn = async (data) => {
    if (data) {
      setUserData(data)
    }
    else {
      await axios.get("http://localhost:5000/api/authentication/me", {
        withCredentials: true
      })
        .then(res => {
          if (res.data.user) {
            setUserData(res.data.user);
          }
        })
        .catch(err => console.log("Not logged in", err));
    }
  }

  const logout = () => {

    localStorage.removeItem("allMeals");
    setUserData({});
  }
  return <GlobalContext.Provider value={{ userData, loggedIn, logout }}>
    {children}
  </GlobalContext.Provider>
}
