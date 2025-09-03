import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { useAuth } from './context/AuthContext';
import AppShell from './components/AppShell';
import Dashboard from './pages/Dashboard';
import Communities from './pages/Communities';
import AIAssistant from './pages/AIAssistant';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import CommunityDetail from './pages/CommunityDetail';
import PostDetail from './pages/PostDetail';
import CreateCommunity from './pages/CreateCommunity';
import CreatePost from './pages/CreatePost';
import PaymentSuccess from './pages/PaymentSuccess';
import NotFound from './pages/NotFound';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-background">
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <AppShell>
                <Dashboard />
              </AppShell>
            </ProtectedRoute>
          } />
          
          <Route path="/communities" element={
            <ProtectedRoute>
              <AppShell>
                <Communities />
              </AppShell>
            </ProtectedRoute>
          } />
          
          <Route path="/communities/:communityId" element={
            <ProtectedRoute>
              <AppShell>
                <CommunityDetail />
              </AppShell>
            </ProtectedRoute>
          } />
          
          <Route path="/communities/create" element={
            <ProtectedRoute>
              <AppShell>
                <CreateCommunity />
              </AppShell>
            </ProtectedRoute>
          } />
          
          <Route path="/communities/:communityId/posts/create" element={
            <ProtectedRoute>
              <AppShell>
                <CreatePost />
              </AppShell>
            </ProtectedRoute>
          } />
          
          <Route path="/posts/:postId" element={
            <ProtectedRoute>
              <AppShell>
                <PostDetail />
              </AppShell>
            </ProtectedRoute>
          } />
          
          <Route path="/ai-assistant" element={
            <ProtectedRoute>
              <AppShell>
                <AIAssistant />
              </AppShell>
            </ProtectedRoute>
          } />
          
          <Route path="/profile" element={
            <ProtectedRoute>
              <AppShell>
                <Profile />
              </AppShell>
            </ProtectedRoute>
          } />
          
          <Route path="/payment-success" element={
            <ProtectedRoute>
              <AppShell>
                <PaymentSuccess />
              </AppShell>
            </ProtectedRoute>
          } />
          
          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </AppProvider>
  );
}

export default App;

