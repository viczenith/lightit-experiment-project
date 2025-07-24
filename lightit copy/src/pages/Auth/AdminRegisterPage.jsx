import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import FloatingInput from '../../components/ui/FloatingInput';
import AnimatedButton from '../../components/ui/AnimatedButton';
import ParticleBackground from '../../components/layout/ParticleBackground';
import { useAuth } from '../../context/AuthContext';

export default function AdminRegisterPage() {
  const { registerAdmin } = useAuth();
  const [formData, setFormData] = useState({ 
    name: '',
    email: '', 
    password: '',
    adminCode: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    
    try {
      if (formData.adminCode !== 'ADMIN_SECRET') {
        throw new Error('Invalid admin code');
      }
      
      await registerAdmin(formData);
    } catch (error) {
      setErrors({ general: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <ParticleBackground />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md p-8 bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl z-10"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Admin Registration</h2>
          <p className="text-gray-600 mt-2">Create admin account</p>
        </div>
        
        {errors.general && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {errors.general}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <FloatingInput
            label="Full Name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
          />
          
          <FloatingInput
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          
          <FloatingInput
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
          />
          
          <FloatingInput
            label="Admin Secret Code"
            name="adminCode"
            type="password"
            value={formData.adminCode}
            onChange={handleChange}
            required
          />
          
          <AnimatedButton 
            type="submit"
            className="w-full justify-center"
            loading={isLoading}
          >
            Register Admin
          </AnimatedButton>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-science-blue font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}