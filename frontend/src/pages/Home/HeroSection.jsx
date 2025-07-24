import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import scienceAnimation from '../../assets/lotties/science.json';
import AnimatedButton from '../../components/ui/AnimatedButton';
import { useNavigate } from 'react-router-dom';

export default function HeroSection() {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen flex items-center overflow-hidden">
      <div className="container mx-auto px-4 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-lab-black">
              Discover <span className="text-reaction-orange">Science</span> Fun!
            </h1>
            <p className="text-xl mb-8 text-gray-700 max-w-lg">
              Explore amazing experiments with videos, step-by-step guides, and interactive learning. 
            </p>
            <div className="flex gap-4">
              <AnimatedButton onClick={() => navigate('/experiments')}>
                Explore Experiments
              </AnimatedButton>
              <AnimatedButton 
                className="bg-white text-lab-purple border-2 border-lab-purple"
                onClick={() => navigate('/educator/dashboard')}
              >
                For Teachers
              </AnimatedButton>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <Lottie 
              animationData={scienceAnimation} 
              className="max-w-md" 
              loop={true} 
            />
          </motion.div>
        </div>
      </div>
      
      {/* Floating elements */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-16 h-16 bg-yellow-300 rounded-full blur-xl opacity-20"
        animate={{ 
          y: [0, -40, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
}


