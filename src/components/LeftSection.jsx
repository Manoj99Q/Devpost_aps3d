import React, { useState, useEffect,useCallback } from 'react';
import { motion } from 'framer-motion';

const LeftSection = () => {
    const [dialogue, setDialogue] = useState("");
    const [isTyping, setIsTyping] = useState(true);

    const fullDialogue = "Welcome, adventurer! Are you ready to embark on an epic journey?";

    const typeDialogue = useCallback(() => {
        let i = 0;
        setIsTyping(true);
        const intervalId = setInterval(() => {
            if (i < fullDialogue.length) {
                setDialogue(fullDialogue.slice(0, i + 1));
                i++;
            } else {
                clearInterval(intervalId);
                setIsTyping(false);
            }
        }, 50);

        return () => clearInterval(intervalId);
    }, [fullDialogue]);

    useEffect(() => {
        const cleanupTyping = typeDialogue();
        return cleanupTyping;
    }, [typeDialogue]);

    return (
        <div className="w-1/4 bg-gray-800 p-4 flex flex-col items-center">
            <motion.div 
                className="relative w-48 h-48 mb-4"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
            >
                <img 
                    src="public/images/architect.png" 
                    alt="Game Character" 
                    className="w-full h-full object-cover rounded-full border-4 border-yellow-400 shadow-lg"
                />
            </motion.div>
            <div 
                className="bg-white p-4 rounded-lg shadow-lg relative text-gray-800 min-h-[100px] w-full"
            >
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-white"></div>
                <p className="text-lg">{dialogue}</p>
                {isTyping && <span className="inline-block w-2 h-4 ml-1 bg-gray-800 animate-blink"></span>}
            </div>
        </div>
    );
};


export default LeftSection;