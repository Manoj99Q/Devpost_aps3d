
import React, { useEffect, useRef } from 'react';

const Model3D = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    const initMap = async () => {
      if (!mapRef.current || mapInstanceRef.current) return;

      const { Map3DElement, Model3DElement } = await google.maps.importLibrary("maps3d");

      const map = new Map3DElement({
        center: {lat: 41.8311523125632, lng: -87.63329827317273, altitude: 1000},
        heading: -90,
        tilt: 90,
        defaultLabelsDisabled: true,
      });

      mapRef.current.innerHTML = '';
      mapRef.current.appendChild(map);
      mapInstanceRef.current = map;

      const models = [
        {
          position: {lat: 41.835818, lng:-87.615100, altitude: 0},
          orientation: {tilt: 270},
          scale: 0.001,
        },
      ];

      for (const {position, altitudeMode, orientation, scale} of models) {
        const model = new Model3DElement({
          src: 'public/3dmodels/hulkbuster.glb',
          position,
          altitudeMode:"RELATIVE_TO_MESH",
          orientation,
          scale:0.1,
        });
        map.appendChild(model);
      }

      const model = new Model3DElement({
        src: 'public/3dmodels/bumblebee.glb',
        position: {lat: 41.835818, lng:-87.615100, altitude: 0},
        orientation: {tilt: 270},
        scale: 0.1,
      });
      map.appendChild(model);
    };

    const loadMap = () => {
      if (window.google && window.google.maps) {
        initMap();
      } else {
        setTimeout(loadMap, 100);
      }
    };

    loadMap();

    return () => {
      if (mapRef.current) {
        mapRef.current.innerHTML = '';
      }
      mapInstanceRef.current = null;
    };
  }, []);

  return <div ref={mapRef} style={{ height: '100vh', width: '100%' }}></div>;
};

export default Model3D;
