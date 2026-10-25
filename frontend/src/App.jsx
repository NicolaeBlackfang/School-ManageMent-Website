import { Suspense } from 'react';
import { BrowserRouter, Navigate, useRoutes } from 'react-router-dom';
import AppShell from './components/layout/AppShell.jsx';
import PublicLayout from './components/layout/PublicLayout.jsx';
import { FullScreenLoader } from './components/ui.jsx';
import AppErrorBoundary from './components/AppErrorBoundary.jsx';
import { portalRoutes } from './features/routing/portalRoutes.jsx';
import { publicRoutes } from './features/routing/publicRoutes.jsx';

const routes = [
  { element: <PublicLayout />, children: publicRoutes },
  { element: <AppShell />, children: portalRoutes },
  { path: '*', element: <Navigate to="/" replace /> },
];

const RouteTree = () => {
  const route = useRoutes(routes);
  return <Suspense fallback={<FullScreenLoader label="Opening your page…" />}>{route}</Suspense>;
};

const App = () => (
  <AppErrorBoundary>
    <BrowserRouter>
      <RouteTree />
    </BrowserRouter>
  </AppErrorBoundary>
);

export default App;
