import { motion } from 'framer-motion';
import { FaTrophy, FaChartLine, FaBook } from 'react-icons/fa';

export default function ProgressPage() {
  // Mock progress data
  const progressData = [
    {
      subject: "Physics",
      icon: <FaTrophy className="text-yellow-500" />,
      completed: 8,
      total: 12,
      percentage: 67
    },
    {
      subject: "Chemistry",
      icon: <FaBook className="text-blue-500" />,
      completed: 5,
      total: 10,
      percentage: 50
    },
    {
      subject: "Biology",
      icon: <FaChartLine className="text-green-500" />,
      completed: 3,
      total: 8,
      percentage: 38
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1 
        className="text-3xl font-bold mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        My Learning Progress
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {progressData.map((subject, index) => (
          <motion.div
            key={subject.subject}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center mb-4">
              <div className="text-2xl mr-3">
                {subject.icon}
              </div>
              <h2 className="text-xl font-bold">{subject.subject}</h2>
            </div>
            
            <div className="mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span>Progress: {subject.completed}/{subject.total}</span>
                <span>{subject.percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-science-blue h-2.5 rounded-full" 
                  style={{ width: `${subject.percentage}%` }}
                ></div>
              </div>
            </div>
            
            <button className="w-full mt-4 py-2 bg-science-blue/10 text-science-blue rounded-lg hover:bg-science-blue/20 transition">
              View Experiments
            </button>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl shadow-lg p-6"
      >
        <h2 className="text-xl font-bold mb-4">Achievements</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 mx-auto bg-yellow-100 rounded-full flex items-center justify-center text-yellow-500 mb-2">
                <FaTrophy className="text-2xl" />
              </div>
              <span className="text-sm">Achievement {index + 1}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}