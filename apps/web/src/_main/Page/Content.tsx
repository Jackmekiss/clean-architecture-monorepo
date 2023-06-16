import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

function Content({ children }: Props) {
  return (
    <div className="h-full px-4 w-full lg:px-0 lg:w-[800px] m-auto">
      {children}
    </div>
  );
}

export default Content;
