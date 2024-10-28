import React from "react";
import { X } from "lucide-react";

const MonsterShout = ({ onClose }) => {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div
        className="relative bg-zinc-900/95 text-yellow-500 p-8 rounded-xl border-2 border-yellow-900
                      font-bold text-5xl transform rotate-1 animate-pulse
                      font-mono tracking-widest shadow-lg shadow-yellow-900/30
                      min-w-[400px] flex items-center justify-center"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-lg 
                    hover:bg-yellow-900/20 transition-colors duration-200"
        >
          <X className="w-6 h-6 text-yellow-600" />
        </button>
        AAARRRHGGGGGHHH
      </div>
    </div>
  );
};

export default MonsterShout;
