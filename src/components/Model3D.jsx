
import React, { useEffect, useRef, useContext } from 'react';
import { Map3DContext } from './Map3D';

const Model3D = () => {
  const { mapInstance } = useContext(Map3DContext);
  const modelRef = useRef(null);
  console.log("mdoel3d laoding");
  useEffect(() => {
    const initModel = async () => {
      if (!mapInstance) {
        console.error('Map3D instance is not available');
        return;
      }

      try {
        const { Model3DElement } = await google.maps.importLibrary("maps3d");

        const model = new Model3DElement({
          src: 'public/3dmodels/bumblebee.glb',
          position: {lat: 41.835818, lng:-87.615100, altitude: 0},
          orientation: {tilt: 270},
          scale: 0.1,
        });

        mapInstance.appendChild(model);
        modelRef.current = model;
      } catch (err) {
        console.error('Error loading 3D model:', err);
      }
    };

    initModel();

  }, []);

  return null;
};

export default Model3D;
