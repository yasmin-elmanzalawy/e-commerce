import React, { useContext, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserContext } from "../../Context/UserContext";
import { FaCartShopping } from "react-icons/fa6";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

export default function ResetPassword() {
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const isActive = (path) => location.pathname === path;
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const { setUserLogin } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);
  let navigate = useNavigate();
  async function resetPassword(values) {
    try {
      setLoading(true);
      let { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/auth/resetPassword
`,
        values
      );
      console.log(data);
      localStorage.setItem("userToken", data.token);
      setUserLogin(data.token);
      navigate("/");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  let validationSchema = Yup.object().shape({
    email: Yup.string().email("not vaild").required("email is required"),
    newPassword: Yup.string()
      .matches(/^[A-Z]\w{5,10}$/, "password not vaild")
      .required("password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema: validationSchema,

    onSubmit: resetPassword,
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
      <h1 className="text-3xl text-center py-6 text-fa-bold text-green-700">
        RESET PASSWORD
      </h1>

      <form
        className="md:w-2/2 w-[80%] my-8 mx-auto"
        onSubmit={formik.handleSubmit}
      >
        <div className="relative z-0 w-full mb-5 group">
          <label htmlFor="email" className="block text-gray-700 mb-1">
            Enter the code
            <input
              type="email"
              value={formik.values.email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              name="email"
              id="email"
              className="w-full p-2 border rounded-lg border-gray-300 
focus:outline-none focus:ring-2 focus:ring-main-green"
              placeholder=" "
            />
          </label>
        </div>

        {formik.errors.newPassword && formik.touched.newPassword && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {formik.errors.newPassword}
          </div>
        )}

        {loginError && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {loginError}
          </div>
        )}

        <div className="flex items-center ">
          {loading ? (
            <button
              type="submit"
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              <i className="fas fa-spinner fa-spin-pulse"></i>
            </button>
          ) : (
            <button
              type="submit"
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Login
            </button>
          )}
        </div>
      </form>
    </>
  );
}
