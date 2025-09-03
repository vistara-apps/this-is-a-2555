import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import CommunityCard from '../components/CommunityCard';
import PostCard from '../components/PostCard';
import Button from '../components/Button';
import { Plus, TrendingUp, Users, Brain } from 'lucide-react';

const Dashboard = () => {
  const { user, communities, posts } = useApp();
  const [activeTab, setActiveTab] = useState('overview');

  const joinedCommunities = communities.filter(c => c.isJoined);
  const recentPosts = posts.slice(0, 3);

  const stats = [
    {
      label: 'Communities Joined',
      value: joinedCommunities.length,
      icon: Users,
      color: 'text-primary'
    },
    {
      label: 'Posts Created',
      value: '12',
      icon: TrendingUp,
      color: 'text-accent'
    },
    {
      label: 'AI Ideas Generated',
      value: '8',
      icon: Brain,
      color: 'text-purple-400'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary to-accent rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {user.username}!</h1>
        <p className="text-white/80">
          Ready to connect with your communities and explore new AI-powered startup ideas?
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-surface border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-textMuted text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-text">{stat.value}</p>
                </div>
                <Icon className={`${stat.color}`} size={24} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-border">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'communities', label: 'My Communities' },
            { id: 'recent', label: 'Recent Activity' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-textMuted hover:text-text'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <div className="bg-surface border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-text mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button variant="primary" className="w-full justify-start">
                <Plus size={20} />
                <span className="ml-2">Create New Post</span>
              </Button>
              <Button variant="secondary" className="w-full justify-start">
                <Users size={20} />
                <span className="ml-2">Discover Communities</span>
              </Button>
              <Button variant="accent" className="w-full justify-start">
                <Brain size={20} />
                <span className="ml-2">Generate AI Idea</span>
              </Button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-surface border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-text mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {recentPosts.map((post) => (
                <div key={post.postId} className="border-l-2 border-primary pl-4">
                  <p className="text-sm text-text font-medium">{post.title}</p>
                  <p className="text-xs text-textMuted">
                    in {communities.find(c => c.communityId === post.communityId)?.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'communities' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {joinedCommunities.map((community) => (
            <CommunityCard key={community.communityId} community={community} />
          ))}
        </div>
      )}

      {activeTab === 'recent' && (
        <div className="space-y-4">
          {recentPosts.map((post) => (
            <PostCard key={post.postId} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;