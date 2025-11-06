import React from 'react';
import Navbar from '../Components/Navbar';
import HeroSection from '../Components/HeroSection';

export default function Planning() {
  const currScreen = window.location.pathname;
  return (
    <div>
      <Navbar />
      <HeroSection path={currScreen} />
      <div className='h-100 bg-linear-to-r from-blue-200 to-white'>
        <div className='px-20 py-10 mt-20'>
          <p className='text-xl'>Tailor-made meal plans designed for your health goals and lifestyle.</p>
          <p className='text-xl'>Delicious, easy, and nutriciest approved</p>
          <p className='text-2xl font-bold mt-10'>Filter By:</p>
        </div>
        <div className='flex items-center justify-between px-20'>
          <div>
            <p className='mb-2'>Goal</p>
            <select name="Goal" className='appearance-none border border-gray-400 pl-3 pr-7 rounded py-1.75 focus:outline-none focus:border-blue-400 cursor-pointer'>
              <option>Loss Weight</option>
              <option>Maintain Weight</option>
              <option>Gain Weight</option>
            </select>
          </div>
          <div>
            <p className='mb-2'>Diet</p>
            <select name="Diet" className='appearance-none border border-gray-400 pl-3 pr-7 rounded py-1.75 focus:outline-none focus:border-blue-400 cursor-pointer'>
              <option value="">Keto-Friendly</option>
              <option value="">Paleo</option>
              <option value="">Mediterranean</option>
              <option value="">High Protein</option>
            </select>
          </div>
          <div>
            <p className='mb-2'>Dietary Type</p>
            <select name="Type" className='appearance-none border border-gray-400 pl-3 pr-7 rounded py-1.75 focus:outline-none focus:border-blue-400 cursor-pointer'>
              <option value="">Gluten-Free</option>
              <option value="">Dairy-Free</option>
              <option value="">Vegan</option>
              <option value="">Vegetarian</option>
            </select>
          </div>

          <div className=' flex-col'>
            <p>Nutrient Targets</p>
            <div className='flex gap-5 -mt-6'>
              <div className='space-y-2'>
                <p className='opacity-0'>_</p>
                <select name="MacroNutrient" className='appearance-none border border-gray-400 pl-3 pr-7 rounded py-1.75 focus:outline-none focus:border-blue-400 cursor-pointer'>
                  <option value="">Protein</option>
                  <option value="">Carbs</option>
                  <option value="">Fat</option>
                  <option value="">Calories</option>
                </select>
              </div>

              <div className='space-y-2'>
                <p className='opacity-0'>_</p>
                <select name="HealthNutrient" className='appearance-none border border-gray-400 pl-3 pr-7 rounded py-1.75 focus:outline-none focus:border-blue-400 cursor-pointer'>
                  <option value="">Sodium</option>
                  <option value="">Sugar</option>
                  <option value="">Potassium</option>
                  <option value="">Fiber</option>
                </select>
              </div>

              <div className='space-y-2'>
                <p className='opacity-0'>_</p>
                <select name="FatsQuality" className='appearance-none border border-gray-400 pl-3 pr-7 rounded py-1.75 focus:outline-none focus:border-blue-400 cursor-pointer'>
                  <option value="">Saturated Fat</option>
                  <option value="">Cholesterol</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <button className='absolute right-20 bg-blue-200 px-6 py-2 rounded cursor-pointer mt-10 hover:shadow-xl transition-all hover:scale-105 duration-500'>Apply</button>
      </div>
    </div>
  )
}
