// components/layout/PublicLayout.jsx
import { Outlet } from 'react-router-dom';
import PublicHeader from './PublicHeader.jsx';
import PublicFooter from './PublicFooter.jsx';

export const PublicLayout = () => (
  <div className="flex min-h-screen flex-col">
    <PublicHeader />
    <main className="flex-grow">
      <Outlet />
    </main>
    <PublicFooter />
  </div>
);

export default PublicLayout;