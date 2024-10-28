import { useState } from 'react';
import modelsDict from '../data/modelsData';

const initialModels = [
    modelsDict.ironman,
    modelsDict.sea_monster
];

const useModels = () => {
    const [models, setModels] = useState(initialModels);

    const addModel = (model) => {
        setModels((prevModels) => [...prevModels, model]);
    };

    const removeModel = (modelId) => {
        setModels((prevModels) =>
            prevModels.filter((model) => model.id !== modelId)
        );
    };

    return { models, addModel, removeModel };
};

export default useModels;