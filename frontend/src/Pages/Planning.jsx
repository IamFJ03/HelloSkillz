import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import HeroSection from '../Components/HeroSection';
import { Search, Settings2 } from 'lucide-react';
import { useCart } from '../Context/CartContext';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Planning() {
  const [filter, setFilter] = useState(false);
  const currScreen = window.location.pathname;
  const [visibleHealthLabels, setVisibleHealthLabels] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { allMeals } = useCart();
  const [searchMeals, setSearchMeals] = useState([]);
  const [modal, setModal] = useState(false);
  const [details, setDetails] = useState({});
  const APP_ID = import.meta.env.VITE_EDAMAM_APP_ID;
  const APP_KEY = import.meta.env.VITE_EDAMAM_APP_KEY;

  useEffect(() => {
    setSearchMeals(allMeals);
  }, [])

  const fetchMeals = async () => {
    const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchTerm}&app_id=${APP_ID}&app_key=${APP_KEY}`;
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      console.log("Meals:", data.hits);
      setSearchMeals(data.hits);
      setSearchTerm("");
    }
    catch (e) {
      console.log("API Call Failed", e);

    }
  }

  useEffect(() => {
    console.log(allMeals);

  }, [])

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
    "Vegetarian", "Pescatarian", "Pork-Free", "Red-Meat-Free", "Dairy-Free", "Kosher", "Vegan", "DASH",
    "Immuno-Supportive", "Mollusk-Free"
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
    const batchEnd = batchStart - VISIBLE_LABELS_SIZE;

    const nextBatch = healthLabels.slice(0, batchEnd);
    setVisibleHealthLabels(nextBatch)
  }

  const handleSearch = () => {
    console.log("Search Item:", searchTerm);

    fetchMeals();
  }

  const hasMoreLabels = visibleHealthLabels.length < healthLabels.length;
  return (
    <div>
      <Navbar />
      <HeroSection path={currScreen} />
      <div className='px-20 my-10 flex items-center font-mono'>
        <input type='text' placeholder='Find Your Next Delicioius Meal' value={searchTerm} className='
        w-330 py-2 px-5 placeholder-gray-400 rounded-tl rounded-bl shadow-md border border-gray-100 focus:outline-none focus:border-blue-500 transition-colors duration-500 
        ' onChange={(e) => setSearchTerm(e.target.value)} />
        <div className='bg-blue-200 p-2.75 rounded'>
          <Search size={20} color='white' className='cursor-pointer' onClick={() => handleSearch()} />
        </div>
        <Settings2 size={25} color='black' className='ml-3 cursor-pointer' onClick={() => handleFilter()} />
      </div>


      <div className={`relative bg-white shadow-lg py-5 w-340 ml-20 rounded-2xl overflow-hidden mb-10 ${filter ? 'max-h-190' : 'max-h-0 pointer-events-none opacity-0'} transition-all duration-1000 ease-in-out`}>
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
      <div>
        {searchMeals.length > 0 ?
          <div className='flex flex-wrap gap-10 px-20'>
            {searchMeals.map((i) => (
              <div
                key={i.recipe.uri}
                className='h-130 w-75 [perspective:1000px] cursor-pointer'
                onClick={() => {
                  setDetails(i)
                  setModal(true)
                }}
              >

                <div className='relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] hover:rotate-y-180'>
                  <div className='absolute inset-0 w-full h-full shadow-md rounded-2xl bg-white [backface-visibility:hidden] hover:shadow-xl hover:-translate-y-10 transition-all duration-500'>
                    <img src={i.recipe.image} className='rounded-2xl' />
                    <p className='px-10 pt-5 text-lg font-mono'>{i.recipe.label}</p>
                    <p className='px-10 pt-3 text-lg font-mono'>{Math.round(i.recipe.calories)} calories</p>
                    <p className='px-10 pt-3 text-lg font-mono'>{i.recipe.dishType}</p>
                  </div>

                  <div className='absolute inset-0 w-full h-full shadow-md rounded-2xl bg-blue-100 [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col items-center justify-center p-5'>
                    <p className='text-3xl font-bold font-mono text-blue-800'>View Details</p>
                    <p className='text-xl font-bold font-mono'>or</p>
                    <p className='text-3xl font-bold font-mono text-blue-800 px-10'>Add To Favourites</p>
                  </div>

                </div>
              </div>
            ))}
          </div>
          :
          <div>
            <motion.p className='text-xl font-mono' animate={{ y:-10}} transition={{ repeat: Infinity, duration: 0.5, repeatType: "reverse", ease: "easeInOut" }}>Loading...</motion.p>
          </div>}
      </div>
      <div className={`fixed inset-0 z-100 ${modal ? 'bg-black/50 opacity-100 pointer-events-auto' : 'bg-transparent opacity-0 pointer-events-none'} transition-all duration-500`}>
        <div className={`h-fit w-200 pb-10 rounded-2xl bg-white shadow-xl relative top-10 left-90 ${modal ? 'scale-100' : 'scale-0 '} transition-transform duration-500`}>
          <div className='flex items-center justify-between px-10 pt-10'>
            <p className='font-bold font-mono text-2xl '>Meal Details:</p>
            <X color='black' size={25} onClick={() => setModal(false)} className='cursor-pointer' />
          </div>
          <div className='flex items-center justify-between px-10 gap-10'>
            <img src={details.recipe?.image} className='h-70 w-70 rounded-2xl' />
            <div className='font-mono text-lg'>
              <span className='font-bold'>Name: </span><span>{details.recipe?.label}</span>
              <div className='flex items-center'>
                <span className='font-bold my-5'>Diets: </span><span className='flex'>{details.recipe?.dietLabels.map((item) => (
                  <p className='py-1 px-3 ml-3 bg-blue-200 rounded-2xl'>{item} </p>
                ))}</span>

              </div>
              <div>
                <span className='font-bold'>Meal Type: </span><span>{details.recipe?.mealType}</span>
              </div>
              <div className='flex my-5'>
                <span className='font-bold my-3'>Dish Types: </span><span className='flex flex-wrap gap-3'>{details.recipe?.healthLabels.slice(0, 10).map((item) => (
                  <p className='py-1 px-3 ml-3 bg-blue-200 rounded-2xl'>{item}</p>
                ))}</span>

              </div>
              <div>
                <p className='bg-blue-200 w-60 rounded px-7 py-1 cursor-pointer'>Add to favourites</p>
              </div>
            </div>
          </div>
          <p></p>
        </div>
      </div>
    </div>
  )
}
