import React from 'react'
import Hero from '../assets/Hero.jpg';

export default function HeroSection({path}) {

  return (
    <div>
      <div className='relative w-full overflow-hidden shadow-2xl'>
        <img src={Hero} className={`w-full object-cover ${ path==='/meal-plan' ? 'h-70' : 'h-130'}`}/>
        <div className='absolute top-60 left-120 text-center'>
        { 
        path === "/" ?
        <div>
        <p className=' text-white font-bold text-5xl'>Unlock a World of Flavor</p>
        <p className=' text-white text-xl my-5'>Your Culinary Journy starts here</p>
        <button className='bg-blue-800 text-white rounded-2xl py-2 px-5 cursor-pointer'>Start Browsing Recipes</button>
        </div>
        :
        <p className=' text-white font-bold text-5xl -mt-20'>Discover Your Perfect Plan</p>
        }
        </div>
      </div>
    </div>
  )
}