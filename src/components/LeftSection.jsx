import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useDialogue } from "../hooks/useDialogue";
import { useQuest } from "../contexts/QuestContext";

const LeftSection = () => {
  const { dialogueState, emitQuestAction, triggerDialogue } = useQuest();
  const { typedText, isTyping, typeDialogue } = useDialogue();

  useEffect(() => {
    const cleanup = typeDialogue(dialogueState.text);
    return cleanup;
  }, [dialogueState.text, typeDialogue]);

  const handleChoice = (choice) => {
    if (choice.action) {
      emitQuestAction(choice.action);
    }

    // Handle navigation to next dialogue
    if (choice.next) {
      triggerDialogue(choice.next);
    } else {
      typeDialogue(null);
    }
  };

  return (
    <div className="w-1/4 bg-gray-800 p-4 flex flex-col items-center">
      <motion.div
        className="relative w-64 h-64 mb-4"
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <img
          src={dialogueState.characterInfo.avatar}
          alt={dialogueState.characterInfo.name}
          className="w-full h-full object-cover rounded-full border-4 border-yellow-400 shadow-lg"
        />
      </motion.div>
      <div className="space-y-4 w-full">
        <div className="bg-white p-4 rounded-lg shadow-lg relative text-gray-800 min-h-[100px]">
          <div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0 h-0 
                      border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent 
                      border-b-[10px] border-b-white"
          ></div>
          <h3 className="text-xl font-bold text-blue-600 mb-2">
            {dialogueState.characterInfo.name}
          </h3>
          <p className="text-lg">
            {typedText}
            {isTyping && (
              <span className="inline-block w-2 h-6 bg-gray-800 animate-blink ml-1 align-bottom"></span>
            )}
          </p>
        </div>

        {!isTyping && dialogueState.choices.length > 0 && (
          <div className="space-y-2">
            {dialogueState.choices.map((choice, index) => (
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
};

export default LeftSection;
