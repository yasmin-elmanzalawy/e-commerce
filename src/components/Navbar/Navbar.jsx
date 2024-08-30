import React, { useContext, useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { CounterContext } from "../../Context/CounterContext";

export default function Navbar() {
  const {counter} = useContext(CounterContext);
  console.log({counter}, "navbar");

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div>
      <nav className=" py-3 bg-gray-100">
        <div className="max-w-[1200px] px-5 m-auto flex items-center justify-between">
          <div>
            <a  className="flex items-center p-2 text-2xl" href="#">
              <FaCartShopping className="text-main-green mr-2" />
              <span className="font-semibold">fresh cart</span>
             
            </a>
          </div>

          <div className="block lg:hidden">
            <button onClick={toggleMenu} className="text-gray-800">
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          <div className="hidden lg:flex lg:items-center lg:justify-center flex-grow p-2">
            <ul className="flex space-x-4">
              <li>
                <Link
                  to="e-commerce/home"
                  className={`${
                    isActive("/home") ? "text-black" : "text-gray-500"
                  } hover:text-gray-700 transition-colors`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="e-commerce/cart"
                  className={`${
                    isActive("/cart") ? "text-black" : "text-gray-500"
                  } hover:text-gray-700 transition-colors`}
                >
                  Cart
                </Link>
              </li>
              <li>
                <Link
                  to="e-commerce/wishList"
                  className={`${
                    isActive("/wishList") ? "text-black" : "text-gray-500"
                  } hover:text-gray-700 transition-colors`}
                >
                  Wish list
                </Link>
              </li>
              <li>
                <Link
                  to="e-commerce/products"
                  className={`${
                    isActive("/products") ? "text-black" : "text-gray-500"
                  } hover:text-gray-700 transition-colors`}
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="e-commerce/categories"
                  className={`${
                    isActive("/categories") ? "text-black" : "text-gray-500"
                  } hover:text-gray-700 transition-colors`}
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  to="e-commerce/brands"
                  className={`${
                    isActive("/brands") ? "text-black" : "text-gray-500"
                  } hover:text-gray-700 transition-colors`}
                >
                  Brands
                </Link>
              </li>
            </ul>
          </div>

          <div className="hidden lg:flex lg:items-center lg:justify-end bg-sky-300 p-2">
            <FaCartShopping className="mr-2 text-gray-600 text-2xl" />
            <span className="font-bold"><Link
                to="/e-commerce/"
                className={`${
                  isActive("/brands") ? "text-black" : "text-gray-500"
                } hover:text-gray-700 transition-colors`}
              >
                LogOut
              </Link></span>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden ${isMenuOpen ? "block" : "hidden"} p-4`}>
          <ul className="space-y-4">
            <li>
              <Link
                to="e-commerce/home"
                className={`${
                  isActive("/home") ? "text-black" : "text-gray-500"
                } hover:text-gray-700 transition-colors`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="e-commerce/cart"
                className={`${
                  isActive("/cart") ? "text-black" : "text-gray-500"
                } hover:text-gray-700 transition-colors`}
              >
                Cart
              </Link>
            </li>
            <li>
              <Link
                to="e-commerce/wishList"
                className={`${
                  isActive("/wishList") ? "text-black" : "text-gray-500"
                } hover:text-gray-700 transition-colors`}
              >
                Wish list
              </Link>
            </li>
            <li>
              <Link
                to="e-commerce/products"
                className={`${
                  isActive("/products") ? "text-black" : "text-gray-500"
                } hover:text-gray-700 transition-colors`}
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="e-commerce/categories"
                className={`${
                  isActive("/categories") ? "text-black" : "text-gray-500"
                } hover:text-gray-700 transition-colors`}
              >
                Categories
              </Link>
            </li>
            <li>
              <Link
                to="e-commerce/brands"
                className={`${
                  isActive("/brands") ? "text-black" : "text-gray-500"
                } hover:text-gray-700 transition-colors`}
              >
                Brands
              </Link>
            </li>
          </ul>
          <div className="flex flex-col items-center justify-center mt-4 bg-sky-300 p-2">
            <FaCartShopping className="mr-2 text-gray-600" />
            <span className="font-bold text-gray-600"><Link
                to="/e-commerce/"
                className={`${
                  isActive("/brands") ? "text-black" : "text-gray-500"
                } hover:text-gray-700 transition-colors`}
              >
                LogOut
              </Link></span>
          </div>
        </div>
      </nav>
    </div>
  );
}
