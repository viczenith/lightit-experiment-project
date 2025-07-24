import { motion } from 'framer-motion';
import { FaAtom, FaFlask, FaSeedling } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function CategoryExplorer() {
  const navigate = useNavigate();
  
  const categories = [
    { id: 'physics', name: 'Physics', icon: <FaAtom className="text-3xl" />, color: 'bg-science-blue' },
    { id: 'chemistry', name: 'Chemistry', icon: <FaFlask className="text-3xl" />, color: 'bg-science-blue' },
    { id: 'biology', name: 'Biology', icon: <FaSeedling className="text-3xl" />, color: 'bg-science-blue' },
  ];

  const grades = [7, 8, 9, 10, 11, 12];

  // Handle category filter
  const handleCategoryClick = (subject) => {
    navigate(`/experiments?subject=${encodeURIComponent(subject)}`);
  };

  // Handle grade filter within category
  const handleGradeClick = (subject, grade) => {
    navigate(`/experiments?subject=${encodeURIComponent(subject)}&grade=${grade}`);
  };

  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <motion.h2 
          className="text-4xl font-bold mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Explore by Category
        </motion.h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover experiments tailored to your grade level and subject
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            className={`${category.color} rounded-2xl p-6 text-white shadow-xl cursor-pointer`} // Added cursor pointer
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => handleCategoryClick(category.name)}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleCategoryClick(category.name);
              }
            }}
            aria-label={`Explore ${category.name} experiments`}
          >
            <div className="flex items-center mb-4">
              <div className="mr-4 bg-white/20 p-3 rounded-full">
                {category.icon}
              </div>
              <h3 className="text-2xl font-bold">{category.name}</h3>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {grades.map(grade => (
                <motion.button
                  key={grade}
                  className="bg-white/20 py-2 rounded-lg hover:bg-white/30 transition focus:outline-none"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleGradeClick(category.name, grade);
                  }}
                  aria-label={`Filter ${category.name} experiments for grade ${grade}`}
                >
                  Grade {grade}
                </motion.button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}