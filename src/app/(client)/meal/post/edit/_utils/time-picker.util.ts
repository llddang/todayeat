export const dateSelections = () => {
  const hours = Array.from({ length: 13 }, (_, i) => String(i).padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));

  const selections = {
    meridiem: ['오전', '오후'],
    hours: hours,
    minutes: minutes
  };
  return selections;
};
