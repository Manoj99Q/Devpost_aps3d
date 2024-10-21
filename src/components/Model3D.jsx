
import React, { useEffect, useRef, useContext ,useState} from 'react';
import { Map3DContext } from './Map3D';

const Model3D = ({ model }) => {
  const { mapInstance } = useContext(Map3DContext);
  const modelRef = useRef(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const initModel = async () => {
      if (!mapInstance) {
        // console.error('Map3D instance not found');
        return;
      }
      
       // Check for required fields
       if (!model.position || !model.src) {
        setError("Both 'position' and 'src' must be set for the Model3DElement to display.");
        return;
      }

      try {
        const { Model3DElement } = await google.maps.importLibrary("maps3d");


        const modelOptions = {
          position: model.position,
          src: model.src,
          // altitudeMode: model.altitudeMode || "absolute",
          orientation: model.orientation,
          scale: model.scale,
        };


        // Remove undefined properties
        Object.keys(modelOptions).forEach(key => modelOptions[key] === undefined && delete modelOptions[key]);

        const modelElement = new Model3DElement(modelOptions);

        mapInstance.appendChild(modelElement);
        modelRef.current = modelElement;
      } catch (err) {
        console.error('Error loading 3D model:', err);
        setError(`Error loading 3D model: ${err.message}`);
      }
    };

    initModel();

    return () => {
      if (modelRef.current && mapInstance) {
        mapInstance.removeChild(modelRef.current);
      }
    };

  }, [mapInstance,model]);

  return null;
};

export default Model3D;
