/**
 * 숫자의 천 단위마다 콤마(,)를 붙이는 함수입니다.
 *
 * @function formatNumberWithComma
 * @param {number} number - 변환할 숫자
 * @returns {string} 천 단위마다 콤마(,)가 포함된 문자열
 */
export function formatNumberWithComma(number: number): string {
  return number.toLocaleString('ko-KR');
}
