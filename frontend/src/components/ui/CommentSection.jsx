import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUserCircle, FaReply, FaThumbsUp, FaRegThumbsUp } from 'react-icons/fa';

export default function CommentSection({ experimentId }) {
  const [comments, setComments] = useState([
    { id: 1, user: 'Student 1', text: 'This experiment helped me understand the concept better!', likes: 5, date: '2 days ago' },
    { id: 2, user: 'Educator 1', text: 'Great demonstration! Make sure to include safety goggles next time.', likes: 3, date: '1 day ago' }
  ]);
  
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    const comment = {
      id: comments.length + 1,
      user: 'Current User',
      text: replyingTo ? `@${replyingTo} ${newComment}` : newComment,
      likes: 0,
      date: 'Just now'
    };
    
    setComments([...comments, comment]);
    setNewComment('');
    setReplyingTo(null);
  };
  
  const handleLike = (id) => {
    setComments(comments.map(comment => 
      comment.id === id 
        ? { ...comment, likes: comment.likes + (comment.liked ? -1 : 1), liked: !comment.liked } 
        : comment
    ));
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4">Comments ({comments.length})</h3>
      
      <form onSubmit={handleSubmit} className="mb-6">
        {replyingTo && (
          <div className="flex items-center text-sm text-science-blue mb-2">
            Replying to @{replyingTo}
            <button 
              type="button" 
              className="ml-2 text-gray-500"
              onClick={() => setReplyingTo(null)}
            >
              ×
            </button>
          </div>
        )}
        <div className="flex gap-3">
          <div className="flex-shrink-0">
            <FaUserCircle className="text-3xl text-gray-400" />
          </div>
          <div className="flex-grow">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-science-blue"
              rows={2}
            />
          </div>
        </div>
        <div className="flex justify-end mt-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="px-4 py-2 bg-science-blue text-white rounded-lg"
            disabled={!newComment.trim()}
          >
            Post Comment
          </motion.button>
        </div>
      </form>
      
      <div className="space-y-4">
        <AnimatePresence>
          {comments.map(comment => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-gray-50 rounded-lg p-4"
            >
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <FaUserCircle className="text-2xl text-gray-400" />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between">
                    <h4 className="font-bold">{comment.user}</h4>
                    <span className="text-sm text-gray-500">{comment.date}</span>
                  </div>
                  <p className="mt-1 text-gray-700">{comment.text}</p>
                  <div className="flex items-center mt-2 space-x-4">
                    <button 
                      className="flex items-center text-sm text-gray-500 hover:text-science-blue"
                      onClick={() => handleLike(comment.id)}
                    >
                      {comment.liked ? <FaThumbsUp className="text-science-blue" /> : <FaRegThumbsUp />}
                      <span className="ml-1">{comment.likes}</span>
                    </button>
                    <button 
                      className="text-sm text-gray-500 hover:text-science-blue"
                      onClick={() => setReplyingTo(comment.user)}
                    >
                      <FaReply className="inline mr-1" /> Reply
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}