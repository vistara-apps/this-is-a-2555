import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { 
  Home, 
  Users, 
  Brain, 
  User, 
  Search,
  Bell,
  Settings
} from 'lucide-react';

const AppShell = ({ children, currentPage, onPageChange }) => {
  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: Home },
    { id: 'communities', name: 'Communities', icon: Users },
    { id: 'ai-assistant', name: 'AI Assistant', icon: Brain },
    { id: 'profile', name: 'Profile', icon: User },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 bg-surface border-r border-border flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <span className="text-xl font-bold text-text">NicheNet</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  currentPage === item.id
                    ? 'bg-primary text-white'
                    : 'text-textMuted hover:text-text hover:bg-surfaceHover'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.name}</span>
              </button>
            );
          })}
        </nav>

        {/* Settings */}
        <div className="p-4 border-t border-border">
          <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-textMuted hover:text-text hover:bg-surfaceHover transition-colors">
            <Settings size={20} />
            <span className="font-medium">Settings</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-surface border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-textMuted" size={20} />
                <input
                  type="text"
                  placeholder="Search communities, posts..."
                  className="pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-text placeholder-textMuted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-80"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 text-textMuted hover:text-text hover:bg-surfaceHover rounded-lg transition-colors">
                <Bell size={20} />
              </button>
              <ConnectButton />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppShell;