import { useEffect, useRef } from "react";
import { useModels } from "../contexts/ModelContext";

const useInfinityPath = (modelId, { speed = 1, scale = 1 } = {}) => {
  const { updateModel, models } = useModels();
  const intervalRef = useRef(null);
  const angleRef = useRef(0);
  const centerRef = useRef(null);

  useEffect(() => {
    const model = models.find((model) => model.id === modelId);
    if (!model) return;

    // Store the initial position as the center point
    centerRef.current = {
      lat: model.modelOptions.position.lat,
      lng: model.modelOptions.position.lng,
    };

    // Center point of the infinity shape
    const centerLat = 41.879529;
    const centerLng = -87.581045;

    // Base size of the infinity shape
    const baseLatRadius = 0.003; // Base radius for latitude
    const baseLngRadius = 0.006; // Base radius for longitude

    // Apply scale to the base radius
    const latRadius = baseLatRadius * scale;
    const lngRadius = baseLngRadius * scale;

    const moveAlongInfinity = () => {
      // Parametric equations for infinity/figure-8 shape
      const lat =
        centerLat +
        (latRadius * Math.sin(angleRef.current)) /
          (1 + Math.cos(angleRef.current) ** 2);
      const lng =
        centerLng +
        (lngRadius * Math.sin(angleRef.current) * Math.cos(angleRef.current)) /
          (1 + Math.cos(angleRef.current) ** 2);

      // Calculate heading based on the next position
      const nextAngle = angleRef.current + 0.1;
      const nextLat =
        centerLat +
        (latRadius * Math.sin(nextAngle)) / (1 + Math.cos(nextAngle) ** 2);
      const nextLng =
        centerLng +
        (lngRadius * Math.sin(nextAngle) * Math.cos(nextAngle)) /
          (1 + Math.cos(nextAngle) ** 2);

      // Calculate heading angle and add 180 degrees to make the model face forward
      const deltaLng = nextLng - lng;
      const deltaLat = nextLat - lat;
      const heading =
        ((Math.atan2(deltaLng, deltaLat) * 180) / Math.PI + 180) % 360;

      // Update model position and orientation
      updateModel(modelId, {
        position: {
          lat,
          lng,
          altitude: 0,
        },
        orientation: {
          heading,
          tilt: 270,
          roll: 0,
        },
      });

      // Increment angle for next frame
      angleRef.current += 0.05 * speed;
      if (angleRef.current >= 2 * Math.PI) {
        angleRef.current = 0;
      }
    };

    const intervalTime = 50; // Smaller interval for smoother movement
    intervalRef.current = setInterval(moveAlongInfinity, intervalTime);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [modelId, updateModel, speed, scale]);

  return null;
};

export default useInfinityPath;
