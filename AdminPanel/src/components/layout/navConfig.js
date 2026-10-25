// components/layout/navConfig.js
// Role-scoped navigation configuration consumed by the app sidebar.
import {
  IconDashboard,
  IconBell,
  IconCalendar,
  IconUsers,
  IconChart,
  IconClipboard,
  IconPlus,
  IconShield,
  IconSparkles,
} from '../icons.jsx';

export const NAV = {
  teacher: [
    { to: '/t/dashboard', label: 'Overview', icon: IconDashboard },
    { to: '/t/roster', label: 'My Roster', icon: IconUsers },
    { to: '/t/attendance', label: 'Attendance', icon: IconCalendar },
    { to: '/t/analytics', label: 'Analytics', icon: IconChart },
    { to: '/t/gradebook', label: 'Gradebook', icon: IconClipboard },
    { to: '/t/notices', label: 'Notices', icon: IconBell },
    { to: '/t/users/create', label: 'Add Student', icon: IconPlus },
  ],
  admin: [
    { to: '/a/dashboard', label: 'Overview', icon: IconDashboard },
    { to: '/a/users', label: 'All Users', icon: IconUsers },
    { to: '/a/users/create', label: 'Create User', icon: IconPlus },
    { to: '/a/assignments', label: 'Assignments', icon: IconShield },
    { to: '/a/notices', label: 'Notices', icon: IconBell },
    { to: '/a/approvals', label: 'Admissions', icon: IconClipboard },
    { to: '/a/website', label: 'Public Website', icon: IconSparkles },
    { to: '/a/cms', label: 'Content Studio', icon: IconSparkles },
    { to: '/a/settings', label: 'Settings', icon: IconShield },
  ],
};