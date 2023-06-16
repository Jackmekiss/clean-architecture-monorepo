import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { useIsMounted } from '../../../hooks/useIsMounted';

interface Props {
  children: React.ReactNode;
}

function DekstopView({ children }: Props) {
  const isMounted = useIsMounted();
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' });

  if (!isMounted) {
    return null;
  }

  if (isTabletOrMobile) {
    return null;
  }

  return <>{children}</>;
}

export default DekstopView;
