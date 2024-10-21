import React, { useEffect } from 'react';
import Map3D from '../components/Map3D';
import Model3D from '../components/Model3D';
import LeftSection from '../components/LeftSection';
import Marker3D from '../components/Marker3D';

import useMarkers from '../hooks/useMarkers';

const Play = () => {
    const { markers, addMarker, removeMarker } = useMarkers();

    useEffect(() => {
        // Example markers
        addMarker({
            id: 'marker1',
            position: { lat: 41.835818, lng: -87.620, altitude: 10 },
            label: "Marker 1",
            zIndex: 1,
        });

        addMarker({
            id: 'marker2',
            position: { lat: 41.835818, lng: -87.610, altitude: 10 },
            label: "Custom Marker",
            zIndex: 1,
        });

        // Cleanup function to remove markers if needed
        return () => {
            removeMarker('marker1');
            removeMarker('marker2');
        };
    }, [addMarker, removeMarker]);
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
                    <Marker3D key={marker.id} marker={marker} />
                ))}
            </Map3D>

          {/* <Model3D /> */}
        </div>
    );
};

export default Play;
