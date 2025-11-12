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
      <div className='flex items-center gap-20'>
        <div>
        <img src={meal.recipe.image} alt={meal.recipe.label} className='rounded-2xl h-100 m-20 '/> 
        </div>
        <div>
          <p className=' text-2xl font-semibold font-mono mb-3'>Meal Recipe Includes:</p>
          {
            meal.recipe.ingredients.map((i, index) => (
              
              <div 
                key={index}
                style={{backgroundImage: 'linear-gradient(to right, #bfdbfe, white)'}}
                className={` rounded-2xl px-5 mb-3 cursor-pointer shadow-md max-w-100`}
                onClick={() => handleIngredientClick(index)}
              >
              
                <p className='py-2 font-semibold'>{i.text}</p>
               
                <div 
                    className={`
                        overflow-hidden 
                        transition-all 
                        duration-500 
                        ease-in-out 
                        ${expandedIndex === index ? 'max-h-96 pb-3' : 'max-h-0'}
                    `}
                >
                  <div className='flex items-center gap-5 w-70'>
                    <img src={i.image} className='h-30 w-30 rounded-2xl'/>
                    <div className='font-mono'>
                      <div><span className='font-bold'>Food: </span><span>{i.food}</span></div>
                      <div className='my-3'><span className='font-bold'>Category: </span><span>{i.foodCategory}</span></div>
                      <div><span className='font-bold'>Weight: </span><span>{Math.round(i.weight)}</span></div>
                      
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}