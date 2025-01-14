/* eslint-disable @typescript-eslint/no-explicit-any */

import { Box, TextArea } from '@radix-ui/themes';

interface TextAreaFieldProps {
  form: any;
  name: string;
  placeholder: string;
  rows?: number;
  label?: string;
}

const TextAreaField = ({
  form,
  name,
  placeholder,
  rows = 4,
  label,
}: TextAreaFieldProps) => {
  return (
    <Box>
      {label && (
        <label htmlFor={name} className="text-gray-500 block mb-2">
          {label}
        </label>
      )}
      <TextArea
        radius="large"
        variant="surface"
        size="3"
        rows={rows}
        placeholder={placeholder}
        {...form.register(name)}
      ></TextArea>
      {
        <small className="text-red-400">
          {form.formState.errors?.[name]?.message}
        </small>
      }
    </Box>
  );
};

export default TextAreaField;
