import React, { useState, useEffect } from 'react';
import { Ellipsis } from 'lucide-react';
import user from '../assets/user.png';
import { Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

export default function Navbar({ foods }) {
  const [nav, setNav] = useState(false);
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userModal, setUserModal] = useState(false);
  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      setIsLoggedIn(true);
      setUsername(username);
    }
  }, []);
  return (
    <div className='sticky top-0 z-50'>
      <div className='md:flex hidden items-center justify-between px-20 py-5 bg-linear-to-r from-blue-200 to-white shadow-2xl'>
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
          <img src={user} className='w-8 h-8 rounded-full cursor-pointer' onClick={()=> setUserModal(!userModal)}/>
          {
            isLoggedIn && username.length > 0 ?
              <p className='font-mono font-semibold'>{username}</p>
              :
              <button className='bg-blue-200 py-2 px-5 rounded-2xl cursor-pointer hover:shadow-md transition-all duration-500 hover:scale-105'><Link to={'/Auth'}>Login/Sign Up</Link></button>
          }
        </div>
      </div>

      <div className='md:hidden cursor-pointer absolute w-full'>
        
            <Ellipsis color='black' size={30} onClick={() => setNav(!nav)} />
            {
              <div
                style={{ backgroundImage: 'linear-gradient(to right, #bfdbfe, white)' }}
                className={`w-[90%] max-h-70 text-center flex flex-col gap-5 mx-5 rounded-2xl ${nav ? 'scale-100' : 'scale-0'} transition-all duration-500`}
              >
                <div>
                  <p className='font-bold text-2xl mt-5'><Link to={'/'}>FlavorFinds</Link></p>
                </div>
                <div>
                  <ul className='flex flex-col gap-5'>
                    <li className=' transition-all duration-500 hover:text-blue-200'><select className=" text-center cursor-pointer appearance-none border border-gray-300 rounded-lg py-2 pl-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:border-blue-500">
                      <option>Categories</option>
                      <option>Course</option>
                      <option>Cuisine</option>
                      <option>Dietary Preferences</option>
                    </select></li>
                    <li className='cursor-pointer hover:border-b-2 hover:border-blue-200 transition duration-500 hover:text-blue-200'><Link to={'/meal-plan'}>Meal Plans</Link></li>
                    <li className='cursor-pointer hover:border-b-2 hover:border-blue-200 transition duration-500 hover:text-blue-200 pb-5'><Link to={'/favourites'}>My Favourites</Link></li>
                  </ul>
                </div>

              </div>
            }
          <div className='absolute top-0 right-5'>
            {
              isLoggedIn && username.length > 0 ?
                <img src={user} className='w-8 h-8 rounded-full mt-3 ' />
                :
                <button className='bg-blue-200 py-2 px-5 rounded-2xl cursor-pointer hover:shadow-md transition-all duration-500 hover:scale-105'><Link to={'/Auth'}>Login/Sign Up</Link></button>
            }
          </div>
        </div>
        <div className={`h-90 w-60 bg-blue-100 shadow-md absolute  top-30 rounded-xl ${userModal ? 'right-5 scale-100' : '-right-100 scale-0'} transition-all duration-500`}>

        </div>
    </div>
  )
}

