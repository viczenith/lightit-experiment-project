import { motion } from 'framer-motion';

export default function AnimatedButton({ children, onClick }) {
  return (
    <motion.button
      className="px-6 py-3 bg-science-blue rounded-full text-white font-bold text-lg shadow-lg"
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0px 5px 15px rgba(76, 201, 240, 0.4)",
        rotate: [0, -5, 5, 0]
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ 
        type: "tween", 
        duration: 0.6,
        ease: "easeInOut"
      }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}
