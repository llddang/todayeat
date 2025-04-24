'use client';

import GlassBackground from '@/components/commons/glass-background';
import StepEmail from './components/step-email';

const ResetPasswordPage = () => {
  return (
    <GlassBackground className="px-5 pb-6 pt-7 xl:min-h-0 xl:rounded-[2rem] xl:p-10">
      <StepEmail />
    </GlassBackground>
  );
};
export default ResetPasswordPage;
