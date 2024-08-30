import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
        setProduct(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch product details:", error);
        setLoading(false);
      }
    };

    getProductDetails();
  }, [id]);

  async function handleAddToCart() {
    try {
      const response = await addToCart(id);
      console.log(response); // Log the response for debugging

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

  if (loading) return (
    <div className="flex items-center justify-center h-screen">
      <Loading size="w-24 h-24" />
    </div>
  );

  if (!product) return <p className="text-center mt-8">Product not found.</p>;

  return (
    <div className="px-8 sm:px-20 lg:px-40 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="relative w-full lg:w-1/2 h-80">
          <img 
            src={product.imageCover || 'https://via.placeholder.com/300x300'} 
            alt={product.title} 
            className="absolute inset-0 w-full h-full object-contain rounded-md"
          />
        </div>
        <div className="lg:w-1/2 flex flex-col justify-between">
          <h1 className="text-3xl font-bold text-main-green mb-4">{product.title}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-gray-900 text-lg mb-4">{product.price} EGP</p>
          <button
            className="bg-main-green text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
            onClick={handleAddToCart}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}
