/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { createClient } from '../utils/supabase/server';

export const updateColumn = async (
  table: string,
  data: any
  // options: UpsertOptions = { onConflict: 'id' }
) => {
  const supabase = await createClient();

  try {
    const { data: result, error } = await supabase
      .from(table)
      .update(data)
      .eq('id', data.id);

    if (error) {
      console.error('Error updating column:', error);
      throw new Error(
        `Failed to update column in table "${table}": ${error.message}`
      );
    }

    return result;
  } catch (error) {
    console.error('Unexpected error in updateColumn:', error);
    throw error;
  }
};
