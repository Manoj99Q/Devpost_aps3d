import React, { useEffect, useRef } from 'react';

const Map3D = ({ center, tilt = "67.5" }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const initMap = async () => {
      if (!mapRef.current) return;

      const { Map3DElement } = await google.maps.importLibrary("maps3d");
      
      // Parse the center string into an object
      const [lat, lng, altitude] = center.split(',').map(Number);
      
      const map = new Map3DElement({
        center: { lat, lng, altitude },
        tilt: parseFloat(tilt),
        defaultLabelsDisabled: true,
      });

      mapRef.current.appendChild(map);
    };

    if (window.google && window.google.maps) {
      initMap();
    } else {
      const checkGoogleMaps = setInterval(() => {
        if (window.google && window.google.maps) {
          clearInterval(checkGoogleMaps);
          initMap();
        }
      }, 100);
    }

    return () => {
      if (mapRef.current && mapRef.current.firstChild) {
        mapRef.current.removeChild(mapRef.current.firstChild);
      }
    };
  }, [center, tilt]);

  return <div ref={mapRef} style={{ height: '100%', width: '100%' }}></div>;
};

export default Map3D;