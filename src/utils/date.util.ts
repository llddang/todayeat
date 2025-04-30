/**
 * 시작 날짜를 해당 일의 시작 시간(00:00:00.000)으로 설정합니다.
 *
 * @param {Date | string} date - 변환할 날짜
 * @returns {Date} 해당 일의 시작 시간(00:00:00.000)으로 설정된 Date 객체
 */
export const getStartOfDay = (date: Date | string): Date => {
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
};

/**
 * 종료 날짜를 해당 일의 끝 시간(23:59:59.999)으로 설정합니다.
 *
 * @param {Date | string} date - 변환할 날짜
 * @returns {Date} 해당 일의 끝 시간(23:59:59.999)으로 설정된 Date 객체
 */
export const getEndOfDay = (date: Date | string): Date => {
  const newDate = new Date(date);
  newDate.setHours(23, 59, 59, 999);
  return newDate;
};

/**
 * 날짜 범위를 생성합니다. 시작 날짜는 00:00:00.000, 종료 날짜는 23:59:59.999로 설정됩니다.
 * 종료 날짜가 제공되지 않으면 시작 날짜와 동일한 날짜를 사용합니다.
 *
 * @param {Date | string} startDate - 시작 날짜
 * @param {Date | string} [endDate] - 종료 날짜 (옵션)
 * @returns {Object} 시작 및 종료 날짜가 포함된 객체
 * @returns {Date} start - 시작 시간으로 설정된 Date 객체
 * @returns {Date} end - 종료 시간으로 설정된 Date 객체
 */
export const getDateTimeRange = (startDate: Date | string, endDate?: Date | string): { start: Date; end: Date } => {
  return {
    start: getStartOfDay(startDate),
    end: getEndOfDay(endDate ?? startDate)
  };
};

/**
 * 주어진 Date 객체에서 시간 관련 필드를 추출하여 형식화된 객체를 반환합니다.
 *
 * @function getTimeFieldsFromDate
 * @param {Date} [date=new Date()] - 기준이 되는 날짜 객체. 전달하지 않으면 현재 시간이 사용됩니다.
 * @returns {DateFields} 시간 정보를 포함하는 객체
 * - `day`: 원본 Date 객체
 * - `meridiem`: '오전' 또는 '오후'
 * - `hours`: 12시간제 형식의 시각 (두 자리 문자열)
 * - `minutes`: 분 (두 자리 문자열)
 */

export const getTimeFieldsFromDate = (date: Date = new Date()): DateFields => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const meridiem = hours < 12 ? '오전' : '오후';
  const formattedHours = String(hours % 12 || 12).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');

  return { day: date, meridiem, hours: formattedHours, minutes: formattedMinutes };
};

type DateFields = {
  day: Date;
  meridiem: '오전' | '오후';
  hours: string;
  minutes: string;
};

export const getKoreaTime = () => {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
  const koreaTimeDiff = 9 * 60 * 60 * 1000;
  const korNow = new Date(utc + koreaTimeDiff);
  return korNow;
};
