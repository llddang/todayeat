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
