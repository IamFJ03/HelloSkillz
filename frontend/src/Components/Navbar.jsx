import React from 'react';
import { User } from 'lucide-react';
import user from '../assets/user.png';
export default function Navbar() {
  return (
    <div className='sticky top-0 z-50'>
      <div className='flex items-center justify-between px-20 py-5 bg-white shadow-2xl'>
        <div>
            <p className='font-bold text-2xl'>FlavorFinds</p>
        </div>
        <div>
            <ul className='flex gap-20'>
                <li className='cursor-pointer hover:border-b-2 hover:border-blue-200 transition duration-500'>Categoris</li>
                <li className='cursor-pointer hover:border-b-2 hover:border-blue-200 transition duration-500'>Meal Plans</li>
                <li className='cursor-pointer hover:border-b-2 hover:border-blue-200 transition duration-500'>My Favourites</li>
            </ul>
        </div>
        <div className='flex gap-3 items-center'>
        <img src={user} className='w-8 h-8 rounded-full'/>
        <button className='bg-blue-200 py-2 px-5 rounded-2xl'>Login/Sign Up</button>
        </div>
      </div>
    </div>
  )
}
