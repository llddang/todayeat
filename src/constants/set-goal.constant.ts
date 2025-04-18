import { FunnelStep, StepUIConfig } from '@/types/set-goal.type';

// TODO 공통 컴포넌트화 논의 필요
// 사용중인 페이지 : 목표 설정, 회원가입 funnel
export const STEP_UI_CONFIG: Record<FunnelStep, StepUIConfig> = {
  step1: { hasGlassBackground: true, hasProgressBar: true, stepOrder: 1 },
  step2: { hasGlassBackground: true, hasProgressBar: true, stepOrder: 2 },
  step3: { hasGlassBackground: true, hasProgressBar: true, stepOrder: 3 },
  step4: { hasGlassBackground: true, hasProgressBar: true, stepOrder: 4 },
  step5: { hasGlassBackground: true, hasProgressBar: true, stepOrder: 5 },
  step6: { hasGlassBackground: true, hasProgressBar: true, stepOrder: 6 },
  step7: { hasGlassBackground: false, hasProgressBar: false, stepOrder: 7 },
  step8: { hasGlassBackground: true, hasProgressBar: false, stepOrder: 8 },
  complete: { hasGlassBackground: false, hasProgressBar: false, stepOrder: 9 }
};
