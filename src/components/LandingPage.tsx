import React from 'react';

interface LandingPageProps {
  setCurrentView: (view: 'landing' | 'user' | 'admin' | 'auth') => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ setCurrentView }) => {
  return (
    <div className="min-h-screen bg-white font-body">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 overflow-hidden">
        {/* Navigation Bar - Fixed at top */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              {/* Logo */}
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-klarvia-blue to-klarvia-blue-dark rounded-xl flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-lg">K</span>
                </div>
                <span className="text-2xl font-heading font-bold text-gray-900">Klarvia</span>
              </div>

              {/* Navigation Links */}
              <div className="hidden md:flex items-center space-x-8">
                <a 
                  href="#how-it-works" 
                  className="text-gray-700 hover:text-klarvia-blue font-medium transition-colors duration-200"
                >
                  How It Works
                </a>
                <a 
                  href="#features" 
                  className="text-gray-700 hover:text-klarvia-blue font-medium transition-colors duration-200"
                >
                  Features
                </a>
              </div>

              {/* Single Authentication Button */}
              <button
                onClick={() => setCurrentView('auth')}
                className="bg-klarvia-blue text-white px-6 py-2 rounded-lg font-semibold hover:bg-klarvia-blue-dark transition-colors duration-200"
              >
                Login / Register
              </button>
            </div>
          </div>
        </nav>

        {/* Floating Elements - Visual Enhancement */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-20 h-20 bg-klarvia-blue/10 rounded-full animate-pulse-slow"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-cyan-200/20 rounded-full animate-bounce-slow"></div>
          <div className="absolute bottom-40 left-20 w-12 h-12 bg-blue-200/30 rounded-full animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-40 w-24 h-24 bg-klarvia-blue/5 rounded-full animate-bounce-slow"></div>
          <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-cyan-300/20 rounded-full animate-pulse-slow"></div>
          <div className="absolute top-1/3 right-1/3 w-14 h-14 bg-blue-100/40 rounded-full animate-bounce-slow"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-20 text-center relative z-10 mt-20">
          {/* Value Proposition Badge */}
          <div className="inline-flex items-center bg-klarvia-blue/10 border border-klarvia-blue/20 rounded-full px-6 py-3 mb-8">
            <div className="w-2 h-2 bg-klarvia-blue rounded-full mr-3 animate-pulse"></div>
            <span className="text-klarvia-blue font-semibold text-sm">AI-Powered Mental Health Support</span>
          </div>

          {/* Main Headlines */}
          <h1 className="text-5xl lg:text-7xl font-heading font-bold text-gray-900 mb-6 leading-tight">
            24/7 Mental Wellness<br />
            <span className="text-klarvia-blue">For Your Workforce</span>
          </h1>

          <p className="text-xl lg:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            Combine AI therapy with human therapists. Anonymous, confidential, and enterprise-secure. 
            Remove workplace stigma while providing immediate mental health support.
          </p>

          {/* Key Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/40">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">🔒</span>
              </div>
              <h3 className="font-heading font-bold text-gray-900 mb-2">Anonymous & Confidential</h3>
              <p className="text-gray-600 text-sm">Complete privacy protection removes workplace stigma</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/40">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">🤖</span>
              </div>
              <h3 className="font-heading font-bold text-gray-900 mb-2">AI + Human Therapists</h3>
              <p className="text-gray-600 text-sm">Best of both worlds: instant AI support + expert human care</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/40">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">🏢</span>
              </div>
              <h3 className="font-heading font-bold text-gray-900 mb-2">Enterprise-Grade Security</h3>
              <p className="text-gray-600 text-sm">HIPAA compliant with enterprise security standards</p>
            </div>
          </div>

          {/* Primary Call-to-Action */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button
              onClick={() => setCurrentView('auth')}
              className="group relative bg-klarvia-blue text-white px-10 py-5 rounded-2xl font-heading font-bold text-lg hover:bg-klarvia-blue-dark transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
            >
              <span className="relative z-10">Start Free Session Now</span>
              <div className="absolute inset-0 bg-gradient-to-r from-klarvia-blue to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            <a 
              href="#how-it-works" 
              className="text-gray-700 hover:text-klarvia-blue font-medium transition-colors duration-200"
            >
              How It Works
            </a>
            <a 
              href="#features" 
              className="text-gray-700 hover:text-klarvia-blue font-medium transition-colors duration-200"
            >
              Watch 2-min Demo
            </a>
          </div>

          {/* Trust Signals */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-klarvia-blue mb-1">15K+</div>
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

          {/* Testimonial */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto border border-white/40">
            <div className="flex items-center justify-center mb-4">
              <div className="flex text-yellow-400">
                ★★★★★
              </div>
            </div>
            <blockquote className="text-lg text-gray-700 italic mb-4">
              "Klarvia transformed our employee wellness program. Anonymous access removed barriers, 
              and our team's mental health metrics improved 40% in just 3 months."
            </blockquote>
            <div className="text-gray-600">
              <strong>Sarah Chen</strong> - HR Director, TechCorp
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-6">
              Why Choose Klarvia for Your Team?
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Traditional employee assistance programs have limitations. Klarvia provides immediate, stigma-free mental health support that scales with your organization.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🚀</span>
              </div>
              <h3 className="text-xl font-heading font-bold text-gray-900 mb-4">Instant Access</h3>
              <p className="text-gray-600 leading-relaxed">
                No waiting lists or appointments. Your employees get immediate support when they need it most, 24/7.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🛡️</span>
              </div>
              <h3 className="text-xl font-heading font-bold text-gray-900 mb-4">Complete Privacy</h3>
              <p className="text-gray-600 leading-relaxed">
                Anonymous sessions ensure employees feel safe seeking help without fear of workplace judgment or career impact.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">📊</span>
              </div>
              <h3 className="text-xl font-heading font-bold text-gray-900 mb-4">Measurable Results</h3>
              <p className="text-gray-600 leading-relaxed">
                Track wellness metrics and ROI with comprehensive analytics while maintaining individual privacy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-6">
              Comprehensive Mental Health Platform
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Everything your organization needs to support employee mental wellness, from AI-powered conversations to human expert care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-heading font-bold text-gray-900 mb-4">AI Therapy Sessions</h3>
              <p className="text-gray-600 leading-relaxed">
                Advanced AI trained on evidence-based therapeutic techniques provides immediate, personalized support for common mental health challenges.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-xl font-heading font-bold text-gray-900 mb-4">Human Therapists</h3>
              <p className="text-gray-600 leading-relaxed">
                Licensed mental health professionals available for complex cases, crisis intervention, and ongoing therapeutic relationships.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">🧘</span>
              </div>
              <h3 className="text-xl font-heading font-bold text-gray-900 mb-4">Wellness Tools</h3>
              <p className="text-gray-600 leading-relaxed">
                Guided meditations, breathing exercises, mood tracking, and personalized wellness plans to support daily mental health.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-xl font-heading font-bold text-gray-900 mb-4">Learning Resources</h3>
              <p className="text-gray-600 leading-relaxed">
                Curated library of mental health content, including articles, podcasts, and interactive courses on stress management and resilience.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">🚨</span>
              </div>
              <h3 className="text-xl font-heading font-bold text-gray-900 mb-4">Crisis Support</h3>
              <p className="text-gray-600 leading-relaxed">
                24/7 crisis intervention with immediate escalation to human therapists and emergency services when needed.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-heading font-bold text-gray-900 mb-4">Analytics Dashboard</h3>
              <p className="text-gray-600 leading-relaxed">
                Aggregate wellness insights for HR teams to understand trends and measure program effectiveness while protecting individual privacy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer id="footer" className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-klarvia-blue to-klarvia-blue-dark rounded-xl flex items-center justify-center mr-3">
                  <span className="text-white font-bold">K</span>
                </div>
                <div>
                  <div className="text-lg font-heading font-bold text-gray-900">Klarvia</div>
                  <div className="text-sm text-gray-600">AI + Human mental health for teams</div>
                </div>
              </div>
              <p className="text-sm text-gray-600">Built with care to protect employee privacy and deliver measurable wellbeing outcomes.</p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4">Important Links</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="/about" className="hover:text-klarvia-blue">About</a></li>
                <li><a href="/terms" className="hover:text-klarvia-blue">Terms of Service</a></li>
                <li><a href="/privacy" className="hover:text-klarvia-blue">Privacy Policy</a></li>
                <li><a href="/careers" className="hover:text-klarvia-blue">Careers</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="/blog" className="hover:text-klarvia-blue">Blog</a></li>
                <li><a href="/docs" className="hover:text-klarvia-blue">Documentation</a></li>
                <li><a href="/support" className="hover:text-klarvia-blue">Support</a></li>
                <li><a href="/contact" className="hover:text-klarvia-blue">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4">Founder</h4>
              <div className="flex items-start">
                <div className="w-12 h-12 bg-klarvia-blue rounded-full flex items-center justify-center text-white font-semibold mr-4">AR</div>
                <div className="text-sm text-gray-700">
                  <div className="font-medium">Alex Rivera</div>
                  <div className="text-gray-600">Founder & CEO</div>
                  <div className="mt-2 text-sm text-gray-600">alex@klarvia.com</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-gray-100 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
            <div>© {new Date().getFullYear()} Klarvia — All rights reserved.</div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <a href="https://twitter.com" className="hover:text-klarvia-blue">Twitter</a>
              <a href="https://linkedin.com" className="hover:text-klarvia-blue">LinkedIn</a>
              <a href="mailto:hello@klarvia.com" className="hover:text-klarvia-blue">hello@klarvia.com</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
