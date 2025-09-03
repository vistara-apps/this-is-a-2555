import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getCommunityById, getCommunityPosts, joinCommunity, leaveCommunity, checkCommunityMembership, subscribeToNewPosts } from '../api';
import Button from '../components/Button';
import PostCard from '../components/PostCard';
import { formatRelativeTime } from '../utils/formatters';

const CommunityDetail = () => {
  const { communityId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [community, setCommunity] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isMember, setIsMember] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalPosts, setTotalPosts] = useState(0);
  const [joining, setJoining] = useState(false);
  const [leaving, setLeaving] = useState(false);

  // Fetch community details and posts
  useEffect(() => {
    const fetchCommunityData = async () => {
      try {
        setLoading(true);
        
        // Get community details
        const { data: communityData, error: communityError } = await getCommunityById(communityId);
        
        if (communityError) throw communityError;
        
        setCommunity(communityData);
        
        // Check if user is a member
        const { isMember: membershipStatus } = await checkCommunityMembership(user.id, communityId);
        setIsMember(membershipStatus);
        
        // Get community posts
        const { data: postsData, count, error: postsError } = await getCommunityPosts(communityId, page, 10);
        
        if (postsError) throw postsError;
        
        setPosts(postsData);
        setTotalPosts(count);
        setHasMore(postsData.length < count);
      } catch (err) {
        console.error('Error fetching community data:', err);
        setError('Failed to load community. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (communityId && user) {
      fetchCommunityData();
    }
  }, [communityId, user, page]);

  // Subscribe to new posts
  useEffect(() => {
    if (!communityId) return;
    
    // Set up real-time subscription for new posts
    const subscription = subscribeToNewPosts(communityId, (newPost) => {
      setPosts(prev => [newPost, ...prev]);
      setTotalPosts(prev => prev + 1);
    });
    
    // Clean up subscription
    return () => {
      subscription.unsubscribe();
    };
  }, [communityId]);

  // Handle join community
  const handleJoin = async () => {
    try {
      setJoining(true);
      const { error } = await joinCommunity(user.id, communityId);
      
      if (error) throw error;
      
      setIsMember(true);
      setCommunity(prev => ({
        ...prev,
        memberCount: (prev.memberCount || 0) + 1
      }));
    } catch (err) {
      console.error('Error joining community:', err);
      setError('Failed to join community. Please try again.');
    } finally {
      setJoining(false);
    }
  };

  // Handle leave community
  const handleLeave = async () => {
    try {
      setLeaving(true);
      const { error } = await leaveCommunity(user.id, communityId);
      
      if (error) throw error;
      
      setIsMember(false);
      setCommunity(prev => ({
        ...prev,
        memberCount: Math.max((prev.memberCount || 0) - 1, 0)
      }));
    } catch (err) {
      console.error('Error leaving community:', err);
      setError('Failed to leave community. Please try again.');
    } finally {
      setLeaving(false);
    }
  };

  // Load more posts
  const loadMorePosts = () => {
    setPage(prev => prev + 1);
  };

  if (loading && !community) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 text-red-700 p-4 rounded-md">
          <p>{error}</p>
          <Button
            variant="secondary"
            className="mt-4"
            onClick={() => navigate('/communities')}
          >
            Back to Communities
          </Button>
        </div>
      </div>
    );
  }

  if (!community) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Community not found</h2>
          <Button
            variant="secondary"
            className="mt-4"
            onClick={() => navigate('/communities')}
          >
            Back to Communities
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Community header */}
      <div className="bg-surface rounded-lg shadow-soft p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-text">{community.name}</h1>
            <p className="text-muted mt-2">{community.description}</p>
            <div className="mt-2 flex items-center space-x-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                {community.topic}
              </span>
              <span className="text-sm text-muted">
                {community.memberCount || 0} members
              </span>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0 flex space-x-3">
            {isMember ? (
              <>
                <Button
                  variant="primary"
                  onClick={() => navigate(`/communities/${communityId}/posts/create`)}
                >
                  Create Post
                </Button>
                <Button
                  variant="secondary"
                  onClick={handleLeave}
                  disabled={leaving}
                >
                  {leaving ? 'Leaving...' : 'Leave Community'}
                </Button>
              </>
            ) : (
              <Button
                variant="primary"
                onClick={handleJoin}
                disabled={joining}
              >
                {joining ? 'Joining...' : 'Join Community'}
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {/* Posts section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Posts</h2>
          {isMember && (
            <Link to={`/communities/${communityId}/posts/create`}>
              <Button variant="primary">Create Post</Button>
            </Link>
          )}
        </div>
        
        {posts.length === 0 ? (
          <div className="bg-surface rounded-lg shadow-soft p-8 text-center">
            <p className="text-muted">No posts yet in this community.</p>
            {isMember && (
              <Link to={`/communities/${communityId}/posts/create`}>
                <Button variant="primary" className="mt-4">
                  Create the first post
                </Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map(post => (
              <PostCard
                key={post.postId}
                post={post}
                onClick={() => navigate(`/posts/${post.postId}`)}
              />
            ))}
            
            {hasMore && (
              <div className="text-center mt-8">
                <Button
                  variant="secondary"
                  onClick={loadMorePosts}
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Load More Posts'}
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityDetail;

