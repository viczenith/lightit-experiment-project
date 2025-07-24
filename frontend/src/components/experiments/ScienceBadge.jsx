import { motion } from 'framer-motion';
import { subjectColors } from '../../utils/scienceIcons';



const gradeColors = {
  7: 'bg-purple-200 text-purple-800',
  8: 'bg-blue-200 text-blue-800',
  9: 'bg-green-200 text-green-800',
  10: 'bg-yellow-200 text-yellow-800',
  11: 'bg-orange-200 text-orange-800',
  12: 'bg-red-200 text-red-800'
};

export default function ScienceBadge({ type, value }) {
  const colors = type === 'subject' ? subjectColors : gradeColors;
  const bgColor = colors[value] || 'bg-gray-200 text-gray-800';
  
  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      className={`px-3 py-1 rounded-full text-sm font-medium ${bgColor}`}
    >
      {type === 'subject' ? value : `Grade ${value}`}
    </motion.span>
  );
}