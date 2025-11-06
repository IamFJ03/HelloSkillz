import React,{useEffect} from 'react';
import Navbar from '../Components/Navbar';
import { useLocation } from 'react-router-dom';
export default function Recipe() {
  const location = useLocation();
  const { meal } = location.state || {};

  useEffect(() => {
      console.log(meal);
  },[])
  return (
    <div>
      <Navbar />
      <div>
        <div>
        <img src={meal.recipe.image}  className='rounded-2xl h-100 m-20 '/>
        </div>
        <div>
          
        </div>
      </div>
    </div>
  )
}
