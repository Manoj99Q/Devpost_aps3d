// markersDict.js
import Overlays from './Overlays';

const markersDict = {
  bean: {
    id: 'bean-marker',
    markerOptions: {
      position: { lat: 41.8826, lng: -87.6233, altitude: 10 },
      label: "Cloud Gate (The Bean)",
      zIndex: 1,
    },
    onClick: () => {},
    overlay: null // Direct component reference
  },

  willis: {
    id: 'willis-marker',
    markerOptions: {
      position: { lat: 41.8789, lng: -87.6359, altitude: 10 },
      label: "Willis Tower",
      zIndex: 1,
    },
    onClick: () => {},
    overlay: Overlays.willis  // Direct component reference
  },

  navyPier: {
    id: 'navy-pier-marker',
    markerOptions: {
      position: { lat: 41.8917, lng: -87.6063, altitude: 10 },
      label: "Navy Pier",
      zIndex: 1,
    },
    onClick: () => {},
    overlay: Overlays.navyPier  // Direct component reference
  }
};

export default markersDict;
