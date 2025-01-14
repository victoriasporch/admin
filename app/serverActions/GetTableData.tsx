'use server';

import { createClient } from '../utils/supabase/server';

export const getTableData = async (table: string) => {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase.from(table).select();

    if (error) {
      console.error(`Error fetching data from table "${table}":`, error);
      throw new Error(
        `Failed to fetch data from table "${table}": ${error.message}`
      );
    }

    return data;
  } catch (err) {
    console.error(
      `Unexpected error in fetching data from table "${table}":`,
      err
    );
    throw err;
  }
};
