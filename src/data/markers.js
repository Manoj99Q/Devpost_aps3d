// markersDict.js
import Overlays from "./Overlays";

const primequestmarkerheight = 81;

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
      position: { lat: 41.875, lng: -87.595168, altitude: 300 },
      label: "  ",
      zIndex: 1,
      altitudeMode: "RELATIVE_TO_MESH",
    },
    otherOptions: {
      scale: 0.8,
    },
    onClick: () => {
      console.log("sea monster clicked");
    },
    overlay: Overlays.monsterShout,
  },

  jewelersBuilding: {
    id: "jewelers-building-marker",
    markerOptions: {
      position: {
        lat: 41.8865193030709,
        lng: -87.62679081672466,
        altitude: 34.4,
      }, //position="41.88648,-87.62677,30"
      label: " Jewelers Building",
      zIndex: 1,
      altitudeMode: "RELATIVE_TO_MESH",
    },
    onClick: () => {},
    overlay: Overlays.jewelersBuilding,
    quest: "optimusPrimeQuest",
  },
  primeQuestMarkers: [
    {
      id: "prime-quest-marker1",
      markerOptions: {
        position: {
          lat: 41.886361114935276,
          lng: -87.62649376618572,
          altitude: primequestmarkerheight,
        },
        label: "  ",
        zIndex: 1,
        altitudeMode: "RELATIVE_TO_GROUND",
      },
      onClick: () => {},
      overlay: null,
    },
    {
      id: "prime-quest-marker2",
      markerOptions: {
        position: {
          lat: 41.886685251837285,
          lng: -87.62650674318988,
          altitude: primequestmarkerheight,
        },
        label: "  ",
        zIndex: 1,
        altitudeMode: "RELATIVE_TO_GROUND",
      },
      onClick: () => {},
      overlay: null,
    },
    {
      id: "prime-quest-marker3",
      markerOptions: {
        position: {
          lat: 41.886337796263604,
          lng: -87.62704655943837,
          altitude: primequestmarkerheight,
        },
        label: "  ",
        zIndex: 1,
        altitudeMode: "RELATIVE_TO_GROUND",
      },
      onClick: () => {},
      overlay: null,
    },
    {
      id: "prime-quest-marker4",
      markerOptions: {
        position: {
          lat: 41.88671485408783,
          lng: -87.62706847755229,
          altitude: primequestmarkerheight,
        },
        label: "  ",
        zIndex: 1,
        altitudeMode: "RELATIVE_TO_GROUND",
      },
      onClick: () => {},
      overlay: null,
    },
  ],
};

export default markersDict;
