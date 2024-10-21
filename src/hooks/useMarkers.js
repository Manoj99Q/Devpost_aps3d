import { useState } from 'react';

const useMarkers = () => {
  const [markers, setMarkers] = useState([]);

  const addMarker = (marker) => {
    setMarkers((prevMarkers) => [...prevMarkers, marker]);
  };

  const removeMarker = (markerId) => {
    setMarkers((prevMarkers) =>
      prevMarkers.filter((marker) => marker.id !== markerId)
    );
  };

  return { markers, addMarker, removeMarker };
};

export default useMarkers;
