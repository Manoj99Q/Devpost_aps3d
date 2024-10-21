import React, { useEffect, useRef, useState, createContext } from 'react';

export const Map3DContext = createContext();

const Map3D = ({ children, mapOptions }) => {
  const mapRef = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initMap = async () => {
      if (!window.google || !window.google.maps) {
        console.error('Google Maps API is not loaded');
        return;
      }
      try {
        const { Map3DElement } = await window.google.maps.importLibrary("maps3d");

        const defaultOptions = {
          center: { lat: 0, lng: 0.98, altitude: 1800 },
          heading: -90,
          tilt: 90,
          defaultLabelsDisabled: false,
        };

        const map = new Map3DElement({ ...defaultOptions, ...mapOptions });

        mapRef.current.appendChild(map);
        setMapInstance(map);
      } catch (err) {
        console.error('Error importing maps3d library:', err);
        setError('Error importing maps3d library');
      }
    };

    if (!mapInstance) {
      initMap();
    }

    return () => {
      if (mapInstance && mapRef.current.contains(mapInstance)) {
        mapRef.current.removeChild(mapInstance);
      }
    };
  }, [mapInstance]);

  if (error) {
    return <div>Error loading map: {error}</div>;
  }

  return (
    <Map3DContext.Provider value={{ mapInstance }}>
      <div ref={mapRef} style={{ height: '100%', width: '100%', overflow: 'hidden' }}>
        {children}
      </div>
    </Map3DContext.Provider>
  );
};

export default Map3D;
