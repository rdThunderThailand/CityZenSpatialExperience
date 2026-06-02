import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import KioskView from './features/kiosk';
import MonitorView from './features/monitor';
import ControlRoomView from './features/control';
import MobileView from './features/mobile';
import { AdminRoute } from './components/AdminRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Kiosk Experience */}
        <Route path="/kiosk/:id" element={<KioskView />} />
        
        {/* Monitor Experience */}
        <Route path="/monitor/:id" element={<MonitorView />} />
        
        {/* Control Room Experience - Protected */}
        <Route 
          path="/control-room" 
          element={
            <AdminRoute>
              <ControlRoomView />
            </AdminRoute>
          } 
        />
        
        {/* Mobile Web / PWA Experience */}
        <Route path="/mobile/:zoneId" element={<MobileView />} />
        
        {/* Fallback routing */}
        <Route path="/" element={<Navigate to="/kiosk/default" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
