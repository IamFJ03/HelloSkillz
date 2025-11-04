import React from 'react';
import Navbar from '../Components/Navbar';
import HeroSection from '../Components/HeroSection';

export default function Planning() {
  const currScreen = window.location.pathname;
  return (
    <div>
      <Navbar />
      <HeroSection path={currScreen} />
      <div className='px-20 mt-10'>
      <p className='text-xl'>Tailor-made meal plans designed for your health goals and lifestyle.</p>
      <p className='text-xl'>Delicious, easy, and nutriciest approved</p>
      </div>
    </div>
  )
}
