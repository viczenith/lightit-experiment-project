  // import { useState, useEffect } from 'react';
  // import { motion } from 'framer-motion';
  // import ExperimentCard from '../../components/experiments/ExperimentCard';
  // import ScienceBackground from '../../components/layout/ScienceBackground';

  // export default function BookmarksPage() {
  //   const [bookmarks, setBookmarks] = useState([]);
  //   const [loading, setLoading] = useState(true);

  //   // Simulate fetching bookmarks
  //   useEffect(() => {
  //     setTimeout(() => {
  //       const mockBookmarks = [
  //         { 
  //           id: 1, 
  //           title: "Chemical Reactions", 
  //           description: "Explore how different chemicals interact with each other", 
  //           grade: 7, 
  //           subject: "Chemistry",
  //           reactions: 42,
  //           thumbnail: "chem-reaction"
  //         },
  //         { 
  //           id: 3, 
  //           title: "Plant Photosynthesis", 
  //           description: "Discover how plants convert light into energy", 
  //           grade: 9, 
  //           subject: "Biology",
  //           reactions: 35,
  //           thumbnail: "photosynthesis"
  //         }
  //       ];
  //       setBookmarks(mockBookmarks);
  //       setLoading(false);
  //     }, 800);
  //   }, []);

  //   return (
  //     <div className="min-h-screen relative">
  //       <ScienceBackground />
  //       <div className="container mx-auto px-4 py-8 relative z-10">
  //         <motion.h1 
  //           className="text-3xl font-bold mb-8"
  //           initial={{ opacity: 0, y: -20 }}
  //           animate={{ opacity: 1, y: 0 }}
  //         >
  //           My Bookmarked Experiments
  //         </motion.h1>
          
  //         {loading ? (
  //           <div className="text-center py-16">
  //             <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-science-blue"></div>
  //             <p className="mt-4 text-gray-600">Loading your bookmarks...</p>
  //           </div>
  //         ) : bookmarks.length === 0 ? (
  //           <motion.div
  //             initial={{ opacity: 0 }}
  //             animate={{ opacity: 1 }}
  //             className="text-center py-16"
  //           >
  //             <div className="text-6xl mb-4">📚</div>
  //             <h2 className="text-2xl font-bold mb-2">No bookmarks yet</h2>
  //             <p className="text-gray-600 mb-6">Save experiments to view them here</p>
  //             <button className="btn-primary">
  //               Browse Experiments
  //             </button>
  //           </motion.div>
  //         ) : (
  //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  //             {bookmarks.map((experiment, index) => (
  //               <motion.div
  //                 key={experiment.id}
  //                 initial={{ opacity: 0, y: 30 }}
  //                 animate={{ opacity: 1, y: 0 }}
  //                 transition={{ delay: index * 0.1 }}
  //               >
  //                 <ExperimentCard experiment={experiment} />
  //               </motion.div>
  //             ))}
  //           </div>
  //         )}
  //       </div>
  //     </div>
  //   );
  // }

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ExperimentCard from '../../components/experiments/ExperimentCard';
import ScienceBackground from '../../components/layout/ScienceBackground';
import { useAuth } from '../../context/AuthContext';
import { useExperiments } from '../../context/ExperimentContext';

export default function BookmarksPage() {
  const { user } = useAuth();
  const { experiments, loading } = useExperiments();
  const navigate = useNavigate();

  // Only show approved experiments that the user has bookmarked
  const bookmarked = useMemo(() => {
    if (!user?.bookmarks || !Array.isArray(user.bookmarks)) return [];
    return experiments.filter(exp =>
      exp.status === 'approved' && user.bookmarks.includes(exp._id)
    );
  }, [experiments, user]);

  return (
    <div className="min-h-screen relative">
      <ScienceBackground />
      <div className="container mx-auto px-4 py-8 relative z-10">
        <motion.h1 
          className="text-3xl font-bold mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          My Bookmarked Experiments
        </motion.h1>
        
        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-science-blue"></div>
            <p className="mt-4 text-gray-600">Loading your bookmarks...</p>
          </div>
        ) : bookmarked.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">📚</div>
            <h2 className="text-2xl font-bold mb-2">No bookmarks yet</h2>
            <p className="text-gray-600 mb-6">Save experiments to view them here</p>
            <button
              onClick={() => navigate('/experiments')}
              className="btn-primary"
            >
              Browse Experiments
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bookmarked.map((experiment, idx) => (
              <motion.div
                key={experiment._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <ExperimentCard
                  experiment={experiment}
                  onClick={() =>
                    navigate(
                      `/experiments/${experiment.grade}/${encodeURIComponent(
                        experiment.title
                      )}/${experiment._id}`
                    )
                  }
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
