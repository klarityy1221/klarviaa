import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { resolveFileUrl } from '../api';

export default function VideoPlayerPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const resource = location.state?.resource;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  if (!resource) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">No media selected</h2>
          <button className="btn-primary" onClick={() => navigate(-1)}>Go back</button>
        </div>
      </div>
    );
  }

  const src = resolveFileUrl(resource.url || resource.fileUrl);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-6xl">
        <button className="mb-4 inline-flex items-center gap-2 bg-white/10 text-white px-3 py-2 rounded-lg hover:bg-white/20" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="relative bg-black rounded-xl overflow-hidden shadow-2xl">
          {/* Large hero video */}
          <video
            src={src}
            controls
            autoPlay
            muted
            playsInline
            className="w-full h-[60vh] md:h-[70vh] object-cover bg-black"
          />

          {/* Overlay info */}
          <div className="absolute left-6 bottom-6 text-left text-white">
            <h1 className="text-2xl md:text-4xl font-bold drop-shadow-lg">{resource.title}</h1>
            <p className="text-sm md:text-base text-white/80 mt-1">{resource.type} • {resource.duration || ''}</p>
          </div>

          {/* Gradient vignette */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        </div>

        {/* Controls strip */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="bg-white text-black px-4 py-2 rounded-lg font-semibold">Like</button>
            <button className="bg-white/10 text-white px-4 py-2 rounded-lg">Add to Playlist</button>
          </div>
          <div className="text-sm text-white/70">Enjoy your listening — fullscreen supported</div>
        </div>
      </div>
    </div>
  );
}
