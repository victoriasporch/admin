'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import InputField from '../components/InputField';
import { Button, Grid } from '@radix-ui/themes';

import { signIn } from './action';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const Form = () => {
  const schema = z.object({
    email: z
      .string({ message: 'Email is required' })
      .email({ message: 'Invalid email address' }),
    password: z
      .string({ message: 'Password is required' })
      .min(6, { message: 'Password must be at least 6 characters long' }),
  });

  type SignInFormData = z.infer<typeof schema>;

  const form = useForm<SignInFormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const router = useRouter();

  const onSubmit = async (data: SignInFormData) => {
    const result = await signIn(data);

    if (result?.error) return toast.error(result.error.message);

    router.replace('/case-studies');
  };

  return (
    <form
      className="grid gap-3"
      noValidate
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <InputField
        form={form}
        name="email"
        type="email"
        placeholder="Email Address"
      />

      <InputField
        form={form}
        name="password"
        type={'password'}
        placeholder="Password"
      />

      <Grid mt="3">
        <Button
          size="3"
          loading={form.formState.isSubmitting}
          variant="solid"
          type="submit"
        >
          Continue
        </Button>
      </Grid>
    </form>
  );
};

export default Form;
