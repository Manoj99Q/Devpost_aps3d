import React, { useState, useEffect } from 'react';
import Map3D from '../components/Map3D';
import Model3D from '../components/Model3D';
import LeftSection from '../components/LeftSection';
import Marker3D from '../components/Marker3D';
import useMarkers from '../hooks/useMarkers';
import markersDict from '../data/markers';

const Play = () => {
    const { markers, addMarker, removeMarker } = useMarkers();
    const [activeOverlay, setActiveOverlay] = useState(null);

    const handleMarkerClick = (marker) => {
        if (marker.onClick) marker.onClick();
        if (marker.overlay) {
            // Now directly using the component
            setActiveOverlay({
                component: marker.overlay,
            });
        }
    };

    return (
        <div className="flex flex-row h-full w-full flex-grow overflow-hidden">
            <LeftSection />

            <Map3D mapOptions={{
                center: { lat: 41.8781, lng: -87.6298, altitude: 1800 },
                heading: -54.55771774522234,
                tilt: 64.07219291562834,
                defaultLabelsDisabled: true,
                range: 6292.401527459733
            }}>
                <Model3D 
                    model={{
                        src: 'public/3dmodels/bumblebee.glb',
                        position: markersDict.bean.markerOptions.position,
                        orientation: {tilt: 270},
                        scale: 1,
                    }}
                />

                <Model3D 
                    model={{
                        src: 'public/3dmodels/hulkbuster.glb',
                        position: markersDict.willis.markerOptions.position,
                        orientation: {tilt: 270},
                        scale: 10000,
                    }}
                />

                <Model3D 
                    model={{
                        src: 'public/3dmodels/phoenix_bird.glb',
                        position: markersDict.navyPier.markerOptions.position,
                        orientation: {tilt: 270},
                        scale: 1,
                    }}
                />

                {markers.map((marker) => (
                    <Marker3D 
                        key={marker.id} 
                        marker={marker.markerOptions} 
                        onClick={() => handleMarkerClick(marker)} 
                    />
                ))}
            </Map3D>

            {activeOverlay && (
                <div className="absolute inset-y-0 right-10 flex items-center z-10">
                    <activeOverlay.component 
                        onClose={() => setActiveOverlay(null)}
                    />
                </div>
            )}
        </div>
    );
};

export default Play;