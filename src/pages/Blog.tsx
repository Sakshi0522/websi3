import React, { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useBlog } from '../contexts/BlogContext';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';
import { BlogPost as BlogPostType } from '../types/blog';

// Interface for Modal props to fix the implicit 'any' type errors
interface ModalProps {
  show: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
}

// Custom Modal Component to replace native alert/confirm
const Modal: React.FC<ModalProps> = ({ show, title, message, onConfirm }) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900 bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full shadow-lg transform transition-all duration-300 scale-100">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">{message}</p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

const Blog: React.FC = () => {
  const { posts } = useBlog();
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '' });
  
  // Only show published posts
  const publishedPosts = posts.filter((post: BlogPostType) => post.published);

  const categories = [
    'All Posts',
    'Telecommunications',
    'GIS & Geospatial',
    'Infrastructure',
    'Training & Development',
    'Business Development'
  ];

  const [selectedCategory, setSelectedCategory] = useState('All Posts');

  const filteredPosts = selectedCategory === 'All Posts' 
    ? publishedPosts 
    : publishedPosts.filter((post: BlogPostType) => post.category === selectedCategory);

  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) {
      setModalContent({
        title: 'Error',
        message: 'Please enter a valid email address.'
      });
      setShowModal(true);
      return;
    }

    try {
        const response = await fetch('http://localhost:3001/api/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });
        const result = await response.json();

        if (response.ok) {
            setModalContent({
                title: 'Subscription Successful!',
                message: result.message
            });
        } else {
            setModalContent({
                title: 'Error',
                message: result.message || 'An unknown error occurred.'
            });
        }
    } catch (error) {
        setModalContent({
            title: 'Error',
            message: 'Failed to connect to the server. Please try again later.'
        });
    } finally {
        setShowModal(true);
        setEmail('');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 transition-colors duration-500">
      <Modal 
        show={showModal} 
        title={modalContent.title} 
        message={modalContent.message} 
        onConfirm={() => setShowModal(false)} 
      />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              News & Insights
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Stay updated with the latest industry trends, technology insights, 
              and company updates from our team of experts.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white dark:bg-gray-900 border-b dark:border-gray-700 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post: BlogPostType) => (
              <article key={post.id} className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden hover:shadow-xl dark:hover:shadow-lg transition-shadow group">
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <User className="h-4 w-4 mr-1" />
                    <span className="mr-4">{post.author}</span>
                    <Calendar className="h-4 w-4 mr-1" />
                    <span className="mr-4">{new Date(post.date).toLocaleDateString()}</span>
                    <span>{post.readTime}</span>
                  </div>
                  
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Tag className="h-4 w-4 text-gray-400" />
                      <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 2).map((tag, index) => (
                          <span key={index} className="text-xs text-blue-600 dark:text-blue-200 bg-blue-50 dark:bg-blue-800 px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <Link 
                      to={`/blog/${post.id}`}
                      className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-500 transition-colors flex items-center group"
                    >
                      Read More
                      <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 text-lg">No posts found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-blue-600 text-white dark:bg-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Stay Updated
          </h2>
          <p className="text-xl text-blue-100 dark:text-blue-200 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive the latest industry insights, 
            technology updates, and company news directly in your inbox.
          </p>
          
          <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-l-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-800 dark:text-white"
                required
              />
              <button
                type="submit"
                className="bg-orange-500 text-white px-6 py-3 rounded-r-lg font-semibold hover:bg-orange-600 transition-colors"
              >
                Subscribe
              </button>
            </div>
            <p className="text-blue-100 dark:text-blue-200 text-sm mt-2">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </form>
        </div>
      </section>

      {/* Recent Updates */}
      <section className="py-16 bg-white dark:bg-gray-900 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Company Updates
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Latest news and announcements from TechSolutions.
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                date: '2025-01-20',
                title: 'TechSolutions Expands Operations to New Markets',
                description: 'We\'re excited to announce our expansion into three new regional markets, bringing our technology solutions to more businesses.'
              },
              {
                date: '2025-01-15',
                title: 'Partnership with Leading Telecom Equipment Manufacturer',
                description: 'Strategic partnership announced to enhance our 5G infrastructure deployment capabilities and service offerings.'
              },
              {
                date: '2025-01-10',
                title: 'New GIS Training Center Opens',
                description: 'Our state-of-the-art training facility is now operational, offering advanced GIS and geospatial analytics courses.'
              }
            ].map((update, index) => (
              <div key={index} className="border-l-4 border-blue-600 dark:border-blue-400 pl-6 py-4">
                <div className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">
                  {new Date(update.date).toLocaleDateString()}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {update.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {update.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Have a Story to Share?
          </h2>
          <p className="text-xl text-gray-300 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            We'd love to hear about your technology challenges and success stories. 
            Contact us to explore collaboration opportunities or guest posting.
          </p>
          <Link
            to="/contact"
            className="bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors inline-flex items-center"
          >
            Get in Touch
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Blog;
