import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus, FaFilter } from 'react-icons/fa';
import { useExperiments } from '../../context/ExperimentContext';
import { useAuth } from '../../context/AuthContext';
import ExperimentCard from '../../components/experiments/ExperimentCard';

export default function EducatorExperimentsPage() {
  const navigate = useNavigate();
  const { experiments, deleteExperiment } = useExperiments();
  const { user } = useAuth();
  const [statusFilter, setStatusFilter] = useState('all');

  // Redirect non‑educators or not logged in
  if (!user || user.role !== 'educator') {
    return <Navigate to="/" replace />;
  }

  // Determine the educator's unique ID
  const educatorId = (user._id || user.id || '').toString();

  // Filter experiments belonging to this educator
  const myExps = experiments.filter(exp => {
    const creator = exp.createdBy;
    return creator && creator.toString() === educatorId;
  });

  // Further filter by status
  const filtered = statusFilter === 'all'
    ? myExps
    : myExps.filter(exp => exp.status === statusFilter);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this experiment?")) {
      await deleteExperiment(id);
    }
  };

  const handleClick = exp => {
    navigate(
      `/experiments/${exp.grade}/${encodeURIComponent(exp.title)}/${exp._id}`
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <motion.h1
          className="text-3xl font-bold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          My Experiments
        </motion.h1>
        <Link to="/educator/upload" className="btn-primary flex items-center gap-2">
          <FaPlus /> New Experiment
        </Link>
      </div>

      {/* Status Filter */}
      <div className="mb-6">
        <div className="flex items-center mb-3">
          <FaFilter className="mr-2 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filter by status:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {['all','pending','approved','rejected'].map(status => (
            <button
              key={status}
              className={`px-3 py-1 rounded-full text-sm transition ${
                statusFilter === status
                  ? 'bg-science-blue text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setStatusFilter(status)}
            >
              {status === 'all'
                ? 'All'
                : status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="text-6xl mb-4">🔬</div>
          <h2 className="text-2xl font-bold mb-2">
            {statusFilter === 'all'
              ? 'No experiments yet'
              : `No ${statusFilter} experiments`}
          </h2>
          <p className="text-gray-600 mb-6">
            {statusFilter === 'all'
              ? 'Create your first experiment to share with students.'
              : `You don't have any ${statusFilter} experiments yet.`}
          </p>
          <Link to="/educator/upload" className="btn-primary">
            Create Experiment
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(exp => (
            <motion.div
              key={exp._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <ExperimentCard
                experiment={exp}
                onClick={() => handleClick(exp)}
              />
              <div className="flex justify-center mt-3 gap-2">
                <Link
                  to={`/educator/upload?edit=${exp._id}`}
                  className="btn-icon text-blue-500 hover:bg-blue-100"
                  title="Edit"
                >
                  <FaEdit />
                </Link>
                <button
                  className="btn-icon text-red-500 hover:bg-red-100"
                  title="Delete"
                  onClick={() => handleDelete(exp._id)}
                >
                  <FaTrash />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
