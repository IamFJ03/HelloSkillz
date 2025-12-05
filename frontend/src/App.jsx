import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Authentication from './Pages/Authentication';
import Favourites from './Pages/Favourites';
import Planning from './Pages/Planning';
import CartContext from './Context/CartContext';
import Recipe from './Pages/Recipe';
import Payment from './Pages/Payment';
import AuthContext from './Context/AuthContext';

export default function App() {
  return (
    <AuthContext>
    <CartContext>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Auth' element={<Authentication />} />
        <Route path='/favourites' element={<Favourites />} />
        <Route path='/meal-plan' element={<Planning />} />
        <Route path='/recipe' element={<Recipe />} />
        <Route path='/payment' element={<Payment />} />
      </Routes>
    </CartContext>
    </AuthContext>
  )
}