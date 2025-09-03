import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import CommunityCard from '../components/CommunityCard';
import PostCard from '../components/PostCard';
import Button from '../components/Button';
import Input from '../components/Input';
import Modal from '../components/Modal';
import { Plus, Search, Filter } from 'lucide-react';

const Communities = () => {
  const { communities, posts, createPost } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTopic, setFilterTopic] = useState('all');
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    communityId: ''
  });

  // Filter communities based on search and topic
  const filteredCommunities = communities.filter(community => {
    const matchesSearch = community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         community.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTopic = filterTopic === 'all' || community.topic === filterTopic;
    return matchesSearch && matchesTopic;
  });

  // Get unique topics for filter
  const topics = ['all', ...new Set(communities.map(c => c.topic))];

  // Get posts from joined communities
  const joinedCommunityIds = communities.filter(c => c.isJoined).map(c => c.communityId);
  const communityPosts = posts.filter(post => joinedCommunityIds.includes(post.communityId));

  const handleCreatePost = () => {
    if (newPost.title && newPost.content && newPost.communityId) {
      createPost(newPost);
      setNewPost({ title: '', content: '', communityId: '' });
      setIsCreatePostOpen(false);
    }
  };

  const joinedCommunities = communities.filter(c => c.isJoined);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">Communities</h1>
          <p className="text-textMuted">Discover and join niche communities that match your interests</p>
        </div>
        <Button
          variant="primary"
          onClick={() => setIsCreatePostOpen(true)}
          disabled={joinedCommunities.length === 0}
        >
          <Plus size={20} />
          <span className="ml-2">Create Post</span>
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-textMuted" size={20} />
          <input
            type="text"
            placeholder="Search communities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full bg-background border border-border rounded-lg text-text placeholder-textMuted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter size={20} className="text-textMuted" />
          <select
            value={filterTopic}
            onChange={(e) => setFilterTopic(e.target.value)}
            className="bg-background border border-border rounded-lg px-3 py-2 text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {topics.map(topic => (
              <option key={topic} value={topic}>
                {topic === 'all' ? 'All Topics' : topic}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Communities Grid */}
      <div>
        <h2 className="text-xl font-semibold text-text mb-4">
          All Communities ({filteredCommunities.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCommunities.map((community) => (
            <CommunityCard key={community.communityId} community={community} />
          ))}
        </div>
      </div>

      {/* Community Feed */}
      {communityPosts.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-text mb-4">Recent Posts</h2>
          <div className="space-y-4">
            {communityPosts.map((post) => (
              <PostCard key={post.postId} post={post} />
            ))}
          </div>
        </div>
      )}

      {/* Create Post Modal */}
      <Modal
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
        title="Create New Post"
        className="max-w-lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text mb-2">
              Community
            </label>
            <select
              value={newPost.communityId}
              onChange={(e) => setNewPost({ ...newPost, communityId: e.target.value })}
              className="w-full bg-background border border-border rounded-lg px-3 py-2 text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Select a community</option>
              {joinedCommunities.map(community => (
                <option key={community.communityId} value={community.communityId}>
                  {community.name}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Title"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            placeholder="Enter post title..."
          />

          <div>
            <label className="block text-sm font-medium text-text mb-2">
              Content
            </label>
            <textarea
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
              placeholder="What would you like to share..."
              rows={4}
              className="w-full bg-background border border-border rounded-lg px-3 py-2 text-text placeholder-textMuted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div className="flex space-x-3">
            <Button
              variant="secondary"
              onClick={() => setIsCreatePostOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleCreatePost}
              className="flex-1"
              disabled={!newPost.title || !newPost.content || !newPost.communityId}
            >
              Post
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Communities;