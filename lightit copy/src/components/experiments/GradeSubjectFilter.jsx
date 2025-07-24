import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { subjectColors } from '../../utils/scienceIcons';

export default function GradeSubjectFilter({ currentGrade, currentSubject }) {
  const navigate = useNavigate();
  const grades = [7, 8, 9, 10, 11, 12];
  const subjects = ['Physics', 'Chemistry', 'Biology'];

  const handleFilter = (type, value) => {
    const params = new URLSearchParams();
    if (type === 'grade') {
      if (currentGrade === value.toString()) params.delete('grade');
      else params.set('grade', value);
      if (currentSubject) params.set('subject', currentSubject);
    }

    if (type === 'subject') {
      if (currentSubject === value) params.delete('subject');
      else params.set('subject', value);
      if (currentGrade) params.set('grade', currentGrade);
    }

    navigate(`/experiments?${params.toString()}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-bold mb-3">Filter by Grade</h3>
        <div className="flex flex-wrap gap-2">
          {grades.map((grade) => (
            <motion.button
              key={grade}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-3 py-1 rounded-full text-sm ${
                currentGrade === grade.toString()
                  ? 'bg-science-blue text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
              onClick={() => handleFilter('grade', grade)}
            >
              Grade {grade}
            </motion.button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-bold mb-3">Filter by Subject</h3>
        <div className="flex flex-wrap gap-2">
          {subjects.map((subject) => (
            <motion.button
              key={subject}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-3 py-1 rounded-full text-sm ${
                currentSubject === subject
                  ? 'bg-science-blue text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
              onClick={() => handleFilter('subject', subject)}
            >
              {subject}
            </motion.button>
          ))}
        </div>
      </div>


      <div className="pt-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-2 bg-blue-100 hover:bg-blue-200 rounded-lg text-blue-800 font-medium"
          onClick={() => navigate('/experiments')}
        >
          All Experiments
        </motion.button>
      </div>
    </div>
  );
}
