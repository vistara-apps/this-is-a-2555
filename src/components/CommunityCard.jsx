import React from 'react';
import { Users, MessageCircle } from 'lucide-react';
import Button from './Button';
import { useApp } from '../context/AppContext';

const CommunityCard = ({ community }) => {
  const { joinCommunity, leaveCommunity } = useApp();

  const handleToggleJoin = () => {
    if (community.isJoined) {
      leaveCommunity(community.communityId);
    } else {
      joinCommunity(community.communityId);
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 hover:bg-surfaceHover transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-text mb-2">{community.name}</h3>
          <p className="text-textMuted text-sm mb-3">{community.description}</p>
          
          <div className="flex items-center space-x-4 text-sm text-textMuted">
            <div className="flex items-center space-x-1">
              <Users size={16} />
              <span>{community.memberCount} members</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageCircle size={16} />
              <span>{community.topic}</span>
            </div>
          </div>
        </div>
      </div>

      <Button
        variant={community.isJoined ? 'secondary' : 'primary'}
        onClick={handleToggleJoin}
        className="w-full"
      >
        {community.isJoined ? 'Leave Community' : 'Join Community'}
      </Button>
    </div>
  );
};

export default CommunityCard;