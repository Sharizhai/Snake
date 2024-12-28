import React, { createContext, useState, useContext } from 'react';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [isMusicEnabled, setIsMusicEnabled] = useState(true);

  return (
    <AudioContext.Provider 
      value={{ 
        isSoundEnabled, 
        setIsSoundEnabled, 
        isMusicEnabled, 
        setIsMusicEnabled 
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);