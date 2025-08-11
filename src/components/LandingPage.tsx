interface LandingPageProps {
  setCurrentView: (view: 'landing' | 'user' | 'admin' | 'auth') => void;
}

// Placeholder for missing ArrowRight icon
const ArrowRight = ({ className }: { className?: string }) => (
  <span className={className} style={{display:'inline-block',width:20,height:20}}>&rarr;</span>
);

// Placeholder for missing onEnterPlatform handler
const onEnterPlatform = () => {};

const LandingPage: React.FC<LandingPageProps> = ({ setCurrentView }) => {
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
                className="text-gray-600 hover:text-klarvia-blue transition-colors font-medium"
                onClick={() => setCurrentView('auth')}
              >
                Login / Register
              </button>
              <button
                onClick={() => setCurrentView('auth')}
                className="bg-klarvia-blue text-white px-8 py-4 rounded-xl font-heading font-semibold text-lg hover:bg-klarvia-blue-dark transition-colors"
              >
                Start Free Session
              </button>
              <button
                onClick={() => setCurrentView('auth')}
                className="bg-gray-200 text-gray-900 px-6 py-3 rounded-xl font-heading font-semibold border border-gray-300 hover:bg-gray-300"
                aria-label="Admin Login"
              >
                Admin Login
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

        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <button
            onClick={() => setCurrentView('auth')}
            className="bg-klarvia-blue text-white px-8 py-4 rounded-xl font-heading font-semibold text-lg hover:bg-klarvia-blue-dark transition-colors"
          >
            Start Free Session
          </button>
          <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-heading font-semibold text-lg hover:border-gray-400 transition-colors">
            See How it Works
          </button>
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
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button
                onClick={() => setCurrentView('auth')}
                className="bg-klarvia-blue text-white px-8 py-4 rounded-xl font-heading font-semibold text-lg hover:bg-klarvia-blue-dark transition-colors"
              >
                Start Free Session
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-heading font-semibold text-lg hover:border-gray-400 transition-colors">
                See How it Works
              </button>
            </div>
          </a>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;