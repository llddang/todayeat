import { PeriodUnitEnum } from '../types/report.type';

export const PERIOD_UNIT_TEXT = {
  [PeriodUnitEnum.DAILY]: {
    current: '오늘',
    previous: '어제',
    postposition: '은'
  },
  [PeriodUnitEnum.WEEKLY]: {
    current: '이번 주',
    previous: '저번 주',
    postposition: '는'
  },
  [PeriodUnitEnum.MONTHLY]: {
    current: '이번 달',
    previous: '저번 달',
    postposition: '은'
  }
};
