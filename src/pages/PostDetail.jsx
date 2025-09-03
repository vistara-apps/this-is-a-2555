import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getPostWithComments, addComment, subscribeToNewComments } from '../api';
import Button from '../components/Button';
import Input from '../components/Input';
import { formatRelativeTime } from '../utils/formatters';
import { validateCommentContent } from '../utils/validators';

const PostDetail = () => {
  const { postId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [commentError, setCommentError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalComments, setTotalComments] = useState(0);

  // Fetch post and comments
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        setLoading(true);
        
        const { data, error: fetchError } = await getPostWithComments(postId, page, 20);
        
        if (fetchError) throw fetchError;
        
        if (data) {
          setPost(data.post);
          
          // If first page, replace comments, otherwise append
          if (page === 1) {
            setComments(data.comments);
          } else {
            setComments(prev => [...prev, ...data.comments]);
          }
          
          setTotalComments(data.commentCount);
          setHasMore(data.comments.length < data.commentCount);
        }
      } catch (err) {
        console.error('Error fetching post data:', err);
        setError('Failed to load post. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchPostData();
    }
  }, [postId, page]);

  // Subscribe to new comments
  useEffect(() => {
    if (!postId) return;
    
    // Set up real-time subscription for new comments
    const subscription = subscribeToNewComments(postId, (newComment) => {
      setComments(prev => [newComment, ...prev]);
      setTotalComments(prev => prev + 1);
    });
    
    // Clean up subscription
    return () => {
      subscription.unsubscribe();
    };
  }, [postId]);

  // Handle comment submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    
    // Validate comment
    const validation = validateCommentContent(commentContent);
    if (!validation.isValid) {
      setCommentError(validation.message);
      return;
    }
    
    try {
      setSubmitting(true);
      setCommentError(null);
      
      const { data, error: submitError } = await addComment(user.id, postId, commentContent);
      
      if (submitError) throw submitError;
      
      // Clear comment input
      setCommentContent('');
      
      // Refresh comments (the new comment will come through the subscription)
    } catch (err) {
      console.error('Error submitting comment:', err);
      setCommentError('Failed to submit comment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Load more comments
  const loadMoreComments = () => {
    setPage(prev => prev + 1);
  };

  if (loading && !post) {
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
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Post not found</h2>
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
      {/* Post content */}
      <div className="bg-surface rounded-lg shadow-soft p-6 mb-8">
        <div className="mb-4">
          <Link 
            to={`/communities/${post.community_id}`}
            className="text-primary hover:underline text-sm"
          >
            Back to community
          </Link>
        </div>
        
        <h1 className="text-3xl font-bold text-text mb-4">{post.title}</h1>
        
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium">
            {post.username?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="ml-3">
            <p className="text-text font-medium">{post.username || 'Anonymous'}</p>
            <p className="text-muted text-sm">{formatRelativeTime(post.created_at)}</p>
          </div>
        </div>
        
        <div className="prose max-w-none">
          <p className="whitespace-pre-wrap">{post.content}</p>
        </div>
      </div>
      
      {/* Comment form */}
      <div className="bg-surface rounded-lg shadow-soft p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Add a comment</h2>
        
        <form onSubmit={handleCommentSubmit}>
          <div className="mb-4">
            <Input
              as="textarea"
              rows={4}
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              placeholder="Share your thoughts..."
              error={commentError}
            />
          </div>
          
          <Button
            type="submit"
            variant="primary"
            disabled={submitting}
          >
            {submitting ? 'Posting...' : 'Post Comment'}
          </Button>
        </form>
      </div>
      
      {/* Comments section */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">
          Comments ({totalComments})
        </h2>
        
        {comments.length === 0 ? (
          <div className="bg-surface rounded-lg shadow-soft p-8 text-center">
            <p className="text-muted">No comments yet. Be the first to comment!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {comments.map(comment => (
              <div key={comment.comment_id} className="bg-surface rounded-lg shadow-soft p-6">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium">
                    {comment.username?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div className="ml-3">
                    <p className="text-text font-medium">{comment.username || 'Anonymous'}</p>
                    <p className="text-muted text-xs">{formatRelativeTime(comment.created_at)}</p>
                  </div>
                </div>
                
                <div className="prose max-w-none">
                  <p className="whitespace-pre-wrap">{comment.content}</p>
                </div>
              </div>
            ))}
            
            {hasMore && (
              <div className="text-center mt-8">
                <Button
                  variant="secondary"
                  onClick={loadMoreComments}
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Load More Comments'}
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetail;

