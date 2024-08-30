import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../Loading/Loading";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
        setCategories(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setLoading(false);
      }
    };

    getCategories();
  }, []);

  return (
    <div className="px-8 sm:px-20 lg:px-40 py-8">
      <h2 className="text-3xl font-bold text-main-green my-6">Categories</h2>

      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categories.length === 0 ? (
            <p className="text-center">No categories found.</p>
          ) : (
            categories.map((category) => (
              <div
                key={category._id}
                className="border-2 border-gray-300 rounded-lg p-4 text-center transition-all duration-300 hover:border-green-500 cursor-pointer"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-40 object-cover rounded-md mb-2"
                />
                <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
