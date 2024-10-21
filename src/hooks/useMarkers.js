import { useState, useEffect } from 'react';

const useMarkers = () => {
  const [markers, setMarkers] = useState([
    {
      id: 'marker1',
      position: { lat: 41.835818, lng: -87.620, altitude: 10 },
      label: "Marker 1",
      zIndex: 1,
    });

    addMarker({
      id: 'marker2',
      position: { lat: 41.835818, lng: -87.610, altitude: 10 },
      label: "Custom Marker",
      zIndex: 1,
    });

    // Cleanup function to remove markers if needed
    return () => {
      removeMarker('marker1');
      removeMarker('marker2');
    };
  }, []);

  return { markers, addMarker, removeMarker };
};

export default useMarkers;
