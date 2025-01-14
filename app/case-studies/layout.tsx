import { ReactNode } from 'react';
import Container from '../components/Container';
import Link from 'next/link';
import Icon from '../components/Icon';
import Image from 'next/image';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <nav className="bg-white">
        <Container>
          <div className="flex justify-between items-center py-5">
            <div className="flex items-center justify-start gap-3">
              <figure className="w-[4rem] h-[4rem] rounded-full overflow-auto">
                <Image
                  src="/avatar.jpg"
                  className="w-full h-full object-cover"
                  alt=""
                  width={500}
                  height={500}
                />
              </figure>

              <h1 className="text-md font-normal">
                Hello <strong>Victoria</strong> 👋
              </h1>
            </div>

            <Link
              href="/sign-out"
              className="flex items-center gap-1 font-semibold text-sm text-red-500"
            >
              <Icon name="LogOut" size={16}></Icon>
              Sign out
            </Link>
          </div>
        </Container>
      </nav>
      <main>{children}</main>
    </>
  );
};

export default Layout;
