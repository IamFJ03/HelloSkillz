import React from 'react';
import Navbar from '../Components/Navbar';
import HeroSection from '../Components/HeroSection';
import { Search } from 'lucide-react';

export default function Planning() {
  const currScreen = window.location.pathname;

  const dietLabels = [
    'Balanced', 'High Fiber',
    'Low Fat', 'Low Sodium',
    'Low-Carb'
  ];

  const cuisineType = [
    'italian', 'mediterranean', 'american', 'greek', 'asian', 'french'
  ]

  const healthLabels = [
    "Sugar-Conscious", "Low Potassium", "Kidney-Friendly", "Egg-Free", "Peanut-Free", "Tree-Nut-Free",
"Soy-Free", "Fish-Free", "Shellfish-Free", "Crustacean-Free", "Celery-Free", "Mustard-Free",
"Sesame-Free", "Lupine-Free", "Mollusk-Free", "Alcohol-Free", "No oil added", "Sulfite-Free"
  ]
  return (
    <div>
      <Navbar />
      <HeroSection path={currScreen} />
      <div className='px-20 my-10 flex items-center font-mono'>
        <input type='text' placeholder='Find Your Next Delicioius Meal' className='
        w-330 py-2 px-5 placeholder-gray-400 rounded-tl rounded-bl shadow-md border border-gray-100 focus:outline-none focus:border-blue-500 transition-colors duration-500 
        '/>
        <div className='bg-blue-200 p-2.75 rounded'>
        <Search size={20} color='white' className='cursor-pointer'/>
        </div>
      </div>
      <div className='flex items-center gap-10 px-20 font-mono my-10'>
        <p className='text-xl font-semibold'>Diet Labels:</p>
        <ul className='flex'>
          {dietLabels.map((i) => (
            <li className='bg-blue-200 rounded-2xl py-1.5 px-5 ml-3 cursor-pointer hover:shadow-md transition-shadow duration-500'>{i}</li>
          ))}
        </ul>
      </div>
      <div className='flex items-center gap-10 px-20 font-mono'>
        <p className='text-xl font-semibold'>Cuisine Types:</p>
        <ul className='flex'>
          {cuisineType.map((i) => (
            <li className='bg-blue-200 rounded-2xl py-1.5 px-5 ml-3 cursor-pointer hover:shadow-md transition-shadow duration-500'>{i}</li>
          ))}
        </ul>
      </div>
      <div className='flex gap-10 px-20 font-mono mt-10'>
        <p className='text-xl font-semibold'>Health Labels:</p>
        <ul className='flex flex-wrap gap-5'>
          {healthLabels.map((i) => (
            <li className='bg-blue-200 rounded-2xl py-1.5 w-fit px-5 ml-3 cursor-pointer hover:shadow-md transition-shadow duration-500'>{i}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
