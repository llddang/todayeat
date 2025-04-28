'use client';
import useIsClient from '@/hooks/use-is-client';
import { ReactNode } from 'react';

/**
 * ClientOnly 컴포넌트
 * @param {ReactNode} children 클라이언트에서 렌더링할 내용
 * @param {ReactNode} fallback 서버에서 렌더링할 내용
 */
type ClientOnlyProps = {
  children: ReactNode;
  fallback: ReactNode;
};
const ClientOnly = ({ children, fallback }: ClientOnlyProps) => {
  const isClient = useIsClient();

  if (!isClient) {
    return fallback;
  }

  return children;
};

export default ClientOnly;
