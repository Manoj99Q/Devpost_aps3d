import React from 'react';
import Map3D from '../components/Map3D';
import Map3DModelTest from '../components/Map3DModelTest';
import Map3DAdvanced from '../components/Map3DAdvanced';

const Play = () => {
    return (
        <div className="flex flex-row h-full w-full">
            <div className="w-1/4 bg-gray-200 p-4 overflow-auto">
                <h2 className="text-xl font-bold mb-4">Left Section</h2>
                <p>Left Section Content</p>

            </div>
            {/* <div className="w-3/4 bg-gray-400">
                <Map3D 
                    center="41.828875, -87.621025,1000" 
                    tilt="67.5"
                />
            </div> */}
            {/* <div className="w-3/4 bg-gray-400 h-full flex-grow">
                <Map3DModelTest />
            </div> */}

                <Map3DAdvanced />
        </div>
    );
};

export default Play;
