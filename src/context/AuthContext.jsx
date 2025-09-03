import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, getCurrentUser, signIn, signUp, signOut } from '../api/supabase';

// Create context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setLoading(true);
        
        // Get current user from Supabase
        const { data, error } = await getCurrentUser();
        
        if (error) {
          throw error;
        }
        
        if (data?.user) {
          setUser(data.user);
          setProfile(data.profile);
        }
      } catch (err) {
        console.error('Error initializing auth:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Set up auth state listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          setUser(session.user);
          
          // Get user profile
          const { data } = await getCurrentUser();
          if (data?.profile) {
            setProfile(data.profile);
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setProfile(null);
        }
      }
    );

    initializeAuth();

    // Clean up subscription
    return () => {
      if (authListener?.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  // Handle user login
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await signIn(email, password);
      
      if (error) {
        throw error;
      }
      
      return { success: true, data };
    } catch (err) {
      console.error('Error logging in:', err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Handle user registration
  const register = async (email, password, username) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await signUp(email, password, username);
      
      if (error) {
        throw error;
      }
      
      return { success: true, data };
    } catch (err) {
      console.error('Error registering:', err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Handle user logout
  const logout = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { error } = await signOut();
      
      if (error) {
        throw error;
      }
      
      setUser(null);
      setProfile(null);
      
      return { success: true };
    } catch (err) {
      console.error('Error logging out:', err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Update user profile
  const updateProfile = (newProfile) => {
    setProfile(prev => ({ ...prev, ...newProfile }));
  };

  // Context value
  const value = {
    user,
    profile,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

