// import { useState } from 'react';
// import { useSearchParams, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { useExperiments } from '../../context/ExperimentContext';
// import { useAuth } from '../../context/AuthContext';
// import ExperimentCard from '../../components/experiments/ExperimentCard';
// import GradeSubjectFilter from '../../components/experiments/GradeSubjectFilter';
// import ScienceBadge from '../../components/experiments/ScienceBadge';
// import { FaSearch, FaFilter, FaTimes, FaPlus } from 'react-icons/fa';

// export default function ExperimentListPage() {
//   const { experiments: allExperiments } = useExperiments();
//   const { user } = useAuth();
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();

//   const grade = searchParams.get('grade');
//   const subject = searchParams.get('subject');

//   const [searchQuery, setSearchQuery] = useState('');
//   const [showFilters, setShowFilters] = useState(false);

//   // Filter experiments based on user role
//   const filteredExperiments = allExperiments.filter((exp) => {
//     const matchesGrade = grade ? exp.grade === grade : true;
//     const matchesSubject = subject ? exp.subject === subject : true;
//     const matchesQuery = searchQuery
//       ? exp.title.toLowerCase().includes(searchQuery.toLowerCase())
//       : true;
    
//     // Show hidden experiments only to admins and the creator
//     if (exp.status === 'hidden') {
//       return user?.role === 'admin' || user?.id === exp.creator;
//     }
    
//     // Show approved experiments to everyone
//     return exp.status === 'approved' && matchesGrade && matchesSubject && matchesQuery;
//   });

//   return (
//     <motion.div
//       initial={{ y: 20, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       className="container mx-auto px-4 py-8 min-h-screen"
//     >
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
//         <div>
//           <h1 className="text-3xl font-bold mb-2">
//             {grade || subject ? 'Filtered Experiments' : 'All Experiments'}
//           </h1>
//           {(grade || subject) && (
//             <div className="flex flex-wrap gap-2 items-center">
//               {grade && <ScienceBadge type="grade" value={grade} />}
//               {subject && <ScienceBadge type="subject" value={subject} />}
//               <button
//                 onClick={() => navigate('/experiments')}
//                 className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full flex items-center"
//               >
//                 Clear filters <FaTimes className="ml-1" />
//               </button>
//             </div>
//           )}
//         </div>

//         <div className="flex gap-3 w-full md:w-auto">
//           <div className="relative flex-1 md:w-64">
//             <input
//               type="text"
//               placeholder="Search experiments..."
//               className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-science-blue focus:border-transparent"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//           </div>

//           <button
//             className="md:hidden bg-science-blue text-white p-2 rounded-full"
//             onClick={() => setShowFilters(!showFilters)}
//           >
//             <FaFilter />
//           </button>
//         </div>
//       </div>

//       <div className="flex flex-col md:flex-row gap-8">
//         {/* Filter sidebar */}
//         <motion.div
//           className={`bg-white rounded-2xl p-6 shadow-lg h-fit sticky top-24 ${
//             showFilters ? 'block w-full z-10' : 'hidden md:block'
//           } md:w-64`}
//           initial={{ x: -20, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//         >
//           {showFilters && (
//             <button
//               className="md:hidden absolute top-4 right-4 text-gray-500"
//               onClick={() => setShowFilters(false)}
//             >
//               <FaTimes />
//             </button>
//           )}
//           <GradeSubjectFilter currentGrade={grade} currentSubject={subject} />
//         </motion.div>

//         {/* Experiment grid */}
//         <div className="flex-1">
//           {filteredExperiments.length > 0 ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {filteredExperiments.map((experiment) => (
//                 <motion.div
//                   key={experiment.id}
//                   whileHover={{ y: -10 }}
//                   whileTap={{ scale: 0.98 }}
//                   layout
//                 >
//                   <ExperimentCard
//                     experiment={experiment}
//                     onClick={() =>
//                       navigate(
//                         `/experiments/${experiment.grade}/${encodeURIComponent(
//                           experiment.title
//                         )}/${experiment.id}`
//                       )
//                     }
//                   />
//                 </motion.div>
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-16">
//               <div className="text-5xl mb-4">📤</div>
//               <h3 className="text-2xl font-bold mb-2">No experiments found</h3>
//               <p className="text-gray-600 mb-4">
//                 {grade && subject
//                   ? `No experiments uploaded for grade ${grade} - ${subject}.`
//                   : grade
//                   ? `No experiments uploaded for grade ${grade}.`
//                   : subject
//                   ? `No experiments uploaded for subject ${subject}.`
//                   : 'It looks like there are no experiments yet.'}
//               </p>
//               {user?.role === 'educator' && (
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="px-6 py-3 bg-science-blue text-white rounded-full text-sm font-semibold flex items-center mx-auto"
//                   onClick={() => navigate('/educator/upload')}
//                 >
//                   <FaPlus className="mr-2" />
//                   Upload Experiment
//                 </motion.button>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </motion.div>
//   );
// }


