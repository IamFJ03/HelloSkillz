import React,{createContext, useContext, useState} from 'react'

const GlobalContext = createContext(null);

export const useCart = () => {
    return useContext(GlobalContext)
}

export default function CartContext({children}) {
  const [favourites, setFavourites] = useState([]);
  const [allMeals, setAllMeals] = useState([]);
  return <GlobalContext.Provider
  value={{favourites, setFavourites, allMeals, setAllMeals}}
  >
    {children}
  </GlobalContext.Provider>
}
