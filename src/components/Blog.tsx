import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Calendar, 
  Clock, 
  Tag, 
  User,
  MoreHorizontal,
  Save,
  X,
  ArrowRight,
  BookOpen,
  TrendingUp,
  MessageSquare,
  Heart,
  Share2,
  Bookmark,
  ChevronDown,
  Globe,
  Lock,
  Users,
  Send,
  Reply,
  ThumbsUp,
  Flag,
  Link,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  Check,
  Star
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { BlogPost, BlogComment } from '../types';
import { formatDate, getRelativeTime } from '../utils/dateUtils';

interface BlogProps {
  navigationParams?: {
    itemId?: string;
    itemType?: string;
    action?: string;
  };
  onNavigationComplete?: () => void;
}

const Blog: React.FC<BlogProps> = ({ navigationParams, onNavigationComplete }) => {
  const { state, dispatch } = useAppContext();
  const { users, currentUser, blogPosts } = state;
  const { t } = useLanguage();
  
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [showViewer, setShowViewer] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterTag, setFilterTag] = useState('all');
  const [sortBy, setSortBy] = useState('updated');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [editingComment, setEditingComment] = useState<string | null>(null);
  const [editCommentContent, setEditCommentContent] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Handle navigation to specific blog post
  useEffect(() => {
    if (navigationParams?.itemId && navigationParams?.itemType === 'blog') {
      const post = blogPosts.find(p => p.id === navigationParams.itemId);
      if (post) {
        viewPost(post);
      }
      onNavigationComplete?.();
    } else if (navigationParams?.action === 'create') {
      createPost();
      onNavigationComplete?.();
    }
  }, [navigationParams, blogPosts, onNavigationComplete]);

  // Get all unique tags
  const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)));

  // Filter and sort posts
  const filteredPosts = blogPosts
    .filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           post.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = filterStatus === 'all' || post.status === filterStatus;
      const matchesTag = filterTag === 'all' || post.tags.includes(filterTag);
      
      return matchesSearch && matchesStatus && matchesTag;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'created':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'updated':
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        case 'views':
          return b.views - a.views;
        case 'likes':
          return b.likes.length - a.likes.length;
        default:
          return 0;
      }
    });

  const createPost = () => {
    const newPost: BlogPost = {
      id: Date.now().toString(),
      title: t.blog.newPost,
      content: t.blog.articleContent,
      excerpt: '',
      status: 'draft',
      author: currentUser?.id || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: [],
      readTime: 1,
      views: 0,
      likes: [],
      comments: [],
      featured: false,
      visibility: 'team'
    };
    
    setSelectedPost(newPost);
    setIsCreating(true);
    setShowEditor(true);
  };

  const editPost = (post: BlogPost) => {
    setSelectedPost(post);
    setIsCreating(false);
    setShowEditor(true);
  };

  const viewPost = (post: BlogPost) => {
    // Increment view count
    const updatedPost = { ...post, views: post.views + 1 };
    dispatch({ type: 'UPDATE_BLOG_POST', payload: updatedPost });
    
    setSelectedPost(updatedPost);
    setShowViewer(true);
  };

  const savePost = () => {
    if (selectedPost) {
      const updatedPost = {
        ...selectedPost,
        updatedAt: new Date().toISOString(),
        readTime: Math.max(1, Math.ceil(selectedPost.content.split(' ').length / 200))
      };

      if (isCreating) {
        dispatch({ type: 'ADD_BLOG_POST', payload: updatedPost });
      } else {
        dispatch({ type: 'UPDATE_BLOG_POST', payload: updatedPost });
      }
      
      setShowEditor(false);
      setSelectedPost(null);
      setIsCreating(false);
      
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          id: Date.now().toString(),
          title: isCreating ? t.blog.postCreated : t.blog.postUpdated,
          message: `${t.blog.postMessage} "${selectedPost.title}" ${isCreating ? t.blog.hasBeenCreated : t.blog.hasBeenUpdated}`,
          type: 'success',
          isRead: false,
          createdAt: new Date().toISOString()
        }
      });
    }
  };

  const deletePost = (postId: string) => {
    const post = blogPosts.find(p => p.id === postId);
    dispatch({ type: 'DELETE_BLOG_POST', payload: postId });
    setActiveDropdown(null);
    
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        id: Date.now().toString(),
        title: t.blog.postDeleted,
        message: `${t.blog.postMessage} "${post?.title}" ${t.blog.hasBeenDeleted}`,
        type: 'success',
        isRead: false,
        createdAt: new Date().toISOString()
      }
    });
  };

  // Like system - one like per user per post
  const toggleLike = (postId: string) => {
    dispatch({ 
      type: 'TOGGLE_BLOG_LIKE',
      payload: { postId, userId: currentUser?.id || '' }
    });
  };

  const toggleFeatured = (postId: string) => {
    const post = blogPosts.find(p => p.id === postId);
    if (post) {
      const updatedPost = { ...post, featured: !post.featured };
      dispatch({ type: 'UPDATE_BLOG_POST', payload: updatedPost });
    }
    setActiveDropdown(null);
  };

  // Comment system - CORRIGÉ
  const addComment = () => {
    if (newComment.trim() && selectedPost) {
      const comment: BlogComment = {
        id: Date.now().toString(),
        postId: selectedPost.id,
        authorId: currentUser?.id || '',
        content: newComment,
        createdAt: new Date().toISOString(),
        likes: [],
        replies: []
      };
      
      // Mettre à jour le post avec le nouveau commentaire
      const updatedPost = {
        ...selectedPost,
        comments: [...selectedPost.comments, comment]
      };
      
      // Dispatch vers le context
      dispatch({ type: 'UPDATE_BLOG_POST', payload: updatedPost });
      
      // Mettre à jour l'état local
      setSelectedPost(updatedPost);
      setNewComment('');
      
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          id: Date.now().toString(),
          title: 'Commentaire ajouté',
          message: 'Votre commentaire a été ajouté avec succès',
          type: 'success',
          isRead: false,
          createdAt: new Date().toISOString()
        }
      });
    }
  };

  const addReply = (parentCommentId: string) => {
    if (replyContent.trim() && selectedPost) {
      const reply: BlogComment = {
        id: Date.now().toString(),
        postId: selectedPost.id,
        authorId: currentUser?.id || '',
        content: replyContent,
        createdAt: new Date().toISOString(),
        likes: [],
        replies: []
      };
      
      // Mettre à jour le post avec la nouvelle réponse
      const updatedPost = {
        ...selectedPost,
        comments: selectedPost.comments.map(comment =>
          comment.id === parentCommentId
            ? { ...comment, replies: [...comment.replies, reply] }
            : comment
        )
      };
      
      // Dispatch vers le context
      dispatch({ type: 'UPDATE_BLOG_POST', payload: updatedPost });
      
      // Mettre à jour l'état local
      setSelectedPost(updatedPost);
      setReplyingTo(null);
      setReplyContent('');
      
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          id: Date.now().toString(),
          title: 'Réponse ajoutée',
          message: 'Votre réponse a été ajoutée avec succès',
          type: 'success',
          isRead: false,
          createdAt: new Date().toISOString()
        }
      });
    }
  };

  const updateComment = (commentId: string) => {
    if (editCommentContent.trim() && selectedPost) {
      const updatedPost = {
        ...selectedPost,
        comments: selectedPost.comments.map(comment =>
          comment.id === commentId
            ? { ...comment, content: editCommentContent, updatedAt: new Date().toISOString() }
            : comment
        )
      };
      
      // Dispatch vers le context
      dispatch({ type: 'UPDATE_BLOG_POST', payload: updatedPost });
      
      // Mettre à jour l'état local
      setSelectedPost(updatedPost);
      setEditingComment(null);
      setEditCommentContent('');
      
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          id: Date.now().toString(),
          title: 'Commentaire modifié',
          message: 'Votre commentaire a été modifié avec succès',
          type: 'success',
          isRead: false,
          createdAt: new Date().toISOString()
        }
      });
    }
  };

  const deleteComment = (commentId: string) => {
    if (selectedPost) {
      const updatedPost = {
        ...selectedPost,
        comments: selectedPost.comments.filter(comment => comment.id !== commentId)
      };
      
      // Dispatch vers le context
      dispatch({ type: 'UPDATE_BLOG_POST', payload: updatedPost });
      
      // Mettre à jour l'état local
      setSelectedPost(updatedPost);
      
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          id: Date.now().toString(),
          title: 'Commentaire supprimé',
          message: 'Le commentaire a été supprimé avec succès',
          type: 'success',
          isRead: false,
          createdAt: new Date().toISOString()
        }
      });
    }
  };

  const deleteReply = (parentCommentId: string, replyId: string) => {
    if (selectedPost) {
      const updatedPost = {
        ...selectedPost,
        comments: selectedPost.comments.map(comment =>
          comment.id === parentCommentId
            ? { ...comment, replies: comment.replies.filter(reply => reply.id !== replyId) }
            : comment
        )
      };
      
      // Dispatch vers le context
      dispatch({ type: 'UPDATE_BLOG_POST', payload: updatedPost });
      
      // Mettre à jour l'état local
      setSelectedPost(updatedPost);
      
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          id: Date.now().toString(),
          title: 'Réponse supprimée',
          message: 'La réponse a été supprimée avec succès',
          type: 'success',
          isRead: false,
          createdAt: new Date().toISOString()
        }
      });
    }
  };

  const toggleCommentLike = (commentId: string) => {
    if (selectedPost) {
      const updatedPost = {
        ...selectedPost,
        comments: selectedPost.comments.map(comment =>
          comment.id === commentId
            ? {
                ...comment,
                likes: comment.likes.includes(currentUser?.id || '')
                  ? comment.likes.filter(id => id !== (currentUser?.id || ''))
                  : [...comment.likes, currentUser?.id || '']
              }
            : comment
        )
      };
      
      // Dispatch vers le context
      dispatch({ type: 'UPDATE_BLOG_POST', payload: updatedPost });
      
      // Mettre à jour l'état local
      setSelectedPost(updatedPost);
    }
  };

  const toggleReplyLike = (parentCommentId: string, replyId: string) => {
    if (selectedPost) {
      const updatedPost = {
        ...selectedPost,
        comments: selectedPost.comments.map(comment =>
          comment.id === parentCommentId
            ? {
                ...comment,
                replies: comment.replies.map(reply =>
                  reply.id === replyId
                    ? {
                        ...reply,
                        likes: reply.likes.includes(currentUser?.id || '')
                          ? reply.likes.filter(id => id !== (currentUser?.id || ''))
                          : [...reply.likes, currentUser?.id || '']
                      }
                    : reply
                )
              }
            : comment
        )
      };
      
      // Dispatch vers le context
      dispatch({ type: 'UPDATE_BLOG_POST', payload: updatedPost });
      
      // Mettre à jour l'état local
      setSelectedPost(updatedPost);
    }
  };

  // Share functionality
  const sharePost = (post: BlogPost) => {
    const url = `${window.location.origin}/blog/${post.id}`;
    setShareUrl(url);
    setSelectedPost(post);
    setShowShareModal(true);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const shareToSocial = (platform: string, post: BlogPost) => {
    const url = `${window.location.origin}/blog/${post.id}`;
    const text = `${post.title} - ${post.excerpt}`;
    
    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-700';
      case 'draft': return 'bg-orange-100 text-orange-700';
      case 'archived': return 'bg-slate-100 text-slate-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getVisibilityIcon = (visibility: string) => {
    switch (visibility) {
      case 'public': return Globe;
      case 'team': return Users;
      case 'private': return Lock;
      default: return Globe;
    }
  };

  const renderPostCard = (post: BlogPost) => {
    const author = users.find(u => u.id === post.author);
    const VisibilityIcon = getVisibilityIcon(post.visibility);
    const isLiked = post.likes.includes(currentUser?.id || '');

    return (
      <div key={post.id} className="bg-white rounded-xl border border-slate-200 hover:shadow-lg transition-all duration-300 overflow-hidden">
        {post.featured && (
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-medium px-3 py-1">
            {t.blog.featured}
          </div>
        )}
        
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 
                className="text-lg font-semibold text-slate-900 mb-2 cursor-pointer hover:text-blue-600 transition-colors line-clamp-2"
                onClick={() => viewPost(post)}
              >
                {post.title}
              </h3>
              <p className="text-slate-600 text-sm line-clamp-3 mb-3">{post.excerpt}</p>
            </div>
            
            <div className="relative ml-4">
              <button 
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveDropdown(activeDropdown === post.id ? null : post.id);
                }}
              >
                <MoreHorizontal className="w-4 h-4 text-slate-500" />
              </button>
              
              {/* Menu contextuel fonctionnel */}
              {activeDropdown === post.id && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-slate-200 py-2 z-10">
                  <button
                    onClick={() => {
                      editPost(post);
                      setActiveDropdown(null);
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                  >
                    <Edit className="w-4 h-4 mr-3" />
                    {t.blog.edit}
                  </button>
                  <button
                    onClick={() => {
                      sharePost(post);
                      setActiveDropdown(null);
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                  >
                    <Share2 className="w-4 h-4 mr-3" />
                    {t.blog.share}
                  </button>
                  <button
                    onClick={() => toggleFeatured(post.id)}
                    className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                  >
                    <Star className="w-4 h-4 mr-3" />
                    {post.featured ? 'Retirer de la vedette' : 'Mettre en vedette'}
                  </button>
                  <hr className="my-2" />
                  <button
                    onClick={() => deletePost(post.id)}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4 mr-3" />
                    {t.blog.delete}
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(post.status)}`}>
                {post.status === 'published' ? t.blog.statusPublished :
                 post.status === 'draft' ? t.blog.draft : t.blog.archived}
              </span>
              <div className="flex items-center space-x-1 text-slate-500">
                <VisibilityIcon className="w-3 h-3" />
                <span className="text-xs">
                  {post.visibility === 'public' ? 'Public' :
                   post.visibility === 'team' ? 'Équipe' : 'Privé'}
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 text-xs text-slate-500">
              <div className="flex items-center space-x-1">
                <Eye className="w-3 h-3" />
                <span>{post.views}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Heart className="w-3 h-3" />
                <span>{post.likes.length}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageSquare className="w-3 h-3" />
                <span>{post.comments.length}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              {author && (
                <>
                  <img src={author.avatar} alt={author.name} className="w-6 h-6 rounded-full object-cover" />
                  <span className="text-sm text-slate-600">{author.name}</span>
                </>
              )}
            </div>
            
            <div className="flex items-center space-x-4 text-xs text-slate-500">
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{post.readTime} min</span>
              </div>
              <span>{getRelativeTime(post.updatedAt)}</span>
            </div>
          </div>

          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {post.tags.slice(0, 3).map((tag, index) => (
                <span key={index} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span className="text-xs text-slate-500">+{post.tags.length - 3}</span>
              )}
            </div>
          )}

          <div className="flex items-center space-x-2">
            <button
              onClick={() => viewPost(post)}
              className="flex-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
            >
              {t.blog.readMore}
            </button>
            <button
              onClick={() => toggleLike(post.id)}
              className={`px-3 py-2 rounded-lg transition-colors ${
                isLiked 
                  ? 'bg-red-100 text-red-700' 
                  : 'bg-slate-100 text-slate-700 hover:bg-red-100 hover:text-red-700'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={() => sharePost(post)}
              className="px-3 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderPostList = (post: BlogPost) => {
    const author = users.find(u => u.id === post.author);
    const VisibilityIcon = getVisibilityIcon(post.visibility);
    const isLiked = post.likes.includes(currentUser?.id || '');

    return (
      <div key={post.id} className="bg-white rounded-xl border border-slate-200 hover:shadow-md transition-all duration-300 p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              {post.featured && (
                <span className="text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full font-medium">
                  ⭐ Vedette
                </span>
              )}
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(post.status)}`}>
                {post.status === 'published' ? t.blog.statusPublished :
                 post.status === 'draft' ? t.blog.draft : t.blog.archived}
              </span>
              <div className="flex items-center space-x-1 text-slate-500">
                <VisibilityIcon className="w-3 h-3" />
                <span className="text-xs">
                  {post.visibility === 'public' ? 'Public' :
                   post.visibility === 'team' ? 'Équipe' : 'Privé'}
                </span>
              </div>
            </div>

            <h3 
              className="text-lg font-semibold text-slate-900 mb-2 cursor-pointer hover:text-blue-600 transition-colors"
              onClick={() => viewPost(post)}
            >
              {post.title}
            </h3>
            
            <p className="text-slate-600 text-sm mb-3 line-clamp-2">{post.excerpt}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {author && (
                  <div className="flex items-center space-x-2">
                    <img src={author.avatar} alt={author.name} className="w-6 h-6 rounded-full object-cover" />
                    <span className="text-sm text-slate-600">{author.name}</span>
                  </div>
                )}
                
                <div className="flex items-center space-x-4 text-xs text-slate-500">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime} min</span>
                  </div>
                  <span>{getRelativeTime(post.updatedAt)}</span>
                </div>
              </div>

              <div className="flex items-center space-x-4 text-xs text-slate-500">
                <div className="flex items-center space-x-1">
                  <Eye className="w-3 h-3" />
                  <span>{post.views}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Heart className="w-3 h-3" />
                  <span>{post.likes.length}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageSquare className="w-3 h-3" />
                  <span>{post.comments.length}</span>
                </div>
              </div>
            </div>

            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-3">
                {post.tags.map((tag, index) => (
                  <span key={index} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2 ml-4">
            <button
              onClick={() => viewPost(post)}
              className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm"
            >
              {t.blog.read}
            </button>
            <button
              onClick={() => toggleLike(post.id)}
              className={`px-3 py-2 rounded-lg transition-colors ${
                isLiked 
                  ? 'bg-red-100 text-red-700' 
                  : 'bg-slate-100 text-slate-700 hover:bg-red-100 hover:text-red-700'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={() => sharePost(post)}
              className="px-3 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null);
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center space-x-3">
            <FileText className="w-8 h-8 text-blue-600" />
            <span>{t.blog.title}</span>
          </h1>
          <p className="text-slate-600 mt-1">Partagez vos connaissances et découvertes</p>
        </div>
        
        <button
          onClick={createPost}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>{t.blog.newArticle}</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">{t.blog.totalArticles}</p>
              <p className="text-2xl font-bold text-slate-900">{blogPosts.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <Eye className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">{t.blog.totalViews}</p>
              <p className="text-2xl font-bold text-slate-900">{blogPosts.reduce((sum, p) => sum + p.views, 0)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-red-100 rounded-lg">
              <Heart className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">{t.blog.totalLikes}</p>
              <p className="text-2xl font-bold text-slate-900">{blogPosts.reduce((sum, p) => sum + p.likes.length, 0)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-orange-100 rounded-lg">
              <MessageSquare className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">{t.blog.totalComments}</p>
              <p className="text-2xl font-bold text-slate-900">{blogPosts.reduce((sum, p) => sum + p.comments.length, 0)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder={t.blog.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">{t.status.allStatuses || 'Tous les statuts'}</option>
              <option value="published">{t.blog.statusPublished}</option>
              <option value="draft">{t.blog.statusDraft}</option>
              <option value="archived">{t.blog.statusArchived}</option>
            </select>

            <select
              value={filterTag}
              onChange={(e) => setFilterTag(e.target.value)}
              className="px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Tous les tags</option>
              {allTags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="updated">Dernière modification</option>
              <option value="created">Date de création</option>
              <option value="title">Titre</option>
              <option value="views">Vues</option>
              <option value="likes">Likes</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
              </div>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <div className="w-4 h-4 flex flex-col space-y-1">
                <div className="h-0.5 bg-current rounded"></div>
                <div className="h-0.5 bg-current rounded"></div>
                <div className="h-0.5 bg-current rounded"></div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Posts */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
        {filteredPosts.map(post => viewMode === 'grid' ? renderPostCard(post) : renderPostList(post))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">{t.blog.noPostsFound}</h3>
          <p className="text-slate-600 mb-4">{t.blog.noPostsFiltered}</p>
          <button
            onClick={createPost}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t.blog.createFirstPost}
          </button>
        </div>
      )}

      {/* Editor Modal */}
      {showEditor && selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h3 className="text-xl font-semibold text-slate-900">
                {isCreating ? t.blog.newArticle : t.blog.editArticle}
              </h3>
              <button
                onClick={() => setShowEditor(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
                {/* Editor */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Titre</label>
                    <input
                      type="text"
                      value={selectedPost.title}
                      onChange={(e) => setSelectedPost({ ...selectedPost, title: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Extrait</label>
                    <textarea
                      value={selectedPost.excerpt}
                      onChange={(e) => setSelectedPost({ ...selectedPost, excerpt: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={t.blog.articleSummary}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Statut</label>
                      <select
                        value={selectedPost.status}
                        onChange={(e) => setSelectedPost({ ...selectedPost, status: e.target.value as any })}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="draft">{t.blog.statusDraft}</option>
                        <option value="published">{t.blog.statusPublished}</option>
                        <option value="archived">{t.blog.statusArchived}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Visibilité</label>
                      <select
                        value={selectedPost.visibility}
                        onChange={(e) => setSelectedPost({ ...selectedPost, visibility: e.target.value as any })}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="public">Public</option>
                        <option value="team">Équipe</option>
                        <option value="private">Privé</option>
                      </select>
                    </div>

                    <div className="flex items-center space-x-2 pt-6">
                      <input
                        type="checkbox"
                        id="featured"
                        checked={selectedPost.featured}
                        onChange={(e) => setSelectedPost({ ...selectedPost, featured: e.target.checked })}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="featured" className="text-sm text-slate-700">En vedette</label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Tags (séparés par des virgules)</label>
                    <input
                      type="text"
                      value={selectedPost.tags.join(', ')}
                      onChange={(e) => setSelectedPost({ 
                        ...selectedPost, 
                        tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag) 
                      })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="IA, Guide, Productivité"
                    />
                  </div>

                  <div className="flex-1">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Contenu (Markdown)</label>
                    <textarea
                      value={selectedPost.content}
                      onChange={(e) => setSelectedPost({ ...selectedPost, content: e.target.value })}
                      className="w-full h-96 px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm resize-none"
                      placeholder={t.blog.articleContent}
                    />
                  </div>
                </div>

                {/* Preview */}
                <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                  <h4 className="font-medium text-slate-900 mb-4">{t.blog.preview}</h4>
                  <div className="bg-white rounded-lg p-6 h-full overflow-y-auto">
                    <h1 className="text-2xl font-bold text-slate-900 mb-4">{selectedPost.title}</h1>
                    {selectedPost.excerpt && (
                      <p className="text-slate-600 italic mb-6">{selectedPost.excerpt}</p>
                    )}
                    <div className="prose prose-slate max-w-none">
                      {selectedPost.content.split('\n').map((line, index) => {
                        if (line.startsWith('# ')) {
                          return <h1 key={index} className="text-xl font-bold mt-6 mb-3">{line.substring(2)}</h1>;
                        } else if (line.startsWith('## ')) {
                          return <h2 key={index} className="text-lg font-semibold mt-5 mb-2">{line.substring(3)}</h2>;
                        } else if (line.startsWith('### ')) {
                          return <h3 key={index} className="text-base font-medium mt-4 mb-2">{line.substring(4)}</h3>;
                        } else if (line.trim() === '') {
                          return <br key={index} />;
                        } else {
                          return <p key={index} className="mb-3">{line}</p>;
                        }
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-3 p-6 border-t border-slate-200">
              <button
                onClick={() => setShowEditor(false)}
                className="flex-1 px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={savePost}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>{isCreating ? t.blog.create : t.blog.save}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Viewer Modal */}
      {showViewer && selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <div className="flex items-center space-x-4">
                <h3 className="text-xl font-semibold text-slate-900">{selectedPost.title}</h3>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(selectedPost.status)}`}>
                  {selectedPost.status === 'published' ? t.blog.statusPublished :
                   selectedPost.status === 'draft' ? t.blog.draft : t.blog.archived}
                </span>
              </div>
              <button
                onClick={() => setShowViewer(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="max-w-3xl mx-auto">
                {selectedPost.excerpt && (
                  <p className="text-lg text-slate-600 italic mb-6">{selectedPost.excerpt}</p>
                )}

                <div className="flex items-center justify-between mb-6 text-sm text-slate-500">
                  <div className="flex items-center space-x-4">
                    {(() => {
                      const author = users.find(u => u.id === selectedPost.author);
                      return author ? (
                        <div className="flex items-center space-x-2">
                          <img src={author.avatar} alt={author.name} className="w-6 h-6 rounded-full object-cover" />
                          <span>{author.name}</span>
                        </div>
                      ) : null;
                    })()}
                    <span>{formatDate(selectedPost.createdAt)}</span>
                    <span>{selectedPost.readTime} min de lecture</span>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{selectedPost.views}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Heart className="w-4 h-4" />
                      <span>{selectedPost.likes.length}</span>
                    </div>
                  </div>
                </div>

                <div className="prose prose-slate max-w-none mb-8">
                  {selectedPost.content.split('\n').map((line, index) => {
                    if (line.startsWith('# ')) {
                      return <h1 key={index} className="text-2xl font-bold mt-8 mb-4">{line.substring(2)}</h1>;
                    } else if (line.startsWith('## ')) {
                      return <h2 key={index} className="text-xl font-semibold mt-6 mb-3">{line.substring(3)}</h2>;
                    } else if (line.startsWith('### ')) {
                      return <h3 key={index} className="text-lg font-medium mt-5 mb-2">{line.substring(4)}</h3>;
                    } else if (line.trim() === '') {
                      return <br key={index} />;
                    } else {
                      return <p key={index} className="mb-4 leading-relaxed">{line}</p>;
                    }
                  })}
                </div>

                {selectedPost.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-8 pt-6 border-t border-slate-200">
                    {selectedPost.tags.map((tag, index) => (
                      <span key={index} className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Comments Section */}
                <div className="border-t border-slate-200 pt-8">
                  <h4 className="text-lg font-semibold text-slate-900 mb-6">
                    Commentaires ({selectedPost.comments.length})
                  </h4>

                  {/* Add Comment */}
                  <div className="mb-6">
                    <div className="flex space-x-3">
                      <img
                        src={currentUser?.avatar || '/default-avatar.png'}
                        alt={currentUser?.name || 'User'}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <textarea
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          placeholder="Ajouter un commentaire..."
                          className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                          rows={3}
                        />
                        <div className="flex justify-end mt-2">
                          <button
                            onClick={addComment}
                            disabled={!newComment.trim()}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                          >
                            <Send className="w-4 h-4" />
                            <span>{t.blog.comment}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Comments List */}
                  <div className="space-y-6">
                    {selectedPost.comments.map((comment) => {
                      const author = users.find(u => u.id === comment.authorId);
                      const isLiked = comment.likes.includes(currentUser?.id || '');
                      const isOwner = comment.authorId === (currentUser?.id || '');

                      return (
                        <div key={comment.id} className="flex space-x-3">
                          <img
                            src={author?.avatar}
                            alt={author?.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="bg-slate-50 rounded-lg p-4">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-2">
                                  <span className="font-medium text-slate-900">{author?.name}</span>
                                  <span className="text-xs text-slate-500">{getRelativeTime(comment.createdAt)}</span>
                                  {comment.updatedAt && (
                                    <span className="text-xs text-slate-400">(modifié)</span>
                                  )}
                                </div>
                                {isOwner && (
                                  <div className="flex items-center space-x-2">
                                    <button
                                      onClick={() => {
                                        setEditingComment(comment.id);
                                        setEditCommentContent(comment.content);
                                      }}
                                      className="text-xs text-slate-500 hover:text-slate-700"
                                    >
                                      <Edit className="w-3 h-3" />
                                    </button>
                                    <button
                                      onClick={() => deleteComment(comment.id)}
                                      className="text-xs text-red-500 hover:text-red-700"
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </button>
                                  </div>
                                )}
                              </div>
                              
                              {editingComment === comment.id ? (
                                <div className="space-y-2">
                                  <textarea
                                    value={editCommentContent}
                                    onChange={(e) => setEditCommentContent(e.target.value)}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                    rows={3}
                                  />
                                  <div className="flex space-x-2">
                                    <button
                                      onClick={() => updateComment(comment.id)}
                                      className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition-colors"
                                    >
                                      Sauvegarder
                                    </button>
                                    <button
                                      onClick={() => {
                                        setEditingComment(null);
                                        setEditCommentContent('');
                                      }}
                                      className="px-3 py-1 bg-slate-200 text-slate-700 rounded text-xs hover:bg-slate-300 transition-colors"
                                    >
                                      Annuler
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <p className="text-slate-700">{comment.content}</p>
                              )}
                            </div>
                            
                            <div className="flex items-center space-x-4 mt-2">
                              <button
                                onClick={() => toggleCommentLike(comment.id)}
                                className={`flex items-center space-x-1 text-xs transition-colors ${
                                  isLiked ? 'text-red-600' : 'text-slate-500 hover:text-red-600'
                                }`}
                              >
                                <ThumbsUp className={`w-3 h-3 ${isLiked ? 'fill-current' : ''}`} />
                                <span>{comment.likes.length}</span>
                              </button>
                              
                              <button
                                onClick={() => {
                                  setReplyingTo(comment.id);
                                  setReplyContent('');
                                }}
                                className="text-xs text-slate-500 hover:text-slate-700 flex items-center space-x-1"
                              >
                                <Reply className="w-3 h-3" />
                                <span>Répondre</span>
                              </button>
                            </div>

                            {/* Reply Form */}
                            {replyingTo === comment.id && (
                              <div className="mt-3 ml-4">
                                <div className="flex space-x-2">
                                  <img
                                    src={currentUser?.avatar || '/default-avatar.png'}
                                    alt={currentUser?.name || 'User'}
                                    className="w-6 h-6 rounded-full object-cover"
                                  />
                                  <div className="flex-1">
                                    <textarea
                                      value={replyContent}
                                      onChange={(e) => setReplyContent(e.target.value)}
                                      placeholder="Votre réponse..."
                                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                                      rows={2}
                                    />
                                    <div className="flex space-x-2 mt-2">
                                      <button
                                        onClick={() => addReply(comment.id)}
                                        disabled={!replyContent.trim()}
                                        className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition-colors disabled:opacity-50"
                                      >
                                        Répondre
                                      </button>
                                      <button
                                        onClick={() => {
                                          setReplyingTo(null);
                                          setReplyContent('');
                                        }}
                                        className="px-3 py-1 bg-slate-200 text-slate-700 rounded text-xs hover:bg-slate-300 transition-colors"
                                      >
                                        Annuler
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Replies */}
                            {comment.replies.length > 0 && (
                              <div className="ml-4 mt-4 space-y-3">
                                {comment.replies.map((reply) => {
                                  const replyAuthor = users.find(u => u.id === reply.authorId);
                                  const isReplyLiked = reply.likes.includes(currentUser?.id || '');
                                  const isReplyOwner = reply.authorId === (currentUser?.id || '');

                                  return (
                                    <div key={reply.id} className="flex space-x-2">
                                      <img
                                        src={replyAuthor?.avatar}
                                        alt={replyAuthor?.name}
                                        className="w-6 h-6 rounded-full object-cover"
                                      />
                                      <div className="flex-1">
                                        <div className="bg-slate-50 rounded-lg p-3">
                                          <div className="flex items-center justify-between mb-1">
                                            <div className="flex items-center space-x-2">
                                              <span className="font-medium text-slate-900 text-sm">{replyAuthor?.name}</span>
                                              <span className="text-xs text-slate-500">{getRelativeTime(reply.createdAt)}</span>
                                            </div>
                                            {isReplyOwner && (
                                              <button
                                                onClick={() => deleteReply(comment.id, reply.id)}
                                                className="text-xs text-red-500 hover:text-red-700"
                                              >
                                                <Trash2 className="w-3 h-3" />
                                              </button>
                                            )}
                                          </div>
                                          <p className="text-slate-700 text-sm">{reply.content}</p>
                                        </div>
                                        <div className="flex items-center space-x-3 mt-1">
                                          <button
                                            onClick={() => toggleReplyLike(comment.id, reply.id)}
                                            className={`flex items-center space-x-1 text-xs transition-colors ${
                                              isReplyLiked ? 'text-red-600' : 'text-slate-500 hover:text-red-600'
                                            }`}
                                          >
                                            <ThumbsUp className={`w-3 h-3 ${isReplyLiked ? 'fill-current' : ''}`} />
                                            <span>{reply.likes.length}</span>
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-6 border-t border-slate-200">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => toggleLike(selectedPost.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    selectedPost.likes.includes(currentUser?.id || '')
                      ? 'bg-red-100 text-red-700'
                      : 'bg-slate-100 text-slate-700 hover:bg-red-100 hover:text-red-700'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${selectedPost.likes.includes(currentUser?.id || '') ? 'fill-current' : ''}`} />
                  <span>{t.blog.likes} ({selectedPost.likes.length})</span>
                </button>
                <button 
                  onClick={() => sharePost(selectedPost)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{t.blog.share}</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors">
                  <Bookmark className="w-4 h-4" />
                  <span>{t.blog.save}</span>
                </button>
              </div>
              
              <button
                onClick={() => {
                  setShowViewer(false);
                  editPost(selectedPost);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Edit className="w-4 h-4" />
                <span>{t.blog.edit}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-slate-900">{t.blog.shareArticle}</h3>
              <button
                onClick={() => {
                  setShowShareModal(false);
                  setCopied(false);
                }}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Lien de partage</label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={shareUrl}
                    readOnly
                    className="flex-1 px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 text-sm"
                  />
                  <button
                    onClick={() => copyToClipboard(shareUrl)}
                    className={`px-3 py-2 rounded-lg transition-colors ${
                      copied 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                    }`}
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">{t.blog.shareOnSocial}</label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => shareToSocial('twitter', selectedPost)}
                    className="flex items-center justify-center space-x-2 p-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                    <span className="text-sm">Twitter</span>
                  </button>
                  <button
                    onClick={() => shareToSocial('facebook', selectedPost)}
                    className="flex items-center justify-center space-x-2 p-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    <Facebook className="w-5 h-5" />
                    <span className="text-sm">Facebook</span>
                  </button>
                  <button
                    onClick={() => shareToSocial('linkedin', selectedPost)}
                    className="flex items-center justify-center space-x-2 p-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                    <span className="text-sm">LinkedIn</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;