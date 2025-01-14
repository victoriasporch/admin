import { ReactNode } from 'react';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';

const Radix = ({ children }: { children: ReactNode }) => {
  return (
    <Theme accentColor="purple">
      <div className="font-montserrat">{children}</div>
    </Theme>
  );
};

export default Radix;
