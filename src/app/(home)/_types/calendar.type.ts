export type Day = { day: Date; dayOutside: boolean };

export type CarouselMonth = {
  id: number;
  dates: Day[][];
};

export type CarouselWeek = {
  id: number;
  dates: Day[];
};
