import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleGenAI } from '@google/genai';
import { ENV, ENV_ERROR } from '@/constants/env.constant';
import { FoodAnalysisResult } from '@/types/gemini.type';

export function getGenerativeAI() {
  if (!ENV.GEMINI_KEY) throw new Error(ENV_ERROR.GEMINI_KEY);
  return new GoogleGenerativeAI(ENV.GEMINI_KEY);
}

export function getGenAI() {
  if (!ENV.GEMINI_KEY) throw new Error(ENV_ERROR.GEMINI_KEY);
  return new GoogleGenAI({ apiKey: ENV.GEMINI_KEY });
}

/**
 * Gemini 응답 문자열을 안전하게 파싱하여 JSON 배열로 변환
 * - 마크다운 코드 블록 제거
 * - JSON 구조가 아닌 경우에도 대응
 *
 * @param {string} text - Gemini JSON 형식 응답 문자열
 * @returns {FoodAnalysisResult[]} - JSON으로 변환된 응답의 Array
 */
export function parseGeminiResponse(text: string): FoodAnalysisResult[] {
  try {
    const cleaned = text.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(cleaned);

    if (Array.isArray(parsed)) return parsed;

    if (parsed && typeof parsed === 'object') return [parsed];

    return [];
  } catch (parseError) {
    console.error('Failed to parse Gemini response:', parseError);
    return [];
  }
}
