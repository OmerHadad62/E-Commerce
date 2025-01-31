import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ProductsProvider } from './context/CartContextProduct.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProductsProvider>
      <App />
    </ProductsProvider>
  </React.StrictMode>,
);
