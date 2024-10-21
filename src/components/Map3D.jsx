import React, { useEffect, useRef, useState } from 'react';

const Map3D = () => {
  const mapRef = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initMap = async () => {
      if (!window.google || !window.google.maps) {
        console.error('Google Maps API is not loaded');
        return;
      }
      const googleMaps = window.google.maps;
      try {
        const { Map3DElement } = await googleMaps.importLibrary("maps3d");

        const map = new Map3DElement({
          center: { lat: 41.8781, lng: -87.6298, altitude: 1800 },
          heading: -90,
          tilt: 90,
          defaultLabelsDisabled: true,
        });

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
      delete window.initMap;
    };
  }, [mapInstance]);

  if (error) {
    return <div>Error loading map: {error}</div>;
  }

  return <div ref={mapRef} style={{ height: '100%', width: '100%', overflow: 'hidden' }}></div>;
};

export default Map3D;
