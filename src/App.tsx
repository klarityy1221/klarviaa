import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import { User, Shield, Brain } from 'lucide-react';

function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'user' | 'admin'>('landing');

  if (currentView === 'landing') {
    return <LandingPage onEnterPlatform={() => setCurrentView('user')} setCurrentView={setCurrentView} />;
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation Header */}
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => setCurrentView('landing')}
                className="flex items-center text-2xl font-bold text-white hover:text-klarvia-blue transition-colors"
              >
                <div className="w-8 h-8 bg-klarvia-blue rounded-lg flex items-center justify-center mr-2">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                Klarvia
              </button>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setCurrentView('user')}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentView === 'user'
                    ? 'bg-blue-600 text-white border border-blue-500'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700 border border-gray-600'
                }`}
              >
                <User className="w-4 h-4 mr-2" />
                Dashboard
              </button>
              <button
                onClick={() => setCurrentView('admin')}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentView === 'admin'
                    ? 'bg-purple-600 text-white border border-purple-500'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700 border border-gray-600'
                }`}
              >
                <Shield className="w-4 h-4 mr-2" />
                Admin
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      {currentView === 'user' ? <UserDashboard /> : <AdminDashboard />}
    </div>
  );
}

export default App;