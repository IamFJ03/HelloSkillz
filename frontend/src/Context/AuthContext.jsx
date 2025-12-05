import React,{useContext, createContext, useState} from 'react'

const GlobalContext = createContext(null);

export const useAuth = () => {
    return useContext(GlobalContext);
}

export default function AuthContext({children}) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState();
  return <GlobalContext.Provider value={{isLoggedIn, setIsLoggedIn, userInfo, setUserInfo}}>
    {children}
  </GlobalContext.Provider>
}
