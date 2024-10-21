import { useState } from 'react';

const useMarkers = () => {
  const [markers, setMarkers] = useState([]);

  const addMarker = (marker) => {
    setMarkers((prevMarkers) => [...prevMarkers, marker]);
  };

  const removeMarker = (markerPosition) => {
    setMarkers((prevMarkers) =>
      prevMarkers.filter(
        (marker) =>
          marker.position.lat !== markerPosition.lat ||
          marker.position.lng !== markerPosition.lng
      )
    );
  };

  return { markers, addMarker, removeMarker };
};

export default useMarkers;
