import React, { useState, useEffect,useRef} from 'react';
import Map3D from '../components/Map3D';
import Model3D from '../components/Model3D';
import LeftSection from '../components/LeftSection';
import Marker3D from '../components/Marker3D';
import {useMarkers} from '../contexts/MarkerContext';
import Overlays from '../data/Overlays';
import modelsDict from '../data/modelsData';
import useModels from '../hooks/useModels';
import { useQuest } from '../contexts/QuestContext';
import markersDict from '../data/markers';
const Play = () => {
    const { markers, addMarker, removeMarker ,updateMarker} = useMarkers();
    const { models, addModel, removeModel } = useModels();
    const [activeOverlay, setActiveOverlay] = useState(null);
    const { startQuest } = useQuest();



    const handleMarkerClick = (marker) => {
        if (marker.onClick) marker.onClick();
        // Extract the character ID from the marker ID (remove the '-marker' suffix)
        if(marker.quest){
            startQuest(marker.quest);

        }
        console.log(marker);

 
        if(marker.overlay){
            setActiveOverlay({
                component: marker.overlay
            });
        }
    };
    useEffect(() => {
        console.log("Markers state updated:", markers);
      }, [markers]);

     // Handle quest actions
     useEffect(() => {
        const handleQuestAction = (event) => {
            const { action, data } = event.detail;
            
            switch (action) {
                case 'startBumbleBeeQuest':
                    addModel(modelsDict.bumblebee);
                    setActiveOverlay({
                        component: Overlays.bumblebee
                    });
                    console.log('Bumblebee quest started!');
                    // removeMarker("bean-marker");
                    break;
                case 'startlostAndFoundQuest':
                    Object.entries(markersDict.lostandfoundmarkers).forEach(([key, markerData]) => {
                        const markerId = markerData.id;
                    
                        // Assign the onClick handler directly to markerData before adding it
                        const updatedMarkerData = {
                          ...markerData,
                          onClick: () => {
                            console.log(`Removing marker: ${markerId}`);
                            removeMarker(markerId);
                          },
                        };
                    
                        // Add the updated marker
                        addMarker(updatedMarkerData);
                    
                        console.log('Adding new marker with updated onClick:', updatedMarkerData);
                      });
          
                    break;
            }
        };


    
        window.addEventListener('questAction', handleQuestAction);
        return () => window.removeEventListener('questAction', handleQuestAction);
    }, [addMarker, removeMarker, addModel, setActiveOverlay]);


    return (
        <div className="flex flex-row h-full w-full flex-grow overflow-hidden">
            <LeftSection  />

            <Map3D mapOptions={{
                center: { lat: 41.8781, lng: -87.6298, altitude: 1800 },
                heading: -54.55771774522234,
                tilt: 64.07219291562834,
                defaultLabelsDisabled: true,
                range: 6292.401527459733
            }}>
               {models.map((model) => (
                    <Model3D 
                        key={model.id}
                        model={model.modelOptions}
                    />
                ))}
        
            {markers.map((marker) => {
                console.log('Rendering marker:', marker.id);
                return (
                    <Marker3D 
                    key={marker.id} 
                    marker={marker.markerOptions} 
                    onClick={() => handleMarkerClick(marker)} 
                    />
                );
            })}
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