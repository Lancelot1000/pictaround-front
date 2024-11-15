import Input from '@/components/Input';
import { useForm } from 'react-hook-form';
import Form from '@/components/Form';

export default function Page() {
  const form = useForm();

  return (
    <Form form={form} onSubmit={() => {}}>
      <Input id={'id'} label={'로그인'} />
    </Form>
  )
}