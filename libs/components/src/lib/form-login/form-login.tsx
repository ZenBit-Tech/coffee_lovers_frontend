import { useForm, Controller } from 'react-hook-form';
import { Input, Form } from 'antd';
import { InputHook } from '@freelance/components';

export function LoginForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit = (data: object) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputHook
        controllerConfig={{
          required: true,
          pattern:
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        }}
        inputConfig={[
          {
            required: true,
            message: 'Please input your email!',
          },
        ]}
        name={'email'}
        label={'Email'}
      />

      {/* <Controller
        {...register('email', {
          required: true,
          pattern:
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        })}
        name="email"
        control={control}
        render={({ field }) => (
          <Form.Item
            {...field}
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
            ]}
          >
            <Input />
          </Form.Item>
        )}
      /> */}
      {errors['email'] && <span>This field is required</span>}

      <Controller
        {...register('password', { required: true })}
        name="password"
        control={control}
        render={({ field }) => (
          <Form.Item
            {...field}
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
        )}
      />

      {errors['password'] && <span>This field is required</span>}
      <button type="submit">Submit</button>
    </form>
  );
}

export default LoginForm;
