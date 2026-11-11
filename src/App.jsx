// App.jsx - Root router

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import BuilderPage from './pages/BuilderPage';
import PortfolioPage from './pages/PortfolioPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BuilderPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
