import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useExperiments } from '../../context/ExperimentContext';

export default function EducatorDashboard() {
  const { user } = useAuth();
  const { experiments, fetchExperiments } = useExperiments();

  
  useEffect(() => {
    fetchExperiments();
  }, [fetchExperiments]);
  
  const myExps = experiments.filter(
    (exp) => exp.createdBy?.toString() === user?.id
  );

  const stats = {
    experiments: myExps.length,
    students: 142,
    ratings: 4.8,
    pending: myExps.filter((e) => e.status === 'pending').length,
  };

  const recent = myExps
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 2);

  const pending = myExps.filter((e) => e.status === 'pending');

  return (
    <div className="container mx-auto px-4 py-8 pt-12">
      <motion.h1
        className="text-3xl font-bold mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Welcome, {user?.name}
      </motion.h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: 'Experiments', value: stats.experiments, bg: 'bg-science-blue' },
          { title: 'Students', value: stats.students, bg: 'bg-warning-orange' },
          { title: 'Avg Rating', value: stats.ratings, bg: 'bg-science-blue' },
          { title: 'Pending', value: stats.pending, bg: 'bg-warning-orange' },
        ].map((card, i) => (
          <motion.div
            key={card.title}
            className={`${card.bg} text-white rounded-2xl p-6 shadow-lg`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <h3 className="text-lg mb-2">{card.title}</h3>
            <p className="text-3xl font-bold">{card.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              to="/educator/upload"
              className="p-4 bg-science-blue/10 hover:bg-science-blue/20 rounded-xl text-center transition"
            >
              <div className="text-3xl mb-2">+</div>
              <div className="font-bold">New Experiment</div>
            </Link>
            <Link
              to="/educator/experiments"
              className="p-4 bg-element-green/10 hover:bg-element-green/20 rounded-xl text-center transition"
            >
              <div className="text-3xl mb-2">📝</div>
              <div className="font-bold">Manage Experiments</div>
            </Link>
            <Link
              to="/educator/analytics"
              className="p-4 bg-reaction-orange/10 hover:bg-reaction-orange/20 rounded-xl text-center transition"
            >
              <div className="text-3xl mb-2">📊</div>
              <div className="font-bold">Analytics</div>
            </Link>
            <Link
              to="/educator/comments"
              className="p-4 bg-warning-orange/10 hover:bg-warning-orange/20 rounded-xl text-center transition"
            >
              <div className="text-3xl mb-2">💬</div>
              <div className="font-bold">Review Comments</div>
            </Link>
          </div>
        </motion.div>

        {/* Recent Experiments */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Recent Uploads</h2>
            <Link
              to="/educator/experiments"
              className="text-science-blue hover:underline"
            >
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {recent.length ? (
              recent.map((exp) => (
                <div key={exp._id} className="border-b pb-4">
                  <h3 className="font-bold">{exp.title}</h3>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{exp.views ?? 0} views</span>
                    <span>
                      Status:{' '}
                      <span
                        className={
                          exp.status === 'approved'
                            ? 'text-green-600'
                            : 'text-yellow-600'
                        }
                      >
                        {exp.status}
                      </span>
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No recent uploads.</p>
            )}
          </div>
        </motion.div>
      </div>

      {/* Pending Approvals */}
      {pending.length > 0 && (
        <motion.div
          className="mt-8 bg-white rounded-2xl shadow-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Pending Approvals</h2>
            <Link
              to="/educator/experiments"
              className="text-science-blue hover:underline"
            >
              Review All
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pending.map((exp) => (
              <div
                key={exp._id}
                className="border border-gray-200 rounded-xl p-4"
              >
                <h3 className="font-bold mb-2">{exp.title}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Submitted{' '}
                    {new Date(exp.createdAt).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                  <Link
                    to={`/experiments/${exp.grade}/${encodeURIComponent(
                      exp.title
                    )}/${exp._id}`}
                    className="text-science-blue hover:underline text-sm"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
