import { useState } from 'react';
import { motion } from 'framer-motion';
import ExperimentManager from './ExperimentManager';
import CommentModeration from './CommentModeration';
import UserManagement from './UserManagement';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('experiments');
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8 min-h-screen"
    >
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {['experiments', 'comments', 'users'].map(tab => (
              <button
                key={tab}
                className={`px-3 py-4 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-b-2 border-science-blue text-science-blue'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>
        
        <div className="p-6">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'experiments' && <ExperimentManager />}
            {activeTab === 'comments' && <CommentModeration />}
            {activeTab === 'users' && <UserManagement />}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}