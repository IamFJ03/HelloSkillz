import React from 'react';
import { User } from 'lucide-react';
import user from '../assets/user.png';
import { Link } from 'react-router-dom';
export default function Navbar({foods}) {
  return (
    <div className='sticky top-0 z-50'>
      <div className='flex items-center justify-between px-20 py-5 bg-linear-to-r from-blue-200 to-white shadow-2xl'>
        <div>
          <p className='font-bold text-2xl'><Link to={'/'}>FlavorFinds</Link></p>
        </div>
        <div>
          <ul className='flex gap-20 items-center'>
            <li className=' transition-all duration-500 hover:text-blue-200'><select className="cursor-pointer appearance-none border border-gray-300 rounded-lg py-2 pl-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:border-blue-500">
              <option>Categories</option>
              <option>Course</option>
              <option>Cuisine</option>
              <option>Dietary Preferences</option>
            </select></li>
            <li className='cursor-pointer hover:border-b-2 hover:border-blue-200 transition duration-500 hover:text-blue-200'><Link to={'/meal-plan'}>Meal Plans</Link></li>
            <li className='cursor-pointer hover:border-b-2 hover:border-blue-200 transition duration-500 hover:text-blue-200'><Link to={'/favourites'}>My Favourites</Link></li>
          </ul>
        </div>
        <div className='flex gap-3 items-center'>
          <img src={user} className='w-8 h-8 rounded-full' />
          <button className='bg-blue-200 py-2 px-5 rounded-2xl cursor-pointer hover:shadow-md transition-all duration-500 hover:scale-105'><Link to={'/Auth'}>Login/Sign Up</Link></button>
        </div>
      </div>
    </div>
  )
}
