import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import HeroSection from '../Components/HeroSection';
import { useCart } from '../Context/CartContext';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export default function Favourites() {
  const [meals, setMeals] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState({});
  const { favourites } = useCart();

  const navigate = useNavigate();
  useEffect(() => {
    console.log("Meal Found!", favourites);
    setMeals(favourites)
  }, [favourites])

  const handleModal = (item) => {
    setSelectedMeal(item);
    setModal(true);
  }

  const handleProceed = () => {
      navigate('/recipe', { 
        state:{
          meal: selectedMeal
        }
      })
      setModal(false);
      setSelectedMeal({});
  }
  const pathname = window.location.pathname;
  return (
    <div>
      <Navbar />
      <HeroSection path={pathname}/>
      <div>
        <p className='px-20 text-2xl font-mono font-semibold mt-10'>Favourites:</p>
        <div className='my-10'>
          {
            meals.length > 0 ?
              <div className="flex gap-10 md:ml-20 ml-6 md:overflow-auto md:flex-nowrap flex-wrap">
                {meals.map(item => (
                  <div key={item.recipe.uri} style={{backgroundImage: 'linear-gradient(to right, #bfdbfe, white)'}} className="h-110 bg-white shadow-lg relative min-w-[20%] rounded-2xl">
                    <img src={item.recipe.image} alt={item.recipe.label} className="rounded-2xl" />
                    <p className="text-xl font-bold p-3">{item.recipe.label}</p>
                    <button className="bg-blue-200 py-1 px-3 rounded-2xl cursor-pointer absolute right-5 bottom-5" onClick={() => handleModal(item)}>
                      View Recipe
                    </button>
                  </div>
                ))}
              </div>
              :
              <div>
                <p className='text-xl font-mono text-gray-400 ml-20'>No Meals added in favourites Yet...</p>
              </div>
          }
        </div>
      </div>

      <div className={` fixed md:w-screen w-90 inset-0 transition-all duration-500 ${modal ? 'bg-black/50 opacity-100 pointer-events-auto' : 'bg-transparent opacity-0 pointer-events-none'}`}>
        <div className={`relative md:h-70 h-80 md:w-120 w-80 bg-white shadow-lg rounded-2xl md:left-120 left-6 mt-50 ${modal ? 'scale-100' : 'scale-0'} transition-transform duration-500`} >
          <X size={25} color='black' className='absolute right-5 top-5 cursor-pointer' onClick={() => setModal(false)} />
          <p className='pt-17 text-xl font-bold px-17'>Are you Sure you want to proceed??</p>
          <p className='px-17 my-5 '>By Proceeding Further you are using your 1 of 3 free meal recipe findings</p>
          <div className='flex justify-between px-15'>
          <button className='px-5 py-1 cursor-pointer bg-blue-200 rounded hover:scale-105 hover:shadow-md transition-all duration-500' onClick={() => setModal(false)}>Cancel</button>
          <button className='px-5 py-1 cursor-pointer bg-blue-200 rounded hover:scale-105 hover:shadow-md transition-all duration-500' onClick={() => handleProceed()}>Proceed</button>
          </div>
        </div>
      </div>
    </div>
  )
}
