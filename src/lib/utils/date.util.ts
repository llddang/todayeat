export const formatDateCaption = (date: Date) => {
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
};

export const formatAmPmKorean = (dateString: string) => {
  const date = new Date(dateString);
  return date.getHours() < 12 ? '오전' : '오후';
};

export const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

export const formatDateWithDash = (date: Date): string => {
  const formattedDate = new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
    .format(date)
    .replace(/\//g, '-');

  return formattedDate;
};

export const convertToTimestamp = (
  baseDate: Date,
  time: { meridiem: '오전' | '오후'; hours: string; minutes: string }
): string => {
  let hour = parseInt(time.hours, 10);
  const minutes = time.minutes.padStart(2, '0');

  if (time.meridiem === '오전' && hour === 12) {
    hour = 0;
  } else if (time.meridiem === '오후' && hour !== 12) {
    hour += 12;
  }

  const yyyy = baseDate.getFullYear();
  const mm = String(baseDate.getMonth() + 1).padStart(2, '0');
  const dd = String(baseDate.getDate()).padStart(2, '0');
  const hh = String(hour).padStart(2, '0');

  return `${yyyy}-${mm}-${dd} ${hh}:${minutes}:00`;
};
