import React, { useState, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';
import { motion } from 'framer-motion';
import questData from '../data/questsData';

const DEFAULT_TEXT = "Welcome, adventurer! Are you ready to embark on an epic journey?";
const DEFAULT_CHARACTER = {
    name: "Guide",
    avatar: "public/images/architect.png"
};
// Custom event emitter for quest actions
const emitQuestAction = (action, data) => {
    window.dispatchEvent(new CustomEvent('questAction', {
        detail: {
            action,
            data
        }
    }));
};


const LeftSection = forwardRef((props, ref) => {
    const [activeCharacterId, setActiveCharacterId] = useState(null);
    // const [currentDialogue, setCurrentDialogue] = useState('initial');
    const [typedText, setTypedText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [choices, setChoices] = useState([]);
    const [characterInfo, setCharacterInfo] = useState({
        name: DEFAULT_CHARACTER.name,
        avatar: DEFAULT_CHARACTER.avatar,
        defaultText: DEFAULT_TEXT
    });

       // Action handlers
    const handleAction = (action, data = {}) => {
    // Emit the action event with the current character context
        emitQuestAction(action, {
            characterId: activeCharacterId,
            // dialogueId: currentDialogue,
            ...data
    });
    };


    const typeDialogue = useCallback((text) => {
        if (!text) return () => {}; // Guard clause for empty text
        
        let i = 0;
        setIsTyping(true);
        setTypedText('');
        
        const intervalId = setInterval(() => {
            if (i < text.length) {
                setTypedText(prev => text.slice(0, i + 1));
                i++;
            } else {
                clearInterval(intervalId);
                setIsTyping(false);
            }
        }, 50);

        return () => clearInterval(intervalId);
    }, []);

    // Start typing effect after component mounts
    useEffect(() => {
        const cleanupTyping = typeDialogue(DEFAULT_TEXT);
        return cleanupTyping;
    }, []); // Only run once on mount

    const handleCharacterSelect = useCallback((characterId) => {
        const characterData = questData[characterId];
        if (characterData) {
            setActiveCharacterId(characterId);
            setCharacterInfo({
                name: characterData.character.name,
                avatar: characterData.character.avatar,
                mood: characterData.character.mood
            });
            // setCurrentDialogue('initial');
            typeDialogue(characterData.dialogues.initial.text);
            setChoices(characterData.dialogues.initial.choices);
        }
    }, [typeDialogue]);

    // Expose methods to parent component through ref
    useImperativeHandle(ref, () => ({
        handleCharacterSelect
    }));

    const triggerDialogue = useCallback((dialogueId) => {
        if (!activeCharacterId || !questData[activeCharacterId].dialogues[dialogueId]) return;
        
        const dialogue = questData[activeCharacterId].dialogues[dialogueId];
        // setCurrentDialogue(dialogueId);
        typeDialogue(dialogue.text);
        setChoices(dialogue.choices || []);
    }, [activeCharacterId, typeDialogue]);



      const handleChoice = useCallback((choice) => {
        if (!activeCharacterId) return;
        
        // Handle action if present
        if (choice.action) {
            handleAction(choice.action);
        }

        // Handle navigation to next dialogue
        if (choice.next) {
            triggerDialogue(choice.next);
        } else {
            // Reset to default state if no action and no next dialogue
            setActiveCharacterId(null);
            setCharacterInfo({
                name: DEFAULT_CHARACTER.name,
                avatar: DEFAULT_CHARACTER.avatar,
                defaultText: DEFAULT_TEXT
            });
            typeDialogue(DEFAULT_TEXT);
            setChoices([]);
        }
    }, [activeCharacterId, triggerDialogue, typeDialogue]);


    return (
        <div className="w-1/4 bg-gray-800 p-4 flex flex-col items-center">
            <motion.div 
                className="relative w-64 h-64 mb-4"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
            >
                <img 
                    src={characterInfo.avatar}
                    alt={characterInfo.name}
                    className="w-full h-full object-cover rounded-full border-4 border-yellow-400 shadow-lg"
                />
            </motion.div>
            <div className="space-y-4 w-full">
                <div className="bg-white p-4 rounded-lg shadow-lg relative text-gray-800 min-h-[100px]">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0 h-0 
                                  border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent 
                                  border-b-[10px] border-b-white">
                    </div>
                    <h3 className="text-xl font-bold text-blue-600 mb-2">{characterInfo.name}</h3>
                    <p className="text-lg">{typedText}</p>
                    {isTyping && <span className="inline-block w-2 h-4 ml-1 bg-gray-800 animate-blink"></span>}
                </div>

                {!isTyping && choices.length > 0 && (
                    <div className="space-y-2">
                        {choices.map((choice, index) => (
                            <button
                                key={index}
                                onClick={() => handleChoice(choice)}
                                className="w-full px-4 py-2 text-left rounded bg-blue-500 hover:bg-blue-600 
                                         text-white transition-colors duration-200"
                            >
                                {choice.text}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
});

LeftSection.displayName = 'LeftSection';

export default LeftSection;