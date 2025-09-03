import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import AppShell from './components/AppShell';
import Dashboard from './pages/Dashboard';
import Communities from './pages/Communities';
import AIAssistant from './pages/AIAssistant';
import Profile from './pages/Profile';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'communities':
        return <Communities />;
      case 'ai-assistant':
        return <AIAssistant />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AppProvider>
      <div className="min-h-screen bg-background">
        <AppShell currentPage={currentPage} onPageChange={setCurrentPage}>
          {renderPage()}
        </AppShell>
      </div>
    </AppProvider>
  );
}

export default App;