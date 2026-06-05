import { createBrowserRouter, Navigate } from 'react-router-dom';
import KioskView from './features/kiosk';
import MonitorView from './features/monitor';
import ControlRoomView from './features/control';
import MobileView from './features/mobile';
import { AdminRoute } from './components/AdminRoute';

export const router = createBrowserRouter([
  {
    path: '/kiosk/:id',
    element: <KioskView />,
  },
  {
    path: '/monitor/:id',
    element: <MonitorView />,
  },
  {
    path: '/control-room',
    element: (
      <AdminRoute>
        <ControlRoomView />
      </AdminRoute>
    ),
  },
  {
    path: '/mobile/:zoneId',
    element: <MobileView />,
  },
  {
    path: '/',
    element: <Navigate to="/kiosk/default" replace />,
  },
]);
