// QuestContext.js
import React, { createContext, useContext, useState, useCallback } from "react";
import questData from "../data/questsData";

const QuestContext = createContext();

export const QuestProvider = ({ children }) => {
  const [activeCharacter, setActiveCharacter] = useState(null);
  const [dialogueState, setDialogueState] = useState({
    text: "Welcome, adventurer! Are you ready to embark on an epic journey?",
    choices: [],
    characterInfo: {
      name: "Guide",
      avatar: "public/images/architect.png",
    },
  });

  const emitQuestAction = useCallback((action, data) => {
    window.dispatchEvent(
      new CustomEvent("questAction", {
        detail: { action, data },
      })
    );
  }, []);

  const showQuest = useCallback((questname) => {
    console.log("showing ", questname);
    const characterData = questData[questname];
    console.log(characterData);
    if (characterData) {
      setActiveCharacter(questname);
      setDialogueState({
        text: characterData.dialogues.initial.text,
        choices: characterData.dialogues.initial.choices,
        characterInfo: characterData.character,
      });
    }
  }, []);

  const triggerDialogue = useCallback(
    (dialogueId) => {
      if (!activeCharacter || !questData[activeCharacter].dialogues[dialogueId])
        return;

      const dialogue = questData[activeCharacter].dialogues[dialogueId];
      setDialogueState((prev) => ({
        ...prev,
        text: dialogue.text,
        choices: dialogue.choices || [],
      }));
    },
    [activeCharacter]
  );

  const value = {
    activeCharacter,
    dialogueState,
    setDialogueState,
    showQuest,
    emitQuestAction,
    triggerDialogue,
  };

  return (
    <QuestContext.Provider value={value}>{children}</QuestContext.Provider>
  );
};

export const useQuest = () => {
  const context = useContext(QuestContext);
  if (!context) {
    throw new Error("useQuest must be used within a QuestProvider");
  }
  return context;
};
