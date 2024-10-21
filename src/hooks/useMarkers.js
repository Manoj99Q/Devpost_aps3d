import { useState, useEffect } from 'react';

const useMarkers = () => {
  const [markers, setMarkers] = useState([
    {
      id: 'marker1',
      markerOptions: {
        position: { lat: 41.835818, lng: -87.620, altitude: 10 },
        label: "Marker 1",
        zIndex: 1,
      },
      onClick: () => console.log("Marker 1 clicked"),
    },
    {
      id: 'marker2',
      markerOptions: {
        position: { lat: 41.835818, lng: -87.610, altitude: 10 },
        label: "Custom Marker",
        zIndex: 1,
      },
      onClick: () => console.log("Custom Marker clicked"),
    }
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
