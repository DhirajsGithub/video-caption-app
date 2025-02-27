import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AppState, Caption } from '../types';

interface AppContextProps {
  state: AppState;
  setVideoUrl: (url: string) => void;
  addCaption: (caption: Omit<Caption, 'id'>) => void;
  updateCaption: (caption: Caption) => void;
  deleteCaption: (id: string) => void;
  setCurrentTime: (time: number) => void;
  setIsPlaying: (isPlaying: boolean) => void;
}

const initialState: AppState = {
  videoUrl: '',
  captions: [],
  currentTime: 0,
  isPlaying: false,
};

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(initialState);

  const setVideoUrl = (url: string) => {
    setState((prev) => ({ ...prev, videoUrl: url }));
  };

  const addCaption = (caption: Omit<Caption, 'id'>) => {
    const id = Date.now().toString();
    const newCaption = { ...caption, id };
    setState((prev) => ({
      ...prev,
      captions: [...prev.captions, newCaption].sort((a, b) => a.startTime - b.startTime),
    }));
  };

  const updateCaption = (caption: Caption) => {
    setState((prev) => ({
      ...prev,
      captions: prev.captions
        .map((c) => (c.id === caption.id ? caption : c))
        .sort((a, b) => a.startTime - b.startTime),
    }));
  };

  const deleteCaption = (id: string) => {
    setState((prev) => ({
      ...prev,
      captions: prev.captions.filter((c) => c.id !== id),
    }));
  };

  const setCurrentTime = (time: number) => {
    setState((prev) => ({ ...prev, currentTime: time }));
  };

  const setIsPlaying = (isPlaying: boolean) => {
    setState((prev) => ({ ...prev, isPlaying }));
  };

  return (
    <AppContext.Provider
      value={{
        state,
        setVideoUrl,
        addCaption,
        updateCaption,
        deleteCaption,
        setCurrentTime,
        setIsPlaying,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};