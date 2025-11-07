import React,{useEffect, useState} from 'react';
import Navbar from '../Components/Navbar';
import { useLocation } from 'react-router-dom';

export default function Recipe() {
  const location = useLocation();
  const { meal } = location.state || {};
  const [expandedIndex, setExpandedIndex] = useState(null); 

  useEffect(() => {
      console.log(meal);
  },[meal]) 
  
  const handleIngredientClick = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  }
  
  if (!meal || !meal.recipe) {
    return (
        <div>
            <Navbar />
            <p className='text-xl text-red-500 m-10'>No recipe data found. Please go back and select a meal.</p>
        </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className='flex items-center'>
        <div>
        <img src={meal.recipe.image} alt={meal.recipe.label} className='rounded-2xl h-100 m-20 '/> 
        </div>
        <div>
          <p className=' text-2xl font-semibold font-mono mb-3'>Meal Recipe Includes:</p>
          {
            meal.recipe.ingredientLines.map((i, index) => (
              
              <div 
                key={index}
                className={`bg-blue-200 rounded-2xl px-5 mb-3 cursor-pointer shadow-md`}
                onClick={() => handleIngredientClick(index)}
              >
              
                <p className='py-2 font-semibold'>{i}</p>
               
                <div 
                    className={`
                        overflow-hidden 
                        transition-all 
                        duration-500 
                        ease-in-out 
                        ${expandedIndex === index ? 'max-h-96 pb-3' : 'max-h-0'}
                    `}
                >
                    <p className='text-sm text-gray-700'>
                        This ingredient is key for the flavor profile. 
                        It is part of a healthy diet plan.
                    </p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}