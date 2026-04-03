import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useState } from 'react';

interface LoginForm {
  email: string;
  password: string;
}

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    try {
      setLoading(true);
      await login(data);

      toast.success('Logged in successfully!');
      navigate('/chat');
    } catch (error) {
      toast.error('Invalid credentials');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
                bg-[rgb(var(--color-bg))] 
                text-[rgb(var(--color-text))] 
                px-4">
      {/* Login card */}
      <div className="max-w-md w-full p-8 space-y-6
                bg-white/10 dark:bg-white/5
                backdrop-blur-md
                border border-white/20 dark:border-white/10
                rounded-2xl
                shadow-xl">
        
        {/* Header */}
        <h2 className="text-2xl md:text-3xl font-bold text-center">
          Welcome back to 
          <span className="text-[rgb(var(--color-primary))] ml-1">
            ZenithAI
          </span>
        </h2>
        
        {/* Login form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          
          {/* Email field */}
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            error={errors.email?.message}
          />
          
          {/* Password field */}
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            {...register('password', { required: 'Password is required' })}
            error={errors.password?.message}
          />
          
          {/* Submit button */}
          <Button type="submit" loading={loading}>
            Sign In
          </Button>
          
          {/* Link to register page */}
          <p className="text-center text-sm opacity-70">
            Don’t have an account?{" "}
            <Link
              to="/register"
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
              Create one
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};