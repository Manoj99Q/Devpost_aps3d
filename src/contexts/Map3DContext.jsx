// contexts/Map3DContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const Map3DContext = createContext();

export const Map3DProvider = ({ children }) => {
  const [mapInstance, setMapInstance] = useState(null);
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);

  useEffect(() => {
    const waitForGoogleMapsAPI = () => {
      return new Promise((resolve, reject) => {
        const maxAttempts = 10;
        let attempts = 0;

        const checkGoogleMapsAPI = () => {
          if (window.google && window.google.maps) {
            resolve();
            setIsGoogleMapsLoaded(true);
          } else if (attempts >= maxAttempts) {
            reject(new Error("Google Maps API failed to load"));
          } else {
            attempts++;
            setTimeout(checkGoogleMapsAPI, 500);
          }
        };

        checkGoogleMapsAPI();
      });
    };

    waitForGoogleMapsAPI();
  }, []);

  return (
    <Map3DContext.Provider
      value={{ mapInstance, setMapInstance, isGoogleMapsLoaded }}
    >
      {children}
    </Map3DContext.Provider>
  );
};
