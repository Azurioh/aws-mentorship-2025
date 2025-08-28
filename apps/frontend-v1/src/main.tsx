import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import AppLayout from '@/app/layout';
import LandingPage from '@/app/page';
import AuthPage from '@/app/auth/page';
import DashboardPage from '@/app/dashboard/page';
import ExplorePage from '@/app/explore/page';
import LoginPage from '@/app/login/page';
import ProjectsPage from '@/app/projects/page';
import CreateProjectPage from '@/app/projects/create/page';
import SettingsPage from '@/app/settings/page';
import MessagesPage from '@/app/messages/page';
import MessageDetailPage from '@/app/messages/[userId]/page';
import ChatPage from '@/app/chat/page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '/', element: <LandingPage /> },
      { path: '/auth', element: <AuthPage /> },
      { path: '/dashboard', element: <DashboardPage /> },
      { path: '/explore', element: <ExplorePage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/projects', element: <ProjectsPage /> },
      { path: '/projects/create', element: <CreateProjectPage /> },
      { path: '/settings', element: <SettingsPage /> },
      { path: '/messages', element: <MessagesPage /> },
      { path: '/messages/:userId', element: <MessageDetailPage /> },
      { path: '/chat', element: <ChatPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
