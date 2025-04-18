/**
 * 숫자의 천 단위마다 콤마(,)를 붙이는 함수입니다.
 *
 * @function formatNumberWithComma
 * @param {number} number - 변환할 숫자
 * @returns {string} 천 단위마다 콤마(,)가 포함된 문자열
 */
export function formatNumberWithComma(number: number): string {
  return number.toLocaleString('ko-KR');
}

export const formatDateToLocaleKR = (date: Date) => {
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
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

export const formatTimestamp = (
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

export const formatTimeWithMeridiem = (date: Date) => {
  return date.getHours() < 12 ? '오전' : '오후';
};

export const formatTimeToHHMM = (date: Date) => {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};
