import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LaserFlowPage from './pages/LaserFlowPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/laser" element={<LaserFlowPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;