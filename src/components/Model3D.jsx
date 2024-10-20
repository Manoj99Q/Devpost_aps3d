
import React, { useEffect, useRef } from 'react';

const Model3D = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    const initMap = async () => {
      if (!mapRef.current || mapInstanceRef.current) return;

      const { Map3DElement, Model3DElement } = await google.maps.importLibrary("maps3d");
      //chiacago 41.828875, -87.621025,1000
      //41.8311523125632,-87.63329827317273,192.35427524305246
      const map = new Map3DElement({
        center: {lat: 41.8311523125632, lng: -87.63329827317273, altitude: 1000},
        heading: -90,
        tilt: 90,
        defaultLabelsDisabled: true,
      });

      mapRef.current.innerHTML = ''; // Clear any existing content
      mapRef.current.appendChild(map);
      mapInstanceRef.current = map;

      const models = [
        // A model with regular settings.
        {
          position: {lat: 41.835818, lng:-87.615100, altitude: 0},
          orientation: {tilt: 270},
          scale: 0.001,
        },
        // // Scaled down model.
        // {
        //   position: {lat: 37.75, lng: -121.63, altitude: 0},
        //   orientation: {tilt: 270},
        //   scale: 0.8,
        // },
        // // Scaled up model.
        // {
        //   position: {lat: 37.735, lng: -121.63, altitude: 0},
        //   orientation: {tilt: 270},
        //   scale: 1.2,
        // },
        // // A model with an additional transformation applied.
        // {
        //   position: {lat: 37.72, lng: -121.63, altitude: 0},
        //   orientation: {tilt: 270, roll: 90},
        // },
        // // Non-clamped to the ground model.
        // {
        //   position: {lat: 37.71, lng: -121.63, altitude: 1000},
        //   altitudeMode: 'RELATIVE_TO_GROUND',
        //   orientation: {tilt: 270},
        // },
      ];

      for (const {position, altitudeMode, orientation, scale} of models) {
        const model = new Model3DElement({
          src: 'public/3dmodels/hulkbuster.glb', // Updated path
          position,
          altitudeMode:"RELATIVE_TO_MESH",
          orientation,
          scale:0.1,
        });
        console.log('Model created:', model);
        map.appendChild(model);
        console.log('Model appended to map');
      }

      const model = new Model3DElement({
        src: 'public/3dmodels/bumblebee.glb', // Updated path
        position: {lat: 41.835818, lng:-87.615100, altitude: 0},
        orientation: {tilt: 270},
        scale: 0.1,
      });
      console.log('Model created:', model);
      map.appendChild(model);
      console.log('Model appended to map');
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
