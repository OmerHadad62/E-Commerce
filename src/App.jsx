import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";
import ProductGrid from './components/ProductGrid.jsx';
import ProductPage from "./components/ProductPage";
import './App.css'


function Root() {
  return (
    <div>
      {/* <div>NAVBAR</div> */}
      <Outlet />
    </div>
  );
}

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route path="page" element={<ProductPage />} />
        <Route path="card" element={<ProductGrid />} />
      </Route>
    )
  );

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
export default App;