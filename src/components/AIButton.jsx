import React, { useState } from 'react';
import { Brain, Sparkles, Users, Zap } from 'lucide-react';
import Button from './Button';

const AIButton = ({ variant = 'generateIdea', onClick, disabled = false, className = '' }) => {
  const [isLoading, setIsLoading] = useState(false);

  const variants = {
    generateIdea: {
      icon: Brain,
      text: 'Generate Idea',
      gradient: 'from-primary to-purple-600'
    },
    refineIdea: {
      icon: Sparkles,
      text: 'Refine Idea',
      gradient: 'from-accent to-green-600'
    },
    findCollaborator: {
      icon: Users,
      text: 'Find Collaborators',
      gradient: 'from-orange-500 to-red-500'
    }
  };

  const config = variants[variant];
  const Icon = config.icon;

  const handleClick = async () => {
    setIsLoading(true);
    try {
      await onClick?.();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleClick}
      disabled={disabled || isLoading}
      className={`bg-gradient-to-r ${config.gradient} text-white hover:opacity-90 border-0 ${className}`}
    >
      {isLoading ? (
        <Zap className="animate-pulse" size={20} />
      ) : (
        <Icon size={20} />
      )}
      <span className="ml-2">{config.text}</span>
    </Button>
  );
};

export default AIButton;