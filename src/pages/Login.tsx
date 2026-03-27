import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Input } from '../components/ui/Input';

interface LoginForm {
  email: string;
  password: string;
}

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    try {
      await login(data);
      
      toast.success('Logged in successfully!');
      
      navigate('/chat');
    } catch (error) {
      toast.error('Invalid credentials');
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
            registration={register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            error={errors.email}
          />
          
          {/* Password field */}
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            registration={register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
            error={errors.password}
          />
          
          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Sign In
          </button>
          
          {/* Link to register page */}
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link 
              to="/register" 
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};