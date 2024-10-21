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


                <Map3D >
                    <Model3D />
                </Map3D>

          {/* <Model3D /> */}
        </div>
    );
};

export default Play;
