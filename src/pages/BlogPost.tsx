import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { useBlog } from '../contexts/BlogContext';
import { Calendar, User, Tag, ArrowLeft, Clock } from 'lucide-react';
import { BlogPost as BlogPostType } from '../types/blog';

const BlogPost: React.FC = () => {
  const { id } = useParams();
  const { getPost } = useBlog();
  
  const post = id ? getPost(id) : null;

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  // Don't show unpublished posts to public
  if (!post.published) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-96 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
            <Link
              to="/blog"
              className="inline-flex items-center space-x-2 text-white hover:text-gray-200 mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Blog</span>
            </Link>
            
            <div className="mb-4">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {post.category}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              {post.title}
            </h1>
            
            <p className="text-xl text-blue-100 mb-6 max-w-3xl">
              {post.excerpt}
            </p>
            
            <div className="flex items-center space-x-6 text-gray-200">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-gray-900 dark:text-gray-200">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2 mb-4">
              <Tag className="h-5 w-5 text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Tags:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Author Info */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {post.author}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Technology Writer & Industry Expert
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <Link
              to="/blog"
              className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to All Posts</span>
            </Link>
            
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Published on {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts CTA */}
      <section className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Explore More Articles
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Discover more insights and industry updates on our blog.
          </p>
          <Link
            to="/blog"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
          >
            <span>View All Posts</span>
            <ArrowLeft className="h-4 w-4 rotate-180" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;