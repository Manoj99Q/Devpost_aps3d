import { createContext, useContext, useReducer } from "react";
import { produce } from "immer";
import modelsDict from "../data/modelsData";

// Create ModelContext
const ModelContext = createContext();

// Initial state for models
const initialModelsState = [modelsDict.ironman, modelsDict.sea_monster];

// Define action types
const actionTypes = {
  ADD_MODEL: "ADD_MODEL",
  REMOVE_MODEL: "REMOVE_MODEL",
  UPDATE_MODEL: "UPDATE_MODEL",
};

// Reducer function using immer
const modelsReducer = produce((draft, action) => {
  switch (action.type) {
    case actionTypes.ADD_MODEL: {
      const exists = draft.some((model) => model.id === action.payload.id);
      if (!exists) {
        draft.push(action.payload);
      }
      break;
    }
    case actionTypes.REMOVE_MODEL: {
      return draft.filter((model) => model.id !== action.payload);
    }
    case actionTypes.UPDATE_MODEL: {
      console.log("Updating model:", action.payload);
      const { modelId, updates } = action.payload;
      const model = draft.find((model) => model.id === modelId);
      if (model && model.modelOptions) {
        // Merge updates into modelOptions
        Object.assign(model.modelOptions, updates);
        console.log("Updated model modelOptions:", model.modelOptions);
      }
      break;
    }
    default:
      break;
  }
});

// ModelProvider component
export const ModelProvider = ({ children }) => {
  const [models, dispatch] = useReducer(modelsReducer, initialModelsState);

  // Action creators
  const addModel = (model) => {
    dispatch({ type: actionTypes.ADD_MODEL, payload: model });
  };

  const removeModel = (modelId) => {
    dispatch({ type: actionTypes.REMOVE_MODEL, payload: modelId });
  };

  const updateModel = (modelId, updates) => {
    dispatch({
      type: actionTypes.UPDATE_MODEL,
      payload: { modelId, updates },
    });
  };

  const value = {
    models,
    addModel,
    removeModel,
    updateModel,
  };

  return (
    <ModelContext.Provider value={value}>{children}</ModelContext.Provider>
  );
};

// Custom hook to use model context
export const useModels = () => {
  const context = useContext(ModelContext);
  if (context === undefined) {
    throw new Error("useModels must be used within a ModelProvider");
  }
  return context;
};
