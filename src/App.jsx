import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayOut from "./components/LayOut/LayOut";
import Brands from "./components/Brands/Brands";
import Cart from "./components/Cart/Cart";
import Categories from "./components/Categories/Categories";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Verify from "./components/Verify/Verify";
import Register from "./components/Register/Register";
import WishList from "./components/WishList/WishList";
import NotFound from "./components/NotFound/NotFound";
import Products from "./components/Products/Products";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import CounterContextProvider from "./Context/CounterContext";
import UserContextProvider from "./Context/UserContext";
import CartContextProvider from "./Context/CartContext";
import CheckOut from "./components/checkOut/CheckOut";
import { Toaster } from "react-hot-toast"; 
import ResetPassword from "./components/ResetPassword/ResetPassword";
import WishListContextProvider from "./Context/WishListContext";


const x = createBrowserRouter([
  { path: "e-commerce/register", element: <Register /> },
  { path: "e-commerce/", element: <Login /> },
  { path: "e-commerce/verify", element: <Verify /> },
  { path: "e-commerce/reset", element: <ResetPassword /> },
  {
    path: "e-commerce/",
    element: <LayOut />,
    children: [
      { path: "e-commerce/brands", element: <Brands /> },
      { path: "e-commerce/cart", element: <Cart /> },
      { path: "e-commerce/categories", element: <Categories /> },
      { path: "e-commerce/products", element: <Products /> },
      { path: "e-commerce/checkout/:cartId", element: <CheckOut /> },
      { path: "/e-commerce/product/:id", element: <ProductDetails /> },
      { path: "e-commerce/home", element: <Home /> },
      { path: "e-commerce/wishList", element: <WishList /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return (
    <UserContextProvider>
      <WishListContextProvider>

     
      <CartContextProvider>
        <CounterContextProvider>
          
          <RouterProvider router={x} />
          <Toaster />
        </CounterContextProvider>
      </CartContextProvider>
      </WishListContextProvider>
    </UserContextProvider>
  );
}

export default App;
