import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading/Loading";
import { FaStar } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { CartContext } from "../../Context/CartContext";
import { WishListContext } from "../../Context/WishListContext";
import toast from "react-hot-toast";

export default function Products() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { addWishList, getProductWishList } = useContext(WishListContext);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(
          "https://ecommerce.routemisr.com/api/v1/products"
        );
        setData(response.data.data);
        setFilteredData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      setFilteredData(
        data.filter((product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredData(data);
    }
  }, [searchQuery, data]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const products = await getProductWishList();
        if (products) {
          setWishlist(products.map((product) => product._id));
        }
      } catch (error) {
        console.error("Failed to fetch wishlist:", error);
      }
    };

    fetchWishlist();
  }, [getProductWishList]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleProductClick = (id) => {
    navigate(`/e-commerce/product/${id}`);
  };

  async function addItem(productId) {
    try {
      const response = await addToCart(productId);
      if (response.data.status === "success") {
        toast.success("Product added to cart successfully!");
      } else {
        toast.error("Failed to add product to cart.");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("An error occurred while adding the product to the cart.");
    }
  }

  const handleWishlistClick = async (e, productId) => {
    e.stopPropagation();
    try {
      await addWishList(productId);
      setWishlist((prevWishlist) => {
        if (prevWishlist.includes(productId)) {
          return prevWishlist.filter((id) => id !== productId); 
        } else {
          return [...prevWishlist, productId];
        }
      });
      toast.success("Wishlist updated successfully!");
    } catch (error) {
      console.error("Error updating wishlist:", error);
      toast.error("Failed to update wishlist. Please try again.");
    }
  };

  return (
    <>
      <div className="px-8 sm:px-20 py-8">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full md:w-2/3 p-2 border rounded-md shadow-sm"
          />
        </div>

        <div className="gap-5 grid sm:grid-cols-2 lg:grid-cols-4">
          {loading ? (
            <div className="flex items-center justify-center w-full h-screen">
              <Loading size="w-16 h-16" />
            </div>
          ) : filteredData.length === 0 ? (
            <p className="text-center col-span-full">No products found.</p>
          ) : (
            filteredData.map((p) => (
              <div
                key={p._id}
                onClick={() => handleProductClick(p._id)}
                className="text-left group bg-white p-4 rounded-lg shadow-lg cursor-pointer transition-transform transform hover:scale-105"
              >
                <div>
                  <div className="relative w-full h-64">
                    <img
                      src={p.imageCover || "https://via.placeholder.com/150"}
                      alt={p.title}
                      className="absolute inset-0 w-full h-full object-cover rounded-t-md"
                    />
                  </div>
                  <h3 className="text-main-green mt-2 text-lg font-semibold">
                    {p.category.name}
                  </h3>
                  <p className="mt-1 text-gray-700">
                    {p.title.length > 16
                      ? `${p.title.substring(0, 16)}...`
                      : p.title}
                  </p>
                  <div className="flex justify-between items-center text-xl text-yellow-300">
                    <p className="mt-1 text-gray-900">
                      {p.price} <span className="pe-2">EGP</span>
                    </p>
                    <span>
                      <FaStar />
                    </span>
                  </div>
                  <div className="mt-4 text-xl float-right">
                    <FaHeart
                      className={`${wishlist.includes(p._id) ? "text-red-600" : "text-gray-400"} cursor-pointer`}
                      onClick={(e) => handleWishlistClick(e, p._id)}
                    />
                  </div>
                </div>
                <button
                  className="my-3 w-full bg-main-green text-white py-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    addItem(p._id); 
                  }}
                >
                  Add To Cart
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
