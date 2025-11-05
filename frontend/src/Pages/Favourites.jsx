import React,{useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import { useCart } from '../Context/CartContext';
export default function Favourites() {
  const [meals, setMeals] = useState([]);
  const {favourites} = useCart();
  useEffect(() => {
    console.log("Meal Found!", favourites);
  },[])
  return (
    <div>
      <Navbar />
      <div className='ml-20'>
        <p className='text-2xl font-bold font-mono mt-10'>Favourites:</p>
        <div className='mt-10'>
        {
          meals.length > 0 ?
          <div>
            {meals.map((item) => (
              <p></p>
            ))}
          </div>
          :
          <div>
            <p className='text-xl font-mono text-gray-400'>No Meals added in favourites Yet...</p>
          </div>
        }
        </div>
      </div>
    </div>
  )
}
