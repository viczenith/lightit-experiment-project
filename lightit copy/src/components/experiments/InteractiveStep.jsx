import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

export default function InteractiveStep({ stepNumber, title, content }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <motion.div 
      className="border border-gray-200 rounded-xl overflow-hidden"
      whileHover={{ boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
    >
      <button
        className="w-full flex justify-between items-center p-4 bg-gray-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-science-blue text-white flex items-center justify-center mr-3">
            {stepNumber}
          </div>
          <h3 className="text-lg font-bold">{title}</h3>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
        >
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 bg-white">
              {Array.isArray(content) ? (
                <ul className="space-y-2">
                  {content.map((item, index) => (
                    <li key={index} className="flex">
                      <span className="mr-2">•</span> 
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>{content}</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}