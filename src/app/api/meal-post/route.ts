import { createFoodAnalysisRequestDetail } from '@/apis/analysis-request.api';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const result = await createFoodAnalysisRequestDetail(body);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: 'insert 실패', error }, { status: 500 });
  }
}
