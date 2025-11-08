import React,{useState} from 'react';
import Navbar from '../Components/Navbar';
import HeroSection from '../Components/HeroSection';
import { Search, Settings2 } from 'lucide-react';

export default function Planning() {
  const [filter, setFilter] = useState(false);
  const currScreen = window.location.pathname;
  const [visibleHealthLabels, setVisibleHealthLabels] = useState([]);

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
"Sesame-Free", "Lupine-Free", "Mollusk-Free", "Alcohol-Free", "No oil added", "Sulfite-Free",
"Vegetarian", "Pescatarian","Pork-Free", "Red-Meat-Free", "Dairy-Free","Kosher","Vegan", "DASH",
"Immuno-Supportive","Mollusk-Free"
  ];

  const VISIBLE_LABELS_SIZE = 7;
  
  const handleFilter = () => {
    setFilter(!filter);
    setVisibleHealthLabels(healthLabels.slice(0, 7));
  }

  const handleLoadMore = () => {
      const batchStart = visibleHealthLabels.length;
      const batchEnd = batchStart + VISIBLE_LABELS_SIZE;

      const nextBatch = healthLabels.slice(batchStart, batchEnd);
      setVisibleHealthLabels(prev => [...prev, ...nextBatch])
  }
  const handleLoadLess = () => {
      const batchStart = visibleHealthLabels.length;
      const batchEnd = batchStart + VISIBLE_LABELS_SIZE;

      const nextBatch = healthLabels.slice(batchStart, batchEnd);
      setVisibleHealthLabels(prev => [...prev, ...nextBatch])
  }
  

  const hasMoreLabels = visibleHealthLabels.length < healthLabels.length;
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
        <Settings2 size={25} color='black' className='ml-3 cursor-pointer' onClick={() => handleFilter()}/>
      </div>

      
      <div className={`relative bg-white shadow-lg py-5 w-340 ml-20 rounded-2xl overflow-hidden ${filter ? 'max-h-190' : 'max-h-0 pointer-events-none opacity-0'} transition-all duration-1000 ease-in-out`}>
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
        <ul className='flex flex-wrap gap-5 items-center'>
          {visibleHealthLabels.map((i) => (
            <li className='bg-blue-200 rounded-2xl py-1.5 w-fit px-5 ml-3 cursor-pointer hover:shadow-md transition-shadow duration-500'>{i}</li>
            
          ))}
          {
            hasMoreLabels ?
            <p className='text-gray-500 text-lg cursor-pointer' onClick={() => handleLoadMore()}>Show more...</p>
            :
            <p className='text-gray-500 text-lg cursor-pointer' onClick={() => handleLoadLess()}>Show Less...</p>
          }
        </ul>
      </div>
      <button className=' ml-300 bg-blue-200 rounded py-2 px-5 mt-15 hover:shadow-md cursor-pointer hover:scale-105 transition-transform duration-500'>Apply Filter</button>
      </div>
    </div>
  )
}
