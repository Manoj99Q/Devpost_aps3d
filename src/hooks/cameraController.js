// hooks/cameraController.js
import { useContext, useCallback } from "react";
import { Map3DContext } from "../contexts/Map3DContext";

export const useFlyCameraTo = () => {
  const { mapInstance } = useContext(Map3DContext);

  // console.log("Current map instance in hook:", mapInstance); // Debug log

  return useCallback(
    async (options) => {
      console.log("flyCameraTo called with options:", options); // Debug log

      if (!mapInstance) {
        console.warn("Map instance not available");
        return;
      }

      try {
        // Check if map instance has the method
        if (typeof mapInstance.flyCameraTo !== "function") {
          console.error("flyCameraTo method not found on map instance");
          return;
        }

        // Check if map is ready
        if (!mapInstance.isReady) {
          console.log("Waiting for map to be ready...");
          await new Promise((resolve) => {
            const checkReady = () => {
              if (mapInstance.isReady) {
                resolve();
              } else {
                setTimeout(checkReady, 100);
              }
            };
            checkReady();
          });
        }

        console.log("Map is ready, starting animation");

        // Default options
        const defaultOptions = {
          duration: 2000,
          center: {
            lat: 0,
            lng: 0,
            altitude: 1800,
          },
          tilt: mapInstance.tilt,
          heading: mapInstance.heading,
          roll: mapInstance.roll,
        };

        const animationOptions = { ...defaultOptions, ...options };
        console.log("Final animation options:", animationOptions);

        // Execute the animation
        await mapInstance.flyCameraTo(animationOptions);
        console.log("Animation completed successfully");
      } catch (error) {
        console.error("Error in flyCameraTo:", error);
        throw error;
      }
    },
    [mapInstance]
  );
};

export const useFlyCameraAround = () => {
  const { mapInstance } = useContext(Map3DContext);

  return useCallback(
    async (options) => {
      console.log("flyCameraAround called with options:", options);

      if (!mapInstance) {
        console.warn("Map instance not available");
        return;
      }

      try {
        // Check if map instance has the method
        if (typeof mapInstance.flyCameraAround !== "function") {
          console.error("flyCameraAround method not found on map instance");
          return;
        }

        // Check if map is ready
        if (!mapInstance.isReady) {
          await new Promise((resolve) => {
            const checkReady = () => {
              if (mapInstance.isReady) {
                resolve();
              } else {
                setTimeout(checkReady, 100);
              }
            };
            checkReady();
          });
        }

        // Default options
        const defaultOptions = {
          duration: 10000,
          rounds: 1,
          center: mapInstance.center,
          altitude: mapInstance.center.altitude,
          tilt: mapInstance.tilt,
        };

        const animationOptions = { ...defaultOptions, ...options };
        console.log(
          "Starting camera around animation with options:",
          animationOptions
        );

        await mapInstance.flyCameraAround(animationOptions);
        console.log("Around animation completed successfully");
      } catch (error) {
        console.error("Error in flyCameraAround:", error);
        throw error;
      }
    },
    [mapInstance]
  );
};
