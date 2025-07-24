import { motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl shadow-xl w-full max-w-md"
      >
        <div className="border-b p-4 flex justify-between items-center">
          <h3 className="text-xl font-bold">{title}</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes />
          </button>
        </div>
        <div className="p-4">
          {children}
        </div>
      </motion.div>
    </div>
  );
}