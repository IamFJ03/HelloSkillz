import React, { useState } from 'react';
import { User, Mail, Eye, EyeClosed, Lock } from 'lucide-react';

export default function Authentication() {
  
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const FormInput = ({ type, placeholder, icon: Icon, value, onChange, isPassword = false, required = false }) => {
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;
    const InputIcon = isPassword ? (showPassword ? EyeClosed : Eye) : Icon;
    const togglePasswordVisibility = () => {
      if (isPassword) {
        setShowPassword(!showPassword);
      }
    };

    return (
      <div className="relative w-full">
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full border border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-xl py-3 pl-4 pr-12 transition duration-150 text-gray-800 placeholder-gray-500 shadow-sm"
        />
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={togglePasswordVisibility}>
          <InputIcon size={20} className="text-gray-400" />
        </div>
      </div>
    );
  };

  const CardTitle = ({ title, subtitle }) => (
    <div className="text-center mb-8">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-1">{title}</h1>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
  );

  const LoginCard = () => (
    <div className="space-y-6">
      <CardTitle
        title="Continue your Culinary Journey"
        subtitle="A world of Flavor and personalized meal plans awaits."
      />

      <FormInput type="text" placeholder="Enter Username" icon={User} required />
      <FormInput type="email" placeholder="Enter Email" icon={Mail} required />
      <FormInput type="password" placeholder="Enter Password" icon={Lock} isPassword required />

      <button className="w-full bg-blue-600 text-white rounded-xl py-3 font-semibold hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-lg">
        Log In
      </button>

      <p className="mt-4 text-center text-sm text-gray-600">
        Don't Have An Account?{' '}
        <button
          className="font-bold text-blue-600 hover:text-blue-700 transition duration-150"
          onClick={() => setIsLogin(false)}
        >
          Sign Up
        </button>
      </p>
    </div>
  );

  const SignupCard = () => (
    <div className="space-y-6">
      <CardTitle
        title="Join the Culinary Journey"
        subtitle="Unlock a world of Flavor and personalized meal plans."
      />

      <FormInput type="text" placeholder="Enter Username" icon={User} required />
      <FormInput type="email" placeholder="Enter Email" icon={Mail} required />
      <FormInput type="password" placeholder="Enter Password" icon={Lock} isPassword required />
      <FormInput type="password" placeholder="Confirm Password" icon={Lock} isPassword required />

      <button className="w-full bg-blue-600 text-white rounded-xl py-3 font-semibold hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-lg">
        Sign Up
      </button>

      <p className="mt-4 text-center text-sm text-gray-600">
        Already Have An Account?{' '}
        <button
          className="font-bold text-blue-600 hover:text-blue-700 transition duration-150"
          onClick={() => setIsLogin(true)}
        >
          Log In
        </button>
      </p>
    </div>
  );

  return (
    
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6">
      
      <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-2xl max-w-lg w-full transition-all duration-500">
        {isLogin ? <LoginCard /> : <SignupCard />}
      </div>
    </div>
  );
}