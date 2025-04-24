import { UnitEnum } from '../types/report.type';

export const UNIT_TEXT = {
  [UnitEnum.DAILY]: {
    current: '오늘',
    previous: '어제',
    postposition: '은'
  },
  [UnitEnum.WEEKLY]: {
    current: '이번 주',
    previous: '저번 주',
    postposition: '는'
  },
  [UnitEnum.MONTHLY]: {
    current: '이번 달',
    previous: '저번 달',
    postposition: '은'
  }
};
