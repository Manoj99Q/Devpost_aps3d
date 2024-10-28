// MarkerContext.js
import { createContext, useContext, useReducer } from "react";
import { produce } from "immer";
import markersDict from "../data/markers";

const MarkerContext = createContext();

// Initial state for markers
const initialMarkersState = [
  // markersDict.bean,
  markersDict.willis,
  markersDict.oldmanlostandfound,
  markersDict.sea_monster,
  markersDict.jewelersBuilding,
];

// Define action types
const actionTypes = {
  ADD_MARKER: "ADD_MARKER",
  REMOVE_MARKER: "REMOVE_MARKER",
  UPDATE_MARKER: "UPDATE_MARKER", // General update action
};

// Reducer function using immer
const markersReducer = produce((draft, action) => {
  switch (action.type) {
    case actionTypes.ADD_MARKER: {
      const exists = draft.some((marker) => marker.id === action.payload.id);
      if (!exists) {
        draft.push(action.payload);
      }
      break;
    }
    case actionTypes.REMOVE_MARKER: {
      return draft.filter((marker) => marker.id !== action.payload);
    }
    case actionTypes.UPDATE_MARKER: {
      const { markerId, updates } = action.payload;
      const marker = draft.find((marker) => marker.id === markerId);
      if (marker && marker.markerOptions) {
        Object.assign(marker.markerOptions, updates);
      }
      break;
    }
    default:
      break;
  }
});

// MarkerProvider component
export const MarkerProvider = ({ children }) => {
  const [markers, dispatch] = useReducer(markersReducer, initialMarkersState);

  // Action creators
  const addMarker = (marker) => {
    dispatch({ type: actionTypes.ADD_MARKER, payload: marker });
  };

  const removeMarker = (markerId) => {
    console.log("Removing marker:", markerId);
    dispatch({ type: actionTypes.REMOVE_MARKER, payload: markerId });
  };

  // General update function for markers
  const updateMarker = (markerId, updates) => {
    dispatch({
      type: actionTypes.UPDATE_MARKER,
      payload: { markerId, updates },
    });
  };

  const value = {
    markers,
    addMarker,
    removeMarker,
    updateMarker,
  };

  return (
    <MarkerContext.Provider value={value}>{children}</MarkerContext.Provider>
  );
};

// Custom hook to use marker context
export const useMarkers = () => {
  const context = useContext(MarkerContext);
  if (context === undefined) {
    throw new Error("useMarkers must be used within a MarkerProvider");
  }
  return context;
};
