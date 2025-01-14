import { redirect } from 'next/navigation';
import { signOut } from './action';

const SignOut = async () => {
  const response = await signOut();
  if (!response.error) return redirect('/');
  return redirect('/dashboard');
};

export default SignOut;
