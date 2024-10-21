import React, { useEffect, useRef, useContext, useState } from 'react';
import { Map3DContext } from './Map3D';

const Marker3D = ({ marker }) => {
  const { mapInstance } = useContext(Map3DContext);
  const markerRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initMarker = async () => {
      if (!mapInstance) {
        return;
      }

      if (!marker.position) {
        setError("The 'position' must be set for the Marker3DElement to display.");
        return;
      }

      try {
        const { Marker3DElement } = await google.maps.importLibrary("maps3d");

        const markerOptions = {
          position: marker.position,
          // altitudeMode: marker.altitudeMode ?? (google.maps.AltitudeMode ? google.maps.AltitudeMode.ABSOLUTE : "absolute"),
          collisionBehavior: marker.collisionBehavior ?? "REQUIRED",
          drawsWhenOccluded: marker.drawsWhenOccluded || false,
          extruded: marker.extruded || false,
          label: marker.label || "",
          sizePreserved: marker.sizePreserved || false,
          zIndex: marker.zIndex || 0,
        };

        // Remove undefined properties
        Object.keys(markerOptions).forEach(key => markerOptions[key] === undefined && delete markerOptions[key]);

        const markerElement = new Marker3DElement(markerOptions);

        mapInstance.appendChild(markerElement);
        markerRef.current = markerElement;
      } catch (err) {
        console.error('Error loading 3D marker:', err);
        setError(`Error loading 3D marker: ${err.message}`);
      }
    };

    initMarker();

    return () => {
      if (markerRef.current && mapInstance) {
        mapInstance.removeChild(markerRef.current);
      }
    };

  }, [mapInstance, marker]);

  return null;
};

export default Marker3D;
