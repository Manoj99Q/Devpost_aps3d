import React, { useState, useEffect,useRef} from 'react';
import Map3D from '../components/Map3D';
import Model3D from '../components/Model3D';
import LeftSection from '../components/LeftSection';
import Marker3D from '../components/Marker3D';
import useMarkers from '../hooks/useMarkers';
import Overlays from '../data/Overlays';
import modelsDict from '../data/modelsData';
import useModels from '../hooks/useModels';
import { useQuest } from '../contexts/QuestContext';


const Play = () => {
    const { markers, addMarker, removeMarker } = useMarkers();
    const { models, addModel, removeModel } = useModels();
    const [activeOverlay, setActiveOverlay] = useState(null);
    const { startQuest } = useQuest();

    const leftSectionRef = useRef(null);

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
                    break;

                // Add more cases for other quest actions
            }
        };

        window.addEventListener('questAction', handleQuestAction);
        return () => window.removeEventListener('questAction', handleQuestAction);
    }, [addMarker]);


    return (
        <div className="flex flex-row h-full w-full flex-grow overflow-hidden">
            <LeftSection  ref ={leftSectionRef}/>

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