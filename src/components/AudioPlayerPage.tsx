import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { resolveFileUrl } from '../api';

export default function AudioPlayerPage() {
  const location = useLocation();
  const navigate = useNavigate();
  // Resource info passed via state
  const resource = location.state?.resource;
  const [loading, setLoading] = useState(true);
  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    // Simulate animation loading
    setTimeout(() => {
      setLoading(false);
      setTimeout(() => setShowPlayer(true), 800); // Animation duration
    }, 1200);
  }, []);

  if (!resource) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
        <div className="text-2xl font-bold text-gray-700 mb-4">No resource found.</div>
        <button className="btn-primary" onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 via-blue-400 to-blue-600 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 z-0 animate-gradient-move bg-gradient-to-br from-blue-300 via-blue-500 to-blue-700 opacity-60"></div>
      <div className="relative z-10 w-full max-w-lg mx-auto p-8 flex flex-col items-center">
        <button className="absolute top-6 left-6 bg-white/70 rounded-full p-2 shadow hover:bg-white" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-6 h-6 text-blue-700" />
        </button>
        <div className="mb-8 mt-8">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-blue-700 flex items-center justify-center shadow-lg animate-spin-slow">
            <span className="text-5xl text-white">🎧</span>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2 text-center drop-shadow-lg">{resource.title}</h1>
        <div className="text-lg text-blue-100 mb-6 text-center">{resource.type === 'podcast' ? 'Podcast' : 'Audio'}</div>
        {loading && (
          <div className="w-full flex flex-col items-center justify-center my-8">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
            <div className="text-white text-lg">Loading audio...</div>
          </div>
        )}
        {showPlayer && (
          resource.url ? (
            (() => {
              const url = resource.url as string;
              const mime: string | undefined = resource.mimeType;
              const isVideo = (mime && /^video\//i.test(mime)) || /\.(mp4|webm|ogg)$/i.test(url);
              if (isVideo) {
                return (
                  <div className="w-full max-w-4xl mt-4 shadow-lg rounded-lg overflow-hidden bg-black">
                    <video
                      controls
                      autoPlay
                      // mute by default to improve autoplay chances in some browsers
                      muted={true}
                      className="w-full h-auto max-h-[70vh] object-contain bg-black"
                      playsInline
                    >
                      <source src={resolveFileUrl(url)} type={mime || 'video/mp4'} />
                      Your browser does not support the video element.
                    </video>
                  </div>
                );
              }
              // Fallback to audio player
              return (
                <audio controls autoPlay className="w-full max-w-md mt-4 shadow-lg rounded-lg">
                  <source src={resolveFileUrl(url)} type={mime || 'audio/mpeg'} />
                  Your browser does not support the audio element.
                </audio>
              );
            })()
          ) : (
            <div className="text-white">No media URL available.</div>
          )
        )}
      </div>
      {/* Animation CSS */}
      <style>{`
        .animate-gradient-move {
          background-size: 200% 200%;
          animation: gradientMove 8s ease-in-out infinite;
        }
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-spin-slow {
          animation: spin 4s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
