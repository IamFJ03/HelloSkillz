import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { useLocation } from "react-router-dom";

export default function Recipe() {
  const location = useLocation();
  const { meal } = location.state || {};
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    console.log(meal);
  }, [meal]);

  const handleIngredientClick = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  if (!meal || !meal.recipe) {
    return (
      <div>
        <Navbar />
        <p className="text-xl text-red-500 m-10">
          No recipe data found. Please go back and select a meal.
        </p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      {/* Main Responsive Wrapper */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-20 px-5 lg:px-20 py-10">

        {/* Image Section */}
        <div className="w-full lg:w-auto flex justify-center">
          <img
            src={meal.recipe.image}
            alt={meal.recipe.label}
            className="rounded-2xl w-full max-w-sm lg:max-w-md shadow-md"
          />
        </div>

        {/* Ingredients Section */}
        <div className="w-full lg:w-1/2">
          <p className="text-2xl font-semibold font-mono mb-5">
            Meal Recipe Includes:
          </p>

          {meal.recipe.ingredients.map((i, index) => (
            <div
              key={index}
              onClick={() => handleIngredientClick(index)}
              style={{
                backgroundImage: "linear-gradient(to right, #bfdbfe, white)",
              }}
              className="rounded-2xl px-5 py-2 mb-3 cursor-pointer shadow-md"
            >
              {/* Ingredient Title */}
              <p className="py-2 font-semibold">{i.text}</p>

              {/* Expand Section */}
              <div
                className={`
                  overflow-hidden transition-all duration-500 ease-in-out
                  ${expandedIndex === index ? "max-h-96 pb-3" : "max-h-0"}
                `}
              >
                <div className="flex flex-col md:flex-row items-center gap-5">
                  <img
                    src={i.image}
                    className="h-28 w-28 rounded-2xl object-cover"
                  />
                  <div className="font-mono text-sm md:text-base">
                    <div>
                      <span className="font-bold">Food: </span>
                      <span>{i.food}</span>
                    </div>
                    <div className="my-3">
                      <span className="font-bold">Category: </span>
                      <span>{i.foodCategory}</span>
                    </div>
                    <div>
                      <span className="font-bold">Weight: </span>
                      <span>{Math.round(i.weight)} g</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
