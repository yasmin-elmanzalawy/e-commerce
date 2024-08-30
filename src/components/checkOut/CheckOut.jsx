import React, { useContext, useState } from 'react';
import { CartContext } from '../../Context/CartContext';
import { useFormik } from 'formik';
import Loading from '../Loading/Loading'; // Import Loading component
import toast from 'react-hot-toast';

export default function Checkout() {
  const { checkOut } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false); // Manage loading state

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: async (values) => {
      setIsLoading(true); // Set loading to true before starting the checkout process
      try {
        await checkOut(values); // Perform checkout
        toast.success("Checkout successful!");
      } catch (error) {
        console.error("Error during checkout:", error);
        toast.error("An error occurred during checkout.");
      } finally {
        setIsLoading(false); // Set loading to false after checkout is complete
      }
    },
  });

  return (
    <>
      <div className='py-9 px-40'>
        <h1 className='text-center font-bold text-main text-3xl text-main-green'>CHECK OUT</h1>
        {isLoading ? (
          <div className="flex items-center justify-center w-full h-screen">
            <Loading size="w-16 h-16" /> {/* Show loading spinner */}
          </div>
        ) : (
          <form onSubmit={formik.handleSubmit} className="w-3/2 mx-auto my-10">
            <div className="relative z-0 w-full mb-6 group">
              <label
                htmlFor="details"
                className="block text-gray-700 mb-1"
              >
                Details :
                <textarea
                  type="text"
                  name="details"
                  id="details"
                  value={formik.values.details}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full p-2 border rounded-lg border-gray-300 
                    focus:outline-none focus:ring-2 focus:ring-main-green"
                  placeholder=" "
                  required
                />
              </label>
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <label
                htmlFor="phone"
                className="block text-gray-700 mb-1"
              >
                Enter your phone :
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full p-2 border rounded-lg border-gray-300 
                    focus:outline-none focus:ring-2 focus:ring-main-green"
                  placeholder=" "
                  required
                />
              </label>
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <label
                htmlFor="city"
                className="block text-gray-700 mb-1"
              >
                City :
                <input
                  type="text"
                  name="city"
                  id="city"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full p-2 border rounded-lg border-gray-300 
                    focus:outline-none focus:ring-2 focus:ring-main-green"
                  placeholder=" "
                  required
                />
              </label>
            </div>

            <button
              type="submit"
              className="text-white bg-main-green hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Proceed with payment
            </button>
          </form>
        )}
      </div>
    </>
  );
}
