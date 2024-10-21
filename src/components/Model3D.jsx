
import React, { useEffect, useRef, useContext } from 'react';
import { Map3DContext } from './Map3D';

const Model3D = () => {
  const { mapInstance } = useContext(Map3DContext);

  useEffect(() => {
    const initMap = async () => {
      if (!mapInstance) return;

      const { Map3DElement, Model3DElement } = await google.maps.importLibrary("maps3d");


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

  }, []);

  return null;
};

export default Model3D;
