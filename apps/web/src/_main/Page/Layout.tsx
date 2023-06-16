import { ReactNode } from 'react';
import Content from './Content';

interface Props {
  children: ReactNode;
  withHeader?: boolean;
  footer?: ReactNode;
}

function Layout({
  children,
  footer,
}: Props) {
  return (
    <div className="h-screen w-screen overflow-y-hidden">
      <Content>
        {children}
      </Content>
      {footer}
    </div>
  );
}

export default Layout;
