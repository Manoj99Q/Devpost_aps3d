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
    overlay: null ,
    quest:"bean_energon"
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
  },

  lostandfound:{
    bean: {
      id: 'bean-marker-lf',
      markerOptions: {
        position: { lat: 41.8826, lng: -87.6233, altitude: 10 },
        label: "Cloud Gate (The Bean)",
        zIndex: 1,
      },
      onClick: () => {},
      overlay: null 
    },
  
    willis: {
      id: 'willis-marker-lf',
      markerOptions: {
        position: { lat: 41.8789, lng: -87.6359, altitude: 10 },
        label: "Willis Tower",
        zIndex: 1,
      },
      onClick: () => {},
      overlay: null
    },
  
    navyPier: {
      id: 'navy-pier-marker-lf',
      markerOptions: {
        position: { lat: 41.8917, lng: -87.6063, altitude: 10 },
        label: "Navy Pier",
        zIndex: 1,
      },
      onClick: () => {},
      overlay: null
    },
  
    pilsen: {
      id: 'pilsen-marker-lf',
      markerOptions: {
        position: { lat: 41.8564, lng: -87.6562, altitude: 10 },
        label: "Pilsen Neighborhood",
        zIndex: 1,
      },
      onClick: () => {},
      overlay: null
    },
  
    wrigleyField: {
      id: 'wrigley-field-marker-lf',
      markerOptions: {
        position: { lat: 41.9484, lng: -87.6553, altitude: 10 },
        label: "Wrigley Field",
        zIndex: 1,
      },
      onClick: () => {},
      overlay: null
    }
  }

};

export default markersDict;
