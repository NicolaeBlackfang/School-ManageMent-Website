// src/App.jsx — Public Website (public + student/parent portal only)
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import PublicLayout from './components/layout/PublicLayout.jsx';
import AppShell from './components/layout/AppShell.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Profile from './pages/auth/Profile';
import SharedNoticeBoard from './pages/shared/NoticeBoard';

import ParentHome from './pages/parent/ParentHome';

import PublicPortal from './pages/userpublic/PublicPortal';
import PublicAdmission from './pages/userpublic/PublicAdmission';
import PublicFounders from './pages/userpublic/PublicFounders';

import StudentDashboard from './pages/student/StudentDashboard';
import StudentNotices from './pages/student/StudentNotices';
import StudentGrades from './pages/student/StudentGrades';
import StudentAttendanceHub from './pages/student/StudentAttendanceHub';

import {
  CmsPage,
  NewsList,
  NewsArticle,
  GalleryPage,
  FacilitiesPage,
  AcademicPage,
} from './pages/userpublic/CmsPages';

const legacyRoleRedirects = [
  ['/student/dashboard', '/s/dashboard'],
  ['/student/notices', '/s/notices'],
  ['/student/grades', '/s/grades'],
  ['/student/attendance', '/s/attendance'],
];

const shellChildren = [
  <Route key="profile" path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />,
  <Route key="parent" path="/p/home" element={<ProtectedRoute allowedRoles={['parent']}><ParentHome /></ProtectedRoute>} />,

  <Route key="sd" path="/s/dashboard" element={<ProtectedRoute allowedRoles={['student']}><StudentDashboard /></ProtectedRoute>} />,
  <Route key="sn" path="/s/notices" element={<ProtectedRoute allowedRoles={['student']}><StudentNotices /></ProtectedRoute>} />,
  <Route key="sg" path="/s/grades" element={<ProtectedRoute allowedRoles={['student']}><StudentGrades /></ProtectedRoute>} />,
  <Route key="sa" path="/s/attendance" element={<ProtectedRoute allowedRoles={['student']}><StudentAttendanceHub /></ProtectedRoute>} />,

  ...legacyRoleRedirects.map(([from, to]) => (
    <Route key={from} path={from} element={<Navigate to={to} replace />} />
  )),
];

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<PublicPortal />} />
          <Route path="/admission" element={<PublicAdmission />} />
          <Route path="/founders" element={<PublicFounders />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/notices" element={<SharedNoticeBoard />} />
          <Route path="/news" element={<NewsList title="News & notices" subtitle="Announcements, circulars and stories from the school." />} />
          <Route path="/news/:slug" element={<NewsArticle />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/facilities" element={<FacilitiesPage />} />
          <Route path="/academics" element={<AcademicPage />} />
          <Route path="/pages/:slug" element={<CmsPage />} />
          <Route path="/public/admission" element={<Navigate to="/admission" replace />} />
          <Route path="/public/founders" element={<Navigate to="/founders" replace />} />
        </Route>

        <Route element={<AppShell />}>{shellChildren}</Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
