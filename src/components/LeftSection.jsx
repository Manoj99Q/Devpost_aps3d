import React from "react";
import { useQuest } from "../contexts/QuestContext";
import Avatar from "./Avatar";
import DialogueBox from "./DialogueBox";

const LeftSection = () => {
  const { dialogueState } = useQuest();

  return (
    <div className="w-1/4 bg-gray-800 p-4 flex flex-col items-center">
      {dialogueState && (
        <>
          <Avatar characterInfo={dialogueState.characterInfo} />
          <DialogueBox dialogueState={dialogueState} />
        </>
      )}
    </div>
  );
};

export default LeftSection;
