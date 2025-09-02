import React from 'react';
import hero from "../assets/images/hero.png";
import {Link} from "react-router-dom"

function Home() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between min-h-fit px-8 md:px-16 bg-white">
      
      
      <div className="flex-1 text-center md:text-left space-y-6 ">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800">
          WellCome to Rolin E-Commerce Shop
        </h1>
        <p className="text-lg text-gray-600">
          Your one-stop solution for shoping online.
        </p>
        <button className="px-6 py-3 font-bold bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition">
          Start Shoping
        </button>
      </div>
      
      <div className="flex-1 flex justify-center mt-10 md:mt-0">
        <img
          src={hero}
          alt="Landing"
          className="w-full max-w-md rounded-lg"
        />
      </div>
    </div>
  );
}

export default Home;
