'use client';
import React, { createContext, useContext, useState } from 'react';

const GeCoverContext = createContext();

export const useGeCover = () => useContext(GeCoverContext);

export const GeCoverProvider = ({ children }) => {
  const [geCoverText, setGeCoverText] = useState('');

  return (
    <GeCoverContext.Provider value={{ geCoverText, setGeCoverText }}>
      {children}
    </GeCoverContext.Provider>
  );
};


// contexts/GeCoverContext.js