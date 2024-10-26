import React, { useEffect, useRef, useContext, useState } from 'react';
import { Map3DContext } from './Map3D';

const Marker3D = ({ marker, onClick }) => {
  const { mapInstance } = useContext(Map3DContext);
  const markerRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let markerElement = null;
    
    const initMarker = async () => {
      if (!mapInstance) return;
      if (!marker.position) {
        setError("The 'position' must be set for the Marker3DElement to display.");
        return;
      }

      try {
        // Clean up existing marker if it exists
        if (markerRef.current && mapInstance) {
          mapInstance.removeChild(markerRef.current);
          markerRef.current = null;
        }

        const { Marker3DElement, Marker3DInteractiveElement } = await google.maps.importLibrary("maps3d");

        const markerOptions = {
          position: marker.position,
          drawsWhenOccluded: marker.drawsWhenOccluded ?? false,
          extruded: marker.extruded ?? false,
          label: marker.label ?? "",
          sizePreserved: marker.sizePreserved ?? false,
          zIndex: marker.zIndex ?? 0,
        };

        markerElement = onClick 
          ? new Marker3DInteractiveElement(markerOptions)
          : new Marker3DElement(markerOptions);

        if (onClick) {
          markerElement.addEventListener('gmp-click', onClick);
        }

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
        try {
          if (onClick) {
            markerRef.current.removeEventListener('gmp-click', onClick);
          }
          mapInstance.removeChild(markerRef.current);
          markerRef.current = null;
        } catch (err) {
          console.error('Error cleaning up marker:', err);
        }
      }
    };
  }, [mapInstance, marker, onClick]);

  return null;
};

export default Marker3D;