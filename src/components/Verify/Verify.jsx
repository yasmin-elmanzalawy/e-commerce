import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

export default function VerifyCode() {
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const isActive = (path) => location.pathname === path;
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  async function sendCode(values) {
    setLoading(true);
    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode, values"
      );
      console.log(data);

      navigate("/resetpassword");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  let formik = useFormik({
    initialValues: {
      resetCode: ``,
    },
    onSubmit: sendCode,
  });

  return (
    <>
      <nav className="sticky top-0 bg-white shadow-md z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center text-2xl font-semibold">
            <FaCartShopping className="text-main-green mr-2" />
            <span>Fresh Cart</span>
          </div>

          <div className="block lg:hidden">
            <button onClick={toggleMenu} className="text-gray-800">
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          <div className="hidden lg:flex lg:items-center lg:justify-end space-x-4">
            <Link
              to="/e-commerce/register"
              className={`text-gray-800 ${
                isActive("/e-commerce/register") ? "font-bold" : ""
              }`}
            >
              Register
            </Link>
            <Link
              to="/e-commerce/"
              className={`text-gray-800 ${
                isActive("/e-commerce/") ? "font-bold" : ""
              }`}
            >
              Login
            </Link>
          </div>
        </div>

        <div
          className={`lg:hidden ${
            isMenuOpen ? "block" : "hidden"
          } bg-white shadow-md`}
        >
          <ul className="space-y-4 p-4">
            {["home", "cart", "wishList", "products", "brands"].map((path) => (
              <li key={path}>
                <Link
                  to={`/e-commerce/${path}`}
                  className={`block text-gray-800 ${
                    isActive(`/e-commerce/${path}`) ? "font-bold" : ""
                  } hover:text-gray-600`}
                >
                  {path.charAt(0).toUpperCase() + path.slice(1)}
                </Link>
              </li>
            ))}
          </ul>
          <div className="p-4 text-center border-t">
            <Link to="/e-commerce/logout" className="text-gray-800 font-bold">
              Logout
            </Link>
          </div>
        </div>
      </nav>
      <h1 className="py-6 text-center text-3xl font-semibold">
        please enter your verification code
      </h1>

      <form onSubmit={formik.handleSubmit} className="md:w-1/2 w-[90%] mx-auto">
        <div className="relative z-0 w-full mb-5 group">
        <label
            htmlFor="code"
            className="block text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            type="tel"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            name="resetCode"
            id="code"
            className="w-full p-2 border rounded-lg border-gray-300 
focus:outline-none focus:ring-2 focus:ring-main-green"
            placeholder=" "
            required
          />
          
        </div>
        <div className="flex items-center ">
          {loading ? (
            <button
              type="submit"
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              <i className="fas fa-spinner fa-spin-pulse"></i>
            </button>
          ) : (
            <>
              <button
                type="submit"
                className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              ><Link to="/e-commerce/reset" className="text-gray-800 font-bold">
              Verify
            </Link>
                
              </button>
            </>
          )}
        </div>{" "}
      </form>
    </>
  );
}
