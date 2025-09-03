import React from 'react';
import { MessageCircle, Clock } from 'lucide-react';

const PostCard = ({ post }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 hover:bg-surfaceHover transition-colors">
      <div className="flex items-start space-x-3">
        <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white text-sm font-medium">
            {post.username.charAt(0).toUpperCase()}
          </span>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            <span className="font-medium text-text">{post.username}</span>
            <div className="flex items-center space-x-1 text-textMuted text-sm">
              <Clock size={14} />
              <span>{formatDate(post.createdAt)}</span>
            </div>
          </div>
          
          <h3 className="text-text font-semibold mb-2">{post.title}</h3>
          <p className="text-textMuted text-sm mb-4 line-clamp-3">{post.content}</p>
          
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-1 text-textMuted hover:text-text transition-colors">
              <MessageCircle size={16} />
              <span className="text-sm">{post.replies} replies</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;