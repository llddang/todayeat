'use client';
import { createContext, useState, ReactNode, useContext } from 'react';

type DashboardContextProps = {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
};

const defaultContextValue: DashboardContextProps = {
  selectedDate: new Date(),
  setSelectedDate: () => {}
};

export const DashboardContext = createContext<DashboardContextProps>(defaultContextValue);

const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const value = { selectedDate, setSelectedDate };

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
};
export default DashboardProvider;

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
