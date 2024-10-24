import React, { useEffect, useRef, useContext, useState } from 'react';
import { Map3DContext } from './Map3D';

const Marker3D = ({ marker }) => {
  const { mapInstance } = useContext(Map3DContext);
  const markerRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Marker3D useEffect', marker);
    const initMarker = async () => {
      if (!mapInstance) {
        return;
      }

      if (!marker?.markerOptions?.position) {
        setError("The 'position' must be set for the Marker3DElement to display.");
        return;
      }

      try {
        const { Marker3DElement, Marker3DInteractiveElement } = await google.maps.importLibrary("maps3d");

        const markerProps = {
          position: marker.markerOptions.position,
          drawsWhenOccluded: marker.markerOptions.drawsWhenOccluded || true,
          extruded: marker.markerOptions.extruded || false,
          label: marker.markerOptions.label || "",
          sizePreserved: marker.markerOptions.sizePreserved || false,
          zIndex: marker.markerOptions.zIndex || 0,
        };

        // Remove undefined properties
        Object.keys(markerProps).forEach(key => markerProps[key] === undefined && delete markerProps[key]);
        let markerElement;

        if (marker.onClick) {
          markerElement = new Marker3DInteractiveElement(markerProps);
          markerElement.addEventListener('gmp-click', marker.onClick);
        } else {
          markerElement = new Marker3DElement(markerProps);
        }
        //appending to mapInstance
        mapInstance.appendChild(markerElement);

        // Add custom image if provided
        if (marker.image) {
          const img = document.createElement('img');
          img.src = marker.image.url;
          img.style.width = marker.image.width || '40px';
          img.style.height = marker.image.height || '40px';

          // Create a template element and append the image
          const template = document.createElement('template');
          template.content.append(img);
          markerElement.append(template);
        }



        markerRef.current = markerElement;
      } catch (err) {
        console.error('Error loading 3D marker:', err);
        setError(`Error loading 3D marker: ${err.message}`);
      }
    };

    initMarker();

    return () => {
      if (markerRef.current) {
        // Remove from overlay or mapInstance if markerRef exists
        if (marker.overlay) {
          marker.overlay.removeChild(markerRef.current);
        } else if (mapInstance) {
          mapInstance.removeChild(markerRef.current);
        }
      }
    };
  }, [mapInstance, marker]);

  return error ? <div className="error">{error}</div> : null;
};

export default Marker3D;
