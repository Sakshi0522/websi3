import React, { createContext, useContext, useState, useEffect } from 'react';
import { BlogPost } from '../types/blog';

interface BlogContextType {
  posts: BlogPost[];
  addPost: (post: Omit<BlogPost, 'id'>) => void;
  updatePost: (id: string, post: Partial<BlogPost>) => void;
  deletePost: (id: string) => void;
  getPost: (id: string) => BlogPost | undefined;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

// Initial mock data
const initialPosts: BlogPost[] = [
  {
    id: '1',
    title: '5G Network Deployment: Challenges and Opportunities',
    excerpt: 'Exploring the key challenges and emerging opportunities in 5G network deployment for telecom operators.',
    content: `
      <h2>Introduction</h2>
      <p>The deployment of 5G networks represents one of the most significant technological advances in telecommunications. This comprehensive analysis explores the multifaceted challenges and unprecedented opportunities that telecom operators face in this transformative journey.</p>
      
      <h2>Key Challenges</h2>
      <p>Infrastructure requirements for 5G networks are substantially more complex than previous generations. The need for dense small cell deployments, fiber backhaul, and edge computing capabilities presents significant logistical and financial challenges.</p>
      
      <h2>Emerging Opportunities</h2>
      <p>Despite the challenges, 5G opens doors to revolutionary applications including IoT ecosystems, autonomous vehicles, and immersive AR/VR experiences that will reshape industries.</p>
      
      <h2>Conclusion</h2>
      <p>Success in 5G deployment requires strategic planning, substantial investment, and innovative approaches to network architecture and service delivery.</p>
    `,
    author: 'Sarah Chen',
    date: '2025-01-15',
    category: 'Telecommunications',
    tags: ['5G', 'Network Infrastructure', 'Telecom'],
    image: 'https://images.pexels.com/photos/5483077/pexels-photo-5483077.jpeg?auto=compress&cs=tinysrgb&w=600',
    readTime: '5 min read',
    published: true
  },
  {
    id: '2',
    title: 'GIS Solutions for Smart City Development',
    excerpt: 'How geospatial technologies are transforming urban planning and smart city initiatives worldwide.',
    content: `
      <h2>The Role of GIS in Smart Cities</h2>
      <p>Geographic Information Systems (GIS) serve as the backbone of modern smart city initiatives, providing the spatial intelligence needed for effective urban planning and management.</p>
      
      <h2>Key Applications</h2>
      <p>From traffic optimization to utility management, GIS technologies enable cities to make data-driven decisions that improve quality of life for residents while optimizing resource allocation.</p>
      
      <h2>Future Trends</h2>
      <p>The integration of AI and machine learning with GIS platforms is opening new possibilities for predictive analytics and automated urban management systems.</p>
    `,
    author: 'Michael Rodriguez',
    date: '2025-01-10',
    category: 'GIS & Geospatial',
    tags: ['Smart Cities', 'Urban Planning', 'GIS'],
    image: 'https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg?auto=compress&cs=tinysrgb&w=600',
    readTime: '7 min read',
    published: true
  }
];

export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    // Load posts from localStorage or use initial data
    const savedPosts = localStorage.getItem('blogPosts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      setPosts(initialPosts);
      localStorage.setItem('blogPosts', JSON.stringify(initialPosts));
    }
  }, []);

  const savePosts = (newPosts: BlogPost[]) => {
    setPosts(newPosts);
    localStorage.setItem('blogPosts', JSON.stringify(newPosts));
  };

  const addPost = (post: Omit<BlogPost, 'id'>) => {
    const newPost: BlogPost = {
      ...post,
      id: Date.now().toString(),
    };
    const newPosts = [newPost, ...posts];
    savePosts(newPosts);
  };

  const updatePost = (id: string, updatedPost: Partial<BlogPost>) => {
    const newPosts = posts.map(post =>
      post.id === id ? { ...post, ...updatedPost } : post
    );
    savePosts(newPosts);
  };

  const deletePost = (id: string) => {
    const newPosts = posts.filter(post => post.id !== id);
    savePosts(newPosts);
  };

  const getPost = (id: string) => {
    return posts.find(post => post.id === id);
  };

  const value: BlogContextType = {
    posts,
    addPost,
    updatePost,
    deletePost,
    getPost
  };

  return (
    <BlogContext.Provider value={value}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};