import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaTrash,
  FaUserShield,
  FaUser,
  FaGraduationCap
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

export default function UserManagement() {
  const {
    users = [],
    fetchUsers,
    deleteUser,
    updateUserRole
  } = useAuth();

  const [roleFilter, setRoleFilter] = useState('all');
  const [confirmDelete, setConfirmDelete] = useState(null);

  // Load users on mount
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Safe array
  const safeUsers = Array.isArray(users) ? users : [];

  // Apply role filter
  const filteredUsers = roleFilter === 'all'
    ? safeUsers
    : safeUsers.filter(u => u.role === roleFilter);

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin':     return <FaUserShield className="text-purple-500" />;
      case 'educator':  return <FaUser className="text-blue-500" />;
      default:          return <FaGraduationCap className="text-green-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">User Management</h3>
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Filter:</span>
          <select
            className="border rounded px-3 py-1"
            value={roleFilter}
            onChange={e => setRoleFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="admin">Admin</option>
            <option value="educator">Educator</option>
            <option value="student">Student</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['User','Email','Role','Actions'].map(col => (
                <th
                  key={col}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map(u => (
              <motion.tr
                key={u._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="hover:bg-gray-50"
              >
                {/* Name & Icon */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                      {getRoleIcon(u.role)}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {u.name}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Email */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {u.email}
                </td>

                {/* Role (read‑only) */}
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {u.role.charAt(0).toUpperCase() + u.role.slice(1)}
                </td>

                {/* Actions */}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <button
                    onClick={() => setConfirmDelete({ id: u._id, name: u.name })}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </td>
              </motion.tr>
            ))}

            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {confirmDelete && (
          // backdrop
          <motion.div
            key="backdrop"
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}

        {confirmDelete && (
          // modal
          <motion.div
            key="modal"
            className="fixed inset-0 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6">
              <h2 className="text-xl font-semibold mb-4">Delete User?</h2>
              <p className="mb-6">
                Are you sure you want to delete{' '}
                <span className="font-medium">{confirmDelete.name}</span>? This
                cannot be undone.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setConfirmDelete(null)}
                  className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    deleteUser(confirmDelete.id);
                    setConfirmDelete(null);
                  }}
                  className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
