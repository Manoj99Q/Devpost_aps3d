import { useContext, useCallback } from "react";
import { Map3DContext } from "../components/Map3D";

/**
 * Custom hook for camera animations
 * @returns {Object} Object containing both flyTo and flyAround functions
 */
export const useCameraAnimations = () => {
  const { mapInstance } = useContext(Map3DContext);

  const flyTo = useCallback(
    async (options = {}) => {
      if (!mapInstance) {
        console.warn("Map instance not available");
        return;
      }

      const { destination, duration = 3000, cameraOptions = {} } = options;

      if (!destination) {
        console.warn("Destination is required for flyTo");
        return;
      }

      try {
        const animationOptions = {
          ...destination,
          duration,
          ...cameraOptions,
        };

        await mapInstance.flyTo(animationOptions);
      } catch (error) {
        console.error("Error during camera fly to:", error);
      }
    },
    [mapInstance]
  );

  const flyAround = useCallback(
    async (options = {}) => {
      if (!mapInstance) {
        console.warn("Map instance not available");
        return;
      }

      const {
        center,
        rounds = 1,
        duration = 5000,
        cameraOptions = {},
      } = options;

      try {
        const currentCenter = center || mapInstance.getCenter();
        const currentHeading = mapInstance.getHeading();
        const targetHeading = currentHeading + rounds * 360;

        const animationOptions = {
          center: currentCenter,
          duration,
          ...cameraOptions,
          heading: targetHeading,
        };

        await mapInstance.flyTo(animationOptions);
      } catch (error) {
        console.error("Error during camera fly around:", error);
      }
    },
    [mapInstance]
  );

  return { flyTo, flyAround };
};
