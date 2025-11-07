import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar';
import HeroSection from '../Components/HeroSection';
import Food1 from '../assets/Food1.jpg';
import { FaUserGear } from "react-icons/fa6";
import { FaBowlFood } from "react-icons/fa6";
import { FaPlateWheat } from "react-icons/fa6";
import { X } from 'lucide-react';
import { CheckCircle } from 'lucide-react';
import { useCart } from '../Context/CartContext';
const MEALS_BATCH_SIZE = 4;

export default function Home() {
  const APP_ID = import.meta.env.VITE_EDAMAM_APP_ID;
const APP_KEY = import.meta.env.VITE_EDAMAM_APP_KEY;


  const searchTerm = 'pasta';
  const [foods, setFoods] = useState([]);
  const [trendFoods, setTrendFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currIdx, setCurrIdx] = useState(0);
  const [visibleMeals, setVisibleMeals] = useState([]);
  const [modal, setModal] = useState(false);
  const [details, setDetails] = useState({});
  const { favourites, setFavourites } = useCart();
  const [msg, setMsg] = useState(false);

  const fetchRecipes = async () => {
    const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchTerm}&app_id=${APP_ID}&app_key=${APP_KEY}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched Recipes:", data.hits);
      const fetchedRecipes = data.hits;
      const topFiveFoods = fetchedRecipes.slice(0, 8);
      const allFoods = fetchedRecipes.slice(8, 20);

      setFoods(allFoods);
      setTrendFoods(topFiveFoods);

      setVisibleMeals(allFoods.slice(0, MEALS_BATCH_SIZE));

      setIsLoading(false)
    } catch (error) {
      console.error("API Call Failed:", error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
    if (trendFoods.length > 0) {
      const interval = setInterval(() => {
        setCurrIdx(prev => (prev + 1) % 3);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [trendFoods]);

  const hasMoreMeals = visibleMeals.length < foods.length;

  const handleLoadMore = () => {
    const nextBatchStart = visibleMeals.length;
    const nextBatchEnd = nextBatchStart + MEALS_BATCH_SIZE;

    const nextBatch = foods.slice(nextBatchStart, nextBatchEnd);

    setVisibleMeals((prev) => [...prev, ...nextBatch])
  }
  const currScreen = window.location.pathname;

  const handleViewDetails = (item) => {
    setDetails(item);
    setModal(true)
    console.log(item);
   
  }

  const handleFavourites = (item) => {
    setFavourites(prev => [...prev, item]);
    console.log("Meal Added to Cart", item);
     setMsg(true);
     setTimeout(() => {
      setMsg(false);
     }, 5000);
  }
  return (
    <div>
      <Navbar />
      <HeroSection path={currScreen} />
      <div className='h-120 bg-linear-to-r from-blue-200 to-white my-20'>
        <p className='text-3xl font-bold px-20 py-10'>Trending Recipes</p>
        <div className='px-20'>
          {
            !isLoading ?
              <div className=' w-350 overflow-hidden relative'>
                <div className='flex justify-start transition-transform duration-500 ease-in-out'
                  style={{ transform: `translateX(-${currIdx * 50}%)` }}>
                  {trendFoods.map((item) => (
                    <div className='min-w-[25%] shrink-0 p-2'>
                      <img src={item.recipe.image} className=' rounded-2xl' />
                    </div>
                  ))}
                </div>
              </div>
              :
              (
                <p className='text-2xl text-gray-400'>Loading...</p>
              )
          }
        </div>
      </div>
      <div className='h-120 py-10 rounded-t-4xl'>
        <p className='text-3xl font-bold ml-20'>Categories to Explore</p>
        <div className='flex items-center justify-between px-20'>
          <img src={Food1} className='h-70 my-10 rounded-2xl' />
          <div className='h-50 w-50 rounded-2xl bg-white shadow-md text-center px-15 hover:-translate-y-5 transition-all duration-500 hover:shadow-xl cursor-pointer'>
            <FaUserGear size={50} color='grey' className='mt-10 ml-5' />
            <p>Personalized Meal Plans</p>
          </div>
          <div className='h-50 w-50 rounded-2xl bg-white shadow-md text-center px-15 hover:-translate-y-5 transition-all duration-500 hover:shadow-xl cursor-pointer'>
            <p>Save Your Favourites</p>
          </div>
          <div className='h-50 w-50 rounded-2xl bg-white shadow-md text-center px-15 hover:-translate-y-5 transition-all duration-500 hover:shadow-xl cursor-pointer'>
            <FaPlateWheat size={50} color='grey' className='mt-10 ml-5' />
            <p>Cook with Confidence</p>
          </div>
          <div className='h-50 w-50 rounded-2xl bg-white shadow-md text-center px-15 hover:-translate-y-5 duration-500 hover:shadow-xl transition-all cursor-pointer'>
            <FaBowlFood size={50} color='grey' className='mt-10 ml-5' />
            <p>Cook with...</p>
          </div>
        </div>
      </div>
      <div className='px-20'>
        <p className='text-3xl font-bold py-10'>All Meals</p>
        {
          !isLoading ?
            (
              <div className='flex flex-col gap-10 h-320'>
                {visibleMeals.map((foodItems, index) => (
                  <div className='flex items-center font-mono gap-40'>
                    <img src={foodItems.recipe.image} className='h-70 w-70 rounded-2xl' />
                    <div>
                      <p className='text-2xl font-bold mb-3'>{foodItems.recipe.label}</p>
                      <div>
                        <span className='font-bold'>Calories: </span><span>{Math.round(foodItems.recipe.calories)} cal</span>
                      </div>
                      <div className='my-3'>
                        <span className='font-bold'>Cusine Type: </span><span>{foodItems.recipe.cuisineType}</span>
                      </div>
                      <div className='mb-3'>
                        <span className='font-bold'>Dish Type: </span><span>{foodItems.recipe.dishType}</span>
                      </div>
                      <button className='bg-blue-200 text-white py-2 px-5 cursor-pointer transition-all hover:scale-105 hover:shadow-md duration-500 rounded' onClick={() => handleViewDetails(foodItems)}>View Details</button>
                      <button className='bg-blue-200 text-white py-2 px-5 ml-5 cursor-pointer transition-all hover:scale-105 hover:shadow-md duration-500 rounded' onClick={() => handleFavourites(foodItems)}>Add to Favourites</button>
                    </div>
                  </div>
                ))}
                {hasMoreMeals && (
                  <p className='text-xl cursor-pointer text-gray-400 pb-10' onClick={() => handleLoadMore()}>Load More...</p>
                )}
              </div>
            )
            :
            (
              <p>Loading...</p>
            )
        }
      </div>
      {

        <div className={`fixed inset-0 z-100 ${modal ? 'bg-black/50 opacity-100 pointer-events-auto' : 'bg-transparent opacity-0 pointer-events-none'} transition-all duration-500`}>
          <div className={`h-120 w-200 rounded-2xl bg-white shadow-xl relative top-30 left-90 ${modal ? 'scale-100' : 'scale-0'} transition-transform duration-500`}>
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
                  <span className='font-bold my-3'>Dish Types: </span><span className='flex flex-wrap gap-3'>{details.recipe?.healthLabels.map((item) => (
                    <p className='py-1 px-3 ml-3 bg-blue-200 rounded-2xl'>{item}</p>
                  ))}</span>

                </div>
              </div>
            </div>
            <p></p>
          </div>
        </div>
      }
      <div className={`bg-white h-20 w-90 fixed right-20 bottom-10 rounded-2xl shadow-md flex items-center ${msg ? 'opacity-100' : 'opacity-0'} transition-all duration-500`}>
        <CheckCircle size={35} color='black' className=' mx-5' />
        <p className='text-xl font-mono'>Meal Added to Favourites</p>
      </div>
    </div>
  )
}
