import React, { useState, useEffect, useRef } from "react";
import Map3D from "../components/Map3D";
import Model3D from "../components/Model3D";
import LeftSection from "../components/LeftSection";
import Marker3D from "../components/Marker3D";
import { useMarkers } from "../contexts/MarkerContext";
import Overlays from "../data/Overlays";
import modelsDict from "../data/modelsData";
import { useModels } from "../contexts/ModelContext";
import { useQuest } from "../contexts/QuestContext";
import markersDict from "../data/markers";
import useInfinityPath from "../hooks/useInfinityPath";
import ExplosionVFX from "../components/ExplosionVFX";

const Play = () => {
  const { markers, addMarker, removeMarker, updateMarker } = useMarkers();
  const { models, addModel, removeModel } = useModels();
  const [activeOverlay, setActiveOverlay] = useState(null);
  const { showQuest, setDialogueState } = useQuest();
  const [explosions, setExplosions] = useState([]);
  const screenClickCoords = useRef({ x: 0, y: 0 });

  const handleMarkerClick = (marker) => {
    if (marker.onClick) marker.onClick();
    // Extract the character ID from the marker ID (remove the '-marker' suffix)
    if (marker.quest) {
      showQuest(marker.quest);
    }
    console.log(marker);

    if (marker.overlay) {
      setActiveOverlay({
        component: marker.overlay,
      });
    }
  };

  useEffect(() => {
    const handleWillisClick = (event) => {
      console.log("Willis clicked!", event.detail);

      // Find current Willis marker
      const willisMarker = markers.find((m) => m.id === "willis-marker");
      const currentLat = willisMarker?.markerOptions?.position?.lat ?? 41.8789;

      // Define the target latitude increment (we want a total of +0.005 over 5 seconds)
      const targetIncrement = 0.005;
      const steps = 50; // Number of steps over 5 seconds (updates every 100 ms)
      const incrementPerStep = targetIncrement / steps; // Small increment per step
      let currentStep = 0;

      // Use setInterval to gradually update the position
      const intervalId = setInterval(() => {
        // Update only the position
        const newLat = currentLat + incrementPerStep * currentStep;
        updateMarker("willis-marker", {
          position: {
            lat: newLat,
            lng: -87.6359,
            altitude: 10,
          },
        });

        currentStep++;

        // Stop the updates after reaching the desired number of steps
        if (currentStep > steps) {
          clearInterval(intervalId);
          console.log("Willis marker updates completed");
        }
      }, 100); // Update every 100 ms

      console.log(markers);
    };

    document.addEventListener("willisClicked", handleWillisClick);
    return () =>
      document.removeEventListener("willisClicked", handleWillisClick);
  }, [updateMarker, markers]);

  // Handle quest actions
  useEffect(() => {
    // Handle the global document click to capture screen coordinates
    const handleDocumentClick = (e) => {
      screenClickCoords.current = { x: e.clientX, y: e.clientY };
    };

    const handleQuestAction = (event) => {
      const { action, data } = event.detail;

      switch (action) {
        case "startPrimeQuest": {
          addModel(modelsDict.optimus_prime);
          //   setActiveOverlay({
          //     component: Overlays.bumblebee,
          //   });

          const handleMarkerRemove = (marker, event) => {
            console.log(event);
            // Extracting the map click coordinates from the document click
            const { x, y } = screenClickCoords.current;
            const newExplosion = {
              id: Date.now(),
              x,
              y,
            };
            setExplosions((prev) => [...prev, newExplosion]);

            // Remove marker
            removeMarker(marker.id);
          };
          removeMarker("jewelers-building-marker");
          setDialogueState(null);
          // Loop through markers
          markersDict["primeQuestMarkers"].forEach((marker) => {
            const pillarMarker = {
              ...marker,
              onClick: (event) => {
                console.log(`Removing marker: ${marker.id}`);
                handleMarkerRemove(marker, event);
              },
            };

            addMarker(pillarMarker);
          });

          break;
        }
        case "startlostAndFoundQuest":
          Object.entries(markersDict.lostandfoundmarkers).forEach(
            ([key, markerData]) => {
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

              console.log(
                "Adding new marker with updated onClick:",
                updatedMarkerData
              );
            }
          );

          break;
      }
    };

    window.addEventListener("questAction", handleQuestAction);
    // Attach the document click listener
    document.addEventListener("click", handleDocumentClick);

    return () => {
      window.removeEventListener("questAction", handleQuestAction);
      // Remove the document click listener when component unmounts
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [addMarker, removeMarker, addModel, setActiveOverlay]);

  useInfinityPath("sea_monster", { scale: 5, speed: 0.15 });

  useEffect(() => {
    const seamonstermodel = models.find((m) => m.id === "sea_monster");
    updateMarker("sea_monster", {
      position: {
        altitude: markersDict["sea_monster"].markerOptions.position.altitude,
        lat: seamonstermodel.modelOptions.position.lat,
        lng: seamonstermodel.modelOptions.position.lng,
      },
    });
  }, [models]);
  return (
    <div className="flex flex-row h-full w-full flex-grow overflow-hidden">
      <LeftSection />

      <Map3D
        mapOptions={{
          center: { lat: 41.8781, lng: -87.6298, altitude: 1800 },
          heading: -54.55771774522234,
          tilt: 64.07219291562834,
          defaultLabelsDisabled: true,
          range: 6292.401527459733,
        }}
      >
        {models.map((model) => (
          <Model3D key={model.id} modelOptions={model.modelOptions} />
        ))}

        {markers.map((marker) => {
          return (
            <Marker3D
              key={marker.id}
              markerOptions={marker.markerOptions}
              otherOptions={marker.otherOptions}
              onClick={(clickEvent) => {
                console.log("yolyoyl", clickEvent);
                handleMarkerClick(marker, clickEvent);
              }}
            />
          );
        })}
      </Map3D>

      {activeOverlay && (
        <div className="absolute inset-y-0 right-10 flex items-center z-10">
          <activeOverlay.component onClose={() => setActiveOverlay(null)} />
        </div>
      )}

      {/* Render explosions */}
      {explosions.map((explosion) => (
        <ExplosionVFX
          key={explosion.id}
          x={explosion.x}
          y={explosion.y}
          onComplete={() => {
            setExplosions((prev) => prev.filter((e) => e.id !== explosion.id));
          }}
        />
      ))}
    </div>
  );
};

export default Play;
