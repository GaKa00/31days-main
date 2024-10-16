
//@ts-nocheck
import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the shape of the context
interface ChaptersContextType {
  chapters: any[];
  setChapters: React.Dispatch<React.SetStateAction<any[]>>;
}

// Create the context
const ChaptersContext = createContext<ChaptersContextType | undefined>(
  undefined
);

// Provider component
export const ChaptersProvider = ({ children }: { children: ReactNode }) => {
  const [chapters, setChapters] = useState<any[]>([]);

  return (
    <ChaptersContext.Provider value={{ chapters, setChapters }}>
      {children}
    </ChaptersContext.Provider>
  );
};

// Custom hook for using the context
export const useChapters = () => {
  const context = useContext(ChaptersContext);
  if (!context) {
    throw new Error("useChapters must be used within a ChaptersProvider");
  }
  return context;
};
