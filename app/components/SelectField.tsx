/* eslint-disable @typescript-eslint/no-explicit-any */

import { Grid, Select } from '@radix-ui/themes';

interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

interface SelectFieldProps {
  form: any;
  name: string;
  //   placeholder?: string;
  options: SelectOption[];
  label?: string;
}

const SelectField = ({
  form,
  name,

  options,
  label,
}: SelectFieldProps) => {
  return (
    <Grid>
      {label && <label className="block mb-2">{label}</label>}
      <Select.Root
        size="3"
        defaultValue={form.getValues()[name]}
        onValueChange={(value) => form.setValue(name, value)} // Bind with react-hook-form
      >
        <Select.Trigger />
        <Select.Content>
          <Select.Group>
            {options.map((option) => (
              <Select.Item
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      {form.formState.errors[name]?.message && (
        <small className="text-red-400">
          {form.formState.errors[name]?.message}
        </small>
      )}
    </Grid>
  );
};

export default SelectField;
