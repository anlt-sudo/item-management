import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { loginThunk } from '../features/authSlice';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.auth);

  const onSubmit = (data) => {
    dispatch(loginThunk(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto mt-8 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <Input label="Email" {...register('email', { required: 'Email is required' })} error={errors.email?.message} type="email" />
      <Input label="Password" {...register('password', { required: 'Password is required' })} error={errors.password?.message} type="password" />
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <Button type="submit" loading={loading}>Login</Button>
    </form>
  );
};

export default LoginPage;
