import React, { useEffect, useRef, useState } from 'react';

const Map3D = ({ apiKey }) => {
  const mapRef = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initMap = async () => {
      try {
        if (!window.google || !window.google.maps) {
          throw new Error('Google Maps API is not loaded');
        }
        const googleMaps = window.google.maps;
        const { Map3DElement, Model3DElement } = await google.maps.importLibrary("maps3d");

        const map = new Map3DElement({
          center: {lat: 37.7438, lng: -121.5088, altitude: 1800},
          heading: -90,
          tilt: 90,
          defaultLabelsDisabled: true,
        });

        mapRef.current.appendChild(map);
        setMapInstance(map);

        const models = [
          {
            position: {lat: 37.76, lng: -121.63, altitude: 0},
            orientation: {tilt: 270},
          },
          // ... other models ...
        ];

        models.forEach(({position, altitudeMode, orientation, scale}) => {
          const model = new Model3DElement({
            src: 'path/to/your/model.glb', // Replace with your actual GLB file URL
            position,
            altitudeMode,
            orientation,
            scale,
          });

          map.appendChild(model);
        });
      } catch (err) {
        console.error('Error initializing map:', err);
        setError(err.message);
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
  }, [apiKey]);

  if (error) {
    return <div>Error loading map: {error}</div>;
  }

  return <div ref={mapRef} style={{ height: '100%', width: '100%', overflow: 'hidden' }}></div>;
};

export default Map3D;
