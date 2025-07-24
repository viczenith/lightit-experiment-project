import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaAtom, FaFlask, FaSeedling } from 'react-icons/fa';

export default function GradeSubjectExplorer() {
  const navigate = useNavigate();
  
  const grades = [7, 8, 9, 10, 11, 12];
  const subjects = [
    { id: 'physics', name: 'Physics', icon: <FaAtom className="text-3xl" /> },
    { id: 'chemistry', name: 'Chemistry', icon: <FaFlask className="text-3xl" /> },
    { id: 'biology', name: 'Biology', icon: <FaSeedling className="text-3xl" /> },
  ];

  const handleGradeSelect = (grade) => {
    navigate(`/experiments/grade/${grade}`);
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
          Explore Experiments
        </motion.h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Start by selecting your grade level
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
        {grades.map(grade => (
          <motion.button
            key={grade}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-science-blue text-white py-8 rounded-2xl shadow-xl font-bold text-xl"
            onClick={() => handleGradeSelect(grade)}
          >
            Grade {grade}
          </motion.button>
        ))}
      </div>
    </section>
  );
}