import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { User, Mail, Eye, EyeClosed } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

export default function Authentication() {
  const [login, setLogin] = useState(false)
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cnfPassword, setCnfPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [passErrMsg, setPassErrMsg] = useState("");
  const [showPass, setShowPass] = useState(false);
  const { setIsLoggedIn, setUserInfo, loggedIn } = useAuth();

  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (username.length > 1 || email.length > 10 || password.length > 8) {
      setErrMsg("All Fields are required or password length should be more then 8 characters");
    }
    if (password !== cnfPassword) {
      setPassErrMsg("Password must match!!");
      setPassword("");
      setCnfPassword("");
      return;
    }

    const formdata = new FormData();
    formdata.append("username", username);
    formdata.append("email", email);
    formdata.append("password", password);

    try {
      console.log(formdata)
      const response = await axios.post(
        "https://recipetracker-fg4e.onrender.com/api/authentication/signup",
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.message === "User Created Succesfully") {
        console.log("User Created Succesfully");
        setUsername("");
        setEmail("");
        setPassword("");
        setLogin(true);
      }

    } catch (e) {
      console.log("Error while Signing Up", e);
    }

  };

  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(value);
  }

  const handleLogin = async () => {
    if (username.length < 1 || email.length < 10 || password.length < 8) {
      setErrMsg("All Fields are required or password length should be more then 8 characters");
      return
    }
  
   if (validateEmail(email)) {
    setErrMsg("");
      
    } else {
      setErrMsg("Invalid email address")
      return
    }

    try {
      const res = await axios.post("https://recipetracker-fg4e.onrender.com/api/authentication/login", {
        username, email, password
      },
        {
          withCredentials: true
        });
      if (res.data.message === "Authentication Succesfull") {

        console.log("User Found", res.data.USER);

        loggedIn(res.data.USER)
        setUsername("");
        setEmail("");
        setPassword("");
        navigate('/');

      }
      else
        console.log("User Not Found");
    }
    catch (e) {
      console.log("Error During Authentication", e);
    }
  }
  useEffect(() => {
  if (errMsg || passErrMsg) {
    const timer = setTimeout(() => {
      setErrMsg("");
      setPassErrMsg("");
    }, 5000);

    return () => clearTimeout(timer);
  }
}, [errMsg, passErrMsg]);
  return (

    <div className=''>
      {
        login ?
          <div className='bg-white shadow-2xl md:h-fit md:py-5 h-125 md:w-120 w-90 ml-[7%] md:ml-140 mt-30 rounded-2xl'>
            <p className='text-3xl  px-15 pt-5 text-center font-extrabold'>Continue your Culinary Journey</p>
            <p className='text-gray-500 px-15 mt-3 text-[15px]'>A world of Flavor and personalized meal plans</p>
            <div className='relative md:left-20 left-10'>
              <div className=' my-5 flex items-center'>
                <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Enter UserName' className='border border-gray-500 focus:outline-none focus:border-blue-500 md:w-80 w-70 py-1.75 pl-3 pr-10 rounded' />
                <User color='gray' size={20} className='absolute md:right-42 right-25' />
              </div>
              <div className='flex items-center'>
                <input type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} className='border border-gray-500 focus:outline-none focus:border-blue-500 md:w-80 w-70 py-1.75 px-3 rounded' required /><br />
                <Mail color='gray' size={20} className='absolute md:right-42 right-25' />
              </div>
              {errMsg.length > 0 && <p className='text-red-500 relative'>{errMsg}</p>}
              <div className='flex items-center'>
                <input type={showPass ? 'text' : 'password'} placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} className='border border-gray-500 focus:outline-none focus:border-blue-500 md:w-80 w-70 my-5 py-1.75 px-3 rounded' required /><br />
                <Eye color='gray' size={20} className='absolute md:right-42 right-25' onClick={() => setShowPass(!showPass)} />
              </div>
              {passErrMsg.length > 0 && <p className='text-red-500 bottom-5 relative'>{passErrMsg}</p>}
              <button style={{ backgroundColor: '#93C5FD' }} onClick={() => handleLogin()} className='mb-5 md:px-33 px-30 rounded-2xl py-2 cursor-pointer hover:shadow-xl transition-all duration-500 hover:scale-105'>Log In</button>
              <p className='md:ml-10 ml-5'>Don't Have An Account? <button className='cursor-pointer' onClick={() => setLogin(false)}>Sign Up</button></p>
            </div>
          </div>
          :
          <div className='bg-white shadow-2xl h-fit pb-10 md:w-120 w-90 ml-[7%] md:ml-140 mt-30 rounded-2xl'>
            <p className='text-3xl font-extrabold md:px-15 pt-5 text-center'>Join the Culinary Journey</p>
            <p className='text-gray-500 px-15 mt-3 text-[15px] text-center'>Unlock a world of Flavor an personalized meal plans</p>
            <div className='relative md:left-20 left-10'>
              <div className=' my-5 flex items-center'>
                <input type='text' placeholder='Enter UserName' value={username} onChange={(e) => setUsername(e.target.value)} className='border border-gray-500 focus:outline-none focus:border-blue-500 md:w-80 w-70 py-1.75 pl-3 pr-10 rounded' />
                <User color='gray' size={20} className='absolute md:right-42 right-25' />
              </div>
              <div className='flex items-center'>
                <input type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} className='border border-gray-500 focus:outline-none focus:border-blue-500 md:w-80 w-70 py-1.75 px-3 rounded' required /><br />
                <Mail color='gray' size={20} className='absolute md:right-42 right-25' />
              </div>
              {errMsg.length > 0 && <p className='text-red-500 relative'>{errMsg}</p>}
              <div className='flex items-center'>
                <input type={showPass ? 'text' : 'password'} placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} className='border border-gray-500 focus:outline-none focus:border-blue-500 md:w-80 w-70 my-5 py-1.75 px-3 rounded' required /><br />
                <Eye color='gray' size={20} className='absolute md:right-42 right-25' onClick={() => setShowPass(!showPass)} />
              </div>
              {passErrMsg.length > 0 && <p className='text-red-500 bottom-5 relative'>{passErrMsg}</p>}
              <div className='flex items-center'>
                <input type={showPass ? 'text' : 'password'} placeholder='Confirm Password' value={cnfPassword} onChange={(e) => setCnfPassword(e.target.value)} className='border border-gray-500 focus:outline-none focus:border-blue-500 md:w-80 w-70 mb-5 rounded py-1.75 px-3' required /><br />
                <EyeClosed color='gray' size={20} className='absolute md:right-42 right-25' />
              </div>
              {passErrMsg.length > 0 && <p className='text-red-500 bottom-5 relative'>{passErrMsg}</p>}
              <button style={{ backgroundColor: '#93C5FD' }} onClick={() => handleSignUp()} className='mb-5 px-28 md:px-33 rounded-2xl py-2 cursor-pointer hover:shadow-xl transition-all duration-500 hover:scale-105'>Sign Up</button>
              <p className='md:ml-10 ml-5'>Already Have An Account? <button className='cursor-pointer' onClick={() => setLogin(true)}>Log In</button></p>
            </div>
          </div>
      }
    </div>
  )
}