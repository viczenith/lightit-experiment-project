import { motion } from 'framer-motion';
import HeroSection from './HeroSection';
import CategoryExplorer from './CategoryExplorer';
import TrendingExperiments from './TrendingExperiments';
import ParticleBackground from '../../components/layout/ParticleBackground';
import ScienceBackground from '../../components/layout/ScienceBackground';

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <ScienceBackground />
      <ParticleBackground />
      
      <div className="container mx-auto px-4">
        <HeroSection />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <CategoryExplorer />
          <TrendingExperiments />
        </motion.div>
      </div>
      
      
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full opacity-20"
          style={{
            width: `${Math.random() * 100 + 50}px`,
            height: `${Math.random() * 100 + 50}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            background: i % 2 === 0 ? '#F72585' : '#4CC9F0',
            filter: 'blur(20px)',
          }}
          animate={{
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}