'use client';

import { PeriodUnit } from '../types/report.type';

type FetchReportResponse = {
  barChart: {
    label: string;
    value: number;
    fill: string;
  }[];
  total: {
    calories: number;
    carbohydrate: number;
    protein: number;
    fat: number;
  };
};

export const fetchReport = async (userId: string, unit: PeriodUnit): Promise<FetchReportResponse> => {
  const res = await fetch('/api/report', {
    method: 'POST',
    body: JSON.stringify({ userId, unit }),
    headers: { 'Content-Type': 'application/json' }
  });

  if (!res.ok) {
    throw new Error('리포트 데이터 요청 실패');
  }

  return res.json();
};
