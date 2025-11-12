import React from 'react'
import Hero from '../assets/Hero.jpg';
import { Link } from 'react-router-dom';

export default function HeroSection({path}) {

  return (
    <div>
      <div className='relative w-full overflow-hidden shadow-2xl'>
        <img src={Hero} className={`w-full object-cover ${ path==='/meal-plan' ? 'h-70' : 'md:h-130 h-90'}`}/>
        <div className='absolute md:top-60 top-25 md:left-120 left-5 text-center'>
        { 
        path === "/" ?
        <div>
        <p className=' text-white font-bold text-5xl'>Unlock a World of Flavor</p>
        <p className=' text-white text-xl my-5'>Your Culinary Journy starts here</p>
        <button style={{backgroundColor:'blue'}} className=' text-white rounded-2xl py-2 px-5 cursor-pointer'><Link to={'/meal-plan'}>Start Browsing Recipes</Link></button>
        </div>
        :
        <p className=' text-white font-bold text-5xl md:-mt-20 md:w-200'>Discover Your Perfect Plan</p>
        }
        </div>
      </div>
    </div>
  )
}