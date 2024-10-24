// markersDict.js
import Overlays from './Overlays';

const markersDict = {
  bean: {
    id: 'bean-marker',
    markerOptions: {
      position: { lat: 41.8826, lng: -87.6233, altitude: 10 },
      label: "Cloud Gate (The Bean)",
      zIndex: 1
    },
    image: {
      url: '/images/bean.png',
      width: '48px',
      height: '48px'
    },
    onClick: () => {},
    overlay: Overlays.bean
  },

  willis: {
    id: 'willis-marker',
    markerOptions: {
      position: { lat: 41.8789, lng: -87.6359, altitude: 10 },
      label: "Willis Tower",
      zIndex: 1
    },
    image: {
      url: 'public/images/willis-tower-icon.svg',
      width: '48px',
      height: '48px'
    },
    onClick: () => {},
    overlay: Overlays.willis
  },

  navyPier: {
    id: 'navy-pier-marker',
    markerOptions: {
      position: { lat: 41.8917, lng: -87.6063, altitude: 10 },
      label: "Navy Pier",
      zIndex: 1
    },
    image: {
      url: '/images/navypier.png',
      width: '48px',
      height: '48px'
    },
    onClick: () => {},
    overlay: Overlays.navyPier
  }
};

export default markersDict;