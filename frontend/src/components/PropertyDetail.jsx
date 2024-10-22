import React from "react";
import { useLocation } from "react-router-dom";
import "./PropertyDetail.css";

const PropertyDetail = () => {
  const location = useLocation();
  const property = location.state;

  if (!property) {
    return <p className="no-details">Property details are not available.</p>;
  }

  return (
    <div className="property-detail-container mx-auto mt-8">
      <h1 className="property-title">{property.title}</h1>

      {/* Image Section */}
      <img
        src={property.image}
        alt={property.title}
        className="property-image"
      />

      {/* Property Details Table */}
      <table className="property-details-table">
        <tbody>
          <tr>
            <th className="table-header">Location</th>
            <td className="table-data">{property.location}</td>
          </tr>
          <tr>
            <th className="table-header">Price</th>
            <td className="table-data">₹{property.price} / night</td>
          </tr>
          <tr>
            <th className="table-header">Category</th>
            <td className="table-data">{property.category}</td>
          </tr>
          <tr>
            <th className="table-header">Amenities</th>
            <td className="table-data">{property.amenities.join(", ")}</td>
          </tr>
        </tbody>
      </table>

      {/* Description Section */}
      <div className="property-description">
        <h2 className="description-title">Description</h2>
        <p className="description-text">{property.description}</p>
      </div>
    </div>
  );
};

export default PropertyDetail;
