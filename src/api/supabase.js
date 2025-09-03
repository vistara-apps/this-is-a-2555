import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase credentials missing. Using demo mode.');
}

export const supabase = createClient(
  supabaseUrl || 'https://example.supabase.co',
  supabaseKey || 'demo-key'
);

/**
 * Authentication API
 */

// Sign up a new user
export const signUp = async (email, password, username) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
      },
    });
    
    if (error) throw error;
    
    // Create user profile if signup successful
    if (data?.user) {
      await createUserProfile(data.user.id, username, email);
    }
    
    return { data, error: null };
  } catch (error) {
    console.error('Error signing up:', error);
    return { data: null, error };
  }
};

// Sign in existing user
export const signIn = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error signing in:', error);
    return { data: null, error };
  }
};

// Sign out
export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error signing out:', error);
    return { error };
  }
};

// Get current user
export const getCurrentUser = async () => {
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    
    // Get user profile data
    if (data?.user) {
      const profile = await getUserProfile(data.user.id);
      return { data: { ...data, profile }, error: null };
    }
    
    return { data, error: null };
  } catch (error) {
    console.error('Error getting current user:', error);
    return { data: null, error };
  }
};

/**
 * User Profiles API
 */

// Create user profile
export const createUserProfile = async (userId, username, email, bio = '', interests = []) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .insert([
        {
          user_id: userId,
          username,
          email,
          bio,
          interests,
          created_at: new Date().toISOString(),
        },
      ])
      .select();
    
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error creating user profile:', error);
    return { data: null, error };
  }
};

// Get user profile
export const getUserProfile = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error getting user profile:', error);
    return { data: null, error };
  }
};

// Update user profile
export const updateUserProfile = async (userId, updates) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('user_id', userId)
      .select();
    
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error updating user profile:', error);
    return { data: null, error };
  }
};

/**
 * Communities API
 */

// Get all communities
export const getCommunities = async (page = 1, limit = 10, searchQuery = '') => {
  try {
    let query = supabase
      .from('communities')
      .select('*', { count: 'exact' });
    
    // Add search functionality if query provided
    if (searchQuery) {
      query = query.or(`name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%,topic.ilike.%${searchQuery}%`);
    }
    
    // Add pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    
    const { data, error, count } = await query
      .order('created_at', { ascending: false })
      .range(from, to);
    
    if (error) throw error;
    return { data, count, error: null };
  } catch (error) {
    console.error('Error getting communities:', error);
    return { data: null, count: 0, error };
  }
};

// Get community by ID
export const getCommunityById = async (communityId) => {
  try {
    const { data, error } = await supabase
      .from('communities')
      .select('*')
      .eq('community_id', communityId)
      .single();
    
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error getting community:', error);
    return { data: null, error };
  }
};

// Create new community
export const createCommunity = async (userId, name, description, topic) => {
  try {
    const { data, error } = await supabase
      .from('communities')
      .insert([
        {
          creator_id: userId,
          name,
          description,
          topic,
          created_at: new Date().toISOString(),
        },
      ])
      .select();
    
    if (error) throw error;
    
    // Automatically join the creator to the community
    if (data?.[0]) {
      await joinCommunity(userId, data[0].community_id);
    }
    
    return { data, error: null };
  } catch (error) {
    console.error('Error creating community:', error);
    return { data: null, error };
  }
};

// Join community
export const joinCommunity = async (userId, communityId) => {
  try {
    const { data, error } = await supabase
      .from('community_members')
      .insert([
        {
          user_id: userId,
          community_id: communityId,
          joined_at: new Date().toISOString(),
        },
      ])
      .select();
    
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error joining community:', error);
    return { data: null, error };
  }
};

// Leave community
export const leaveCommunity = async (userId, communityId) => {
  try {
    const { data, error } = await supabase
      .from('community_members')
      .delete()
      .match({ user_id: userId, community_id: communityId });
    
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error leaving community:', error);
    return { data: null, error };
  }
};

// Check if user is member of community
export const checkCommunityMembership = async (userId, communityId) => {
  try {
    const { data, error } = await supabase
      .from('community_members')
      .select('*')
      .match({ user_id: userId, community_id: communityId })
      .single();
    
    if (error && error.code !== 'PGRST116') throw error; // PGRST116 is "no rows returned" error
    
    return { 
      isMember: !!data, 
      data, 
      error: null 
    };
  } catch (error) {
    console.error('Error checking community membership:', error);
    return { isMember: false, data: null, error };
  }
};

