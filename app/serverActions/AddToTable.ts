'use server';

import { createClient } from '../utils/supabase/server';

export const AddToTable = async <T>(table: string, data: T) => {
  const supabase = await createClient();

  try {
    const { data: result, error } = await supabase.from(table).insert(data);

    if (error) {
      console.error('Error inserting column:', error);
      throw new Error(
        `Failed to insert column in table "${table}": ${error.message}`
      );
    }

    return result;
  } catch (error) {
    console.error('Unexpected error in Add to table:', error);
    throw error;
  }
};
