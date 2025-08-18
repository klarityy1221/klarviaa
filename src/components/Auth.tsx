import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthProps {
  setUserType: (type: 'user' | 'admin') => void;
}

export default function Auth({ setUserType }: AuthProps) {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const endpoint = isLogin ? '/api/login' : '/api/register';
      const body = isLogin ? { email, password } : { username, name, email, password };
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (res.ok) {
        if (isLogin) {
          const type = data.isAdmin ? 'admin' : 'user';
          setUserType(type);
          localStorage.setItem('userType', type);
          // Persist minimal user info so other components can use it
          localStorage.setItem('username', data.name || data.username || (type === 'admin' ? 'Admin' : 'User'));
          if (data.id) {
            localStorage.setItem('userId', String(data.id));
          }
          navigate(type === 'admin' ? '/admin' : '/user');
        } else {
          setSuccess('Registration successful. Please login with your new account.');
          setIsLogin(true);
          setPassword('');
          setEmail(email || '');
          navigate('/login');
        }
      } else {
        setError(data.error || 'Authentication failed');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 font-body flex items-center justify-center p-6">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left hero */}
        <div className="hidden md:flex flex-col justify-center bg-white/70 backdrop-blur-sm rounded-2xl p-10 shadow-xl border border-white/40">
          <div className="mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-klarvia-blue to-klarvia-blue-dark rounded-xl flex items-center justify-center mb-4">
              <span className="text-white font-bold text-lg">K</span>
            </div>
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-2">Welcome to Klarvia</h2>
            <p className="text-gray-700">AI-powered mental health support for your workforce. Secure, private, and always available.</p>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Why create an account?</h3>
            <ul className="text-gray-700 list-disc list-inside space-y-2">
              <li>Access guided sessions and learning resources</li>
              <li>Book human therapist sessions</li>
              <li>Save your progress and preferences</li>
            </ul>
          </div>
        </div>

        {/* Right form panel */}
        <div className="bg-white rounded-2xl p-8 shadow-2xl border border-gray-100">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-heading font-bold text-gray-900">{isLogin ? 'Welcome back' : 'Create your account'}</h2>
            <p className="text-gray-600 mt-2">{isLogin ? 'Sign in to continue to Klarvia' : 'Sign up to access sessions and resources'}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <label className="text-sm text-gray-700">Username</label>
                  <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="w-full mt-1 px-4 py-2 border rounded-lg" placeholder="Choose a username" required />
                </div>
                <div>
                  <label className="text-sm text-gray-700">Full name</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full mt-1 px-4 py-2 border rounded-lg" placeholder="Your full name" required />
                </div>
              </>
            )}

            <div>
              <label className="text-sm text-gray-700">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full mt-1 px-4 py-2 border rounded-lg" placeholder="you@company.com" required />
            </div>

            <div>
              <label className="text-sm text-gray-700">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full mt-1 px-4 py-2 border rounded-lg" placeholder="Choose a safe password" required />
            </div>

            {error && <div className="text-red-500 text-center">{error}</div>}
            {success && <div className="text-green-600 text-center">{success}</div>}

            <div className="flex flex-col sm:flex-row gap-3">
              <button type="submit" className="flex-1 bg-klarvia-blue text-white px-5 py-3 rounded-2xl font-heading font-semibold hover:bg-klarvia-blue-dark transition-all">{isLogin ? 'Sign In' : 'Create Account'}</button>
              <button type="button" onClick={() => setIsLogin(!isLogin)} className="flex-1 bg-white border border-gray-200 px-5 py-3 rounded-2xl text-gray-700 hover:shadow-md transition">{isLogin ? 'Create an account' : 'Already have an account? Sign in'}</button>
            </div>

            <div className="pt-4 text-center text-sm text-gray-500">By continuing you agree to our <a className="text-klarvia-blue underline">Terms</a> and <a className="text-klarvia-blue underline">Privacy Policy</a>.</div>
          </form>
        </div>
      </div>
    </div>
  );
}
