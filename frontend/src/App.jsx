// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import PublicLayout from './components/layout/PublicLayout.jsx';
import AppShell from './components/layout/AppShell.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

// Auth & General Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Profile from './pages/auth/Profile';

// Shared Pages
import SharedNoticeBoard from './pages/shared/NoticeBoard';

// Parent page
import ParentHome from './pages/parent/ParentHome';

// Public Pages
import PublicPortal from './pages/userpublic/PublicPortal';
import PublicAdmission from './pages/userpublic/PublicAdmission';
import PublicFounders from './pages/userpublic/PublicFounders';

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
import AdminAssignments from './pages/admin/AdminAssignments';

// Map legacy /student|teacher|admin/* paths onto the new /s|/t|/a/* structure.
const legacyRoleRedirects = [
  ['/student/dashboard', '/s/dashboard'],
  ['/student/notices', '/s/notices'],
  ['/student/grades', '/s/grades'],
  ['/student/attendance', '/s/attendance'],
  ['/teacher/dashboard', '/t/dashboard'],
  ['/teacher/roster', '/t/roster'],
  ['/teacher/attendance', '/t/attendance'],
  ['/teacher/analytics', '/t/analytics'],
  ['/teacher/gradebook', '/t/gradebook'],
  ['/teacher/notices', '/t/notices'],
  ['/teacher/users/create', '/t/users/create'],
  ['/teacher/users/edit/:id', '/t/users/edit/:id'],
  ['/admin/dashboard', '/a/dashboard'],
  ['/admin/users', '/a/users'],
  ['/admin/users/create', '/a/users/create'],
  ['/admin/users/edit/:id', '/a/users/edit/:id'],
  ['/admin/notices', '/a/notices'],
  ['/admin/settings', '/a/settings'],
  ['/admin/website', '/a/website'],
  ['/admin/approvals', '/a/approvals'],
  ['/admin/application/:id', '/a/applications/:id'],
  ['/admin/assignments', '/a/assignments'],
];

const shellChildren = [
  <Route key="profile" path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />,
  <Route key="parent" path="/p/home" element={<ProtectedRoute allowedRoles={['parent']}><ParentHome /></ProtectedRoute>} />,

  // Student
  <Route key="sd" path="/s/dashboard" element={<ProtectedRoute allowedRoles={['student']}><StudentDashboard /></ProtectedRoute>} />,
  <Route key="sn" path="/s/notices" element={<ProtectedRoute allowedRoles={['student']}><StudentNotices /></ProtectedRoute>} />,
  <Route key="sg" path="/s/grades" element={<ProtectedRoute allowedRoles={['student']}><StudentGrades /></ProtectedRoute>} />,
  <Route key="sa" path="/s/attendance" element={<ProtectedRoute allowedRoles={['student']}><StudentAttendanceHub /></ProtectedRoute>} />,

  // Teacher
  <Route key="td" path="/t/dashboard" element={<ProtectedRoute allowedRoles={['teacher', 'admin']}><TeacherDashboard /></ProtectedRoute>} />,
  <Route key="tr" path="/t/roster" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherRoster /></ProtectedRoute>} />,
  <Route key="tt" path="/t/attendance" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherAttendance /></ProtectedRoute>} />,
  <Route key="ty" path="/t/analytics" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherAnalytics /></ProtectedRoute>} />,
  <Route key="tb" path="/t/gradebook" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherGradebook /></ProtectedRoute>} />,
  <Route key="tn" path="/t/notices" element={<ProtectedRoute allowedRoles={['teacher']}><SharedNoticeBoard /></ProtectedRoute>} />,
  <Route key="tc" path="/t/users/create" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherCreateStudent /></ProtectedRoute>} />,
  <Route key="te" path="/t/users/edit/:id" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherEditStudent /></ProtectedRoute>} />,

  // Admin
  <Route key="ad" path="/a/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />,
  <Route key="au" path="/a/users" element={<ProtectedRoute allowedRoles={['admin']}><AdminUserRoster /></ProtectedRoute>} />,
  <Route key="aun" path="/a/users/create" element={<ProtectedRoute allowedRoles={['admin']}><AdminCreateUser /></ProtectedRoute>} />,
  <Route key="aue" path="/a/users/edit/:id" element={<ProtectedRoute allowedRoles={['admin']}><AdminEditUser /></ProtectedRoute>} />,
  <Route key="an" path="/a/notices" element={<ProtectedRoute allowedRoles={['admin']}><AdminNoticeBoard /></ProtectedRoute>} />,
  <Route key="as" path="/a/settings" element={<ProtectedRoute allowedRoles={['admin']}><AdminSettings /></ProtectedRoute>} />,
  <Route key="aw" path="/a/website" element={<ProtectedRoute allowedRoles={['admin']}><AdminWebsiteManager /></ProtectedRoute>} />,
  <Route key="aa" path="/a/approvals" element={<ProtectedRoute allowedRoles={['admin']}><AdminAppApproval /></ProtectedRoute>} />,
  <Route key="aap" path="/a/applications/:id" element={<ProtectedRoute allowedRoles={['admin']}><AdminApplicationDetails /></ProtectedRoute>} />,
  <Route key="aas" path="/a/assignments" element={<ProtectedRoute allowedRoles={['admin']}><AdminAssignments /></ProtectedRoute>} />,

  // Legacy role-route redirects (feature parity: old bookmarks keep working)
  ...legacyRoleRedirects.map(([from, to]) => (
    <Route key={from} path={from} element={<Navigate to={to} replace />} />
  )),
];

function App() {
  return (
    <Router>
      <Routes>
        {/* PUBLIC + AUTH SITE */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<PublicPortal />} />
          <Route path="/admission" element={<PublicAdmission />} />
          <Route path="/founders" element={<PublicFounders />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Legacy public redirects */}
          <Route path="/public/admission" element={<Navigate to="/admission" replace />} />
          <Route path="/public/founders" element={<Navigate to="/founders" replace />} />
        </Route>

        {/* AUTHENTICATED WORKSPACE */}
        <Route element={<AppShell />}>{shellChildren}</Route>

        {/* Fallthrough */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;