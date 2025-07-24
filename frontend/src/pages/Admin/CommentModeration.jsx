import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTrash, FaCheck, FaTimes } from 'react-icons/fa';
import { useExperiments } from '../../context/ExperimentContext';

export default function CommentModeration() {
  const { experiments } = useExperiments();
  const [statusFilter, setStatusFilter] = useState('pending');
  const [comments, setComments] = useState([]);
  const [filteredComments, setFilteredComments] = useState([]);

  // Extract comments from experiments
  useEffect(() => {
    const allComments = experiments.flatMap(exp => 
      (exp.comments || []).map(comment => ({ 
        ...comment, 
        experimentId: exp.id,
        experimentTitle: exp.title
      }))
    );
    setComments(allComments);
  }, [experiments]);

  // Filter comments
  useEffect(() => {
    const filtered = statusFilter === 'all' 
      ? [...comments] 
      : comments.filter(c => c.status === statusFilter);
    
    setFilteredComments(filtered);
  }, [comments, statusFilter]);

  const handleApprove = (commentId) => {
    setComments(prev => 
      prev.map(c => c.id === commentId ? { ...c, status: 'approved' } : c)
    );
  };

  const handleReject = (commentId) => {
    setComments(prev => 
      prev.map(c => c.id === commentId ? { ...c, status: 'rejected' } : c)
    );
  };

  const handleDelete = (commentId) => {
    if (window.confirm('Delete this comment?')) {
      setComments(prev => prev.filter(c => c.id !== commentId));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Comment Moderation</h3>
        <div className="flex items-center">
          <span className="mr-2 text-gray-600">Filter:</span>
          <select 
            className="border rounded px-3 py-1"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>
      
      {filteredComments.length > 0 ? (
        <div className="space-y-4">
          {filteredComments.map((comment) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg border border-gray-200 p-4"
            >
              <div className="flex justify-between mb-2">
                <h4 className="font-bold">{comment.author}</h4>
                <span className="text-sm text-gray-500">
                  on {comment.experimentTitle}
                </span>
              </div>
              <p className="mb-3">{comment.text}</p>
              <div className="flex justify-between items-center">
                <span className={`text-xs px-2 py-1 rounded ${
                  comment.status === 'approved' 
                    ? 'bg-green-100 text-green-800' 
                    : comment.status === 'rejected'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {comment.status}
                </span>
                <div className="flex gap-2">
                  {comment.status === 'pending' && (
                    <>
                      <button 
                        onClick={() => handleApprove(comment.id)}
                        className="text-green-500 hover:text-green-700"
                        title="Approve"
                      >
                        <FaCheck />
                      </button>
                      <button 
                        onClick={() => handleReject(comment.id)}
                        className="text-red-500 hover:text-red-700"
                        title="Reject"
                      >
                        <FaTimes />
                      </button>
                    </>
                  )}
                  <button 
                    onClick={() => handleDelete(comment.id)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">💬</div>
          <h3 className="text-xl font-bold mb-2">No comments found</h3>
          <p className="text-gray-600">
            {statusFilter === 'all' 
              ? 'There are no comments in the system yet.' 
              : `There are no ${statusFilter} comments.`}
          </p>
        </div>
      )}
    </div>
  );
}