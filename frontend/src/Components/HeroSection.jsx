import React from 'react'
import Hero from '../assets/Hero.jpg';

export default function HeroSection() {
  return (
    <div>
      <div className='relative w-full overflow-hidden shadow-2xl'>
        <img src={Hero} className='h-130 w-full object-cover'/>
        <div className='absolute top-60 left-120 text-center'>
        <p className=' text-white font-bold text-5xl'>Unlock a World of Flavor</p>
        <p className=' text-white text-xl my-5'>Your Culinary Journy starts here</p>
        <button className='bg-blue-800 text-white rounded-2xl py-2 px-5 cursor-pointer'>Start Browsing Recipes</button>
        </div>
      </div>
    </div>
  )
}
