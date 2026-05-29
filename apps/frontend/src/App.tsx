import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import KioskView from './features/kiosk';
import MonitorView from './features/monitor';
import ControlRoomView from './features/control';
import MobileView from './features/mobile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Kiosk Experience */}
        <Route path="/kiosk/:id" element={<KioskView />} />
        
        {/* Monitor Experience */}
        <Route path="/monitor/:id" element={<MonitorView />} />
        
        {/* Control Room Experience */}
        <Route path="/control-room" element={<ControlRoomView />} />
        
        {/* Mobile Web / PWA Experience */}
        <Route path="/mobile/:zoneId" element={<MobileView />} />
        
        {/* Fallback routing */}
        <Route path="/" element={<Navigate to="/control-room" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
