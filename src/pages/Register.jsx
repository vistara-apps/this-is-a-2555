import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';
import { isValidEmail, validatePassword, validateUsername } from '../utils/validators';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const { username, email, password, confirmPassword } = formData;
    
    // Validate username
    const usernameValidation = validateUsername(username);
    if (!usernameValidation.isValid) {
      newErrors.username = usernameValidation.message;
    }
    
    // Validate email
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(email)) {
      newErrors.email = 'Invalid email format';
    }
    
    // Validate password
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.message;
    }
    
    // Validate password confirmation
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
      const { username, email, password } = formData;
      const { success, error } = await register(email, password, username);
      
      if (success) {
        navigate('/');
      } else {
        setErrors({ form: error || 'Registration failed. Please try again.' });
      }
    } catch (error) {
      setErrors({ form: error.message || 'An unexpected error occurred' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md p-8 space-y-8 bg-surface rounded-lg shadow-medium">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-text">NicheNet</h1>
          <p className="mt-2 text-muted">Create your account</p>
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
                label="Username"
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                error={errors.username}
                placeholder="student_builder"
                required
              />
            </div>
            
            <div>
              <Input
                label="Email"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
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
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                required
              />
              <p className="mt-1 text-xs text-muted">
                Password must be at least 8 characters with uppercase, lowercase, and numbers
              </p>
            </div>
            
            <div>
              <Input
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                required
              />
            </div>
          </div>
          
          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className="h-4 w-4 text-primary focus:ring-primary border-muted rounded"
              required
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-muted">
              I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
            </label>
          </div>
          
          <div>
            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating account...' : 'Create account'}
            </Button>
          </div>
          
          <div className="text-center text-sm">
            <Link to="/login" className="text-primary hover:underline">
              Already have an account? Sign in
            </Link>
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
              onClick={() => alert('Google sign-up not implemented yet')}
            >
              Google
            </Button>
            
            <Button
              type="button"
              variant="secondary"
              className="w-full"
              onClick={() => alert('GitHub sign-up not implemented yet')}
            >
              GitHub
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

