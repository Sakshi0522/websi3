import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { BlogProvider } from './contexts/BlogContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Industries from './pages/Industries';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import Chatbot from './components/Chatbot';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import BlogPost from './pages/BlogPost';
import AdminDashboard from './pages/AdminDashboard';
import PostEditor from './pages/PostEditor';

function App() {
  return (
    <AuthProvider>
      <BlogProvider>
        <Router>
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/industries" element={<Industries />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute requireAdmin>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/new-post"
                element={
                  <ProtectedRoute requireAdmin>
                    <PostEditor />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/edit-post/:id"
                element={
                  <ProtectedRoute requireAdmin>
                    <PostEditor />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
            <Chatbot />
          </div>
        </Router>
      </BlogProvider>
    </AuthProvider>
  );
}

export default App;