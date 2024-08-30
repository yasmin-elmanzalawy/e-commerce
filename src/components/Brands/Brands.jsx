import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../Loading/Loading";

export default function Brands() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [isPopupLoading, setIsPopupLoading] = useState(false);

  useEffect(() => {
    const getBrands = async () => {
      try {
        const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
        setData(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch brands:", error);
        setLoading(false);
      }
    };

    getBrands();
  }, []);

  const openPopup = async (brand) => {
    setIsPopupLoading(true);
    setSelectedBrand(brand);
    setIsPopupOpen(true);
    setTimeout(() => {
      setIsPopupLoading(false);
    }, 500);
  };

  const closePopup = () => {
    setClosing(true);
    setTimeout(() => {
      setIsPopupOpen(false);
      setClosing(false);
      setSelectedBrand(null);
    }, 300);
  };

  return (
    <div className="px-8 sm:px-20 lg:px-40 py-8">
      <h2 className="text-3xl font-bold text-main-green my-6">All Brands</h2>

      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <Loading size="w-16 h-16" />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {data.length === 0 ? (
            <p className="text-center">No brands found.</p>
          ) : (
            data.map((brand) => (
              <div
                key={brand._id}
                onClick={() => openPopup(brand)}
                className="border-2 border-gray-300 rounded-lg p-4 text-center transition-all duration-300 hover:border-green-500 cursor-pointer"
              >
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="w-full h-auto rounded-md mb-2"
                />
                <h3 className="text-lg font-semibold text-gray-800">{brand.name}</h3>
              </div>
            ))
          )}
        </div>
      )}

      {isPopupOpen && (
        <div
          className={`fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 transition-opacity duration-300 ${closing ? 'opacity-0' : 'opacity-100'}`}
        >
          <div
            className={`bg-white p-8 rounded-lg shadow-lg w-80 text-center transform transition-transform duration-300 ${closing ? 'scale-90' : 'scale-100'}`}
          >
            {isPopupLoading ? (
              <div className="flex items-center justify-center h-full">
                <Loading size="w-12 h-12" />
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold text-main-green mb-4">{selectedBrand.name}</h3>
                <div className="flex items-center justify-between">
                  <p className="text-gray-800">{selectedBrand.name}</p>
                  <img
                    src={selectedBrand.image}
                    alt={selectedBrand.name}
                    className="w-16 h-16 rounded-full"
                  />
                </div>
                <button
                  onClick={closePopup}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all duration-300 mt-4"
                >
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
