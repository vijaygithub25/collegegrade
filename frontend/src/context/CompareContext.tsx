"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CollegeContextType {
  selectedColleges: number[];
  toggleCollege: (id: number) => void;
  clearSelection: () => void;
}

const CompareContext = createContext<CollegeContextType | undefined>(undefined);

export const CompareProvider = ({ children }: { children: ReactNode }) => {
  const [selectedColleges, setSelectedColleges] = useState<number[]>([]);

  const toggleCollege = (id: number) => {
    setSelectedColleges((prev) => {
      if (prev.includes(id)) {
        return prev.filter((collegeId) => collegeId !== id);
      }
      if (prev.length >= 3) {
        alert("You can compare up to 3 colleges at a time");
        return prev;
      }
      return [...prev, id];
    });
  };

  const clearSelection = () => {
    setSelectedColleges([]);
  };

  return (
    <CompareContext.Provider value={{ selectedColleges, toggleCollege, clearSelection }}>
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
};
