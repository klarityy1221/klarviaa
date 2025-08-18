

import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import AudioPlayerPage from './components/AudioPlayerPage';
import VideoPlayerPage from './components/VideoPlayerPage';
import LandingPage from './components/LandingPage';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import Auth from './components/Auth';
import ViewAll from './components/ViewAll';
import AIChat from './components/AIChat';
import { User, Shield, Brain } from 'lucide-react';


function AppRoutes() {
  const [userType, setUserTypeState] = useState<'user' | 'admin' | null>(() => {
    return (localStorage.getItem('userType') as any) || null;
  });
  const navigate = useNavigate();

  // Custom setter to update both state and localStorage
  const setUserType = (type: 'user' | 'admin' | null) => {
    setUserTypeState(type);
    if (type) {
      localStorage.setItem('userType', type);
    } else {
      localStorage.removeItem('userType');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation Header */}
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/')}
                className="flex items-center text-2xl font-bold text-white hover:text-klarvia-blue transition-colors"
              >
                <div className="w-8 h-8 bg-klarvia-blue rounded-lg flex items-center justify-center mr-2">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                Klarvia
              </button>
            </div>
            <div className="flex space-x-4">
              {/* Only show Dashboard button for user */}
              {userType === 'user' && (
                <button
                  onClick={() => navigate('/user')}
                  className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                    window.location.pathname === '/user'
                      ? 'bg-blue-600 text-white border border-blue-500'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700 border border-gray-600'
                  }`}
                >
                  <User className="w-4 h-4 mr-2" />
                  Dashboard
                </button>
              )}
              {/* Only show Admin button for admin */}
              {userType === 'admin' && (
                <button
                  onClick={() => navigate('/admin')}
                  className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                    window.location.pathname === '/admin'
                      ? 'bg-purple-600 text-white border border-purple-500'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700 border border-gray-600'
                  }`}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Admin
                </button>
              )}
              <button
                onClick={() => {
                  setUserType(null);
                  navigate('/login');
                }}
                className="flex items-center px-4 py-2 rounded-lg font-medium text-gray-300 hover:text-white hover:bg-gray-700 border border-gray-600"
              >
                Login/Register
              </button>
            </div>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<LandingPage setCurrentView={(view) => {
          if (view === 'auth') navigate('/login');
          else if (view === 'user') navigate('/user');
          else if (view === 'admin') navigate('/admin');
          else navigate('/');
        }} />} />
        <Route path="/login" element={<Auth setUserType={setUserType} />} />
        <Route path="/user" element={userType === 'user' ? <UserDashboard /> : <Navigate to="/login" />} />
        <Route path="/admin" element={userType === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />} />
  <Route path="/view-all" element={<ViewAll />} />
  <Route path="/therapists" element={<ViewAll defaultType="therapists" />} />
  <Route path="/ai-chat" element={<AIChat />} />
  <Route path="/audio" element={<AudioPlayerPage />} />
  <Route path="/video" element={<VideoPlayerPage />} />
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}


function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
