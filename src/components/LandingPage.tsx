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
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 overflow-hidden">
        {/* Floating Elements - Visual Enhancement */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-20 h-20 bg-klarvia-blue/10 rounded-full animate-pulse-slow"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-cyan-200/20 rounded-full animate-bounce-slow"></div>
          <div className="absolute bottom-40 left-20 w-12 h-12 bg-blue-200/30 rounded-full animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-40 w-24 h-24 bg-klarvia-blue/5 rounded-full animate-bounce-slow"></div>
          <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-cyan-300/20 rounded-full animate-pulse-slow"></div>
          <div className="absolute top-1/3 right-1/3 w-14 h-14 bg-blue-100/40 rounded-full animate-bounce-slow"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-5xl mx-auto">
            {/* Company Value Proposition - 10 words or less */}
            <div className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-klarvia-blue/20 shadow-lg">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
              <span className="text-klarvia-blue font-semibold text-sm tracking-wide uppercase">AI-Powered Mental Health Support</span>
            </div>

            {/* Clear, Concise Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-gray-900 mb-6 leading-tight">
              <span className="block">24/7 Mental Wellness</span>
              <span className="block text-klarvia-blue">For Your Workforce</span>
            </h1>
            
            {/* Supporting Subheadline with Key Benefits */}
            <p className="text-xl md:text-2xl text-gray-600 mb-4 leading-relaxed max-w-4xl mx-auto">
              Empower your employees with instant access to AI therapists, human counselors, and personalized mental health resources.
            </p>

            {/* Target Audience & Key Services */}
            <div className="flex flex-wrap justify-center gap-6 mb-12 text-gray-700">
              <div className="flex items-center bg-white/60 backdrop-blur-sm rounded-lg px-4 py-2 border border-gray-200/50">
                <Heart className="w-5 h-5 text-klarvia-blue mr-2" />
                <span className="font-medium">Anonymous & Confidential</span>
              </div>
              <div className="flex items-center bg-white/60 backdrop-blur-sm rounded-lg px-4 py-2 border border-gray-200/50">
                <Brain className="w-5 h-5 text-klarvia-blue mr-2" />
                <span className="font-medium">AI + Human Therapists</span>
              </div>
              <div className="flex items-center bg-white/60 backdrop-blur-sm rounded-lg px-4 py-2 border border-gray-200/50">
                <Shield className="w-5 h-5 text-klarvia-blue mr-2" />
                <span className="font-medium">Enterprise-Grade Security</span>
              </div>
            </div>

            {/* Primary Call-to-Action */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button
                onClick={onEnterPlatform}
                className="group relative bg-klarvia-blue text-white px-10 py-5 rounded-2xl font-heading font-bold text-lg hover:bg-klarvia-blue-dark transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
              >
                <span className="relative z-10">Start Free Session Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-klarvia-blue to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              
              <a 
                href="#how-it-works" 
                className="group flex items-center text-gray-700 font-semibold hover:text-klarvia-blue transition-colors duration-300"
              >
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                Watch 2-min Demo
              </a>
            </div>

            {/* Trust Signals */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 shadow-lg">
              <p className="text-gray-600 text-sm font-medium mb-6 uppercase tracking-wide">Trusted by Leading Organizations</p>
              
              {/* Stats as Trust Signals */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-klarvia-blue mb-1">10K+</div>
                  <div className="text-gray-600 text-sm">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-klarvia-blue mb-1">99.9%</div>
                  <div className="text-gray-600 text-sm">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-klarvia-blue mb-1">4.9★</div>
                  <div className="text-gray-600 text-sm">User Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-klarvia-blue mb-1">24/7</div>
                  <div className="text-gray-600 text-sm">Support</div>
                </div>
              </div>

              {/* Quick Testimonial */}
              <div className="mt-8 pt-6 border-t border-gray-200/50">
                <blockquote className="text-gray-700 italic mb-3">
                  "Klarvia transformed our employee wellness program. Mental health support is now accessible to everyone on our team."
                </blockquote>
                <div className="flex items-center justify-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-semibold text-sm">RK</span>
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900 text-sm">Riya Kumar</div>
                    <div className="text-gray-600 text-xs">HR Director, TechCorp</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Secondary Value Proposition Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-6">
                Why Choose Klarvia for Your Team?
              </h2>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Traditional employee assistance programs have limitations. Klarvia provides immediate, stigma-free mental health support that scales with your organization.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-klarvia-blue/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Heart className="w-5 h-5 text-klarvia-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Immediate Access</h3>
                    <p className="text-gray-600">No waiting lists or appointments. Support is available the moment your employees need it.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-klarvia-blue/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Shield className="w-5 h-5 text-klarvia-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Complete Privacy</h3>
                    <p className="text-gray-600">Anonymous sessions ensure employees feel safe seeking help without workplace stigma.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-klarvia-blue/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Brain className="w-5 h-5 text-klarvia-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Evidence-Based Care</h3>
                    <p className="text-gray-600">AI trained by licensed psychologists using proven therapeutic techniques.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced AI Avatar Visual */}
            <div className="order-1 lg:order-2 relative flex justify-center">
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
                <div className="absolute top-8 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg border border-klarvia-blue/20">
                  <span className="text-sm font-medium text-gray-700">Calm</span>
                </div>
                <div className="absolute bottom-32 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg border border-klarvia-blue/20">
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