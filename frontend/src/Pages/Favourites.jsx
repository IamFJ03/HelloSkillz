import React,{useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import { useCart } from '../Context/CartContext';
export default function Favourites() {
  const [meals, setMeals] = useState([]);
  const {favourites} = useCart();
  useEffect(() => {
    console.log("Meal Found!", favourites);
    setMeals(favourites)
  },[favourites])
  return (
    <div>
      <Navbar />
      <div>
        <div className='ml-20'>
        <p className='text-2xl font-bold font-mono mt-10'>Favourites:</p>
        <p>Your curated collection of culinary delights</p>
        </div>
        <div className='mt-10'>
        {
          meals.length > 0 ?
          <div className="flex gap-10 ml-20 overflow-x-auto hide-scrollbar">
  {meals.map(item => (
    <div key={item.recipe.uri} className="h-110 bg-white shadow-md relative min-w-70">
      <img src={item.recipe.image} alt={item.recipe.label} className="rounded-2xl" />
      <p className="text-xl font-bold p-3">{item.recipe.label}</p>
      <button className="bg-blue-200 py-1 px-3 rounded-2xl cursor-pointer absolute right-5 bottom-5">
        View Recipe
      </button>
    </div>
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
