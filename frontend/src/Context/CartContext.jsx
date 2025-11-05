import React,{createContext, useContext} from 'react'

const GlobalContext = createContext(null);

export const useCart = () => {
    return useContext(GlobalContext)
}

export default function CartContext({children}) {
  return <GlobalContext.Provider
  value={{}}
  >
    {children}
  </GlobalContext.Provider>
}
