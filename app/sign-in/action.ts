'use server';

import { createClient } from '../utils/supabase/server';

export const signIn = async (credential: {
  email: string;
  password: string;
}) => {
  const supabase = await createClient();
  const response = supabase.auth.signInWithPassword(credential);
  return response;
};
