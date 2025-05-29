"use client";
import React, { useState, useEffect } from "react";

const ProductCards = ({ image, title, price }: any) => {
  return (
    <div className="w-[200px] bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img src={image} alt={title} className="w-full h-48 object-cover" />

      <div className="p-4 flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {title}
        </h2>
        <p className="text-gray-600 text-sm">
          Price: <span className="font-medium text-black">${price}</span>
        </p>
        <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300">
          Buy Now
        </button>
      </div>
    </div>
  );
};

const PAGE_LIMIT = 10; // Number of products per page

const page = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchData = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=200");
    const data = await res.json();
    setProducts(data.products);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalProducts = products?.length;
  const totalPages = Math.ceil(totalProducts / PAGE_LIMIT);
  const startIndex = currentPage * PAGE_LIMIT;
  const endIndex = startIndex + PAGE_LIMIT;

  return !products?.length ? (
    <div className="w-full h-screen p-5">
      <h1 className="text-lg italic font-medium">No data found !</h1>
    </div>
  ) : (
    <div className="w-full h-screen p-5">
      <h1 className="text-lg italic font-medium">Pagination :</h1>

      <div className="w-full flex flex-wrap gap-5 justify-center">
        {products.slice(startIndex, endIndex).map((product: any) => (
          <ProductCards
            key={product?.id}
            image={product?.thumbnail}
            title={product?.title}
            price={product?.price}
          />
        ))}
      </div>
      <div className="w-full flex gap-2 justify-center items-center mt-5">
        <button
          className="text-blue-600 cursor-pointer"
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 0}
        >
          left
        </button>
        {[...Array(totalPages).keys()].map((n, i) => (
          <button
            key={i}
            className="w-5 h-5 rounded-lg border border-gray-300 flex items-center justify-center p-5 cursor-pointer hover:bg-gray-200 transition-colors duration-300"
            onClick={() => setCurrentPage(n)}
          >
            {n}
          </button>
        ))}
        <button
          className="text-blue-600 cursor-pointer"
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages - 1}
        >
          right
        </button>
      </div>
    </div>
  );
};

export default page;
