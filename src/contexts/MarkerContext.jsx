// MarkerContext.js
import { createContext, useContext, useState, useCallback } from 'react';
import markersDict from '../data/markers';

const MarkerContext = createContext();

export const MarkerProvider = ({ children }) => {
  const [markers, setMarkers] = useState([
    markersDict.bean,
    markersDict.willis,
    markersDict.oldmanlostandfound
  ]);

  const addMarker = useCallback((marker) => {
    setMarkers(prevMarkers => {
      // Check if marker already exists
      const exists = prevMarkers.some(m => m.id === marker.id);
      if (exists) return prevMarkers;
      return [...prevMarkers, marker];
    });
  }, []);

  const removeMarker = useCallback((markerId) => {
    setMarkers(prevMarkers => {
      console.log("Removing marker:", markerId);
      return prevMarkers.filter(marker => marker.id !== markerId);
    });
  }, []);

  const value = {
    markers,
    addMarker,
    removeMarker
  };

  return (
    <MarkerContext.Provider value={value}>
      {children}
    </MarkerContext.Provider>
  );
};

export const useMarkers = () => {
  const context = useContext(MarkerContext);
  if (context === undefined) {
    throw new Error('useMarkers must be used within a MarkerProvider');
  }
  return context;
};