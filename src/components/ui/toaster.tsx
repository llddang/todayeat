'use client';

import { useToast } from '@/hooks/use-toast';
import { Toast, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from '@/components/ui/toast';
import { cn } from '@/lib/shadcn';

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, icon, ...props }) {
        return (
          <Toast key={id} {...props} className="rounded-2xl">
            {icon && (
              <div
                className={cn(
                  icon,
                  'before:block before:h-6 before:w-6 before:bg-contain before:bg-center before:bg-no-repeat'
                )}
              />
            )}
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && <ToastDescription className="typography-subTitle2">{description}</ToastDescription>}
            </div>
            {action}
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
