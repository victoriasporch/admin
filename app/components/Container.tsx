import { ReactNode } from 'react';

const Container = ({ children }: { children: ReactNode }) => {
  return <div className="max-w-[70rem] mx-auto px-5">{children}</div>;
};

export default Container;
