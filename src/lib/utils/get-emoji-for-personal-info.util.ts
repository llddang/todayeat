import { USER_PERSONAL_INFO_EMOJI_MAPPING } from '@/constants/user-personal-info.constant';

/**
 * 사용자 개인 정보에 해당하는 이모지를 반환하는 유틸리티 함수
 *
 * @param {Object} params - 함수 파라미터 객체
 * @param {string} params.title - 정보의 제목 (예: '건강 목표', '활동 수준')
 * @param {string} params.description - 정보의 설명 (예: '체지방 줄이기', '일상적으로 움직여요')
 * @returns {string} 해당 정보에 맞는 이모지, 없을 경우 빈 문자열 반환
 *
 * @example
 * 건강 목표가 '체지방 줄이기'일 경우 '🎯' 반환
 * getEmojiForPersonalInfo({ title: '건강 목표', description: '체지방 줄이기' });
 *
 * 활동 수준이 '일상적으로 움직여요'일 경우 '🏃' 반환
 * getEmojiForPersonalInfo({ title: '활동 수준', description: '일상적으로 움직여요' });
 */
export const getEmojiForPersonalInfo = (title: string, description: string): string => {
  const emojiMap = USER_PERSONAL_INFO_EMOJI_MAPPING[title as keyof typeof USER_PERSONAL_INFO_EMOJI_MAPPING];
  if (!emojiMap) return '';

  return emojiMap[description.toString() as keyof typeof emojiMap] || '';
};
