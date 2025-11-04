import React, { useState } from 'react'
import { User, Mail, Eye, EyeClosed } from 'lucide-react'
export default function Authentication() {
  const [login, setLogin] = useState(false)
  return (
    <div>
      {
        login ?
        <div className='bg-white shadow-2xl h-115 w-120 ml-140 mt-30 rounded-2xl'>
        <p className='text-3xl font-semibold px-15 pt-5 text-center'>Continue your Culinary Journey</p>
        <p className='text-gray-500 px-15 mt-3 text-[15px]'>A world of Flavor and personalized meal plans</p>
        <div className='relative left-20'>
          <div className=' my-5 flex items-center'>
            <input type='text' placeholder='Enter UserName' className='border border-gray-500 focus:outline-none focus:border-blue-500 w-80 py-1.75 pl-3 pr-10 rounded' />
            <User color='gray' size={20} className='absolute right-42' />
          </div>
          <div className='flex items-center'>
            <input type='email' placeholder='Enter Email' className='border border-gray-500 focus:outline-none focus:border-blue-500 w-80 py-1.75 px-3 rounded' required /><br />
            <Mail color='gray' size={20} className='absolute right-42' />
          </div>
          <div className='flex items-center'>
            <input type='password' placeholder='Enter Password' className='border border-gray-500 focus:outline-none focus:border-blue-500 w-80 my-5 py-1.75 px-3 rounded' required /><br />
            <Eye color='gray' size={20} className='absolute right-42' />
          </div>
          
          <button className='mb-5 bg-blue-300 px-33 rounded-2xl py-2 cursor-pointer hover:shadow-xl transition-all duration-500 hover:scale-105'>Sign Up</button>
          <p className='ml-10'>Don't Have An Account? <button className='cursor-pointer' onClick={() => setLogin(false)}>Sign Up</button></p>
        </div>
      </div>
      :
      <div className='bg-white shadow-2xl h-115 w-120 ml-140 mt-30 rounded-2xl'>
        <p className='text-3xl font-semibold px-15 pt-5'>Join the Culinary Journey</p>
        <p className='text-gray-500 px-15 mt-3 text-[15px]'>Unlock a world of Flavor an personalized meal plans</p>
        <div className='relative left-20'>
          <div className=' my-5 flex items-center'>
            <input type='text' placeholder='Enter UserName' className='border border-gray-500 focus:outline-none focus:border-blue-500 w-80 py-1.75 pl-3 pr-10 rounded' />
            <User color='gray' size={20} className='absolute right-42' />
          </div>
          <div className='flex items-center'>
            <input type='email' placeholder='Enter Email' className='border border-gray-500 focus:outline-none focus:border-blue-500 w-80 py-1.75 px-3 rounded' required /><br />
            <Mail color='gray' size={20} className='absolute right-42' />
          </div>
          <div className='flex items-center'>
            <input type='password' placeholder='Enter Password' className='border border-gray-500 focus:outline-none focus:border-blue-500 w-80 my-5 py-1.75 px-3 rounded' required /><br />
            <Eye color='gray' size={20} className='absolute right-42' />
          </div>
          <div className='flex items-center'>
            <input type='password' placeholder='Confirm Password' className='border border-gray-500 focus:outline-none focus:border-blue-500 w-80 mb-5 rounded py-1.75 px-3' required /><br />
            <EyeClosed color='gray' size={20} className='absolute right-42' />
          </div>
          <button className='mb-5 bg-blue-300 px-33 rounded-2xl py-2 cursor-pointer hover:shadow-xl transition-all duration-500 hover:scale-105'>Sign Up</button>
          <p className='ml-10'>Already Have An Account? <button className='cursor-pointer' onClick={() => setLogin(true)}>Log In</button></p>
        </div>
      </div>
      }
    </div>
  )
}
