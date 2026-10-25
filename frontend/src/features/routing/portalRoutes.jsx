/* eslint-disable react-refresh/only-export-components */
import { Navigate } from 'react-router-dom';
import { lazy } from 'react';
import ProtectedRoute from '../../components/ProtectedRoute.jsx';

const Profile = lazy(() => import('../../pages/auth/Profile.jsx'));
const ParentHome = lazy(() => import('../../pages/parent/ParentHome.jsx'));
const StudentDashboard = lazy(() => import('../../pages/student/StudentDashboard.jsx'));
const StudentGrades = lazy(() => import('../../pages/student/StudentGrades.jsx'));
const StudentAttendanceHub = lazy(() => import('../../pages/student/StudentAttendanceHub.jsx'));
const StudentNotices = lazy(() => import('../../pages/student/StudentNotices.jsx'));
const TeacherDashboardNew = lazy(() => import('../../pages/teacher/TeacherDashboardNew.jsx'));
const TeacherRoster = lazy(() => import('../../pages/teacher/TeacherRoster.jsx'));
const TeacherAttendance = lazy(() => import('../../pages/teacher/TeacherAttendance.jsx'));
const TeacherGradebook = lazy(() => import('../../pages/teacher/TeacherGradebook.jsx'));
const TeacherAssignments = lazy(() => import('../../pages/teacher/TeacherAssignments.jsx'));
const TeacherAnalytics = lazy(() => import('../../pages/teacher/TeacherAnalytics.jsx'));
const TeacherNotices = lazy(() => import('../../pages/teacher/TeacherNotices.jsx'));
const TeacherCreateStudent = lazy(() => import('../../pages/teacher/TeacherCreateStudent.jsx'));
const TeacherEditStudent = lazy(() => import('../../pages/teacher/TeacherEditStudent.jsx'));
const AdminDashboard = lazy(() => import('../../pages/admin/AdminDashboard.jsx'));
const AdminUserRoster = lazy(() => import('../../pages/admin/AdminUserRoster.jsx'));
const AdminCreateUser = lazy(() => import('../../pages/admin/AdminCreateUser.jsx'));
const AdminEditUser = lazy(() => import('../../pages/admin/AdminEditUser.jsx'));
const AdminNoticeBoard = lazy(() => import('../../pages/admin/AdminNoticeBoard.jsx'));
const AdminSettings = lazy(() => import('../../pages/admin/AdminSettings.jsx'));
const AdminWebsiteManager = lazy(() => import('../../pages/admin/AdminWebsiteManager.jsx'));
const AdminContentManager = lazy(() => import('../../pages/admin/AdminContentManager.jsx'));
const AdminAppApproval = lazy(() => import('../../pages/admin/AdminAppApproval.jsx'));
const AdminApplicationDetails = lazy(() => import('../../pages/admin/AdminApplicationDetails.jsx'));
const AdminAssignments = lazy(() => import('../../pages/admin/AdminAssignments.jsx'));

const roleRoute = (path, role, element) => ({
  path,
  element: <ProtectedRoute allowedRoles={[role]}>{element}</ProtectedRoute>,
});

export const portalRoutes = [
  { path: 'profile', element: <ProtectedRoute><Profile /></ProtectedRoute> },
  roleRoute('p/home', 'parent', <ParentHome />),
  roleRoute('a/dashboard', 'admin', <AdminDashboard />),
  roleRoute('a/users', 'admin', <AdminUserRoster />),
  roleRoute('a/users/create', 'admin', <AdminCreateUser />),
  roleRoute('a/users/edit/:id', 'admin', <AdminEditUser />),
  roleRoute('a/notices', 'admin', <AdminNoticeBoard />),
  roleRoute('a/settings', 'admin', <AdminSettings />),
  roleRoute('a/website', 'admin', <AdminWebsiteManager />),
  roleRoute('a/content', 'admin', <AdminContentManager />),
  roleRoute('a/approvals', 'admin', <AdminAppApproval />),
  roleRoute('a/applications/:id', 'admin', <AdminApplicationDetails />),
  roleRoute('a/assignments', 'admin', <AdminAssignments />),
  roleRoute('t/dashboard', 'teacher', <TeacherDashboardNew />),
  roleRoute('t/roster', 'teacher', <TeacherRoster />),
  roleRoute('t/users/create', 'teacher', <TeacherCreateStudent />),
  roleRoute('t/users/edit/:id', 'teacher', <TeacherEditStudent />),
  roleRoute('t/attendance', 'teacher', <TeacherAttendance />),
  roleRoute('t/gradebook', 'teacher', <TeacherGradebook />),
  roleRoute('t/assignments', 'teacher', <TeacherAssignments />),
  roleRoute('t/analytics', 'teacher', <TeacherAnalytics />),
  roleRoute('t/notices', 'teacher', <TeacherNotices />),
  roleRoute('s/dashboard', 'student', <StudentDashboard />),
  roleRoute('s/notices', 'student', <StudentNotices />),
  roleRoute('s/grades', 'student', <StudentGrades />),
  roleRoute('s/attendance', 'student', <StudentAttendanceHub />),
  { path: 'student/dashboard', element: <Navigate to="/s/dashboard" replace /> },
  { path: 'student/notices', element: <Navigate to="/s/notices" replace /> },
  { path: 'student/grades', element: <Navigate to="/s/grades" replace /> },
  { path: 'student/attendance', element: <Navigate to="/s/attendance" replace /> },
];
