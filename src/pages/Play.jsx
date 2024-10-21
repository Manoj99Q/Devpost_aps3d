import React from 'react';
import Map3D from '../components/Map3D';
import Model3D from '../components/Model3D';
import LeftSection from '../components/LeftSection';
import Marker3D from '../components/Marker3D';

import useMarkers from '../hooks/useMarkers';
import { marker } from 'framer-motion/client';

const Play = () => {
    const { markers, addMarker, removeMarker } = useMarkers();

    return (
        <div className="flex flex-row h-full w-full flex-grow overflow-hidden">
            <LeftSection />


            <Map3D mapOptions = {{
                center: { lat: 41.835818, lng: -87.615100, altitude: 1800 },
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
                    src: 'public/3dmodels/phoenix_bird.glb',
                    position: { lat: 41.88429, lng: -87.622973, altitude: 10 },
                    orientation: {tilt: 270},
                    scale: 1,
                    }}/>
                    
                    

                {markers.map((marker) => (
                    <Marker3D key={marker.id} marker={marker} onClick={()=>{console.log(marker.label)}} />
                ))}
            </Map3D>

          {/* <Model3D /> */}
        </div>
    );
};

export default Play;
