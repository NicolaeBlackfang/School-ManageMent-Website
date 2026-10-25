// components/layout/navConfig.js — Website (student/parent/teacher)
import { IconDashboard, IconBell, IconBook, IconCalendar, IconHome, IconUsers, IconClipboard, IconGraduation } from '../icons.jsx';

export const NAV = {
  student: [
    { to: '/s/dashboard', label: 'Overview', icon: IconDashboard },
    { to: '/s/notices', label: 'Notices', icon: IconBell },
    { to: '/s/grades', label: 'Report Card', icon: IconBook },
    { to: '/s/attendance', label: 'Attendance', icon: IconCalendar },
  ],
  parent: [{ to: '/p/home', label: 'Overview', icon: IconHome }],
  teacher: [
    { to: '/t/dashboard', label: 'Overview', icon: IconDashboard },
    { to: '/t/roster', label: 'Students', icon: IconUsers },
    { to: '/t/attendance', label: 'Attendance', icon: IconCalendar },
    { to: '/t/gradebook', label: 'Gradebook', icon: IconBook },
    { to: '/t/assignments', label: 'Assignments', icon: IconClipboard },
    { to: '/t/analytics', label: 'Analytics', icon: IconBook },
    { to: '/t/notices', label: 'Notices', icon: IconBell },
  ],
  admin: [
    { to: '/a/dashboard', label: 'Overview', icon: IconDashboard },
    { to: '/a/users', label: 'Users', icon: IconUsers },
    { to: '/a/notices', label: 'Notices', icon: IconBell },
    { to: '/a/assignments', label: 'Assignments', icon: IconClipboard },
    { to: '/a/settings', label: 'School settings', icon: IconGraduation },
    { to: '/a/website', label: 'Website settings', icon: IconBook },
    { to: '/a/content', label: 'Public content', icon: IconClipboard },
    { to: '/a/approvals', label: 'Approvals', icon: IconCalendar },
  ],
};
