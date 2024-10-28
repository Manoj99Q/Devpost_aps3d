// markersDict.js
import Overlays from "./Overlays";

const markersDict = {
  bean: {
    id: "bean-marker",
    markerOptions: {
      position: { lat: 41.8826, lng: -87.6233, altitude: 10 },
      label: "Cloud Gate (The Bean)",
      zIndex: 1,
    },
    onClick: () => {
      console.log("bean clicked");
    },
    overlay: null,
    quest: "bean_energon",
  },
  willis: {
    id: "willis-marker",
    markerOptions: {
      position: { lat: 41.8789, lng: -87.6359, altitude: 10 },
      label: "Willis Tower",
      zIndex: 1,
      drawsWhenOccluded: true,
      altitudeMode: "RELATIVE_TO_MESH",
    },
    onClick: () => {
      // Dispatch a custom event
      console.log("willis event dispatching");
      const willisClickEvent = new CustomEvent("willisClicked", {
        detail: { questId: "willis_energon" },
      });
      document.dispatchEvent(willisClickEvent);
    },
    overlay: null,
  },
  loop: {
    id: "loop-marker",
    markerOptions: {
      position: { lat: 41.8786, lng: -87.6251, altitude: 10 }, // Center of the Loop
      label: "The Chicago Loop",
      zIndex: 1,
    },
    onClick: () => {},
    overlay: Overlays.loop,
  },
  navyPier: {
    id: "navy-pier-marker",
    markerOptions: {
      position: { lat: 41.8917, lng: -87.6063, altitude: 10 },
      label: "Navy Pier",
      zIndex: 1,
    },
    onClick: () => {},
    overlay: Overlays.navyPier, // Direct component reference
  },
  oldmanlostandfound: {
    id: "oldmanlostandfound",
    markerOptions: {
      position: { lat: 41.909059, lng: -87.639081, altitude: 10 },
      label: "OldMan",
      zIndex: 1,
    },
    onClick: () => {},
    overlay: null,
    quest: "lostAndFoundQuest",
  },
  lostandfoundmarkers: {
    bean: {
      id: "bean-marker-lf",
      markerOptions: {
        position: { lat: 41.8826, lng: -87.6233, altitude: 10 },
        label: "Cloud Gate (The Bean)",
        zIndex: 1,
      },
      onClick: () => {},
      overlay: null,
    },

    willis: {
      id: "willis-marker-lf",
      markerOptions: {
        position: { lat: 41.8789, lng: -87.6359, altitude: 10 },
        label: "Willis Tower",
        zIndex: 1,
      },
      onClick: () => {},
      overlay: null,
    },

    navyPier: {
      id: "navy-pier-marker-lf",
      markerOptions: {
        position: { lat: 41.8917, lng: -87.6063, altitude: 10 },
        label: "Navy Pier",
        zIndex: 1,
      },
      onClick: () => {},
      overlay: null,
    },

    pilsen: {
      id: "pilsen-marker-lf",
      markerOptions: {
        position: { lat: 41.8564, lng: -87.6562, altitude: 10 },
        label: "Pilsen Neighborhood",
        zIndex: 1,
      },
      onClick: () => {},
      overlay: null,
    },

    wrigleyField: {
      id: "wrigley-field-marker-lf",
      markerOptions: {
        position: { lat: 41.9484, lng: -87.6553, altitude: 10 },
        label: "Wrigley Field",
        zIndex: 1,
      },
      onClick: () => {},
      overlay: null,
    },
  },
  sea_monster: {
    id: "sea_monster",
    markerOptions: {
      position: { lat: 41.875, lng: -87.595168, altitude: 10 },
      label: "Sea Monster",
      zIndex: 1,
      altitudeMode: "RELATIVE_TO_GROUND",
    },
    onClick: () => {},
  },
};

export default markersDict;
