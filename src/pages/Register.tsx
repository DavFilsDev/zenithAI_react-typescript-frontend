import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useState } from 'react';

interface RegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
  firstName?: string;
  lastName?: string;
}

export const Register = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { 
    register, 
    handleSubmit, 
    watch,
    formState: { errors } 
  } = useForm<RegisterForm>();

  const password = watch('password');

  const onSubmit = async (data: RegisterForm) => {
    try {
      setLoading(true);
      await registerUser({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
      });
      toast.success('Registered successfully!');
      navigate('/chat');
    } catch (error) {
      toast.error('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[rgb(var(--color-bg))]">
      {/* Glass card container */}
      <div className="max-w-md w-full p-8 bg-[rgb(var(--color-card))]/70 backdrop-blur-lg rounded-2xl shadow-xl">
        {/* Header */}
        <h2 className="text-3xl font-bold text-center text-[rgb(var(--color-text))]">
          Create Account
        </h2>

        {/* Form placeholder */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          {/* First Name (optional) */}
          <Input
            label="First Name (Optional)"
            type="text"
            placeholder="Enter your first name"
            registration={register('firstName')}
            error={errors.firstName?.message}
          />

          <Input
            label="Last Name (Optional)"
            type="text"
            placeholder="Enter your last name"
            registration={register('lastName')}
            error={errors.lastName?.message}
          />

          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            registration={register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            error={errors.email?.message}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            registration={register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Password must be at least 6 characters' },
            })}
            error={errors.password?.message}
          />
          
          <Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            registration={register('confirmPassword', {
              required: 'Please confirm your password',
              validate: value => value === password || 'Passwords do not match',
            })}
            error={errors.confirmPassword?.message}
          />

          <Button type="submit" loading={loading}>
            Sign Up
          </Button>

          <p className="text-center text-sm opacity-70 mt-4">
            Already have an account?{' '}
            <Link
              to="/login"
              className="
                font-medium
                text-[rgb(var(--color-primary))]
                relative
                after:absolute after:left-0 after:-bottom-0.5
                after:h-[1px] after:w-0
                after:bg-[rgb(var(--color-primary))]
                after:transition-all after:duration-300
                hover:after:w-full
              "
            >
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};