import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import HeroSection from '../Components/HeroSection';
import { useCart } from '../Context/CartContext';
import { useAuth } from '../Context/AuthContext';
import { X, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import axios from 'axios';

export default function Favourites() {
  const [meals, setMeals] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState({});
  const { favourites } = useCart();
  const {isLoggedIn} = useAuth();
  const [msg, setMsg] = useState(false);
  const [infoMsg, setInfoMsg] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    const loadCart = async () => {
      
      if (!isLoggedIn) {
        setMeals([]);
        return;
      }
      try {
        const res = await axios.get("http://localhost:5000/api/cart/fetchcart", {
          withCredentials: true
        });
        if (res.data.message === "meals found") {
          console.log("Meal Found!", res.data.cartInfo);
          setMeals(res.data.cartInfo);
        }
        else {
          console.log("Something went wrong while fecthing cart");

        }
      }
      catch (e) {
        console.log("Internal Error while Fetching cart Data", e);

      }
    }

    loadCart();
  }, [favourites, isLoggedIn])

  const handleModal = (item) => {
    setSelectedMeal(item);
    setModal(true);
  }

  const handleProceed = async () => {
    console.log(selectedMeal);
    try {
      const res = await axios.post("http://localhost:5000/api/recipe/updateAccess",{}, {
        withCredentials: true
      })
      if(res.data.message == "Access to free meal recipe reached its limit"){
          console.log("You have to Buy Premium Subscription");
          setInfoMsg("You have to Buy Premium Subscription to view more meals as you reach limit of 3 free recipe Access");
          setMsg(true);
          setModal(false);
          setTimeout(() => {
            setMsg(false);
          }, 5000);
          return;
        }
      else if (res.data.message === "User Access Granted") {
        console.log(res.data.newLevel);
        navigate('/recipe', {
          state: {
            meal: selectedMeal
          }
        })
        setModal(false);
        setSelectedMeal({});
      }
    }
    catch (e) {
      console.log("Internal Server Error while Updating Acccess", e);
    }
  }

  const handleRemove = async (label) => {
    console.log(label);
    
    try {
      const res = await axios.delete("http://localhost:5000/api/cart/deleteMeal", {
        data: { label },
        withCredentials: true
      });
      if (res.data.message === "Meal Removed") {
        console.log("Meal Removed From favourites");
        setMeals(meals.filter(item => item.label !== label));
      }
    }
    catch (e) {
      console.log("Internal Server Error While removing Meal", e);
    }
  }

  const pathname = window.location.pathname;
  return (
    <div>
      <Navbar />
      <HeroSection path={pathname} />
      <div>
        <p className='px-20 text-2xl font-mono font-semibold mt-10'>Favourites:</p>
        <div className='my-10'>
          {
            meals.length > 0 ?
              <div className="flex gap-10  md:gap-25 md:mx-15 ml-6 md:overflow-auto md:flex-nowrap flex-wrap">
                {meals.map(item => (
                  <div style={{ backgroundImage: 'linear-gradient(to right, #bfdbfe, white)' }} className="overflow-hidden ml-[5%] md:ml-0 h-110 bg-white shadow-lg relative max-w-[75%] md:min-w-[20%] rounded-2xl">
                    <img src={item.image} alt={item.label} className="rounded-2xl hover:scale-110 duration-500" />
                    <p className="text-xl font-bold p-3">{item.label}</p>
                    <div className='flex items-center mt-5 justify-between px-5'>
                      <Trash2 size={25} color='black' onClick={() => handleRemove(item.label)} className='cursor-pointer' />
                      <button className="bg-blue-200 py-1 px-3 rounded-2xl cursor-pointer" onClick={() => handleModal(item)}>
                        View Recipe
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              :
              <div>
                <p className='text-xl font-mono text-gray-400 ml-20'>No Meals added in favourites Yet...</p>
              </div>
          }
        </div>
      </div>

      <div style={{backgroundColor:'rgb(0,0,0,0.5)'}} className={` fixed md:w-screen inset-0 transition-all duration-500 ${modal ? 'bg-black/50 opacity-100 pointer-events-auto' : 'bg-transparent opacity-0 pointer-events-none'}`}>
        <div className={`relative md:h-70 h-80 md:w-120 w-90 bg-white shadow-lg rounded-2xl md:left-120 left-6 mt-50 ${modal ? 'scale-100' : 'scale-0'} transition-transform duration-500`} >
          <X size={25} color='black' className='absolute right-5 top-5 cursor-pointer' onClick={() => setModal(false)} />
          <p className='pt-17 text-xl font-bold px-17'>Are you Sure you want to proceed??</p>
          <p className='px-17 my-5 '>By Proceeding Further you are using your 1 of 3 free meal recipe findings</p>
          <div className='flex justify-between px-15'>
            <button className='px-5 py-1 cursor-pointer bg-blue-200 rounded hover:scale-105 hover:shadow-md transition-all duration-500' onClick={() => setModal(false)}>Cancel</button>
            <button className='px-5 py-1 cursor-pointer bg-blue-200 rounded hover:scale-105 hover:shadow-md transition-all duration-500' onClick={() => handleProceed()}>Proceed</button>
          </div>
        </div>
      </div>
      <div className={`bg-white h-fit py-3 max-w-120 px-3 fixed right-6 top-10 md:right-20 md:bottom-10 md:top-auto rounded-2xl shadow-md flex items-center ${msg ? 'opacity-100' : 'opacity-0'} transition-all duration-500`}>
        <AlertCircle size={80} color='black' className=' mx-5' />
        <p className='text-xl font-mono'>{infoMsg && infoMsg}</p>
      </div>
    </div>
  )
}
