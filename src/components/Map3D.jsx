import React, { useEffect, useRef, useState } from 'react';

const Map3D = () => {
  const mapRef = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initMap = () => {
      if (!window.google || !window.google.maps) {
        console.error('Google Maps API is not loaded');
        return;
      }
      const googleMaps = window.google.maps;
      googleMaps.importLibrary("maps3d").then(({ Map3DElement, Model3DElement }) => {

        const map = new Map3DElement({
          center: {lat: 41.8781, lng: -87.6298, altitude: 1800},
          heading: -90,
          tilt: 90,
          defaultLabelsDisabled: true,
        });

        mapRef.current.appendChild(map);
        setMapInstance(map);

        const models = [
          {
            position: {lat: 41.8781, lng: -87.6298, altitude: 0},
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
      }).catch(err => {
        console.error('Error importing maps3d library:', err);
        setError('Error importing maps3d library');
      });
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
  });

  if (error) {
    return <div>Error loading map: {error}</div>;
  }

  return <div ref={mapRef} style={{ height: '100%', width: '100%', overflow: 'hidden' }}></div>;
};

export default Map3D;