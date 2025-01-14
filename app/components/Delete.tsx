'use client';

import { Button } from '@radix-ui/themes';
import { useState } from 'react';
import { deleteFromDb } from '../serverActions/deleteFromDb';
import toast from 'react-hot-toast';

const Delete = ({
  table,
  id,
  onDelete,
}: {
  table: string;
  id: string;
  onDelete: () => void;
}) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteFromDb(table, id);
      toast.success('Delete successful');
      setLoading(false);
      onDelete();
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
      setLoading(false);
      console.log({ error });
    }
  };

  return (
    <>
      <Button
        size="3"
        onClick={handleDelete}
        loading={loading}
        variant="solid"
        type="submit"
        color="red"
      >
        Delete
      </Button>
    </>
  );
};

export default Delete;