import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSearch, FaFilter, FaTimes, FaPlus, FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { useExperiments } from '../../context/ExperimentContext';
import { useAuth } from '../../context/AuthContext';
import ExperimentCard from '../../components/experiments/ExperimentCard';
import GradeSubjectFilter from '../../components/experiments/GradeSubjectFilter';
import ScienceBadge from '../../components/experiments/ScienceBadge';

export default function ExperimentListPage() {
  const { experiments: allExperiments } = useExperiments();
  const { user, toggleBookmark }       = useAuth();
  const [searchParams]                 = useSearchParams();
  const navigate                        = useNavigate();

  const grade   = searchParams.get('grade');
  const subject = searchParams.get('subject');

  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Filter experiments based on user role
  const filteredExperiments = allExperiments.filter((exp) => {
    const matchesGrade   = grade   ? exp.grade   === grade   : true;
    const matchesSubject = subject ? exp.subject === subject : true;
    const matchesQuery   = searchQuery
      ? exp.title.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    // Show hidden experiments only to admins and the creator
    if (exp.status === 'hidden') {
      return user?.role === 'admin' || user?.id === exp.createdBy;
    }

    // Show approved experiments to everyone
    return exp.status === 'approved' && matchesGrade && matchesSubject && matchesQuery;
  });

  // Helper to know if this exp is bookmarked
  const isBookmarked = (expId) =>
    Array.isArray(user?.bookmarks) && user.bookmarks.includes(expId);

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="container mx-auto px-4 py-8 min-h-screen"
    >
      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            {grade || subject ? 'Filtered Experiments' : 'All Experiments'}
          </h1>
          {(grade || subject) && (
            <div className="flex flex-wrap gap-2 items-center">
              {grade   && <ScienceBadge type="grade"   value={grade}   />}
              {subject && <ScienceBadge type="subject" value={subject} />}
              <button
                onClick={() => navigate('/experiments')}
                className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full flex items-center"
              >
                Clear filters <FaTimes className="ml-1" />
              </button>
            </div>
          )}
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <input
              type="text"
              placeholder="Search experiments..."
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-science-blue focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          <button
            className="md:hidden bg-science-blue text-white p-2 rounded-full"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter />
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filter sidebar */}
        <motion.div
          className={`bg-white rounded-2xl p-6 shadow-lg h-fit sticky top-24 ${
            showFilters ? 'block w-full z-10' : 'hidden md:block'
          } md:w-64`}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          {showFilters && (
            <button
              className="md:hidden absolute top-4 right-4 text-gray-500"
              onClick={() => setShowFilters(false)}
            >
              <FaTimes />
            </button>
          )}
          <GradeSubjectFilter
            currentGrade={grade}
            currentSubject={subject}
          />
        </motion.div>

        {/* Experiment grid */}
        <div className="flex-1">
          {filteredExperiments.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExperiments.map((experiment) => (
                <motion.div
                  key={experiment._id}
                  whileHover={{ y: -10 }}
                  whileTap={{ scale: 0.98 }}
                  layout
                  className="relative"
                >
                  {/* Bookmark toggle for students */}
                  {user?.role === 'student' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmark(experiment._id);
                      }}
                      className="absolute top-3 right-3 z-20 text-orange-600 hover:text-pink-800"
                    >
                      {isBookmarked(experiment._id)
                        ? <FaBookmark className="h-5 w-5" />
                        : <FaRegBookmark className="h-5 w-5" />
                      }
                    </button>
                  )}

                  <ExperimentCard
                    experiment={experiment}
                    onClick={() =>
                      navigate(
                        `/experiments/${experiment.grade}/` +
                          `${encodeURIComponent(experiment.title)}/` +
                          `${experiment._id}`
                      )
                    }
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">📤</div>
              <h3 className="text-2xl font-bold mb-2">No experiments found</h3>
              <p className="text-gray-600 mb-4">
                {grade && subject
                  ? `No experiments uploaded for grade ${grade} - ${subject}.`
                  : grade
                  ? `No experiments uploaded for grade ${grade}.`
                  : subject
                  ? `No experiments uploaded for subject ${subject}.`
                  : 'It looks like there are no experiments yet.'}
              </p>
              {user?.role === 'educator' && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-science-blue text-white rounded-full text-sm font-semibold flex items-center mx-auto"
                  onClick={() => navigate('/educator/upload')}
                >
                  <FaPlus className="mr-2" />
                  Upload Experiment
                </motion.button>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
