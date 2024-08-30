import React from "react";
import { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import { FaCartShopping } from "react-icons/fa6";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

//! Validation /////
//!

function Register() {
  // !register
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const isActive = (path) => location.pathname === path;
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const schema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(3, "must be more than 3 letters")
      .max(10, "Name can't exceed 10 letters"),
    email: Yup.string().required().email("email is not valid"),
    password: Yup.string()
      .required("password is required")
      .matches(
        /^[A-Z].{5,}/,
        "Must start with uppercase and minimum of 5 chars"
      ),
    rePassword: Yup.string()
      .required("rePassword is required")
      .oneOf([Yup.ref("password")], "password must be match rePassword"),

    phone: Yup.string()
      .required("phone is required")
      .matches(/^01[0125][0-9]{8}$/, "phone must be a valid egyptian number"),
  });


  const {setToken} =useContext(UserContext);
  const navigate = useNavigate();
  const formik = useFormik({
    //! init
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },

  
    onSubmit: handleSubmit,

    validationSchema: schema,
   
  });
  
  async function handleSubmit(values) {
    setIsLoading(true);
    try {
      const {data} = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
      if(data.message == "success") {

        navigate('/e-commerce/')

        setToken(data.token)
      }
    } catch (error) {
      setErrMsg(error.response.data.message);
      console.log(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    console.log("Mounting Register");
  }, []);
  return (
  <div>
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
      <div className="text-left px-40 ">
      <h2 className="text-green-600 text-3xl font-bold">Register</h2>

      {errMsg ? (
        <>
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {errMsg}
          </div>
        </>
      ) : null}
      <form onSubmit={formik.handleSubmit} className=" mt-5 mx-auto">
        <div className="relative z-0 w-full mb-5 group">
        <label
            htmlFor="name"
            className="block text-gray-700 mb-1"
          > UserName :
            <input
            {...formik.getFieldProps("name")}
            name="name"
            id="name"
            type="text"
            className="w-full p-2 border rounded-lg border-gray-300 
focus:outline-none focus:ring-2 focus:ring-main-green"
            placeholder=" "
          />
          </label>

          {formik.errors.name && formik.touched.name ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.name}
            </div>
          ) : null}
        </div>
        <div className="relative z-0 w-full mb-5 group">
        <label
            htmlFor="email"
            className="block text-gray-700 mb-1"
          >
            UserEmail :
            <input
            {...formik.getFieldProps("email")}
            type="email"
            name="email"
            id="email"
            className="w-full p-2 border rounded-lg border-gray-300 
focus:outline-none focus:ring-2 focus:ring-main-green"
            placeholder=" "
          />
          </label>
          {formik.errors.email && formik.touched.email ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.email}
            </div>
          ) : null}
        </div>
        <div className="relative z-0 w-full mb-5 group">
        <label
            htmlFor="password"
            className="block text-gray-700 mb-1"
          >
            UserPassword :<input
            {...formik.getFieldProps("password")}
            type="password"
            name="password"
            id="password"
            className="w-full p-2 border rounded-lg border-gray-300 
focus:outline-none focus:ring-2 focus:ring-main-green"
            placeholder=" "
          />
          
          </label>

          {formik.errors.password && formik.touched.password ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.password}
            </div>
          ) : null}
        </div>
        <div className="relative z-0 w-full mb-5 group">
        <label
            htmlFor="rePassword"
            className="block text-gray-700 mb-1"
          >
            UserRePassword :<input
            {...formik.getFieldProps("rePassword")}
            type="password"
            name="rePassword"
            id="rePassword"
            className="w-full p-2 border rounded-lg border-gray-300 
focus:outline-none focus:ring-2 focus:ring-main-green"
            placeholder=" "
          />
         
          </label>

          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.rePassword}
            </div>
          ) : null}
        </div>
        <div className="relative z-0 w-full mb-5 group">
        <label
            htmlFor="phone"
            className="block text-gray-700 mb-1"
          >
            UserPhone :<input
            {...formik.getFieldProps("phone")}
            type="tel"
            name="phone"
            id="phone"
            className="w-full p-2 border rounded-lg border-gray-300 
focus:outline-none focus:ring-2 focus:ring-main-green"
            placeholder=" "
          />
          
          </label>

          {formik.errors.phone && formik.touched.phone ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.phone}
            </div>
          ) : null}
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

export default Register;