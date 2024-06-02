import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ id, imageUrl, brand, productName, price, originalPrice }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate('/page', { state: { id } });  // Navigates to /page with the product ID in the state
  };

  const toggleFavorite = (event) => {
    event.stopPropagation();  // Prevents the click event from bubbling up
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl relative">
      <button
        className={`absolute top-3 left-3 ${isFavorite ? 'text-red-700' : 'text-red-500'} opacity-75 hover:opacity-100`}
        onClick={toggleFavorite}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          fill="currentColor"
          className="bi bi-heart"
          viewBox="0 0 16 16"
        >
          <path
            d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385C2.807 10.626 6 13.433 8 15c2-1.567 5.193-4.374 6.286-7.562.955-1.885.838-3.362.314-4.385-1.113-2.175-4.2-2.772-5.883-.998L8 2.748zM8 1.5c1.306-1.267 4.418-.676 5.737 1.522 1.227 1.992.901 3.994.244 5.136C12.293 10.746 9.11 13.17 8 14.2c-1.11-1.03-4.293-3.454-5.981-6.043C.614 6.989.942 4.988 2.263 3.022 3.582 1.324 6.694.233 8 1.5z"
          />
        </svg>
      </button>
      <div onClick={() => handleClick(id)}>
        <img src={imageUrl} alt="Product" className="h-auto w-auto object-cover rounded-t-xl" />
        <div className="px-4 py-3 w-72">
          <span className="text-gray-400 mr-3 uppercase text-xs">{brand}</span>
          <p className="text-lg font-bold text-black truncate block capitalize">{productName}</p>
          <div className="flex items-center">
            <p className="text-lg font-semibold text-black cursor-auto my-3">${price}</p>
            <del>
              <p className="text-sm text-gray-600 cursor-auto ml-2">${originalPrice}</p>
            </del>
            <div className="ml-auto flex items-center space-x-2">
              <button className="px-3 py-1 bg-green-500 text-white text-sm rounded-md hover:bg-green-700">Buy Now</button>
              <button className="p-1 hover:bg-gray-200 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-bag-plus"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
                  />
                  <path
                    d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <button
            className="w-full mt-3 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700"
          >
            View Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
