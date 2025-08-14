import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, LogOut, User, Settings } from 'lucide-react';
import logo from '../assets/logo.png';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();
  const { isAuthenticated, isAdmin, user, logout } = useAuth(); // Use the new auth hook

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.add(savedTheme);
    } else if (prefersDark) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    setScrollProgress(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      setTheme('dark');
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Industries', href: '/industries' },
    { name: 'Contact', href: '/contact' },
    { name: 'Blog', href: '/blog' },
  ];
  
  // Conditionally add Admin link if user is an admin
  if (isAdmin) {
    navigation.splice(5, 0, { name: 'Admin', href: '/admin' });
  }

  const isActive = (href: string) => location.pathname === href;

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md transition-colors duration-500">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo and company name - Left side */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="Digital Indian Logo" className="h-10 w-auto" />
            <div className="flex flex-col flex-shrink-0">
              <span className="text-xl font-bold">
                <span className="text-orange-500">DIGITAL</span>
                <span className="text-green-500 ml-1">INDIAN</span>
              </span>
              <span className="text-xs text-gray-900 dark:text-gray-200 font-medium">Transforming New India</span>
              <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">www.digitalindian.co.in</span>
            </div>
          </Link>

          {/* Desktop Navigation Links and controls - Right side */}
          <div className="hidden lg:flex items-center space-x-6">
            <nav className="flex space-x-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600'
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            
            {!isAuthenticated ? (
              <Link
                to="/contact"
                className="bg-orange-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors"
              >
                Get Quote
              </Link>
            ) : (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
                  <User className="h-4 w-4" />
                  <span>{user?.username}</span>
                  {isAdmin && (
                    <span className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-xs">
                      Admin
                    </span>
                  )}
                </div>
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}

            <button
              onClick={toggleTheme}
              className={`relative flex items-center justify-center w-12 h-12 rounded-full 
                          bg-gray-100 dark:bg-gray-800 transition-colors duration-500
                          shadow-md dark:shadow-md
                          group focus:outline-none`}
              style={{
                background: `conic-gradient(from 0deg, #3B82F6 ${scrollProgress}%, ${theme === 'dark' ? '#212429' : '#e0e0e0'} 0%)`,
              }}
            >
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full 
                            bg-white dark:bg-gray-900 transition-colors duration-500
                            shadow-inner dark:shadow-inner`}>
                {theme === 'dark' ? <Moon className="h-6 w-6 text-gray-400" /> : <Sun className="h-6 w-6 text-gray-700" />}
              </div>
            </button>
          </div>

          {/* Mobile menu toggle and theme button - Right side on mobile */}
          <div className="md:flex lg:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className={`relative flex items-center justify-center w-12 h-12 rounded-full 
                          bg-gray-100 dark:bg-gray-800 transition-colors duration-500
                          shadow-md dark:shadow-md
                          group focus:outline-none`}
              style={{
                background: `conic-gradient(from 0deg, #3B82F6 ${scrollProgress}%, ${theme === 'dark' ? '#212429' : '#e0e0e0'} 0%)`,
              }}
            >
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full 
                            bg-white dark:bg-gray-900 transition-colors duration-500
                            shadow-inner dark:shadow-inner`}>
                {theme === 'dark' ? <Moon className="h-6 w-6 text-gray-400" /> : <Sun className="h-6 w-6 text-gray-700" />}
              </div>
            </button>
            <button
              className="p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Shown when isMenuOpen is true */}
        {isMenuOpen && (
          <div className="lg:hidden pb-4">
            <div className="flex flex-col items-center mb-4">
              <span className="text-xl font-bold dark:text-white">
                <span className="text-orange-500">DIGITAL</span>
                <span className="text-green-500 ml-1">INDIAN</span>
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-300 font-medium mt-1">transforming new india</span>
              <span className="text-sm text-blue-600 dark:text-blue-400 font-medium mt-1">www.digitalindian.co.in</span>
            </div>
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`font-medium px-4 py-2 rounded transition-colors ${
                    isActive(item.href)
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-gray-700'
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/contact"
                className="bg-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors mx-4 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Quote
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;