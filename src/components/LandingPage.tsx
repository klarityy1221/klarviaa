import React from 'react';
import { ArrowRight, Play, Heart, Shield, Eye, Brain } from 'lucide-react';

interface LandingPageProps {
  onEnterPlatform: () => void;
  setCurrentView: (view: 'landing' | 'user' | 'admin') => void;
}

export default function LandingPage({ onEnterPlatform, setCurrentView }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-white font-body">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img 
                src="/Klarvia Logo-1.png" 
                alt="Klarvia Logo" 
                className="h-10 w-auto mr-3"
              />
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#how-it-works" className="text-gray-600 hover:text-klarvia-blue transition-colors font-medium">How It Works</a>
              <a href="#features" className="text-gray-600 hover:text-klarvia-blue transition-colors font-medium">Features</a>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={onEnterPlatform}
                className="btn-primary text-white px-6 py-3 rounded-xl font-heading font-semibold"
              >
                Get Started
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="max-w-2xl">
              <h1 className="text-5xl lg:text-6xl font-heading font-bold text-gray-900 mb-6 leading-tight">
                Bring Mental Wellness to Your Team 
                <span className="text-klarvia-blue"> Powered by AI Avatars</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Give your employees 24/7 access to AI-driven support designed by psychologists.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button
                  onClick={onEnterPlatform}
                  className="bg-klarvia-blue text-white px-8 py-4 rounded-xl font-heading font-semibold text-lg hover:bg-klarvia-blue-dark transition-colors"
                >
                  Start Free Session
                </button>
                <a 
                  href="#how-it-works" 
                  className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-heading font-semibold text-lg hover:border-gray-400 transition-colors text-center"
                >
                  See How it Works
                </a>
              </div>
            </div>

            {/* AI Avatar Visual - Matching Reference */}
            <div className="relative flex justify-center">
              <div className="relative">
                {/* Avatar Container */}
                <div className="w-80 h-80 relative">
                  {/* Avatar Background Circle */}
                  <div className="w-full h-full bg-gradient-to-b from-gray-100 to-gray-200 rounded-full flex items-end justify-center overflow-hidden">
                    {/* Avatar Body */}
                    <div className="w-64 h-64 relative">
                      {/* Shirt */}
                      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-b from-blue-200 to-blue-300 rounded-t-full"></div>
                      {/* Cardigan */}
                      <div className="absolute bottom-0 w-full h-40 bg-gradient-to-b from-orange-100 to-orange-200 rounded-t-full opacity-90"></div>
                      
                      {/* Head */}
                      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-24 h-28 bg-gradient-to-b from-orange-200 to-orange-300 rounded-full">
                        {/* Hair */}
                        <div className="absolute -top-2 -left-2 w-28 h-20 bg-gray-800 rounded-t-full"></div>
                        <div className="absolute top-4 -left-1 w-26 h-16 bg-gray-800 rounded-full"></div>
                        <div className="absolute top-4 -right-1 w-26 h-16 bg-gray-800 rounded-full"></div>
                        
                        {/* Eyes */}
                        <div className="absolute top-8 left-4 w-2 h-2 bg-gray-800 rounded-full"></div>
                        <div className="absolute top-8 right-4 w-2 h-2 bg-gray-800 rounded-full"></div>
                        
                        {/* Mouth */}
                        <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-gray-700 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Emotion Labels */}
                <div className="absolute top-8 right-4 bg-white px-3 py-2 rounded-lg shadow-sm border border-gray-200">
                  <span className="text-sm font-medium text-gray-700">Calm</span>
                </div>
                <div className="absolute bottom-32 left-4 bg-white px-3 py-2 rounded-lg shadow-sm border border-gray-200">
                  <span className="text-sm font-medium text-gray-700">Heard</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Klarvia Section */}
      <section id="how-it-works" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-heading font-bold text-gray-900 mb-6">How It Works</h2>
          <p className="text-xl text-gray-600 mb-16 max-w-3xl mx-auto">
            Get started with AI-powered mental health support in three simple steps
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-klarvia-blue rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-heading font-semibold text-gray-900 mb-4">Sign Up</h3>
              <p className="text-gray-600">Create your account and complete a brief wellness assessment</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-klarvia-blue rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-heading font-semibold text-gray-900 mb-4">Connect</h3>
              <p className="text-gray-600">Start a session with your AI therapist or book a human therapist</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-klarvia-blue rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-heading font-semibold text-gray-900 mb-4">Grow</h3>
              <p className="text-gray-600">Access personalized exercises and track your mental wellness journey</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left Column - Features */}
            <div>
              <h2 className="text-4xl font-heading font-bold text-gray-900 mb-12">
                Why Klarvia?
              </h2>

              <div className="space-y-8">
                {/* Feature 1 */}
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 mt-1 flex-shrink-0">
                    <Heart className="w-6 h-6 text-klarvia-blue" />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-semibold text-gray-900 mb-2">
                      Private & Anonymous Access
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Employees access confidential care without the need to reveal their identity.
                    </p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 mt-1 flex-shrink-0">
                    <div className="w-6 h-6 border-2 border-gray-300 rounded"></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-semibold text-gray-900 mb-2">
                      Empathy-Driven AI, Trained by Psychologists
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Our AI is built with compassion in mind and grounded in proven techniques.
                    </p>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 mt-1 flex-shrink-0">
                    <div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-semibold text-gray-900 mb-2">
                      Real-Time Emotion Recognition
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      AI senses employee emotions through facial expressions for better care
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-16 grid grid-cols-3 gap-8">
                <div>
                  <div className="text-4xl font-heading font-bold text-gray-900 mb-1">725+</div>
                  <div className="text-gray-600 text-sm">Daily Sessions</div>
                </div>
                <div>
                  <div className="text-4xl font-heading font-bold text-gray-900 mb-1">99.9%</div>
                  <div className="text-gray-600 text-sm">Uptime</div>
                </div>
                <div>
                  <div className="text-4xl font-heading font-bold text-gray-900 mb-1">4.9<span className="text-2xl">/5</span></div>
                  <div className="text-gray-600 text-sm">Average rating</div>
                </div>
              </div>
            </div>

            {/* Right Column - Testimonial and Interface */}
            <div className="space-y-8">
              {/* Single Testimonial */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex-shrink-0 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-b from-orange-200 to-orange-300 flex items-center justify-center">
                      <div className="w-8 h-8 bg-gray-800 rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-700 mb-3 leading-relaxed">
                      This has been amazing for our team. We've noticed a substantial improvement in employee well-being.
                    </p>
                    <div className="text-sm font-medium text-gray-900">Riya, HR Director</div>
                  </div>
                </div>
              </div>

              {/* Interface Mockup */}
              <div className="bg-gray-800 rounded-2xl p-6 relative overflow-hidden">
                {/* Window Controls */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>

                {/* Video Interface */}
                <div className="bg-gray-700 rounded-xl p-6 text-center">
                  {/* Avatar in Interface */}
                  <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-b from-gray-600 to-gray-700 rounded-full flex items-end justify-center overflow-hidden">
                    <div className="w-20 h-20 relative">
                      {/* Shirt */}
                      <div className="absolute bottom-0 w-full h-8 bg-gradient-to-b from-blue-400 to-blue-500 rounded-t-full"></div>
                      {/* Cardigan */}
                      <div className="absolute bottom-0 w-full h-10 bg-gradient-to-b from-orange-300 to-orange-400 rounded-t-full opacity-90"></div>
                      
                      {/* Head */}
                      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-6 h-7 bg-gradient-to-b from-orange-300 to-orange-400 rounded-full">
                        {/* Hair */}
                        <div className="absolute -top-1 -left-1 w-8 h-5 bg-gray-800 rounded-t-full"></div>
                        <div className="absolute top-1 -left-0.5 w-7 h-4 bg-gray-800 rounded-full"></div>
                        <div className="absolute top-1 -right-0.5 w-7 h-4 bg-gray-800 rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  <div className="text-white text-sm mb-1">Your virtual therapist</div>
                  <div className="text-gray-400 text-xs">calm, confidential, Always there</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <img 
                src="/Klarvia Logo-1.png" 
                alt="Klarvia Logo" 
                className="h-10 w-auto mr-3"
              />
            </div>
            <div className="flex items-center space-x-8">
              <a href="#" className="text-gray-600 hover:text-klarvia-blue transition-colors">About</a>
              <a href="#" className="text-gray-600 hover:text-klarvia-blue transition-colors">Privacy</a>
              <a href="#" className="text-gray-600 hover:text-klarvia-blue transition-colors">Terms</a>
              <a href="#" className="text-gray-600 hover:text-klarvia-blue transition-colors">Support</a>
            </div>
          </div>
          <div className="border-t border-gray-100 mt-8 pt-8 text-center">
            <p className="text-gray-500">© 2024 Klarvia. All rights reserved. Empowering teams through AI-powered mental wellness.</p>
          </div>
        </div>
      </footer>
      
      <style jsx>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}