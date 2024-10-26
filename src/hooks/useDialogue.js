import { useState, useCallback, useEffect } from 'react';

export const useDialogue = () => {
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const typeDialogue = useCallback((text) => {
    if (!text) return () => {setTypedText(null); setIsTyping(false);};
    
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
    }, 1);

    return () => clearInterval(intervalId);
  }, []);

  return { typedText, isTyping, typeDialogue };
};
