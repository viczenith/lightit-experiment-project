import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import ExperimentCard from '../../components/experiments/ExperimentCard';
import { useAuth } from '../../context/AuthContext';
import { useExperiments } from '../../context/ExperimentContext';

export default function StudentDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { experiments } = useExperiments();

  // Only show approved experiments
  const approved = useMemo(
    () => experiments.filter((exp) => exp.status === 'approved'),
    [experiments]
  );

  // Continue Learning → two most‑recent
  const recentExperiments = useMemo(
    () =>
      [...approved]
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .slice(0, 2),
    [approved]
  );

  // Bookmarks: assume `user.bookmarks` is an array of experiment IDs
  const bookmarked = useMemo(() => {
    if (!Array.isArray(user?.bookmarks)) return [];
    return approved.filter((exp) => user.bookmarks.includes(exp._id));
  }, [approved, user]);

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        className="text-3xl font-bold mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Welcome back, {user?.name || 'Student'}!
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Continue Learning */}
        <motion.div
          className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Continue Learning</h2>
            <Link
              to="/experiments"
              className="text-science-blue font-medium hover:underline"
            >
              View All
            </Link>
          </div>

          <div className="space-y-6">
            {recentExperiments.length > 0 ? (
              recentExperiments.map((exp) => (
                <motion.div
                  key={exp._id}
                  whileHover={{ y: -5 }}
                  className="border border-gray-200 rounded-xl p-4 hover:shadow-md cursor-pointer"
                  onClick={() =>
                    navigate(
                      `/experiments/${exp.grade}/${encodeURIComponent(
                        exp.title
                      )}/${exp._id}`
                    )
                  }
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold">{exp.title}</h3>
                      <p className="text-gray-600">
                        {exp.subject} • Grade {exp.grade}
                      </p>
                      <div className="mt-2 flex items-center">
                        <div className="w-48 bg-gray-200 rounded-full h-2.5 mr-3">
                          <div
                            className="bg-science-blue h-2.5 rounded-full"
                            style={{ width: `${exp.progress || 0}%` }}
                          />
                        </div>
                        <span className="text-sm">
                          {exp.progress ?? 0}%
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Last accessed</p>
                      <p className="font-medium">
                        {exp.lastAccessed || '—'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-600">No recent experiments yet.</p>
            )}
          </div>
        </motion.div>

        {/* Quick Access */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-6">Quick Access</h2>

          <div className="space-y-4">
            <Link
              to="/experiments"
              className="block p-4 bg-science-blue/10 hover:bg-science-blue/20 rounded-xl transition"
            >
              <h3 className="font-bold text-lg">Browse Experiments</h3>
              <p className="text-gray-600">Explore all available labs</p>
            </Link>

            <Link
              to="/virtual-lab"
              className="block p-4 bg-reaction-orange/10 hover:bg-reaction-orange/20 rounded-xl transition"
            >
              <h3 className="font-bold text-lg">Virtual Lab</h3>
              <p className="text-gray-600">Practice experiments online</p>
            </Link>

            <Link
              to="/student/bookmarks"
              className="block p-4 bg-element-green/10 hover:bg-element-green/20 rounded-xl transition"
            >
              <h3 className="font-bold text-lg">My Bookmarks</h3>
              <p className="text-gray-600">Saved experiments</p>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Bookmarked Experiments */}
      <motion.div
        className="lg:col-span-3 bg-white rounded-2xl shadow-lg p-6 mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Bookmarked Experiments</h2>
          <Link
            to="/student/bookmarks"
            className="text-science-blue font-medium hover:underline"
          >
            View All
          </Link>
        </div>

        {bookmarked.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bookmarked.map((exp) => (
              <ExperimentCard
                key={exp._id}
                experiment={exp}
                onClick={() =>
                  navigate(
                    `/experiments/${exp.grade}/${encodeURIComponent(
                      exp.title
                    )}/${exp._id}`
                  )
                }
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No bookmarks yet.</p>
        )}
      </motion.div>
    </div>
  );
}
