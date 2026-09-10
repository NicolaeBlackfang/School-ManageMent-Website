// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Profile from './pages/auth/Profile';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUserRoster from './pages/admin/AdminUserRoster';
import AdminEditUser from './pages/admin/AdminEditUser';
import AdminCreateUser from './pages/admin/AdminCreateUser';
import TeacherRoster from './pages/teacher/TeacherRoster';
import TeacherAttendance from './pages/teacher/TeacherAttendance';
import TeacherAnalytics from './pages/teacher/TeacherAnalytics';
import TeacherEditStudent from './pages/teacher/TeacherEditStudent';
import TeacherGradebook from './pages/teacher/TeacherGradebook';
import TeacherCreateStudent from './pages/teacher/TeacherCreateStudent';
import AdminSettings from './pages/admin/AdminSettings';
import StudentDashboard from './pages/student/StudentDashboard';
import StudentNotices from './pages/student/StudentNotices';
import StudentGrades from './pages/student/StudentGrades';
import StudentAttendanceHub from './pages/student/StudentAttendanceHub';






// 🟢 Ensure these two new components are properly imported
import SharedNoticeBoard from './pages/shared/NoticeBoard';
import AdminNoticeBoard from './pages/admin/AdminNoticeBoard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Persistent App Header Navigation */}
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-grow">
          <Routes>
            {/* Public Welcome Home Page */}
            <Route path="/" element={
              <div className="flex flex-col items-center justify-center mt-20 text-center px-4">
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                  Welcome to the School Portal
                </h1>
                <p className="mt-4 text-lg text-gray-500 max-w-xl">
                  An all-in-one MERN solution for managing classes, attendance, grades, and communication.
                </p>
              </div>
            } />

            {/* Account Management Gateways */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* SECURED WORKSPACE ROUTING PLATFORM */}
            <Route
              path="/teacher/dashboard"
              element={
                <ProtectedRoute allowedRoles={['teacher', 'admin']}>
                  <TeacherDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            {/* 🟢 NEW: Notice Board Routes placed safely INSIDE <Routes> */}
            <Route path="/student/notices" element={<ProtectedRoute allowedRoles={['student']}><SharedNoticeBoard /></ProtectedRoute>} />
            <Route path="/teacher/notices" element={<ProtectedRoute allowedRoles={['teacher']}><SharedNoticeBoard /></ProtectedRoute>} />

            <Route path="/admin/users/create" element={<ProtectedRoute allowedRoles={['admin']}><AdminCreateUser /></ProtectedRoute>} />

            <Route
              path="/admin/notices"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminNoticeBoard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminUserRoster />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/users/edit/:id"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminEditUser />
                </ProtectedRoute>
              }
            />
            <Route path="/teacher/roster" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherRoster /></ProtectedRoute>} />
            <Route path="/teacher/attendance" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherAttendance /></ProtectedRoute>} />
            <Route path="/teacher/analytics" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherAnalytics /></ProtectedRoute>} />
            <Route path="/teacher/users/edit/:id" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherEditStudent /></ProtectedRoute>} />
            <Route path="/teacher/gradebook" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherGradebook /></ProtectedRoute>} />
            <Route path="/teacher/users/create" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherCreateStudent /></ProtectedRoute>} />
            <Route path="/admin/settings" element={<ProtectedRoute allowedRoles={['admin']}><AdminSettings /></ProtectedRoute>} />
            <Route path="/student/dashboard" element={<ProtectedRoute allowedRoles={['student']}><StudentDashboard /></ProtectedRoute>} />
            <Route path="/student/notices" element={<ProtectedRoute allowedRoles={['student']}><StudentNotices /></ProtectedRoute>} />
            <Route path="/student/grades" element={<ProtectedRoute allowedRoles={['student']}><StudentGrades /></ProtectedRoute>} />
            <Route path="/student/attendance" element={<ProtectedRoute allowedRoles={['student']}><StudentAttendanceHub /></ProtectedRoute>} />

          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
