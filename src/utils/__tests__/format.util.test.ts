import {
  formatDateToLocaleKR,
  formatDateWithDash,
  formatNumberWithComma,
  formatTimestamp,
  formatTimeToHHMM,
  formatTimeWithMeridiem
} from '../format.util';

describe('format.util', () => {
  describe('formatNumberWithComma', () => {
    it('숫자에 천 단위마다 콤마(,)를 붙여서 반환해야 합니다', () => {
      expect(formatNumberWithComma(123456789)).toBe('123,456,789');
    });

    it('잘못된 형식의 숫자 문자열도 천 단위로 올바르게 포맷팅해야 합니다', () => {
      expect(formatNumberWithComma('10,00,000')).toBe('1,000,000');
    });
  });

  describe('formatDateToLocaleKR', () => {
    it('날짜를 한국 로케일 형식(YYYY년 MM월)으로 변환해야 합니다', () => {
      const date = new Date('2025-04-23');
      expect(formatDateToLocaleKR(date)).toBe('2025년 4월');
    });

    it('1자리 월(1-9월)도 올바르게 포맷팅해야 합니다', () => {
      const date = new Date('2024-01-15');
      expect(formatDateToLocaleKR(date)).toBe('2024년 1월');
    });

    it('12월도 올바르게 포맷팅해야 합니다', () => {
      const date = new Date('2024-12-31');
      expect(formatDateToLocaleKR(date)).toBe('2024년 12월');
    });

    it('윤년의 2월도 올바르게 포맷팅해야 합니다', () => {
      const date = new Date('2024-02-29');
      expect(formatDateToLocaleKR(date)).toBe('2024년 2월');
    });

    it('다양한 연도의 날짜도 올바르게 포맷팅해야 합니다', () => {
      const dates = [
        { input: new Date('2000-01-01'), expected: '2000년 1월' },
        { input: new Date('2020-06-15'), expected: '2020년 6월' },
        { input: new Date('2100-12-31'), expected: '2100년 12월' }
      ];

      dates.forEach(({ input, expected }) => {
        expect(formatDateToLocaleKR(input)).toBe(expected);
      });
    });
  });

  describe('formatDateWithDash', () => {
    it('날짜를 대시(-)로 구분된 형식(YYYY-MM-DD)으로 변환해야 합니다', () => {
      const date = new Date('2025-04-23');
      expect(formatDateWithDash(date)).toBe('2025-04-23');
    });

    it('다양한 연도의 날짜도 올바르게 변환해야 합니다', () => {
      const dates = [
        { input: new Date('2000-01-01'), expected: '2000-01-01' },
        { input: new Date('2020-06-15'), expected: '2020-06-15' },
        { input: new Date('2100-12-31'), expected: '2100-12-31' }
      ];

      dates.forEach(({ input, expected }) => {
        expect(formatDateWithDash(input)).toBe(expected);
      });
    });
  });

  describe('formatTimestamp', () => {
    it('날짜와 시간 정보를 타임스탬프 문자열로 변환해야 합니다', () => {
      const datetime = {
        day: new Date('2025-04-23'),
        meridiem: '오전' as const,
        hours: '10',
        minutes: '30'
      };

      expect(formatTimestamp(datetime)).toBe('2025-04-23T01:30:00.000Z');
    });

    it('다양한 시간 정보도 올바르게 변환해야 합니다', () => {
      const datetimes = [
        {
          datetime: { day: new Date('2025-04-23'), meridiem: '오전' as const, hours: '10', minutes: '30' },
          expected: '2025-04-23T01:30:00.000Z'
        },
        {
          datetime: { day: new Date('2025-04-23'), meridiem: '오후' as const, hours: '10', minutes: '30' },
          expected: '2025-04-23T13:30:00.000Z'
        },
        {
          datetime: { day: new Date('2025-04-23'), meridiem: '오전' as const, hours: '12', minutes: '00' },
          expected: '2025-04-22T15:00:00.000Z'
        },
        {
          datetime: { day: new Date('2025-04-23'), meridiem: '오후' as const, hours: '12', minutes: '00' },
          expected: '2025-04-23T03:00:00.000Z'
        }
      ];

      datetimes.forEach(({ datetime, expected }) => {
        expect(formatTimestamp(datetime)).toBe(expected);
      });
    });
  });

  describe('formatTimeWithMeridiem', () => {
    it('시간을 오전/오후로 변환해야 합니다', () => {
      const date = new Date('2025-04-23T10:30:00');
      expect(formatTimeWithMeridiem(date)).toBe('오전');
    });

    it('다양한 시간 정보도 올바르게 변환해야 합니다', () => {
      const dates = [
        { input: new Date('2025-04-23T10:30:00'), expected: '오전' },
        { input: new Date('2025-04-23T13:30:00'), expected: '오후' }
      ];

      dates.forEach(({ input, expected }) => {
        expect(formatTimeWithMeridiem(input)).toBe(expected);
      });
    });
  });

  describe('formatTimeToHHMM', () => {
    it('시간을 HH:MM 형식으로 변환해야 합니다', () => {
      const date = new Date('2025-04-23T10:30:00');
      expect(formatTimeToHHMM(date)).toBe('10:30');
    });

    it('다양한 시간 정보도 올바르게 변환해야 합니다', () => {
      const dates = [
        { input: new Date('2025-04-23T10:30:00'), expected: '10:30' },
        { input: new Date('2025-04-23T13:30:00'), expected: '13:30' }
      ];

      dates.forEach(({ input, expected }) => {
        expect(formatTimeToHHMM(input)).toBe(expected);
      });
    });
  });
});
