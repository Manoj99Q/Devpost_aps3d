import React, { useEffect, useRef, useState, createContext } from "react";

export const Map3DContext = createContext();

const Map3D = ({ children, mapOptions }) => {
  const mapRef = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const waitForGoogleMapsAPI = () => {
      return new Promise((resolve, reject) => {
        const maxAttempts = 10;
        let attempts = 0;

        const checkGoogleMapsAPI = () => {
          if (window.google && window.google.maps) {
            resolve();
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

    const initMap = async () => {
      try {
        await waitForGoogleMapsAPI();

        if (!isMounted) return;

        if (!mapInstance) {
          const { Map3DElement } = await window.google.maps.importLibrary(
            "maps3d"
          );

          const defaultOptions = {
            center: { lat: 0, lng: 0.98, altitude: 1800 },
            heading: -90,
            tilt: 90,
            defaultLabelsDisabled: false,
          };

          const map = new Map3DElement({ ...defaultOptions, ...mapOptions });

          if (mapRef.current) {
            mapRef.current.appendChild(map);
            setMapInstance(map);

            // Add the gmp-click event listener
            map.addEventListener("gmp-click", handleMapClick);
          }
        }
      } catch (err) {
        console.error("Error importing maps3d library:", err);
        if (isMounted) setError("Error importing maps3d library");
      }
    };

    // Handle gmp-click event
    const handleMapClick = (clickEvent) => {
      console.log("Map3D clicked!", clickEvent);
    };

    initMap();

    return () => {
      isMounted = false;
      // Remove map from DOM only if necessary
      if (
        mapInstance &&
        mapRef.current &&
        mapRef.current.contains(mapInstance)
      ) {
        mapRef.current.removeChild(mapInstance);
      }

      // Remove the gmp-click event listener when component unmounts
      if (mapInstance) {
        mapInstance.removeEventListener("gmp-click", handleMapClick);
      }
    };
  }, []); // Use an empty dependency array to run only on initial mount

  if (error) {
    return <div>Error loading map: {error}</div>;
  }

  return (
    <Map3DContext.Provider value={{ mapInstance }}>
      <div
        ref={mapRef}
        style={{ height: "100%", width: "100%", overflow: "hidden" }}
      >
        {mapInstance &&
          React.Children.map(children, (child) => {
            if (!React.isValidElement(child)) return null;
            return React.cloneElement(child, {
              key: child.key || Math.random().toString(36).substr(2, 9),
            });
          })}
      </div>
    </Map3DContext.Provider>
  );
};

export default Map3D;
