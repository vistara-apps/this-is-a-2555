import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';
import { isValidEmail } from '../utils/validators';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { success, error } = await login(email, password);
      
      if (success) {
        navigate('/');
      } else {
        setErrors({ form: error || 'Login failed. Please try again.' });
      }
    } catch (error) {
      setErrors({ form: error.message || 'An unexpected error occurred' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-surface rounded-lg shadow-medium">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-text">NicheNet</h1>
          <p className="mt-2 text-muted">Sign in to your account</p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {errors.form && (
            <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">
              {errors.form}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <Input
                label="Email"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
                placeholder="your.email@university.edu"
                required
              />
            </div>
            
            <div>
              <Input
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
                required
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link to="/register" className="text-primary hover:underline">
                Don't have an account? Sign up
              </Link>
            </div>
            
            <div className="text-sm">
              <a href="#" className="text-primary hover:underline">
                Forgot password?
              </a>
            </div>
          </div>
          
          <div>
            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </Button>
          </div>
        </form>
        
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-muted"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-surface text-muted">Or continue with</span>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="secondary"
              className="w-full"
              onClick={() => alert('Google sign-in not implemented yet')}
            >
              Google
            </Button>
            
            <Button
              type="button"
              variant="secondary"
              className="w-full"
              onClick={() => alert('GitHub sign-in not implemented yet')}
            >
              GitHub
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

