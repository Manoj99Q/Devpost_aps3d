import React, { useEffect, useRef, useContext, useState } from "react";
import { Map3DContext } from "./Map3D";

const Model3D = ({ modelOptions }) => {
  const { mapInstance } = useContext(Map3DContext);
  const modelInstanceRef = useRef(null);
  const initPromiseRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function initializeModel() {
      // If already initializing or initialized, skip
      if (initPromiseRef.current || modelInstanceRef.current) {
        return;
      }

      if (!modelOptions.position || !modelOptions.src) {
        setError(
          "Both 'position' and 'src' must be set for the Model3DElement to display."
        );
        return;
      }

      // Set the promise ref immediately to prevent double initialization
      initPromiseRef.current = (async () => {
        try {
          if (controller.signal.aborted) return;

          const { Model3DElement } = await google.maps.importLibrary("maps3d");

          if (controller.signal.aborted) return;

          // const modelOptions = {
          //   position: model.position,
          //   src: model.src,
          //   orientation: model.orientation,
          //   scale: model.scale,
          // };

          // Remove undefined properties
          Object.keys(modelOptions).forEach(
            (key) => modelOptions[key] === undefined && delete modelOptions[key]
          );

          const newModel = new Model3DElement(modelOptions);

          if (controller.signal.aborted) {
            newModel.remove();
            return;
          }

          newModel.addEventListener("gmp-click", () => {
            console.log("Model clicked", modelOptions.src);
          });

          mapInstance.appendChild(newModel);
          modelInstanceRef.current = newModel;

          console.log(`Model ${model.src} initialized`);
        } catch (error) {
          console.error(`Error initializing model ${model.src}:`, error);
          setError(`Error loading 3D model: ${error.message}`);
          throw error;
        }
      })();

      try {
        await initPromiseRef.current;
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error(`Failed to initialize model ${model.src}:`, error);
        }
      }
    }

    if (mapInstance) {
      initializeModel();
    }

    return () => {
      controller.abort();

      if (modelInstanceRef.current) {
        modelInstanceRef.current.removeEventListener("gmp-click", () => {
          console.log("Model clicked", model.src);
        });
        mapInstance?.removeChild(modelInstanceRef.current);
        modelInstanceRef.current = null;
        console.log(`Model ${model.src} cleaned up`);
      }

      initPromiseRef.current = null;
    };
  }, [mapInstance]);

  //update model
  useEffect(() => {
    if (modelInstanceRef.current) {
      if (modelOptions.position)
        modelInstanceRef.current.position = modelOptions.position;
      if (modelOptions.scale)
        modelInstanceRef.current.scale = modelOptions.scale;
      if (modelOptions.orientation)
        modelInstanceRef.current.orientation = modelOptions.orientation;
    }
  }, [modelOptions.position, modelOptions.scale, modelOptions.orientation]);

  if (error) {
    console.error(error);
  }

  return null;
};

export default Model3D;
