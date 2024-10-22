import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import PropertyDetail from './PropertyDetail';
import { useNavigate } from 'react-router-dom';
import { properties } from '../utils/data';
import { recommend } from '../react-query/api/peroperty';

const Properties = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleViewDetails = (property) => {
    const viewedProperties = JSON.parse(localStorage.getItem('viewedProperties')) || [];
    viewedProperties.unshift(property);

    // Keep only the last 5 properties
    if (viewedProperties.length > 5) {
      viewedProperties.pop();
    }

    localStorage.setItem('viewedProperties', JSON.stringify(viewedProperties));
    navigate(`/property/${property.id}`, { state: property });
  };

  const filteredProperties = properties.filter((property) =>
    property.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search by location..."
          className="border border-gray-300 p-4 rounded-full text-black w-full max-w-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <div key={property.id} className="bg-gradient-to-r from-teal-400 to-blue-500 shadow-lg rounded-lg overflow-hidden transition-transform duration-300 transform hover:scale-105">
              <div className="relative">
                <img src={property.image} alt={property.title} className="w-full h-48 object-cover rounded-t-lg" />
                <div className="absolute inset-0 bg-black opacity-30"></div>
              </div>
              <div className="p-4 text-white">
                <h2 className="text-3xl font-bold mb-2">{property.title}</h2>
                <p className="text-gray-200">{property.location}</p>
                <p className="mt-2 text-xl font-semibold">{property.price}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-yellow-300">⭐ 4.5 (20 reviews)</span>
                  <span className="text-sm text-gray-300">🏡 Type: Apartment</span>
                </div>
                <button onClick={() => handleViewDetails(property)} className="mt-4 w-full py-2 px-4 bg-white text-blue-600 font-semibold rounded-md shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400">
                  View Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No properties found for this location.</p>
        )}
      </div>
    </div>
  );
};

export default Properties;
