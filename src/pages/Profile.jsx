import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Button from '../components/Button';
import Input from '../components/Input';
import { Edit, Save, X, MapPin, Calendar, Link as LinkIcon } from 'lucide-react';

const Profile = () => {
  const { user } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const handleSave = () => {
    // In a real app, this would update the user in the backend
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  const stats = [
    { label: 'Communities', value: '4' },
    { label: 'Posts', value: '12' },
    { label: 'Ideas Generated', value: '8' },
    { label: 'Collaborations', value: '3' }
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="flex items-start space-x-6">
          {/* Avatar */}
          <div className="w-24 h-24 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-3xl font-bold text-white">
              {user.username.charAt(0).toUpperCase()}
            </span>
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <div>
                {isEditing ? (
                  <Input
                    value={editedUser.username}
                    onChange={(e) => setEditedUser({ ...editedUser, username: e.target.value })}
                    className="text-xl font-bold"
                  />
                ) : (
                  <h1 className="text-2xl font-bold text-text">{user.username}</h1>
                )}
                {isEditing ? (
                  <Input
                    value={editedUser.email}
                    onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                    className="text-textMuted mt-1"
                  />
                ) : (
                  <p className="text-textMuted">{user.email}</p>
                )}
              </div>

              <div className="flex space-x-2">
                {isEditing ? (
                  <>
                    <Button variant="accent" onClick={handleSave} size="sm">
                      <Save size={16} />
                      <span className="ml-1">Save</span>
                    </Button>
                    <Button variant="secondary" onClick={handleCancel} size="sm">
                      <X size={16} />
                      <span className="ml-1">Cancel</span>
                    </Button>
                  </>
                ) : (
                  <Button variant="secondary" onClick={() => setIsEditing(true)} size="sm">
                    <Edit size={16} />
                    <span className="ml-1">Edit Profile</span>
                  </Button>
                )}
              </div>
            </div>

            {/* Bio */}
            <div className="mb-4">
              {isEditing ? (
                <textarea
                  value={editedUser.bio}
                  onChange={(e) => setEditedUser({ ...editedUser, bio: e.target.value })}
                  rows={3}
                  className="w-full bg-background border border-border rounded-lg px-3 py-2 text-text resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              ) : (
                <p className="text-textMuted">{user.bio}</p>
              )}
            </div>

            {/* Additional Info */}
            <div className="flex items-center space-x-6 text-sm text-textMuted">
              <div className="flex items-center space-x-1">
                <MapPin size={16} />
                <span>University Campus</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar size={16} />
                <span>Joined January 2024</span>
              </div>
              <div className="flex items-center space-x-1">
                <LinkIcon size={16} />
                <span>github.com/student_builder</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-surface border border-border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-text">{stat.value}</div>
            <div className="text-sm text-textMuted">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Interests */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h2 className="text-lg font-semibold text-text mb-4">Interests</h2>
        {isEditing ? (
          <div className="space-y-2">
            <Input
              placeholder="Add interests (comma-separated)"
              value={editedUser.interests?.join(', ')}
              onChange={(e) => setEditedUser({
                ...editedUser,
                interests: e.target.value.split(',').map(i => i.trim()).filter(i => i)
              })}
            />
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {user.interests?.map((interest) => (
              <span
                key={interest}
                className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm"
              >
                {interest}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Recent Activity */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h2 className="text-lg font-semibold text-text mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-3 bg-background rounded-lg">
            <div className="w-2 h-2 bg-accent rounded-full"></div>
            <div className="flex-1">
              <p className="text-text text-sm">Joined "AI Ethics in Healthcare" community</p>
              <p className="text-textMuted text-xs">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-background rounded-lg">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <div className="flex-1">
              <p className="text-text text-sm">Created post "Bias in AI diagnostic tools"</p>
              <p className="text-textMuted text-xs">1 day ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-background rounded-lg">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-text text-sm">Generated new AI startup idea</p>
              <p className="text-textMuted text-xs">3 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;