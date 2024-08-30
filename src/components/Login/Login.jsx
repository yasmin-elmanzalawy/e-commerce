import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import { FaCartShopping } from "react-icons/fa6";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import Loading from "../Loading/Loading"; // Import Loading component

function Login() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { setToken } = useContext(UserContext);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const isActive = (path) => location.pathname === path;
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const schema = Yup.object().shape({
    email: Yup.string().required().email("Email is not valid"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^[A-Z].{5,}/,
        "Must start with an uppercase letter and be at least 6 characters long"
      ),
  });

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: handleSubmit,
    validationSchema: schema,
  });

  async function handleSubmit(values) {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );
      if (data.message === "success") {
        navigate("/e-commerce/e-commerce/home");
        setToken(data.token);
      }
    } catch (error) {
      setErrMsg(error.response.data.message);
      console.log(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    console.log("Mounting Login");
  }, []);

  return (
    <div className="">
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
              to="/e-commerce/login"
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

      <div className="text-left px-40">
        <h2 className="text-green-600 text-3xl font-bold">Login</h2>

        {errMsg && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {errMsg}
          </div>
        )}

        {isLoading && (
          <div className="flex items-center justify-center w-full h-screen">
            <Loading size="w-16 h-16" /> {/* Show loading spinner */}
          </div>
        )}

        <form onSubmit={formik.handleSubmit} className="mt-5 mx-auto">
          <div className="relative z-0 w-full mb-5 group">
            <label htmlFor="email" className="block text-gray-700 mb-1">
              User Email:
              <input
                {...formik.getFieldProps("email")}
                type="email"
                name="email"
                id="email"
                className="w-full p-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-main-green"
                placeholder=" "
              />
            </label>
            {formik.errors.email && formik.touched.email && (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.email}
              </div>
            )}
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <label htmlFor="password" className="block text-gray-700 mb-1">
              User Password:
              <input
                {...formik.getFieldProps("password")}
                type="password"
                name="password"
                id="password"
                className="w-full p-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-main-green"
                placeholder=" "
              />
            </label>

            {formik.errors.password && formik.touched.password && (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.password}
              </div>
            )}
            <div className="p-4 text-center border-t">
              <Link to="/e-commerce/verify" className="text-gray-800 font-bold">
                Forgot your password?
              </Link>
            </div>
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="text-white disabled:bg-green-200 disabled:text-gray-500 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            {isLoading ? <FaSpinner className="animate-spin" /> : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
