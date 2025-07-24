import { motion } from 'framer-motion';

export default function GradientCard({ children, from, to, className = '' }) {
  const gradient = from && to 
    ? `bg-gradient-to-br ${from} ${to}`
    : 'bg-gradient-to-br from-science-blue to-lab-purple';
    
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      className={`${gradient} rounded-2xl shadow-xl overflow-hidden ${className}`}
    >
      <div className="bg-white/10 backdrop-blur-sm p-6 h-full">
        {children}
      </div>
    </motion.div>
  );
}