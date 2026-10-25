/* eslint-disable react-refresh/only-export-components */
import { Navigate } from 'react-router-dom';
import { lazy } from 'react';

const Login = lazy(() => import('../../pages/auth/Login.jsx'));
const RegisterNew = lazy(() => import('../../pages/auth/RegisterNew.jsx'));
const SharedNoticeBoard = lazy(() => import('../../pages/shared/NoticeBoard.jsx'));
const PublicPortal = lazy(() => import('../../pages/userpublic/PublicPortal.jsx'));
const PublicAdmission = lazy(() => import('../../pages/userpublic/PublicAdmission.jsx'));
const PublicFounders = lazy(() => import('../../pages/userpublic/PublicFounders.jsx'));
const CmsPage = lazy(() => import('../../pages/userpublic/CmsPages.jsx').then((module) => ({ default: module.CmsPage })));
const NewsList = lazy(() => import('../../pages/userpublic/CmsPages.jsx').then((module) => ({ default: module.NewsList })));
const NewsArticle = lazy(() => import('../../pages/userpublic/CmsPages.jsx').then((module) => ({ default: module.NewsArticle })));
const GalleryPage = lazy(() => import('../../pages/userpublic/CmsPages.jsx').then((module) => ({ default: module.GalleryPage })));
const FacilitiesPage = lazy(() => import('../../pages/userpublic/CmsPages.jsx').then((module) => ({ default: module.FacilitiesPage })));
const AcademicPage = lazy(() => import('../../pages/userpublic/CmsPages.jsx').then((module) => ({ default: module.AcademicPage })));

export const publicRoutes = [
  { index: true, element: <PublicPortal /> },
  { path: 'admission', element: <PublicAdmission /> },
  { path: 'founders', element: <PublicFounders /> },
  { path: 'login', element: <Login /> },
  { path: 'signup', element: <RegisterNew /> },
  { path: 'register', element: <Navigate to="/signup" replace /> },
  { path: 'notices', element: <SharedNoticeBoard /> },
  { path: 'news', element: <NewsList title="News & notices" subtitle="Announcements, circulars and stories from the school." /> },
  { path: 'news/:slug', element: <NewsArticle /> },
  { path: 'gallery', element: <GalleryPage /> },
  { path: 'facilities', element: <FacilitiesPage /> },
  { path: 'academics', element: <AcademicPage /> },
  { path: 'pages/:slug', element: <CmsPage /> },
  { path: 'public/admission', element: <Navigate to="/admission" replace /> },
  { path: 'public/founders', element: <Navigate to="/founders" replace /> },
];
