
const markersDict = {
  default1:   {
    id: 'marker1',
    markerOptions: {
      position: { lat: 41.835818, lng: -87.620, altitude: 10 },
      label: "Marker 1",
      zIndex: 1,
    },
    onClick: null,
  },

  default2:   { id: 'marker2',
    markerOptions: {
      position: { lat: 41.835818, lng: -87.610, altitude: 10 },
      label: "Custom Marker",
      zIndex: 1,
    },
    onClick: null
  },

  newMarker: {
    id: 'marker3',
    markerOptions: {
      position: { lat: 41.835818, lng: -87.630, altitude: 10 },
      label: "New Marker",
      zIndex: 1,
    },
    onClick: null,
  },
};


export default markersDict;