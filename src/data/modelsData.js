// modelsDict.js

const modelsDict = {
    bumblebee: {
        id: 'bumblebee-model',
        modelOptions: {
            src: 'public/3dmodels/bumblebee.glb',
            position: { lat: 41.882702, lng: -87.623321, altitude: 10 }, // Bean position
            orientation: { tilt: 270 },
            scale: 1,
        },
        onClick: () => {},
    },

    ironman: {
        id: 'ironman-model',
        modelOptions: {
            src: 'public/3dmodels/hulkbuster.glb',
            position: { lat: 41.878876, lng: -87.635915, altitude: 10 }, // Willis Tower position
            orientation: { tilt: 270 },
            scale: 10000,
        },
        onClick: () => {},
    },

    phoenix: {
        id: 'phoenix-model',
        modelOptions: {
            src: 'public/3dmodels/phoenix_bird.glb',
            position: { lat: 41.891533, lng: -87.599444, altitude: 10 }, // Navy Pier position
            orientation: { tilt: 270 },
            scale: 1,
        },
        onClick: () => {},
    },

    energonCube: {
        id: 'energon-cube-model',
        modelOptions: {
            src: 'public/3dmodels/energon_cube.glb',
            orientation: { tilt: 0 },
            scale: 1,
        },
        onClick: () => {},
    }
};

export default modelsDict;