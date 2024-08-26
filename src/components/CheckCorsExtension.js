import React, { useState, useEffect } from "react";
import axios from "axios";
// import './App.css'; // Ensure this file contains the CSS from above

const CheckCorsExtension = () => {
  const [isCorsEnabled, setIsCorsEnabled] = useState(null);

  useEffect(() => {
    const url = "https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.61610&lng=73.72860&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";

    axios
      .get(url)
      .then((response) => {
        if (response.status === 200) {
          setIsCorsEnabled(true); // CORS extension is enabled
        }
      })
      .catch((error) => {
        setIsCorsEnabled(false); // CORS extension is not enabled
      });
  }, []);

  return (
    <div>
      {isCorsEnabled === null && <p>Checking CORS extension status...</p>}
    
      {isCorsEnabled === false && (
        <p className="text-red-600 font-semibold fade-in-out">
          Hi User 😀 I am using a free API. Please download and enable the CORS extension to view my page.
        </p>
      )}
    </div>
  );
};

export default CheckCorsExtension;
