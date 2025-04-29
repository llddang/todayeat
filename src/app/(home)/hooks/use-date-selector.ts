import { useState } from 'react';
import { useDateContext } from '../contexts/date.context';

const useDateSelector = () => {
  const { selectedDate, currentDate, setCurrentDate, setSelectedDate } = useDateContext();

  const [date, setDate] = useState<Date>(selectedDate);

  const handleOpen = () => setDate(selectedDate);

  const handleClose = () => {
    setSelectedDate(date);
    setCurrentDate(date);
  };

  return { currentDate, date, setDate, handleOpen, handleClose };
};
export default useDateSelector;
