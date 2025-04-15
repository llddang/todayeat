'use client';
import { DailyMealCalories } from '@/types/nutrition.type';
import { createContext, useState, ReactNode, useContext } from 'react';

type CalendarContextProps = {
  selectedDate: Date;
  currentDate: Date;
  dailyMealCalories: DailyMealCalories;
  setSelectedDate: (date: Date) => void;
  setCurrentDate: (date: Date) => void;
  setDailyMealCalories: (newData: DailyMealCalories) => void;
};

const defaultContextValue: CalendarContextProps = {
  selectedDate: new Date(),
  currentDate: new Date(),
  dailyMealCalories: {},
  setSelectedDate: () => {},
  setCurrentDate: () => {},
  setDailyMealCalories: () => {}
};

export const CalendarContext = createContext<CalendarContextProps>(defaultContextValue);

const CalendarProvider = ({ children }: { children: ReactNode }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [dailyMealCalories, setDailyMealCalories] = useState<DailyMealCalories>({});

  const value = {
    selectedDate,
    currentDate,
    dailyMealCalories,
    setSelectedDate,
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
