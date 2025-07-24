import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaHeart, FaRegHeart, FaThumbsUp, FaRegThumbsUp, FaLaugh, FaRegLaugh } from 'react-icons/fa';

export default function ReactionSystem() {
  const [reaction, setReaction] = useState(null);
  
  const reactions = [
    { type: 'like', icon: reaction === 'like' ? <FaThumbsUp /> : <FaRegThumbsUp />, label: 'Like' },
    { type: 'love', icon: reaction === 'love' ? <FaHeart className="text-red-500" /> : <FaRegHeart />, label: 'Love' },
    { type: 'funny', icon: reaction === 'funny' ? <FaLaugh className="text-yellow-500" /> : <FaRegLaugh />, label: 'Funny' }
  ];

  return (
    <div className="flex items-center">
      <span className="mr-2 text-gray-600">React:</span>
      <div className="flex space-x-2">
        {reactions.map(({ type, icon, label }) => (
          <motion.button
            key={type}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className={`p-2 rounded-full ${
              reaction === type 
                ? 'bg-science-blue/20 text-science-blue' 
                : 'bg-gray-100 text-gray-600'
            }`}
            onClick={() => setReaction(reaction === type ? null : type)}
            aria-label={label}
          >
            {icon}
          </motion.button>
        ))}
      </div>
    </div>
  );
}