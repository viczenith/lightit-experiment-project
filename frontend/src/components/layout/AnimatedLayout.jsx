import { motion } from 'framer-motion';
import ParticleBackground from './ParticleBackground';

export default function AnimatedLayout({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen relative"
    >
      <ParticleBackground />
      <ScienceBackground />
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}