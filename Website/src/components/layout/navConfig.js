// components/layout/navConfig.js — Website (student/parent)
import { IconDashboard, IconBell, IconBook, IconCalendar, IconHome } from '../icons.jsx';

export const NAV = {
  student: [
    { to: '/s/dashboard', label: 'Overview', icon: IconDashboard },
    { to: '/s/notices', label: 'Notices', icon: IconBell },
    { to: '/s/grades', label: 'Report Card', icon: IconBook },
    { to: '/s/attendance', label: 'Attendance', icon: IconCalendar },
  ],
  parent: [{ to: '/p/home', label: 'Overview', icon: IconHome }],
};