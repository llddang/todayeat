'use client';

import { ComponentProps, ComponentType, ReactNode } from 'react';
import useIsClient from '@/hooks/use-is-client';

type ClientOnlyProps = {
  children: ReactNode;
  fallback: ReactNode;
};

type PropsWithoutChildren<T> = Omit<T, 'children'>;

const ClientOnly = Object.assign(
  ({ children, fallback }: ClientOnlyProps) => {
    return <>{useIsClient() ? children : fallback}</>;
  },
  {
    displayName: 'ClientOnly',
    with: <TProps extends ComponentProps<ComponentType> = Record<string, never>>(
      clientOnlyProps: PropsWithoutChildren<ClientOnlyProps>,
      Component: ComponentType<TProps>
    ) =>
      Object.assign(
        (props: TProps) => (
          <ClientOnly {...clientOnlyProps}>
            <Component {...props} />
          </ClientOnly>
        ),
        {
          displayName: `${ClientOnly.displayName}.with(${Component.displayName || Component.name || 'Component'})`
        }
      )
  }
);

export default ClientOnly;
