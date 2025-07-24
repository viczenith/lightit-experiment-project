import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaStar } from 'react-icons/fa';

export default function RatingSystem() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  
  return (
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <motion.label
            key={index}
            whileHover={{ scale: 1.2 }}
          >
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
              className="hidden"
            />
            <FaStar
              className="cursor-pointer"
              size={24}
              color={ratingValue <= (hover || rating) ? "#FFD700" : "#E5E7EB"}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(0)}
            />
          </motion.label>
        );
      })}
      <span className="ml-2 text-gray-600">{rating > 0 ? `${rating}/5` : 'Rate'}</span>
    </div>
  );
}