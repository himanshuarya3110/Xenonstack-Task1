import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { recommend } from "../react-query/api/peroperty";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Recommendation.css";
import { useTheme } from './ThemeContext';
import { properties } from "../utils/data";


// Custom Next Arrow Component
const NextArrow = ({ onClick }) => (

  <div className="arrow arrow-next" onClick={onClick}>
    &gt;
  </div>
);

// Custom Prev Arrow Component
const PrevArrow = ({ onClick }) => (
  <div className="arrow arrow-prev" onClick={onClick}>
    &lt;
  </div>
);

const Recommendations = ({ recommended }) => {
  const [called, setCalled] = useState(true);
  const [recommendations, setRecommendations] = useState([]);


  // const data = await recommend(localproper);

  useEffect(() => {
    async function recommending() {
      try {
        const localproper = JSON.parse(localStorage.getItem("viewedProperties"));
        let data = [];

        if (localproper && Array.isArray(localproper)) {
          localproper.forEach((p) => {
            const matchingProperties = properties.filter((property) => property.location === p.location);
            data = data.concat(matchingProperties);
            console.log("DAD", matchingProperties); // Use a comma for better logging
          });
        }

        setRecommendations(data);



        console.log(recommendations);
      } catch (e) {
        console.log(e);
      }
      setCalled(false);
    }
    called && recommending();
  }, [recommendations]);

  
const settings = {
  dots: true,
  infinite: recommendations.length > 3,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  nextArrow: <NextArrow className="arrow" />,
  prevArrow: <PrevArrow className="arrow" />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: Math.min(recommendations.length, 2),
        slidesToScroll: 1,
        infinite: recommendations.length > 2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: Math.min(recommendations.length, 1),
        slidesToScroll: 1,
        infinite: recommendations.length > 1,
      },
    },
  ],
};


  const { isDarkMode } = useTheme();


  return (
    <div className={`${isDarkMode ? 'bg-gray-600 text-white' : 'bg-white text-gray-600'} recommendation-container`}>
  {recommendations.length > 0 ? (
    <div>
      <h2 className="recommendation-title text-2xl font-bold mb-4">Recommended Properties</h2>
      <Slider {...settings} className="recommendation-slider h-30">
        {recommendations.map((property) => (
          <div key={property.id} className="recommendation-card mx-9 p-10 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl duration-300 ease-in-out">
            <h3 className="recommendation-card-title text-lg font-semibold">{property.title}</h3>
            <p className="recommendation-card-text">
              <strong>Location:</strong> {property.location}
            </p>
            <p className="recommendation-card-text">
              <strong>Price:</strong> ${property.price} / night
            </p>
            <p className="recommendation-card-text">
              <strong>Category:</strong> {property.category}
            </p>
            <p className="recommendation-card-text">
              <strong>Amenities:</strong> {property.amenities.join(", ")}
            </p>
          </div>
        ))}
      </Slider>
    </div>
  ) : (
    <div className="text-center py-10">
      <h2 className="text-xl font-semibold">No recommendations available at this time.</h2>
    </div>
  )}
</div>

  );
};

export default Recommendations;
