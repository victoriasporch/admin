'use server';

import { createClient } from '../utils/supabase/server';

export const deleteFromDb = async (table: string, id: string) => {
  const supabase = await createClient();

  try {
    const { data: deletedData, error } = await supabase
      .from(table)
      .delete()
      .eq('id', id);

    if (error) {
      console.error(`Error deleting from table "${table}":`, error);
      throw new Error(
        `Failed to delete from table "${table}": ${error.message}`
      );
    }

    return deletedData;
  } catch (error) {
    console.error('Unexpected error in deleteFromDb:', error);
    throw error;
  }
};
