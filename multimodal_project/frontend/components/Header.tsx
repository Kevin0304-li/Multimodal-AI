'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiMoon, FiSun, FiUser, FiLogOut } from 'react-icons/fi';
import { useStore } from '@/lib/store';

interface HeaderProps {
  activeRoute?: string;
}

const Header: React.FC<HeaderProps> = ({ activeRoute = 'dashboard' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Get user state from the store
  const { user, isAuthenticated, logout } = useStore();
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // TODO: Implement actual dark mode toggle with system preference detection
  };
  
  // Navigation links
  const navLinks = [
    { name: 'Dashboard', href: '/dashboard', active: activeRoute === 'dashboard' },
    { name: 'Features', href: '/features', active: activeRoute === 'features' },
    { name: 'Documentation', href: '/docs', active: activeRoute === 'docs' },
  ];
  
  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm">
      <div className="responsive-container py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-display font-bold gradient-text">
          NextGen Multimodal AI
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <nav className="flex space-x-6">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href} 
                className={`${
                  link.active 
                    ? 'text-gray-900 dark:text-white font-medium' 
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button 
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>
            
            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button 
                  className="flex items-center space-x-2"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                >
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                    {user?.name?.charAt(0) || <FiUser />}
                  </div>
                  <span className="text-gray-800 dark:text-gray-200 font-medium hidden lg:block">
                    {user?.name || 'User'}
                  </span>
                </button>
                
                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div 
                      className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden z-10"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                        <p className="font-medium">{user?.name || 'User'}</p>
                        <p className="text-sm text-gray-500 truncate">{user?.email || 'user@example.com'}</p>
                      </div>
                      <div className="p-2">
                        <button 
                          className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md flex items-center"
                          onClick={logout}
                        >
                          <FiLogOut className="mr-2" />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link href="/login" className="btn btn-primary">
                Sign In
              </Link>
            )}
          </div>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          <button 
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>
          
          <button 
            className="text-gray-600 dark:text-gray-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="md:hidden bg-white dark:bg-gray-900 shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="responsive-container py-4 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  href={link.href} 
                  className={`${
                    link.active 
                      ? 'text-gray-900 dark:text-white font-medium' 
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              
              {isAuthenticated ? (
                <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                      {user?.name?.charAt(0) || <FiUser />}
                    </div>
                    <span className="text-gray-800 dark:text-gray-200 font-medium">
                      {user?.name || 'User'}
                    </span>
                  </div>
                  <button 
                    className="w-full text-left py-2 text-red-600 flex items-center"
                    onClick={logout}
                  >
                    <FiLogOut className="mr-2" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link 
                  href="/login" 
                  className="btn btn-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header; 