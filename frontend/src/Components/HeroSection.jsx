import React from 'react';
import Hero from '../assets/Hero.png';

const HeroSection = () => (
    <section className="flex flex-col md:flex-row items-center justify-between pt-10 px-20 bg-blue-100">
        <div className="lg:w-1/2 mb-10 lg:mb-0">
            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
                Unlock Your Potential.<br />
                <span className="text-indigo-600">Learn Anything,</span><br />
                Anytime
            </h1>
            <p className="mt-4 text-lg text-gray-500 max-w-md">
                Explore thousands courses from experts worldwide.
            </p>

            <div className="mt-8 flex items-center border border-gray-300 rounded-lg p-3 max-w-sm shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
                <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                <input
                    type="text"
                    placeholder="Start Learning Today..."
                    className="w-full text-gray-700 focus:outline-none bg-transparent"
                />
            </div>
        </div>

        <div className="lg:w-1/2 flex justify-center lg:justify-end">

            <div className="relative w-full max-w-lg">

                <img
                    src={Hero}
                    alt="Group of students learning"
                    className="h-150 w-300 rounded"
                />
            </div>
        </div>
    </section>
);

export default HeroSection;