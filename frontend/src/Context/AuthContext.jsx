import React, { useContext, createContext, useState } from 'react'
import axios from "axios";
const GlobalContext = createContext(null);

export const useAuth = () => {
  return useContext(GlobalContext);
}

export default function AuthContext({ children }) {
  const [userData, setUserData] = useState({});
  const [isloggedIn, setIsLoggedIn] = useState(false);
  
  const loggedIn = async (data) => {
    if (data) {
      setUserData(data)
      setIsLoggedIn(true);
    }
    else {
      await axios.get("http://localhost:5000/api/authentication/me", {
        withCredentials: true
      })
        .then(res => {
          if (res.data.user) {
            setUserData(res.data.user);
            setIsLoggedIn(true);
          }
        })
        .catch(err => console.log("Not logged in", err));
    }
  }

  const logout = async () => {
    try{
      await axios.post("http://localhost:5000/api/authentication/logout", {},{
        withCredentials: true
      });
      console.log("Logout Done");
      setIsLoggedIn(false)
    }
    catch(e){
      console.log("Internal Server Error", e);
      
    }
    localStorage.removeItem("allMeals");
    setUserData({});
  }
  return <GlobalContext.Provider value={{ userData, loggedIn , isloggedIn, logout }}>
    {children}
  </GlobalContext.Provider>
}
