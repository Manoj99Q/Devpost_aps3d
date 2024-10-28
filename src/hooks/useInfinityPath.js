import { useEffect, useRef } from "react";
import { useModels } from "../contexts/ModelContext";

const useStraightLinePath = (modelId, speed = 1) => {
  const { updateModel } = useModels();
  const intervalRef = useRef(null);
  const directionRef = useRef(1);
  const currentPositionRef = useRef(41.86); // Keep track of actual position
  const currentHeadingRef = useRef(180);
  const isRotatingRef = useRef(false);
  const rotationStepRef = useRef(0); // Separate counter for rotation steps

  useEffect(() => {
    const targetIncrement = 0.03;
    const steps = 100;
    const incrementPerStep = targetIncrement / steps;
    const rotationSteps = 50;
    const rotationIncrement = 180 / rotationSteps;

    const moveBackAndForth = () => {
      if (isRotatingRef.current) {
        // Rotation phase
        currentHeadingRef.current += rotationIncrement;
        if (currentHeadingRef.current >= 360) {
          currentHeadingRef.current -= 360;
        }

        updateModel(modelId, {
          orientation: {
            heading: currentHeadingRef.current,
            tilt: 270,
            roll: 0,
          },
        });

        rotationStepRef.current++;
        if (rotationStepRef.current >= rotationSteps) {
          isRotatingRef.current = false;
          rotationStepRef.current = 0;
          // Don't reset position when rotation is complete
        }
      } else {
        // Movement phase
        const direction = directionRef.current;

        // Update the actual position
        currentPositionRef.current += incrementPerStep * direction;

        // Check boundaries
        if (
          currentPositionRef.current >= 41.86 + targetIncrement ||
          currentPositionRef.current <= 41.86
        ) {
          isRotatingRef.current = true;
          directionRef.current *= -1;
          // Clamp the position to boundaries to prevent overshooting
          currentPositionRef.current =
            currentPositionRef.current >= 41.86 + targetIncrement
              ? 41.86 + targetIncrement
              : 41.86;
        }

        // Update model's position
        updateModel(modelId, {
          position: {
            lat: currentPositionRef.current,
            lng: -87.595168,
            altitude: 0,
          },
        });
      }
    };

    const intervalTime = 100 / speed;
    intervalRef.current = setInterval(moveBackAndForth, intervalTime);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [modelId, updateModel, speed]);

  return null;
};

export default useStraightLinePath;
