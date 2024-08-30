import React, { useContext, useEffect } from 'react';
import { CartContext } from '../../Context/CartContext';
import { WishListContext } from '../../Context/WishListContext';

export default function Wishlist() {
    const { getProductWishList, wishListProduct, isLoading, deleteProduct } = useContext(WishListContext);
    const { addProduct } = useContext(CartContext);

    useEffect(() => {
        getProductWishList();
    }, [getProductWishList]);

    return (
        <>
            <h2 className="font-bold text-center text-4xl py-9 text-fa-bold text-main">Wish list</h2>

            {isLoading ? (
                <div className="py-16 flex justify-center text-center">
                    <p>Loading...</p>
                </div>
            ) : (
                <div className="py-8 w-3/4 mx-auto">
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-16 py-3">
                                        <span className="sr-only">Image</span>
                                    </th>
                                    <th scope="col" className="px-6 py-3 font-bold text-main">Product</th>
                                    <th scope="col" className="px-6 py-3 font-bold text-main">Price</th>
                                    <th scope="col" className="px-6 py-3 font-bold text-main">Remove</th>
                                    <th scope="col" className="px-6 py-3 font-bold text-main">Add To Cart</th>
                                </tr>
                            </thead>
                            <tbody>
                                {wishListProduct && wishListProduct.length > 0 ? (
                                    wishListProduct.map((product) => (
                                        <tr
                                            key={product._id}
                                            className="bg-white border-b dark:bg-gray-900 dark:border-gray-800 hover:bg-gray-80 dark:hover:bg-gray-600"
                                        >
                                            <td className="p-4">
                                                <img
                                                    src={product.imageCover}
                                                    className="w-16 md:w-32 max-w-full max-h-full"
                                                    alt="Product"
                                                />
                                            </td>
                                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                                {product.title}
                                            </td>
                                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                                ${product.price}
                                            </td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => deleteProduct(product._id)}
                                                    className="font-bold text-red-800 dark:text-red-500 hover:underline"
                                                >
                                                    REMOVE
                                                </button>
                                            </td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => addProduct(product._id)}
                                                    className="font-medium bg-green-600 text-white dark:text-white hover:bg-green-500 py-2 px-4 rounded-md"
                                                >
                                                    Add To Cart
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center py-6 text-green-700 text-3xl">
                                            WishList Is Empty
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    );
}
