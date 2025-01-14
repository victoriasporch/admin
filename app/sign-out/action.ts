'use server';
import { createClient } from '../utils/supabase/server';

export const signOut = async () => {
  const supabase = await createClient();
  const response = supabase.auth.signOut({ scope: 'global' });
  return response;
};
