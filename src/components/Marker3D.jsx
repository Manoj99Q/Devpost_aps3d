import React, { useEffect, useRef, useContext, useState } from "react";
import { Map3DContext } from "../contexts/Map3DContext";
const Marker3D = ({ markerOptions, onClick, otherOptions }) => {
  const { mapInstance } = useContext(Map3DContext);
  const markerInstanceRef = useRef(null);
  const initPromiseRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();

    async function initializeMarker() {
      // If already initializing or initialized, skip
      if (initPromiseRef.current || markerInstanceRef.current) {
        return;
      }

      // Set the promise ref immediately to prevent double initialization
      initPromiseRef.current = (async () => {
        try {
          if (controller.signal.aborted) return;

          const { Marker3DElement, Marker3DInteractiveElement } =
            await google.maps.importLibrary("maps3d");
          const { PinElement } = await google.maps.importLibrary("marker");
          if (controller.signal.aborted) return;

          const newMarker = onClick
            ? new Marker3DInteractiveElement(markerOptions)
            : new Marker3DElement(markerOptions);

          if (controller.signal.aborted) {
            newMarker.remove();
            return;
          }

          if (onClick) {
            newMarker.addEventListener("gmp-click", onClick);
          }

          if (otherOptions && otherOptions.scale) {
            const pin = new PinElement({
              scale: otherOptions.scale,
            });
            newMarker.appendChild(pin);
          }

          mapInstance.appendChild(newMarker);
          markerInstanceRef.current = newMarker;

          console.log(`Marker ${markerOptions.label} initialized`);
        } catch (error) {
          console.error(
            `Error initializing marker ${markerOptions.label}:`,
            error
          );
          throw error;
        }
      })();

      try {
        await initPromiseRef.current;
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error(
            `Failed to initialize marker ${markerOptions.label}:`,
            error
          );
        }
      }
    }

    if (mapInstance) {
      initializeMarker();
    }

    return () => {
      controller.abort();

      if (markerInstanceRef.current) {
        if (onClick) {
          markerInstanceRef.current.removeEventListener("gmp-click", onClick);
        }
        mapInstance?.removeChild(markerInstanceRef.current);
        markerInstanceRef.current = null;
        console.log(`Marker ${markerOptions.label} cleaned up`);
      }

      initPromiseRef.current = null;
    };
  }, [mapInstance]);

  // Update marker position if needed
  useEffect(() => {
    if (markerInstanceRef.current && markerOptions.position) {
      markerInstanceRef.current.position = markerOptions.position;
    }
  }, [markerOptions.position]);

  return null;
};

export default Marker3D;
