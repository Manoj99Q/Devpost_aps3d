import { useState } from 'react';
import markersDict from '../data/markers';

const useMarkers = () => {
  const [markers, setMarkers] = useState([
    {
      ...markersDict.default1, 
      onClick: () => { console.log('This is default marker 1') }
    },
    markersDict.default2,
  ]);

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
