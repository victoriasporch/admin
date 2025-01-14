import { Button } from '@radix-ui/themes';
import Container from './components/Container';
import Icon from './components/Icon';
import Link from 'next/link';

const NotFound = () => {
  return (
    <main className="bg-gray-100">
      <Container>
        <div className="flex flex-col justify-center items-center min-h-svh">
          <article className="text-center space-y-3">
            <h1 className="text-3xl font-bold">
              😕 Can&apos;t find that page.
            </h1>
            <p className="text-gray-500">
              The page you&apos;re trying to visit can&apos;t be found.{' '}
            </p>
          </article>

          <div className="mt-8">
            <Link href="/">
              <Button size="3" variant="solid" type="submit">
                Go home
                <Icon name="House" size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
};

export default NotFound;
