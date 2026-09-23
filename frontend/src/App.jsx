// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout & Auth Controls
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Auth & General Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Profile from './pages/auth/Profile';

// Shared Pages
import SharedNoticeBoard from './pages/shared/NoticeBoard';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import StudentNotices from './pages/student/StudentNotices';
import StudentGrades from './pages/student/StudentGrades';
import StudentAttendanceHub from './pages/student/StudentAttendanceHub';

// Teacher Pages
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import TeacherRoster from './pages/teacher/TeacherRoster';
import TeacherAttendance from './pages/teacher/TeacherAttendance';
import TeacherAnalytics from './pages/teacher/TeacherAnalytics';
import TeacherGradebook from './pages/teacher/TeacherGradebook';
import TeacherCreateStudent from './pages/teacher/TeacherCreateStudent';
import TeacherEditStudent from './pages/teacher/TeacherEditStudent';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUserRoster from './pages/admin/AdminUserRoster';
import AdminCreateUser from './pages/admin/AdminCreateUser';
import AdminEditUser from './pages/admin/AdminEditUser';
import AdminNoticeBoard from './pages/admin/AdminNoticeBoard';
import AdminSettings from './pages/admin/AdminSettings';
import AdminWebsiteManager from './pages/admin/AdminWebsiteManager';
import AdminAppApproval from './pages/admin/AdminAppApproval';
import AdminApplicationDetails from './pages/admin/AdminApplicationDetails';

//Public Pages
import PublicPortal from './pages/userpublic/PublicPortal';
import PublicAdmission from './pages/userpublic/PublicAdmission';
import PublicFounders from './pages/userpublic/PublicFounders';


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Persistent App Header Navigation */}
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-grow">
          <Routes>
            {/* PUBLIC ROUTES */}
            <Route path="/" element={<PublicPortal />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/public/admission" element={<PublicAdmission />} />
            <Route path="/public/founders" element={<PublicFounders />} />

            {/* SHARED SECURED ROUTES */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            {/* STUDENT ROUTES */}
            <Route
              path="/student/dashboard"
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/notices"
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <StudentNotices />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/grades"
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <StudentGrades />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/attendance"
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <StudentAttendanceHub />
                </ProtectedRoute>
              }
            />

            {/* TEACHER ROUTES */}
            <Route
              path="/teacher/dashboard"
              element={
                <ProtectedRoute allowedRoles={['teacher', 'admin']}>
                  <TeacherDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/teacher/roster"
              element={
                <ProtectedRoute allowedRoles={['teacher']}>
                  <TeacherRoster />
                </ProtectedRoute>
              }
            />
            <Route
              path="/teacher/attendance"
              element={
                <ProtectedRoute allowedRoles={['teacher']}>
                  <TeacherAttendance />
                </ProtectedRoute>
              }
            />
            <Route
              path="/teacher/analytics"
              element={
                <ProtectedRoute allowedRoles={['teacher']}>
                  <TeacherAnalytics />
                </ProtectedRoute>
              }
            />
            <Route
              path="/teacher/gradebook"
              element={
                <ProtectedRoute allowedRoles={['teacher']}>
                  <TeacherGradebook />
                </ProtectedRoute>
              }
            />
            <Route
              path="/teacher/notices"
              element={
                <ProtectedRoute allowedRoles={['teacher']}>
                  <SharedNoticeBoard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/teacher/users/create"
              element={
                <ProtectedRoute allowedRoles={['teacher']}>
                  <TeacherCreateStudent />
                </ProtectedRoute>
              }
            />
            <Route
              path="/teacher/users/edit/:id"
              element={
                <ProtectedRoute allowedRoles={['teacher']}>
                  <TeacherEditStudent />
                </ProtectedRoute>
              }
            />

            {/* ADMIN ROUTES */}
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
              path="/admin/users/create"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminCreateUser />
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
            <Route
              path="/admin/notices"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminNoticeBoard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/settings"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminSettings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/website"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminWebsiteManager />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/admin/approvals" 
              element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminAppApproval />
              </ProtectedRoute>
              } 
            />

            <Route 
              path="/admin/application/:id" 
              element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminApplicationDetails />
              </ProtectedRoute>
              } 
            />  


          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;