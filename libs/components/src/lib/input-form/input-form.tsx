import { useForm, Controller } from 'react-hook-form';
import { Input, Form } from 'antd';

interface InputHookProps {
  controllerConfig: object;
  inputConfig: Array<object>;
  name: string;
  label?: string;
}

export function InputHook(props: InputHookProps) {
  const { control, register } = useForm();

  return (
    <Controller
      {...register('email', { ...props.controllerConfig })}
      name={props.name}
      control={control}
      render={({ field }) => (
        <Form.Item
          {...field}
          label={props.label}
          name={props.name}
          rules={[...props.inputConfig]}
        >
          <Input />
        </Form.Item>
      )}
    />
  );
}

export default InputHook;
