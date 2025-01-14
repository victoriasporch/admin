/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Dialog, Flex, Grid } from '@radix-ui/themes';
import { useEffect } from 'react';
import { updateColumn } from '@/app/serverActions/UpdateColumn';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import InputField from '../InputField';
import TextAreaField from '../TextAreaField';
import toast from 'react-hot-toast';
import { useConnectDb } from '@/app/providers/ConnectDb';
import ImageUpload from '../ImageUpload';
import Editor from '../Editor';

const EditCourse = ({ caseStudy }: { caseStudy: any }) => {
  const schema = z.object({
    title: z
      .string({ message: 'title name is required' })
      .min(2, 'title name must be greater than two characters'),

    description: z
      .string({ message: 'description description is required' })
      .min(2, 'description description must be greater than two characters'),
    image: z
      .string({ message: 'image image is required' })
      .min(2, 'image start date must be greater than two characters'),
    content: z
      .string({ message: 'content start date is required' })
      .min(2, 'content start date must be greater than two characters'),
    tag: z
      .string({ message: 'tag start date is required' })
      .min(2, 'tag start date must be greater than two characters'),
  });

  type CoursesFormData = z.infer<typeof schema>;

  const form = useForm<CoursesFormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const { setInvalidateCaseStudies } = useConnectDb();

  const onSubmit = async (data: CoursesFormData) => {
    try {
      await updateColumn('case_studies', { id: caseStudy.id, ...data });
      toast.success('Update successful');
      setInvalidateCaseStudies(true);
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
      console.log({ error });
    }
  };

  useEffect(() => {
    const data = {
      ...caseStudy,
    };
    form.reset(data);
  }, []);

  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger>
          <Button
            size="3"
            variant="solid"
            type="submit"
            color="green"
            className="w-full"
          >
            Edit
          </Button>
        </Dialog.Trigger>

        <Dialog.Content>
          <Dialog.Title size="7">Edit Case Study</Dialog.Title>
          <Dialog.Description size="2" mb="5">
            Make changes to this case study.
          </Dialog.Description>

          <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
            <Grid gap="5">
              <Box>
                <ImageUpload
                  url={form.getValues().image}
                  onUpload={(url) => {
                    form.setValue('image', url);
                  }}
                  preset="case-studies"
                />
                <small className="text-red-400">
                  {form.formState.errors?.['image']?.message}
                </small>
              </Box>

              <InputField
                form={form}
                name="title"
                type="text"
                placeholder="eg. Spiral"
                label="Case study title"
              />

              <InputField
                form={form}
                name="tag"
                type="text"
                placeholder="eg. Advertising"
                label="Case study tag"
              />

              <TextAreaField
                placeholder="Your description here"
                label="Case Study Description"
                form={form}
                name="description"
              />

              <Editor form={form} />

              <Flex gap="3" mt="8" justify="start">
                <Button
                  size="3"
                  type="submit"
                  color="purple"
                  loading={form.formState.isSubmitting}
                >
                  Save changes
                </Button>
                <Dialog.Close>
                  <Button variant="soft" color="gray" size="3">
                    Cancel
                  </Button>
                </Dialog.Close>
              </Flex>
            </Grid>
          </form>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
};

export default EditCourse;
