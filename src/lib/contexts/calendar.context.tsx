'use client';
import { DailyMealCalories } from '@/types/nutrition.type';
import { createContext, useState, ReactNode, useContext } from 'react';

type CalendarContextProps = {
  currentDate: Date;
  dailyMealCalories: DailyMealCalories;
  setCurrentDate: (date: Date) => void;
  setDailyMealCalories: (newData: DailyMealCalories) => void;
};

const defaultContextValue: CalendarContextProps = {
  currentDate: new Date(),
  dailyMealCalories: {},
  setCurrentDate: () => {},
  setDailyMealCalories: () => {}
};

export const CalendarContext = createContext<CalendarContextProps>(defaultContextValue);

const CalendarProvider = ({ children }: { children: ReactNode }) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [dailyMealCalories, setDailyMealCalories] = useState<DailyMealCalories>({});

  const value = {
    currentDate,
    dailyMealCalories,
    setCurrentDate,
    setDailyMealCalories: (newData: DailyMealCalories) => setDailyMealCalories((prev) => ({ ...prev, ...newData }))
  };

  return <CalendarContext.Provider value={value}>{children}</CalendarContext.Provider>;
};
export default CalendarProvider;

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (context === undefined) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return context;
};
