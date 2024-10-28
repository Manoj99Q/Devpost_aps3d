// modelsDict.js

const modelsDict = {
  bumblebee: {
    id: "bumblebee-model",
    modelOptions: {
      src: "public/3dmodels/bumblebee.glb",
      position: { lat: 41.882702, lng: -87.623321, altitude: 10 }, // Bean position
      orientation: { tilt: 270 },
      scale: 1,
    },
  },

  ironman: {
    id: "ironman-model",
    modelOptions: {
      src: "public/3dmodels/hulkbuster.glb",
      position: { lat: 41.878876, lng: -87.635915, altitude: 10 }, // Willis Tower position
      orientation: { tilt: 270 },
      scale: 10000,
    },
  },

  phoenix: {
    id: "phoenix-model",
    modelOptions: {
      src: "public/3dmodels/phoenix_bird.glb",
      position: { lat: 41.866772, lng: -87.599444, altitude: 10 }, // Navy Pier position
      orientation: { tilt: 270 },
      scale: 1,
    },
  },
  sea_monster: {
    id: "sea_monster",
    modelOptions: {
      src: "public/3dmodels/sea_monster.glb",
      position: { lat: 41.875, lng: -87.595168, altitude: 0 },
      scale: 50,
      orientation: { tilt: 270, heading: 180 },
    },
  },
};

export default modelsDict;
