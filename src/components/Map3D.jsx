import React, { useEffect, useRef, useState } from 'react';

const Map3D = ({ apiKey }) => {
  const mapRef = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadGoogleMapsApi = () => {
      return new Promise((resolve, reject) => {
        if (window.google && window.google.maps) {
          resolve(window.google.maps);
          return;
        }

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=alpha&callback=initMap`;
        script.async = true;
        script.defer = true;
        
        window.initMap = () => {
          if (window.google && window.google.maps) {
            resolve(window.google.maps);
          } else {
            reject(new Error('Google Maps API failed to load'));
          }
        };

        script.onerror = () => {
          reject(new Error('Failed to load Google Maps API script'));
        };

        document.head.appendChild(script);
      });
    };

    const initMap = async () => {
      try {
        const googleMaps = await loadGoogleMapsApi();
        const { Map3DElement, Model3DElement } = await googleMaps.importLibrary("maps3d");

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
