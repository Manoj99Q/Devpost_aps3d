import { useContext, useCallback } from "react";
import { Map3DContext } from "../contexts/Map3DContext";

export const useFlyCameraAround = () => {
  const { mapInstance } = useContext(Map3DContext);

  return useCallback(
    async (options) => {
      if (!mapInstance) {
        console.warn("Map instance not available");
        return;
      }

      try {
        // Ensure the map is properly loaded
        await new Promise((resolve) => {
          if (mapInstance.isReady) {
            resolve();
          } else {
            mapInstance.addEventListener("ready", () => resolve(), {
              once: true,
            });
          }
        });

        // Default options
        const defaultOptions = {
          duration: 10000, // 10 seconds
          rounds: 1,
          center: mapInstance.center,
          altitude: mapInstance.center.altitude,
          tilt: mapInstance.tilt,
        };

        const animationOptions = { ...defaultOptions, ...options };

        // Start the animation
        await mapInstance.flyCameraAround(animationOptions);
      } catch (error) {
        console.error("Error in flyCameraAround:", error);
        throw error;
      }
    },
    [mapInstance]
  );
};

/**
 * Custom hook for flying the camera to a specific position
 * @returns {Function} Function to trigger the fly to animation
 */
export const useFlyCameraTo = () => {
  const { mapInstance } = useContext(Map3DContext);

  return useCallback(
    async (options) => {
      if (!mapInstance) {
        console.warn("Map instance not available");
        return;
      }

      try {
        // Ensure the map is properly loaded
        await new Promise((resolve) => {
          if (mapInstance.isReady) {
            resolve();
          } else {
            mapInstance.addEventListener("ready", () => resolve(), {
              once: true,
            });
          }
        });

        // Default options
        const defaultOptions = {
          duration: 2000, // 2 seconds
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

        // Start the animation
        console.log("Flying camera to:", animationOptions);
        await mapInstance.flyCameraTo(animationOptions);
      } catch (error) {
        console.error("Error in flyCameraTo:", error);
        throw error;
      }
    },
    [mapInstance]
  );
};
