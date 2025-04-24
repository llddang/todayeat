import {
  formatDateToLocaleKR,
  formatDateWithDash,
  formatNumberWithComma,
  formatTimestamp,
  formatTimeToHHMM,
  formatTimeWithMeridiem
} from '../../utils/format.util';
import { formatFixtures } from '../fixtures/format.fixture';

describe('format.util', () => {
  describe('formatNumberWithComma', () => {
    it('숫자에 천 단위마다 콤마(,)를 붙여서 반환해야 합니다', () => {
      expect(formatNumberWithComma(formatFixtures.number.standardNumber)).toBe(
        formatFixtures.number.standardNumberExpected
      );
    });

    it('잘못된 형식의 숫자 문자열도 천 단위로 올바르게 포맷팅해야 합니다', () => {
      expect(formatNumberWithComma(formatFixtures.number.malformedNumber)).toBe(
        formatFixtures.number.malformedNumberExpected
      );
    });
  });

  describe('formatDateToLocaleKR', () => {
    it('날짜를 한국 로케일 형식(YYYY년 MM월)으로 변환해야 합니다', () => {
      expect(formatDateToLocaleKR(formatFixtures.date.standardDate)).toBe('2025년 4월');
    });

    it('1자리 월(1-9월)도 올바르게 포맷팅해야 합니다', () => {
      expect(formatDateToLocaleKR(formatFixtures.date.singleDigitMonth)).toBe('2024년 1월');
    });

    it('12월도 올바르게 포맷팅해야 합니다', () => {
      expect(formatDateToLocaleKR(formatFixtures.date.december)).toBe('2024년 12월');
    });

    it('윤년의 2월도 올바르게 포맷팅해야 합니다', () => {
      expect(formatDateToLocaleKR(formatFixtures.date.leapYearFebruary)).toBe('2024년 2월');
    });

    it('다양한 연도의 날짜도 올바르게 포맷팅해야 합니다', () => {
      formatFixtures.date.variousDates.forEach(({ input, expected }) => {
        expect(formatDateToLocaleKR(input)).toBe(expected);
      });
    });
  });

  describe('formatDateWithDash', () => {
    it('날짜를 대시(-)로 구분된 형식(YYYY-MM-DD)으로 변환해야 합니다', () => {
      expect(formatDateWithDash(formatFixtures.date.standardDate)).toBe('2025-04-23');
    });

    it('다양한 연도의 날짜도 올바르게 변환해야 합니다', () => {
      formatFixtures.date.dashFormattedDates.forEach(({ input, expected }) => {
        expect(formatDateWithDash(input)).toBe(expected);
      });
    });
  });

  describe('formatTimestamp', () => {
    it('날짜와 시간 정보를 타임스탬프 문자열로 변환해야 합니다', () => {
      expect(formatTimestamp(formatFixtures.time.timestampData.standard.datetime)).toBe(
        formatFixtures.time.timestampData.standard.expected
      );
    });

    it('다양한 시간 정보도 올바르게 변환해야 합니다', () => {
      Object.values(formatFixtures.time.timestampData).forEach(({ datetime, expected }) => {
        expect(formatTimestamp(datetime)).toBe(expected);
      });
    });
  });

  describe('formatTimeWithMeridiem', () => {
    it('시간을 오전/오후로 변환해야 합니다', () => {
      expect(formatTimeWithMeridiem(formatFixtures.time.standardDateTime)).toBe('오전');
    });

    it('다양한 시간 정보도 올바르게 변환해야 합니다', () => {
      formatFixtures.time.meridiemTestCases.forEach(({ input, expected }) => {
        expect(formatTimeWithMeridiem(input)).toBe(expected);
      });
    });
  });

  describe('formatTimeToHHMM', () => {
    it('시간을 HH:MM 형식으로 변환해야 합니다', () => {
      expect(formatTimeToHHMM(formatFixtures.time.standardDateTime)).toBe('10:30');
    });

    it('다양한 시간 정보도 올바르게 변환해야 합니다', () => {
      formatFixtures.time.timeFormatTestCases.forEach(({ input, expected }) => {
        expect(formatTimeToHHMM(input)).toBe(expected);
      });
    });
  });
});
