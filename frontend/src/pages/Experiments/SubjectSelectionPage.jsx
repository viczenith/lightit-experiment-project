  import { useParams, useNavigate } from 'react-router-dom';
  import { motion } from 'framer-motion';
  import { FaAtom, FaFlask, FaSeedling } from 'react-icons/fa';

  export default function SubjectSelectionPage() {
    const { grade } = useParams();
    const navigate = useNavigate();
    
    const subjects = [
      { id: 'physics', name: 'Physics', icon: <FaAtom className="text-3xl" />, color: 'bg-science-blue' },
      { id: 'chemistry', name: 'Chemistry', icon: <FaFlask className="text-3xl" />, color: 'bg-reaction-orange' },
      { id: 'biology', name: 'Biology', icon: <FaSeedling className="text-3xl" />, color: 'bg-element-green' },
    ];

    const handleSubjectSelect = (subject) => {
      navigate(`/experiments/grade/${grade}/subject/${subject}`);
    };

    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Choose Subject for Grade {grade}
          </motion.h2>
          <p className="text-xl text-gray-600">
            Select a subject to view experiments
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {subjects.map((subject, index) => (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className={`${subject.color} rounded-2xl p-8 text-white shadow-xl cursor-pointer text-center`}
              onClick={() => handleSubjectSelect(subject.id)}
            >
              <div className="flex justify-center mb-4">
                <div className="bg-white/20 p-4 rounded-full">
                  {subject.icon}
                </div>
              </div>
              <h3 className="text-2xl font-bold">{subject.name}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

