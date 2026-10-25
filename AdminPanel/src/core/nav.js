// src/core/nav.js
// Central role → landing-route + portal prefix mapping used by routing guards
// and the sidebar configuration.

export const rolePrefix = (role) => {
  if (role === 'admin') return 'a';
  if (role === 'teacher') return 't';
  if (role === 'parent') return 'p';
  return 's';
};

export const roleHome = (role) =>
  role === 'parent' ? '/p/home' : `/${rolePrefix(role)}/dashboard`;

export const roleLabel = (role) =>
  ({ admin: 'Administrator', teacher: 'Faculty Member', student: 'Student', parent: 'Parent' }[role] || 'Member');