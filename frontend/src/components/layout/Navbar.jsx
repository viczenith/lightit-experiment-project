import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFlask, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import AnimatedButton from '../ui/AnimatedButton';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <motion.div 
            animate={{ rotate: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="mr-2"
          >
            <FaFlask className="text-2xl text-science-blue" />
          </motion.div>
          <span className="text-xl font-bold" style={{ fontFamily: 'Comic Neue' }}>
            Light<span className="text-reaction-orange">it</span>
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link 
            to="/experiments" 
            className={`font-medium ${
              isActive('/experiments') 
                ? 'text-science-blue' 
                : 'text-gray-700 hover:text-science-blue'
            }`}
          >
            Experiments
          </Link>
          
          {user?.role === 'educator' && (
            <Link 
              to="/educator/upload" 
              className={`font-medium ${
                  isActive('/educator/upload') 
                    ? 'text-science-blue' 
                    : 'text-gray-700 hover:text-science-blue'
              }`}
            >
              Upload
            </Link>
          )}
          
          {user?.role === 'admin' && (
            <Link 
              to="/admin/dashboard" 
              className={`font-medium ${
                isActive('/admin/dashboard') 
                  ? 'text-science-blue' 
                  : 'text-gray-700 hover:text-science-blue'
              }`}
            >
              Admin
            </Link>
          )}
          
          <Link 
            to="/virtual-lab" 
            className={`font-medium ${
              isActive('/virtual-lab') 
                ? 'text-science-blue' 
                : 'text-gray-700 hover:text-science-blue'
            }`}
          >
            Virtual Lab
          </Link>
        </div>
        
        {/* Auth Section */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <div className="flex items-center">
              <div className="mr-3 flex items-center">
                <div className="w-8 h-8 rounded-full bg-science-blue flex items-center justify-center text-white">
                  <FaUser />
                </div>
                <span className="ml-2 font-medium">{user.name}</span>
              </div>
              <AnimatedButton 
                onClick={logout}
                className="bg-gray-100 text-gray-800 hover:bg-gray-200"
              >
                Logout
              </AnimatedButton>
            </div>
          ) : (
            <>
              <Link to="/login">
                <AnimatedButton className="bg-gray-100 text-gray-800 hover:bg-gray-200">
                  Login
                </AnimatedButton>
              </Link>
              <Link to="/register">
                <AnimatedButton>
                  Register
                </AnimatedButton>
              </Link>
            </>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700 z-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0
        }}
        className="md:hidden bg-white overflow-hidden"
      >
        <div className="container mx-auto px-4 py-6 flex flex-col space-y-4">
          <Link 
            to="/experiments" 
            className="font-medium"
            onClick={() => setIsOpen(false)}
          >
            Experiments
          </Link>
          
          {user?.role === 'educator' && (
            <Link 
              to="/upload" 
              className="font-medium"
              onClick={() => setIsOpen(false)}
            >
              Upload
            </Link>
          )}
          
          {user?.role === 'admin' && (
            <Link 
              to="/admin" 
              className="font-medium"
              onClick={() => setIsOpen(false)}
            >
              Admin
            </Link>
          )}
          
          <Link 
            to="/virtual-lab" 
            className="font-medium"
            onClick={() => setIsOpen(false)}
          >
            Virtual Lab
          </Link>
          
          <div className="pt-4 border-t border-gray-200">
            {user ? (
              <div className="flex flex-col space-y-3">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-science-blue flex items-center justify-center text-white">
                    <FaUser />
                  </div>
                  <span className="ml-2 font-medium">{user.name}</span>
                </div>
                <AnimatedButton 
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="w-full"
                >
                  Logout
                </AnimatedButton>
              </div>
            ) : (
              <div className="flex flex-col space-y-3">
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <AnimatedButton className="w-full bg-gray-100 text-gray-800 hover:bg-gray-200">
                    Login
                  </AnimatedButton>
                </Link>
                <Link to="/register" onClick={() => setIsOpen(false)}>
                  <AnimatedButton className="w-full">
                    Register
                  </AnimatedButton>
                </Link>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
}