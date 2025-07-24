import React, { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  FaUser,
  FaBook,
  FaStar,
  FaChartBar,
  FaArrowRight
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useExperiments } from '../../context/ExperimentContext';

export default function AnalyticsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { experiments, fetchExperiments } = useExperiments();

  // re‑load on mount
  useEffect(() => {
    fetchExperiments();
  }, [fetchExperiments]);

  // only this educator’s experiments
  const myExps = useMemo(
    () =>
      experiments.filter(
        (exp) => exp.createdBy?.toString() === user?.id
      ),
    [experiments, user]
  );

  // total students — you’ll want real data here later
  const totalStudents = 142;

  // total experiments
  const totalExperiments = myExps.length;

  // avg rating (assumes you add a .rating field later)
  const avgRating = useMemo(() => {
    if (!myExps.length) return 0;
    const sum = myExps.reduce((acc, e) => acc + (e.rating || 0), 0);
    return +(sum / myExps.length).toFixed(1);
  }, [myExps]);

  // engagement = percent of experiments approved
  const engagement = useMemo(() => {
    if (!myExps.length) return 0;
    const approved = myExps.filter((e) => e.status === 'approved').length;
    return Math.round((approved / myExps.length) * 100);
  }, [myExps]);

  // Popular experiments by views
  const popular = useMemo(
    () =>
      [...myExps]
        .sort((a, b) => (b.views || 0) - (a.views || 0))
        .slice(0, 3),
    [myExps]
  );

  // Mock student progress until you hook real data
  const studentProgress = [
    { name: 'VictorGowin', progress: 80, experiments: 5 },
    { name: 'Mark Ondugbe', progress: 60, experiments: 4 },
    { name: 'Jossy Rossie', progress: 90, experiments: 7 },
  ];

  const stats = [
    {
      icon: <FaUser />,
      title: 'Total Students',
      value: totalStudents,
      change: '+12%',
      changeType: 'positive',
    },
    {
      icon: <FaBook />,
      title: 'Experiments',
      value: totalExperiments,
      change: totalExperiments > 0 ? `+${myExps.length}` : '+0',
      changeType: 'positive',
    },
    {
      icon: <FaStar />,
      title: 'Avg Rating',
      value: avgRating,
      change: '+0.2',
      changeType: 'positive',
    },
    {
      icon: <FaChartBar />,
      title: 'Engagement',
      value: `${engagement}%`,
      change: engagement >= 0 ? '+0%' : '-0%',
      changeType: engagement >= 0 ? 'positive' : 'negative',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        className="text-3xl font-bold mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Experiment Analytics
      </motion.h1>

      {/* Top‑line stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="text-3xl text-science-blue mb-4">
              {stat.icon}
            </div>
            <h3 className="text-xl font-bold mb-1">{stat.title}</h3>
            <div className="flex items-end">
              <p className="text-3xl font-bold mr-2">{stat.value}</p>
              <span
                className={`text-sm ${
                  stat.changeType === 'positive'
                    ? 'text-green-500'
                    : 'text-red-500'
                }`}
              >
                {stat.change}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {/* Popular experiments */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4">Popular Experiments</h3>
          <div className="space-y-4">
            {popular.map((exp) => (
              <div
                key={exp._id}
                className="flex justify-between items-center border-b pb-4"
              >
                <div>
                  <h4 className="font-bold">{exp.title}</h4>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">⭐ {exp.rating ?? 'N/A'}</span>
                    <span>{exp.views ?? 0} views</span>
                  </div>
                </div>
                <button
                  className="text-science-blue hover:underline flex items-center"
                  onClick={() =>
                    navigate(
                      `/experiments/${exp.grade}/${encodeURIComponent(
                        exp.title
                      )}/${exp._id}`
                    )
                  }
                >
                  View Details <FaArrowRight className="ml-1" />
                </button>
              </div>
            ))}

            {!popular.length && (
              <p className="text-gray-600">No experiments to show yet.</p>
            )}
          </div>
        </div>

        {/* Student progress (mock) */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4">Student Progress</h3>
          <div className="space-y-4">
            {studentProgress.map((s, i) => (
              <div
                key={i}
                className="border-b pb-4 last:border-0 last:pb-0"
              >
                <div className="flex justify-between mb-1">
                  <h4 className="font-medium">{s.name}</h4>
                  <span className="text-sm text-gray-600">
                    {s.progress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-science-blue h-2 rounded-full"
                    style={{ width: `${s.progress}%` }}
                  />
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {s.experiments} experiments completed
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
