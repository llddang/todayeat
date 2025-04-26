export const formatFixtures = {
  date: {
    standardDate: new Date('2025-04-23'),
    singleDigitMonth: new Date('2024-01-15'),
    december: new Date('2024-12-31'),
    leapYearFebruary: new Date('2024-02-29'),
    variousDates: [
      { input: new Date('2000-01-01'), expected: '2000년 1월' },
      { input: new Date('2020-06-15'), expected: '2020년 6월' },
      { input: new Date('2100-12-31'), expected: '2100년 12월' }
    ],
    dashFormattedDates: [
      { input: new Date('2000-01-01'), expected: '2000-01-01' },
      { input: new Date('2020-06-15'), expected: '2020-06-15' },
      { input: new Date('2100-12-31'), expected: '2100-12-31' }
    ]
  },
  time: {
    standardDateTime: new Date('2025-04-23T10:30:00'),
    afternoonDateTime: new Date('2025-04-23T13:30:00'),
    timestampData: {
      standard: {
        datetime: {
          day: new Date('2025-04-23'),
          meridiem: '오전' as const,
          hours: '10',
          minutes: '30'
        },
        expected: '2025-04-23T01:30:00.000Z'
      },
      afternoon: {
        datetime: {
          day: new Date('2025-04-23'),
          meridiem: '오후' as const,
          hours: '10',
          minutes: '30'
        },
        expected: '2025-04-23T13:30:00.000Z'
      },
      midnight: {
        datetime: {
          day: new Date('2025-04-23'),
          meridiem: '오전' as const,
          hours: '12',
          minutes: '00'
        },
        expected: '2025-04-22T15:00:00.000Z'
      },
      noon: {
        datetime: {
          day: new Date('2025-04-23'),
          meridiem: '오후' as const,
          hours: '12',
          minutes: '00'
        },
        expected: '2025-04-23T03:00:00.000Z'
      }
    },
    meridiemTestCases: [
      { input: new Date('2025-04-23T10:30:00'), expected: '오전' },
      { input: new Date('2025-04-23T13:30:00'), expected: '오후' }
    ],
    timeFormatTestCases: [
      { input: new Date('2025-04-23T10:30:00'), expected: '10:30' },
      { input: new Date('2025-04-23T13:30:00'), expected: '13:30' }
    ]
  },
  number: {
    standardNumber: 123456789,
    standardNumberExpected: '123,456,789',
    malformedNumber: '10,00,000',
    malformedNumberExpected: '1,000,000'
  }
};
