'use client';
import { DailyMealCalories } from '@/types/nutrition.type';
import { createContext, useState, ReactNode, useContext } from 'react';

type DateContextProps = {
  selectedDate: Date;
  currentDate: Date;
  dailyMealCalories: DailyMealCalories;
  setSelectedDate: (date: Date) => void;
  setCurrentDate: (date: Date) => void;
  setDailyMealCalories: (newData: DailyMealCalories) => void;
};

const defaultContextValue: DateContextProps = {
  selectedDate: new Date(),
  currentDate: new Date(),
  dailyMealCalories: {},
  setSelectedDate: () => {},
  setCurrentDate: () => {},
  setDailyMealCalories: () => {}
};

export const DateContext = createContext<DateContextProps>(defaultContextValue);

const DateProvider = ({ children }: { children: ReactNode }) => {
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

  return <DateContext.Provider value={value}>{children}</DateContext.Provider>;
};
export default DateProvider;

export const useDateContext = () => {
  const context = useContext(DateContext);
  if (context === undefined) {
    throw new Error('useDateContext must be used within a DateProvider');
  }
  return context;
};
