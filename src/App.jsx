import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import './index.css'; 

export default function App() {
  return (
    <Router>
    
      <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
        
        
        <nav className="bg-white border-b sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <span className="text-xl font-bold text-blue-600">Outreach Cell</span>
          </div>
        </nav>

        <main className="py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/:id" element={<PostDetail />} />
          </Routes>
        </main>
        
        <footer className="py-10 text-center text-gray-400 text-sm border-t mt-12 bg-white">
          © 2026 IIT Roorkee Outreach Cell
        </footer>
      </div>
    </Router>
  );
}