import React from 'react';
import Navbar from '../Components/Navbar';
import HeroSection from '../Components/HeroSection';

export default function Planning() {
  const currScreen = window.location.pathname;
  return (
    <div>
      <Navbar />
      <HeroSection path={currScreen} />
      <div>
        <div className='px-20 mt-10'>
        <p className='text-xl'>Tailor-made meal plans designed for your health goals and lifestyle.</p>
        <p className='text-xl'>Delicious, easy, and nutriciest approved</p>
        <p className='text-2xl font-bold my-10'>Filter By:</p>
        </div>
        <div className='flex items-center justify-between px-20'>
          <div>
            <p className='mb-2'>Goal</p>
            <select name="Goal" className='appearance-none border border-gray-400 pl-3 pr-7 rounded py-1.75 focus:outline-none focus:border-blue-400'>
              <option>Loss Weight</option>
              <option>Maintain Weight</option>
              <option>Gain Weight</option>
            </select>
          </div>
          <div>
            <p className='mb-2'>Diet</p>

            <select name="Diet" className='appearance-none border border-gray-400 pl-3 pr-7 rounded py-1.75 focus:outline-none focus:border-blue-400'>
              <option value="">Keto-Friendly</option>
              <option value="">Paleo</option>
              <option value="">Mediterranean</option>
              <option value="">High Protein</option>
            </select>
          </div>
          <div>
            <p className='mb-2'>Dietary Type</p>
            <select name="Type" className='appearance-none border border-gray-400 pl-3 pr-7 rounded py-1.75 focus:outline-none focus:border-blue-400'>
              <option value="">Gluten-Free</option>
              <option value="">Dairy-Free</option>
              <option value="">Vegan</option>
              <option value="">Vegetarian</option>
            </select>
          </div>
          <div className='space-y-2'>
            <p className='mb-2'>Nutrient Targets</p>

            <select name="MacroNutrient" className='appearance-none border border-gray-400 pl-3 pr-7 rounded py-1.75 focus:outline-none focus:border-blue-400'>
              <option value="">Protein</option>
              <option value="">Carbs</option>
              <option value="">Fat</option>
              <option value="">Calories</option>
            </select>
          </div>

          <div className='space-y-2'>
            <p className='opacity-0'>_</p>
            <select name="HealthNutrient" className='appearance-none border border-gray-400 pl-3 pr-7 rounded py-1.75 focus:outline-none focus:border-blue-400'>
              <option value="">Sodium</option>
              <option value="">Sugar</option>
              <option value="">Potassium</option>
              <option value="">Fiber</option>
            </select>
          </div>

          <div className='space-y-2'>
            <p className='opacity-0'>_</p> 
            <select name="FatsQuality" className='appearance-none border border-gray-400 pl-3 pr-7 rounded py-1.75 focus:outline-none focus:border-blue-400'>
              <option value="">Saturated Fat</option>
              <option value="">Cholesterol</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}
