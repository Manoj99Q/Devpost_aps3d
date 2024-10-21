import React from 'react';
import Map3D from '../components/Map3D';
import Model3D from '../components/Model3D';

const Play = () => {
    return (
        <div className="flex flex-row h-full w-full flex-grow overflow-hidden">
            <div className="w-1/4 bg-gray-200 p-4 overflow-auto">
                <h2 className="text-xl font-bold mb-4">Left Section</h2>
                <p>Left Section Content</p>

            </div>


                <Map3D mapOptions = {{
                    center: { lat: 41.8781, lng: -87.6298, altitude: 1800 },
                    heading: -54.55771774522234,
                    tilt: 64.07219291562834,
                    defaultLabelsDisabled: true,
                    range : 6292.401527459733
                }}>
                    <Model3D 
                     model={{
                        src: 'public/3dmodels/bumblebee.glb',
                        position: { lat: 41.835818, lng: -87.615100, altitude: 10 },
                        orientation: {tilt: 270},
                        scale: 1,
                      }}/>

                    <Model3D 
                     model={{
                        src: 'public/3dmodels/hulkbuster.glb',
                        position: { lat: 41.835818, lng: -87.625, altitude: 10 },
                        orientation: {tilt: 270},
                        scale: 10000,
                      }}/>

                    <Model3D 
                     model={{
                        src: 'public/3dmodels/car.glb',
                        position: { lat: 41.835818, lng: -87.605, altitude: 10 },
                        orientation: {tilt: 270},
                        scale: 1,
                      }}/>
                </Map3D>

          {/* <Model3D /> */}
        </div>
    );
};

export default Play;