/**
 * Posts API
 */

// Get posts for a community
export const getCommunityPosts = async (communityId, page = 1, limit = 10) => {
  try {
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    
    const { data, error, count } = await supabase
      .from('posts')
      .select(`
        *,
        profiles:user_id(username),
        comments:comments(count)
      `, { count: 'exact' })
      .eq('community_id', communityId)
      .order('created_at', { ascending: false })
      .range(from, to);
    
    if (error) throw error;
    
    // Format the response
    const formattedData = data.map(post => ({
      ...post,
      username: post.profiles?.username,
      replies: post.comments?.[0]?.count || 0,
    }));
    
    return { data: formattedData, count, error: null };
  } catch (error) {
    console.error('Error getting community posts:', error);
    return { data: null, count: 0, error };
  }
};

// Create new post
export const createPost = async (userId, communityId, title, content) => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .insert([
        {
          user_id: userId,
          community_id: communityId,
          title,
          content,
          created_at: new Date().toISOString(),
        },
      ])
      .select();
    
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error creating post:', error);
    return { data: null, error };
  }
};

// Get post by ID with comments
export const getPostWithComments = async (postId, page = 1, limit = 20) => {
  try {
    // Get the post
    const { data: post, error: postError } = await supabase
      .from('posts')
      .select(`
        *,
        profiles:user_id(username)
      `)
      .eq('post_id', postId)
      .single();
    
    if (postError) throw postError;
    
    // Get comments with pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    
    const { data: comments, error: commentsError, count } = await supabase
      .from('comments')
      .select(`
        *,
        profiles:user_id(username)
      `, { count: 'exact' })
      .eq('post_id', postId)
      .order('created_at', { ascending: true })
      .range(from, to);
    
    if (commentsError) throw commentsError;
    
    // Format the response
    const formattedPost = {
      ...post,
      username: post.profiles?.username,
    };
    
    const formattedComments = comments.map(comment => ({
      ...comment,
      username: comment.profiles?.username,
    }));
    
    return { 
      data: { 
        post: formattedPost, 
        comments: formattedComments,
        commentCount: count
      }, 
      error: null 
    };
  } catch (error) {
    console.error('Error getting post with comments:', error);
    return { data: null, error };
  }
};

// Add comment to post
export const addComment = async (userId, postId, content) => {
  try {
    const { data, error } = await supabase
      .from('comments')
      .insert([
        {
          user_id: userId,
          post_id: postId,
          content,
          created_at: new Date().toISOString(),
        },
      ])
      .select();
    
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error adding comment:', error);
    return { data: null, error };
  }
};

/**
 * AI Ideas API
 */

// Save AI generated idea
export const saveAIIdea = async (userId, ideaData) => {
  try {
    const { data, error } = await supabase
      .from('ai_ideas')
      .insert([
        {
          user_id: userId,
          title: ideaData.title,
          description: ideaData.description,
          target_market: ideaData.targetMarket,
          features: ideaData.features,
          challenges: ideaData.challenges,
          next_steps: ideaData.nextSteps,
          validation_status: 'pending',
          created_at: new Date().toISOString(),
        },
      ])
      .select();
    
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error saving AI idea:', error);
    return { data: null, error };
  }
};

// Get user's AI ideas
export const getUserAIIdeas = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('ai_ideas')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error getting user AI ideas:', error);
    return { data: null, error };
  }
};

/**
 * Real-time subscriptions
 */

// Subscribe to new posts in a community
export const subscribeToNewPosts = (communityId, callback) => {
  return supabase
    .channel(`community-posts-${communityId}`)
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'posts',
      filter: `community_id=eq.${communityId}`,
    }, (payload) => {
      callback(payload.new);
    })
    .subscribe();
};

// Subscribe to new comments on a post
export const subscribeToNewComments = (postId, callback) => {
  return supabase
    .channel(`post-comments-${postId}`)
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'comments',
      filter: `post_id=eq.${postId}`,
    }, (payload) => {
      callback(payload.new);
    })
    .subscribe();
};

