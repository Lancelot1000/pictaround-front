import { FormProvider } from 'react-hook-form';

export default function Component({ form, onSubmit, children }) {
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );

}