"use client";
import React, { useEffect, useState } from "react";

const page = () => {
  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const fetchData = async () => {
    const res = await fetch(
      "https://dummyjson.com/recipes/search?q=" + inputValue
    );
    const data = await res.json();
    setResults(data.recipes);
  };

  useEffect(() => {
    if (inputValue.trim() !== "") {
      const timer = setTimeout(() => fetchData(), 500); // Debounce the API call
      return () => clearTimeout(timer); // Cleanup the timer on unmount or input change
    } else {
      setResults([]); // optionally clear results if input is empty
    }
  }, [inputValue]);

  return (
    <div className="w-full h-screen p-5">
      <h1 className="text-lg italic font-medium">Autocomplete Search Bar :</h1>
      <input
        type="text"
        className="w-[500px] p-2 border border-black rounded-md mt-2 text-base"
        placeholder="Search for recipes..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onFocus={() => setShowResults(true)}
        onBlur={() => setShowResults(false)}
      />
      {showResults && (
        <div className="w-[500px] max-h-[300px] overflow-hidden overflow-y-auto flex flex-col gap-2 mt-5 border border-gray-300 p-3 items-center">
          {results.map((recipe: any) => (
            <button
              key={recipe.id}
              className="bg-gray-300 hover:bg-amber-200 cursor-pointer w-full p-1 rounded-md flex justify-center"
            >
              {recipe.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default page;
