import { useEffect, useRef } from "react";
import { useModels } from "../contexts/ModelContext";

const useStraightLinePath = (modelId, speed = 1) => {
  const { updateModel } = useModels();
  const intervalRef = useRef(null);
  const directionRef = useRef(1); // Keeps track of direction (1 for forward, -1 for backward)
  const currentStepRef = useRef(0);

  useEffect(() => {
    // Define parameters for the straight line movement
    const targetIncrement = 0.01; // Total movement increment in latitude
    const steps = 100; // Number of steps (total movement divided into small steps)
    const incrementPerStep = targetIncrement / steps / speed; // Scaled by speed parameter

    // Function to update model position in each interval
    const moveBackAndForth = () => {
      const direction = directionRef.current;
      const displacement = direction * incrementPerStep;

      // Update current step by the direction factor
      currentStepRef.current += direction;

      // Calculate new latitude based on current step
      const newLat = 41.88 + incrementPerStep * currentStepRef.current;

      // Update model's position
      updateModel(modelId, {
        position: {
          lat: newLat,
          lng: -87.595168,
          altitude: 0,
        },
      });

      // If we've reached the limit of the steps, reverse the direction
      if (currentStepRef.current >= steps || currentStepRef.current <= 0) {
        directionRef.current *= -1; // Reverse direction
      }
    };

    // Use setInterval to call moveBackAndForth at regular intervals
    intervalRef.current = setInterval(moveBackAndForth, 100); // Update every 100 ms

    // Cleanup function to clear interval on component unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [modelId, updateModel, speed]);

  return null; // This hook doesn't render anything, so return null
};

export default useStraightLinePath;
