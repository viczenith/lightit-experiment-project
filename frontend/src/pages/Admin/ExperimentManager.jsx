import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  EyeIcon,
  CheckIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import { useExperiments } from '../../context/ExperimentContext';
import { useNavigate } from 'react-router-dom';

export default function ExperimentManager() {
  const {
    experiments,
    fetchExperiments,
    toggleExperimentStatus,
    deleteExperiment
  } = useExperiments();

  const [showApprovedOnly, setShowApprovedOnly] = useState(false);
  const [error, setError]                       = useState('');
  const [confirmApprove, setConfirmApprove]     = useState(null);
  const [confirmDelete, setConfirmDelete]       = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchExperiments().catch(err =>
      setError(err.message || 'Failed to load experiments')
    );
  }, [fetchExperiments]);

  const handleApprove = async (exp) => {
    setError('');
    try {
      await toggleExperimentStatus(exp._id);
      setConfirmApprove(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Approve failed');
      setConfirmApprove(null);
    }
  };

  const handleDelete = async (exp) => {
    setError('');
    try {
      await deleteExperiment(exp._id);
      setConfirmDelete(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Delete failed');
      setConfirmDelete(null);
    }
  };

  const filtered = showApprovedOnly
    ? experiments.filter(e => e.status === 'approved')
    : experiments;

  return (
    <div className="relative space-y-6">
      {error && <div className="text-red-600">{error}</div>}

      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Manage Experiments</h3>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={showApprovedOnly}
            onChange={() => setShowApprovedOnly(v => !v)}
            className="h-4 w-4 text-science-blue"
          />
          <span className="text-sm">Show approved only</span>
        </label>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['Title','Grade','Subject','Creator','Status','Actions'].map(h => (
                <th
                  key={h}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filtered.map(exp => (
              <tr key={exp._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{exp.title}</td>
                <td className="px-6 py-4">{exp.grade}</td>
                <td className="px-6 py-4">{exp.subject}</td>
                <td className="px-6 py-4">{exp.creatorName || '—'}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      exp.status === 'approved'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {exp.status}
                  </span>
                </td>
                <td className="px-6 py-4 flex justify-end space-x-2">
                  {/* View */}
                  <button
                    onClick={() =>
                      navigate(
                        `/experiments/${exp.grade}/${encodeURIComponent(exp.title)}/${exp._id}`
                      )
                    }
                  >
                    <EyeIcon className="h-5 w-5 text-gray-600 hover:text-gray-800" />
                  </button>

                  {/* Approve */}
                  <button
                    onClick={() => setConfirmApprove(exp)}
                    disabled={exp.status === 'approved'}
                    className={exp.status === 'approved'
                      ? 'opacity-50 cursor-not-allowed'
                      : ''}
                  >
                    <CheckIcon className="h-5 w-5 text-blue-600 hover:text-blue-800" />
                  </button>

                  {/* Edit */}
                  <button
                    onClick={() =>
                      navigate(`/educator/upload?edit=${exp._id}`)
                    }
                  >
                    <PencilIcon className="h-5 w-5 text-indigo-600 hover:text-indigo-800" />
                  </button>

                  {/* Delete */}
                  <button onClick={() => setConfirmDelete(exp)}>
                    <TrashIcon className="h-5 w-5 text-red-600 hover:text-red-800" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {/* Approve Modal */}
        {confirmApprove && (
          <>
            <motion.div
              key="backdrop-approve"
              className="fixed inset-0 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              key="modal-approve"
              className="fixed inset-0 flex items-center justify-center p-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6">
                <h2 className="text-xl font-semibold mb-4">Approve Experiment?</h2>
                <p className="mb-6">
                  Are you sure you want to approve{' '}
                  <strong>{confirmApprove.title}</strong>?
                </p>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setConfirmApprove(null)}
                    className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleApprove(confirmApprove)}
                    className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
                  >
                    Approve
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}

        {/* Delete Modal */}
        {confirmDelete && (
          <>
            <motion.div
              key="backdrop-delete"
              className="fixed inset-0 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              key="modal-delete"
              className="fixed inset-0 flex items-center justify-center p-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6">
                <h2 className="text-xl font-semibold mb-4">Delete Experiment?</h2>
                <p className="mb-6">
                  Are you sure you want to delete{' '}
                  <strong>{confirmDelete.title}</strong>? This cannot be undone.
                </p>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setConfirmDelete(null)}
                    className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDelete(confirmDelete)}
                    className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
