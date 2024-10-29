// components/Map3D.jsx
import React, { useState, useEffect, useRef, useContext } from "react";
import { Map3DContext } from "../contexts/Map3DContext";

const Map3D = ({ children, mapOptions }) => {
  const mapRef = useRef(null);
  const { mapInstance, setMapInstance, isGoogleMapsLoaded } =
    useContext(Map3DContext);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const initMap = async () => {
      try {
        if (!isMounted || !isGoogleMapsLoaded) return;

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
            map.addEventListener("gmp-click", handleMapClick);
          }
        }
      } catch (err) {
        console.error("Error importing maps3d library:", err);
        if (isMounted) setError("Error importing maps3d library");
      }
    };

    const handleMapClick = (clickEvent) => {
      console.log("Map3D clicked!", clickEvent);
    };

    if (isGoogleMapsLoaded) {
      initMap();
    }

    return () => {
      isMounted = false;
      if (
        mapInstance &&
        mapRef.current &&
        mapRef.current.contains(mapInstance)
      ) {
        mapRef.current.removeChild(mapInstance);
      }

      if (mapInstance) {
        mapInstance.removeEventListener("gmp-click", handleMapClick);
      }
    };
  }, [isGoogleMapsLoaded]);

  if (error) {
    return <div>Error loading map: {error}</div>;
  }

  return (
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
  );
};

export default Map3D;
