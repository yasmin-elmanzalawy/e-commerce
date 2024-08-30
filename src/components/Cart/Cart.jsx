import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from "../../Context/CartContext";
import { Link } from 'react-router-dom';
import Loading from "../Loading/Loading"; // Import Loading component

export default function Cart() {
  const { getUserCart, updateCartCountItem, deleteProduct, clearCart, setCart, cart } = useContext(CartContext);

  const [cartDetails, setCartDetails] = useState(null);
  const [loading, setLoading] = useState(true); // Manage loading state

  async function getCart() {
    setLoading(true); // Set loading to true before starting the fetch
    try {
      let response = await getUserCart();
      setCartDetails(response?.data.data);
    } catch (error) {
      console.error("Failed to fetch cart details:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching is complete
    }
  }

  async function updateCartCount(productId, count) {
    setLoading(true); // Set loading to true before updating
    try {
      let response = await updateCartCountItem(productId, count);
      setCartDetails(response?.data.data);
    } catch (error) {
      console.error("Failed to update cart item:", error);
    } finally {
      setLoading(false); // Set loading to false after updating is complete
    }
  }

  async function deleteItem(productId) {
    setLoading(true); // Set loading to true before deleting
    try {
      let response = await deleteProduct(productId);
      setCartDetails(response?.data.data);
      setCart(response?.data);
    } catch (error) {
      console.error("Failed to delete cart item:", error);
    } finally {
      setLoading(false); // Set loading to false after deleting is complete
    }
  }

  async function clear() {
    setLoading(true); // Set loading to true before clearing
    try {
      let response = await clearCart();
      setCartDetails(response.data.data);
      setCart(response?.data);
    } catch (error) {
      console.error("Failed to clear cart:", error);
    } finally {
      setLoading(false); // Set loading to false after clearing is complete
    }
  }

  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      <title>Cart</title>
      {loading ? (
        <div className="flex items-center justify-center w-full h-screen">
          <Loading size="w-16 h-16" /> {/* Show loading spinner */}
        </div>
      ) : (
        <>
          <div className='flex justify-center space-x-8 p-5'>
            <p className='text-center text-[30px] font-semibold'>
              Total Price: <span className='text-[25px] text-main-green'>{cartDetails?.totalCartPrice} EGP</span>
            </p>
            <p className='text-center text-[20px] font-semibold'>
              Total Number Of Items: <span className='text-[25px] text-main-green'>{cart?.numOfCartItems}</span>
            </p>
          </div>

          <div className='flex justify-center'>
            <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">
              <Link to={`/e-commerce/e-commerce/checkout/${cartDetails?._id}`}>Check out</Link>
            </button>
          </div>

          <div className="relative overflow-x-auto sm:rounded-lg">
            <div className="flex flex-col items-center mx-auto">
              <table className="w-3/4 text-sm text-left rtl:text-right">
                <tbody>
                  {cartDetails?.products?.map((product) => (
                    <tr key={product.product.id} className="bg-white border-b hover:bg-gray-50">
                      <td className="p-4">
                        <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={product.product.title} />
                      </td>
                      <td className="px-6 py-4 font-semibold">
                        <span className='text-black font-medium text-xl inline-block pb-2'>{product.product.title}</span> <br />
                        <span className='text-black font-medium text-md inline-block pb-2'>{product.price} EGP</span> <br />
                        <span onClick={() => deleteItem(product.product.id)} className="font-semibold text-red-600 dark:text-red-500 cursor-pointer inline-block pb-2">
                          <i className="fa-solid fa-trash p-1"></i>
                          Remove
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center p-3">
                          <button onClick={() => updateCartCount(product.product.id, product.count - 1)} className="inline-flex items-center justify-center p-1.5 text-sm font-medium h-6 w-6 text-green-500 bg-white border border-green-300 rounded-md focus:outline-none hover:bg-gray-100 focus:ring-2 focus:ring-green-200" type="button">
                            <span className="sr-only">Quantity button</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                            </svg>
                          </button>
                          <div className="ms-3">
                            <span className='text-black text-[18px]'>{product.count}</span>
                          </div>
                          <button onClick={() => updateCartCount(product.product.id, product.count + 1)} className="inline-flex items-center justify-center h-6 w-6 p-1.5 ms-3 text-sm font-medium text-green-500 bg-white border border-green-300 rounded-md focus:outline-none hover:bg-gray-100 focus:ring-2 focus:ring-green-200" type="button">
                            <span className="sr-only">Quantity button</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {cartDetails?.products?.length > 0 && (
                <div className="mt-4">
                  <button onClick={() => clear()} type="button" className="bg-main-green hover:text-white border text-lg border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg px-5 py-2.5 text-center dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 ">
                    Clear Cart
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
