import React, { createContext, useContext, useState, useCallback } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({
    userId: '1',
    username: 'student_builder',
    email: 'student@university.edu',
    bio: 'CS student passionate about AI and startups',
    interests: ['AI', 'Web3', 'Biotech', 'Startups']
  });

  const [communities, setCommunities] = useState([
    {
      communityId: '1',
      name: 'AI Ethics in Healthcare',
      description: 'Discussing ethical implications of AI in medical applications',
      topic: 'AI Ethics',
      memberCount: 245,
      isJoined: true
    },
    {
      communityId: '2',
      name: 'Python for Biotech Research',
      description: 'Sharing Python tools and techniques for biological research',
      topic: 'Programming',
      memberCount: 189,
      isJoined: false
    },
    {
      communityId: '3',
      name: 'Web3 Gaming Guilds',
      description: 'Building the future of blockchain-based gaming',
      topic: 'Web3',
      memberCount: 312,
      isJoined: true
    },
    {
      communityId: '4',
      name: 'Startup Pitch Practice',
      description: 'Practice your startup pitches with fellow entrepreneurs',
      topic: 'Entrepreneurship',
      memberCount: 156,
      isJoined: false
    }
  ]);

  const [posts, setPosts] = useState([
    {
      postId: '1',
      communityId: '1',
      userId: '2',
      username: 'med_student_ai',
      title: 'Bias in AI diagnostic tools - how to address?',
      content: 'I\'ve been researching bias in AI diagnostic systems. What are the best practices for ensuring fairness?',
      createdAt: '2024-01-15T10:30:00Z',
      replies: 12
    },
    {
      postId: '2',
      communityId: '3',
      userId: '3',
      username: 'game_dev_pro',
      title: 'NFT marketplace for in-game assets',
      content: 'Working on a decentralized marketplace for trading game items. Looking for feedback on the economic model.',
      createdAt: '2024-01-15T09:15:00Z',
      replies: 8
    }
  ]);

  const [aiIdeas, setAiIdeas] = useState([]);

  const joinCommunity = useCallback((communityId) => {
    setCommunities(prev => 
      prev.map(community => 
        community.communityId === communityId 
          ? { ...community, isJoined: true, memberCount: community.memberCount + 1 }
          : community
      )
    );
  }, []);

  const leaveCommunity = useCallback((communityId) => {
    setCommunities(prev => 
      prev.map(community => 
        community.communityId === communityId 
          ? { ...community, isJoined: false, memberCount: community.memberCount - 1 }
          : community
      )
    );
  }, []);

  const createPost = useCallback((postData) => {
    const newPost = {
      postId: Date.now().toString(),
      userId: user.userId,
      username: user.username,
      ...postData,
      createdAt: new Date().toISOString(),
      replies: 0
    };
    setPosts(prev => [newPost, ...prev]);
  }, [user]);

  const saveAiIdea = useCallback((ideaData) => {
    const newIdea = {
      ideaId: Date.now().toString(),
      userId: user.userId,
      ...ideaData,
      createdAt: new Date().toISOString()
    };
    setAiIdeas(prev => [newIdea, ...prev]);
  }, [user]);

  const value = {
    user,
    communities,
    posts,
    aiIdeas,
    joinCommunity,
    leaveCommunity,
    createPost,
    saveAiIdea
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};