/* eslint-disable @typescript-eslint/no-explicit-any */

import { Box, TextField } from '@radix-ui/themes';

interface InputField {
  form: any;
  name: string;
  placeholder: string;
  label?: string;
  type: 'text' | 'number' | 'email' | 'date' | 'time' | 'password';
}

const InputField = ({ form, type, name, placeholder, label }: InputField) => {
  return (
    <Box>
      {label && (
        <label htmlFor={name} className="text-gray-500 block mb-2">
          {label}
        </label>
      )}
      <TextField.Root
        type={type}
        radius="large"
        variant="surface"
        size="3"
        id={name}
        name={name}
        placeholder={placeholder}
        {...form.register(name)}
      ></TextField.Root>
      {
        <small className="text-red-400">
          {form.formState.errors?.[name]?.message}
        </small>
      }
    </Box>
  );
};

export default InputField;
