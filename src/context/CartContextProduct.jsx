import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the ProductsContext
export const ProductsContext = createContext();

// Create the ProductsProvider component
export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get('http://localhost:3000/products/productsList');
        setProducts(res.data.products);
      } catch (error) {
        setError(error.message || 'An error occurred while fetching products.');
        console.error(error);
      }
    };

    getProduct();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, error }}>
      {children}
    </ProductsContext.Provider>
  );
};
