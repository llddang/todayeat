/**
 * 숫자의 천 단위마다 콤마(,)를 붙이는 함수입니다.
 *
 * @function formatNumberWithComma
 * @param {number} number - 변환할 숫자
 * @returns {string} 천 단위마다 콤마(,)가 포함된 문자열
 */
export const formatNumberWithComma = (number: number): string => {
  return number.toLocaleString('ko-KR');
};

/**
 * 날짜를 한국 로케일 형식(YYYY년 MM월)으로 변환하는 함수입니다.
 *
 * @function formatDateToLocaleKR
 * @param {Date} date - 변환할 날짜 객체
 * @returns {string} 'YYYY년 MM월' 형식의 문자열
 */
export const formatDateToLocaleKR = (date: Date) => {
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
};

/**
 * 날짜를 대시(-)로 구분된 형식(YYYY-MM-DD)으로 변환하는 함수입니다.
 *
 * @function formatDateWithDash
 * @param {Date} date - 변환할 날짜 객체
 * @returns {string} 'YYYY-MM-DD' 형식의 문자열
 */
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

/**
 * 날짜와 시간 정보를 타임스탬프 문자열로 변환하는 함수입니다.
 *
 * @param datetime - 날짜 및 시간 정보를 포함한 객체
 * @param datetime.day - 기준 날짜 (Date 객체)
 * @param datetime.meridiem - '오전' 또는 '오후'
 * @param datetime.hours - 시(hour), 문자열 형태 ('01' ~ '12')
 * @param datetime.minutes - 분(minute), 문자열 형태 ('00' ~ '59')
 * @returns 포맷된 timestamp 문자열 ('YYYY-MM-DD HH:mm:ss')
 *

 */
export const formatTimestamp = (datetime: {
  day: Date;
  meridiem: '오전' | '오후';
  hours: string;
  minutes: string;
}): string => {
  const { day, meridiem, hours, minutes } = datetime;

  let hour = parseInt(hours, 10);
  if (meridiem === '오전' && hour === 12) hour = 0;
  if (meridiem === '오후' && hour !== 12) hour += 12;

  const timestamp = new Date(day);
  timestamp.setHours(hour);
  timestamp.setMinutes(parseInt(minutes, 10));
  timestamp.setSeconds(0);
  timestamp.setMilliseconds(0);

  return timestamp.toISOString(); // '2025-04-21T08:53:56.103Z'
};

/**
 * 날짜의 시간을 오전/오후로 변환하는 함수입니다.
 *
 * @function formatTimeWithMeridiem
 * @param {Date} date - 변환할 날짜 객체
 * @returns {string} '오전' 또는 '오후' 문자열
 */
export const formatTimeWithMeridiem = (date: Date) => {
  return date.getHours() < 12 ? '오전' : '오후';
};

/**
 * 날짜의 시간과 분을 HH:MM 형식으로 변환하는 함수입니다.
 *
 * @function formatTimeToHHMM
 * @param {Date} date - 변환할 날짜 객체
 * @returns {string} 'HH:MM' 형식의 시간 문자열
 */
export const formatTimeToHHMM = (date: Date) => {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};
