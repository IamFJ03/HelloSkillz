import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import HeroSection from '../Components/HeroSection';
import { Search, Settings2, Settings } from 'lucide-react';
import { useCart } from '../Context/CartContext';
import { X, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

export default function Planning() {
  const [filter, setFilter] = useState(false);
  const currScreen = window.location.pathname;
  const [visibleHealthLabels, setVisibleHealthLabels] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { allMeals, setFavourites } = useCart();
  const [searchMeals, setSearchMeals] = useState([]);
  const [modal, setModal] = useState(false);
  const [details, setDetails] = useState({});
  const [msg, setMsg] = useState("");
  const [filterLabels, setFilterLabels] = useState([]);
  const [label, setLabel] = useState("");
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [infoMsg, setInfoMsg] = useState("");

  const APP_ID = import.meta.env.VITE_EDAMAM_APP_ID;
  const APP_KEY = import.meta.env.VITE_EDAMAM_APP_KEY;

  const MEALS_SIZE = 5;

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
    setFilterLabels([]);
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

  const handleFavourites = async (item) => {
    setFavourites(prev => [...prev, item]);
    console.log("Meal Added to Cart", item);

    const recipeTitle = item.recipe.text;
    const recipeImage = item.recipe.image;
    const recipeLabel = item.recipe.label;
    const recipeIngredients = item.recipe.ingredients;

    setTitle(recipeTitle);
    setImage(recipeImage);
    setLabel(recipeLabel);
    setIngredients(recipeIngredients);

    const token = await localStorage.getItem("token");

    const res = await axios.post(
      "http://localhost:5000/api/cart/addtocart",
      {
        title: recipeTitle,
        image: recipeImage,
        label: recipeLabel,
        ingredients: recipeIngredients
      },
      {
        headers: {
          authorization: `Bearer ${token}`
        }
      }
    );
    if (res.data.message === "Meal already present") {
      console.log("Meal Already Present");
      setInfoMsg("Meal Already in Favourites")
    }
    else if (res.data.message === "Meal Added") {
      console.log("Meal Added Successfully", res.data.newRecipe);
      setInfoMsg("Meal Added to favourites")
    }
    setMsg(true);

    setTimeout(() => setMsg(false), 5000);
  };

  const handleLabelClick = (label) => {
    setFilterLabels((prev) => {

      const alreadyExists = prev.some(l => l.toLowerCase() === label.toLowerCase());
      if (alreadyExists) {
        return prev.filter(l => l.toLowerCase() !== label.toLowerCase());
      }

      return [...prev, label]
    });
  };

  const hasMoreLabels = visibleHealthLabels.length < healthLabels.length;
  return (
    <div>
      <Navbar />
      <HeroSection path={currScreen} />
      <div className='md:px-20 px-10 my-10 flex items-center font-mono'>
        <input type='text' placeholder='Find Your Next Delicioius Meal' value={searchTerm} className='
        w-330 py-2 px-5 placeholder-gray-400 rounded-tl rounded-bl shadow-md border border-gray-100 focus:outline-none focus:border-blue-500 transition-colors duration-500 
        ' onChange={(e) => setSearchTerm(e.target.value)} />
        <div className="flex gap-2 bg-white items-center">
          <div className='bg-blue-200 p-2.75 rounded'>
            <Search size={20} color='white' className='cursor-pointer' onClick={() => handleSearch()} />
          </div>
          <Settings color="black" size={30} className='cursor-pointer' onClick={() => handleFilter()} />
        </div>
      </div>

      <div className={`relative bg-white shadow-lg py-5 md:w-340 w-75 md:ml-20 ml-10 rounded-2xl overflow-hidden mb-10 ${filter ? 'md:max-h-190 max-h-555' : 'max-h-0 pointer-events-none opacity-0'} transition-all duration-1000 ease-in-out`}>
        <div className='flex md:flex-row flex-col gap-5 items-center'>
          <div className='md:w-250 md:ml-45 w-60 ml-7  py-1 px-3 border min-h-13 border-blue-200 shadow-md h-fit max-h-70 flex flex-wrap overflow-auto'>
            {filterLabels.map((i) => (
              <div style={{ backgroundColor: '#bfdbfe' }} className='rounded-2xl py-1.5 px-4 ml-3 my-2 flex items-center'>
                <span>{i}</span>
                <X color='black' size={15} onClick={() => handleLabelClick(i)} className='mt-1 ml-1 cursor-pointer' />
              </div>
            ))}
          </div>
          <button className='h-12 bg-blue-200 rounded py-2 px-5 hover:shadow-md cursor-pointer hover:scale-105 transition-transform duration-500'>Apply Filter</button>
        </div>
        <div className='flex items-center gap-10 px-10 font-mono my-10'>
          <p className='text-xl font-semibold'>Diet Labels:</p>
          <ul className='flex flex-wrap md:flex-nowrap gap-5'>
            {dietLabels.map((i) => (
              <li
                key={i}
                className='bg-blue-200 rounded-2xl py-1.5 px-5 ml-3 cursor-pointer hover:shadow-md transition-shadow duration-500'
                onClick={() => handleLabelClick(i)}
              >
                {i}
              </li>
            ))}

          </ul>
        </div>
        <div className='flex items-center gap-10 px-10 font-mono'>
          <p className='text-xl font-semibold'>Cuisine Types:</p>
          <ul className='flex flex-wrap md:flex-nowrap gap-5'>
            {cuisineType.map((i) => (
              <li
                key={i}
                className='bg-blue-200 rounded-2xl py-1.5 px-5 ml-3 cursor-pointer hover:shadow-md transition-shadow duration-500'
                onClick={() => handleLabelClick(i)}
              >
                {i}
              </li>
            ))}
          </ul>
        </div>
        <div className='flex gap-10 px-10 font-mono mt-10'>
          <p className='text-xl font-semibold'>Health Labels:</p>
          <ul className='flex flex-wrap gap-5 items-center'>
            {visibleHealthLabels.map((i) => (
              <li
                key={i}
                className='bg-blue-200 rounded-2xl py-1.5 w-fit px-5 ml-3 cursor-pointer hover:shadow-md transition-shadow duration-500'
                onClick={() => handleLabelClick(i)}
              >
                {i}
              </li>
            ))}
            {
              hasMoreLabels ?
                <p className='text-gray-500 text-lg cursor-pointer' onClick={() => handleLoadMore()}>Show more...</p>
                :
                <p className='text-gray-500 text-lg cursor-pointer' onClick={() => handleLoadLess()}>Show Less...</p>
            }
          </ul>
        </div>

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
            <motion.p className='text-xl font-mono px-20 text-gray-500' animate={{ y: -10 }} transition={{ repeat: Infinity, duration: 0.5, repeatType: "reverse", ease: "easeInOut" }}>Loading...</motion.p>
          </div>}
      </div>
      <div className={`fixed inset-0 z-100 ${modal ? 'bg-black/50 opacity-100 pointer-events-auto' : 'bg-transparent opacity-0 pointer-events-none'} transition-all duration-500`}>
        <div className={`md:h-fit h-165 md:w-200 pb-10  rounded-2xl bg-white shadow-xl absolute md:relative md:top-10 md:left-90 bottom-0 overflow-auto ${modal ? 'scale-100' : 'scale-0 '} transition-transform duration-500`}>
          <div className='flex items-center justify-between px-10 pt-10'>
            <p className='font-bold font-mono text-2xl '>Meal Details:</p>
            <X color='black' size={25} onClick={() => setModal(false)} className='cursor-pointer' />
          </div>
          <div className='flex md:flex-row flex-col items-center justify-between px-10 gap-10'>
            <img src={details.recipe?.image} className='md:h-70 md:w-70 h-40 w-40 rounded-2xl mt-15' />
            <div className='font-mono text-lg'>
              <span className='font-bold'>Name: </span><span>{details.recipe?.label}</span>
              <div className='flex items-center'>
                <span className='font-bold my-5'>Diets: </span><span className='flex'>{details.recipe?.dietLabels.map((item) => (
                  <p className='py-1 px-3 ml-3 my-3 bg-blue-200 rounded-2xl'>{item} </p>
                ))}</span>

              </div>
              <div>
                <span className='font-bold'>Meal Type: </span><span>{details.recipe?.mealType}</span>
              </div>
              <div className='flex my-5'>
                <span className='font-bold my-3'>Dish Types: </span><span className='flex flex-wrap gap-3'>{details.recipe?.healthLabels.slice(0, 10).map((item) => (
                  <p className='py-1 px-3 ml-3  bg-blue-200 rounded-2xl'>{item}</p>
                ))}</span>

              </div>
              <div>
                <p style={{ backgroundImage: 'linear-gradient(to right, #bfdbfe, white)' }} className=' w-60 rounded px-7 py-1 cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-500 shadow-md' onClick={() => handleFavourites(details)}>Add to favourites</p>
              </div>
            </div>
          </div>
          <p></p>
        </div>
      </div>
      <div className={`bg-white md:h-20 md:w-90 w-80 md:py-0 py-5 fixed right-6 top-10 md:right-20 md:bottom-10 md:top-auto  rounded-2xl shadow-md flex items-center ${msg ? 'opacity-100' : 'opacity-0'} transition-all duration-500`}>
        <CheckCircle size={35} color='black' className=' mx-5' />
        <p className='text-xl font-mono'>{infoMsg && infoMsg}</p>
      </div>

    </div>
  )
}
