import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';

import { AuthProvider, useAuth } from './context/AuthContext';
import { ExperimentProvider }  from './context/ExperimentContext';

import LoadingScreen  from './components/ui/LoadingScreen';
import Navbar         from './components/layout/Navbar';
import Footer         from './components/layout/Footer';
import ProtectedRoute from './pages/Auth/ProtectedRoute';
import VirtualLab from './pages/Experiments/VirtualLab';

// lazy‑loaded pages
const HomePage                = lazy(() => import('./pages/Home/HomePage'));
const LoginPage               = lazy(() => import('./pages/Auth/LoginPage'));
const RegisterPage            = lazy(() => import('./pages/Auth/RegisterPage'));
const AdminRegisterPage       = lazy(() => import('./pages/Auth/AdminRegisterPage'));

const ExperimentListPage      = lazy(() => import('./pages/Experiments/ExperimentListPage'));
const SubjectSelectionPage    = lazy(() => import('./pages/Experiments/SubjectSelectionPage'));
const ExperimentDetailPage    = lazy(() => import('./pages/Experiments/ExperimentDetailPage'));
// const VirtualLab              = lazy(() => import('./pages/Experiments/VirtualLab'));

const StudentDashboard        = lazy(() => import('./pages/Dashboard/StudentDashboard'));
const BookmarksPage           = lazy(() => import('./pages/Student/BookmarksPage'));
const ProgressPage            = lazy(() => import('./pages/Student/ProgressPage'));

const EducatorDashboard       = lazy(() => import('./pages/Dashboard/EducatorDashboard'));
const UploadPage              = lazy(() => import('./pages/Upload/UploadPage'));
const EducatorExperimentsPage = lazy(() => import('./pages/Educator/EducatorExperimentsPage'));
const AnalyticsPage           = lazy(() => import('./pages/Educator/AnalyticsPage'));

const AdminDashboard          = lazy(() => import('./pages/Admin/AdminDashboard'));
const ExperimentManager       = lazy(() => import('./pages/Admin/ExperimentManager'));
const CommentModeration       = lazy(() => import('./pages/Admin/CommentModeration'));
const UserManagement          = lazy(() => import('./pages/Admin/UserManagement'));

function AppContent() {
  const { user, loading: authLoading } = useAuth();

  // initial auth check wait
  if (authLoading) {
    return <LoadingScreen fullScreen />;
  }

  return (
    <>
      <Navbar />

      <main className="flex-grow pt-16">
        <AnimatePresence mode="wait">
          <Routes>
            {/* Home: auto‑redirect if already logged in */}
            <Route
              path="/"
              element={
                user
                  ? user.role === 'admin'
                    ? <Navigate to="/admin/dashboard" replace />
                    : user.role === 'educator'
                      ? <Navigate to="/educator/dashboard" replace />
                      : <Navigate to="/student/dashboard" replace />
                  : <HomePage />
              }
            />

            {/* Public auth pages */}
            <Route path="/login"          element={<LoginPage />} />
            <Route path="/register"       element={<RegisterPage />} />
            <Route path="/admin/register" element={<AdminRegisterPage />} />

            {/* Protected experiments section (list, filters, detail, lab) */}
             <Route
              path="/virtual-lab"
              element={
                <ProtectedRoute roles={['student','educator','admin']}>
                  <VirtualLab />
                </ProtectedRoute>
              }
            />
            <Route
              path="/experiments/*"
              element={
                <ProtectedRoute roles={['student','educator','admin']}>
                  <Routes>
                    <Route index element={<ExperimentListPage />} />
                    <Route path="grade/:grade" element={<SubjectSelectionPage />} />
                    <Route path="grade/:grade/subject/:subject" element={<ExperimentListPage />} />
                    <Route path=":grade/:title/:id" element={<ExperimentDetailPage />} />
                    <Route path="virtual-lab" element={<VirtualLab />} />
                  </Routes>
                </ProtectedRoute>
              }
            />

            {/* Student only */}
            <Route
              path="/student/*"
              element={
                <ProtectedRoute roles={['student']}>
                  <Routes>
                    <Route path="dashboard" element={<StudentDashboard />} />
                    <Route path="bookmarks" element={<BookmarksPage />} />
                    <Route path="progress" element={<ProgressPage />} />
                  </Routes>
                </ProtectedRoute>
              }
            />

            {/* Educator only */}
            <Route
              path="/educator/*"
              element={
                <ProtectedRoute roles={['educator']}>
                  <Routes>
                    <Route path="dashboard" element={<EducatorDashboard />} />
                    <Route path="upload" element={<UploadPage />} />
                    <Route path="experiments" element={<EducatorExperimentsPage />} />
                    <Route path="analytics" element={<AnalyticsPage />} />
                  </Routes>
                </ProtectedRoute>
              }
            />

            {/* Admin only */}
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute roles={['admin']}>
                  <Routes>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="experiments" element={<ExperimentManager />} />
                    <Route path="comments" element={<CommentModeration />} />
                    <Route path="users" element={<UserManagement />} />
                  </Routes>
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
    </>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <ExperimentProvider>
          <Suspense fallback={<LoadingScreen />}>
            <AppContent />
          </Suspense>
        </ExperimentProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}
