import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchTherapists, fetchExercises, fetchResources, bookTherapistSession, fetchUserSessions } from '../api';
import { 
  MessageCircle, 
  Activity, 
  Users, 
  BookOpen, 
  Play, 
  Clock, 
  // Calendar,
  Headphones,
  Brain,
  Heart,
  Zap,
  Wind,
  Smile
} from 'lucide-react';

interface Exercise {
  id: number;
  title: string;
  duration: string;
  description: string;
  tag: string;
  tagColor: string;
}

interface Therapist {
  id: number;
  name: string;
  specialization: string;
  availability: string;
  rating: number;
  image: string;
}

interface Resource {
  id: number;
  title: string;
  type: 'podcast' | 'audiobook' | 'course';
  duration: string;
  category: string;
  fileUrl?: string;
}

export default function UserDashboard() {
  const navigate = useNavigate();
  // Booked sessions state
  const [sessions, setSessions] = useState<any[]>([]);
  // Fetch booked sessions for this user
  useEffect(() => {
    // For demo, use userId=1. Replace with real user id if available
    fetchUserSessions(1).then(setSessions).catch(() => setSessions([]));
  }, []);

  // Book session box state
  const [showBookingBox, setShowBookingBox] = useState(false);
  const [bookingTherapistId, setBookingTherapistId] = useState('');
  const [bookingDateBox, setBookingDateBox] = useState('');
  const [bookingTimeBox, setBookingTimeBox] = useState('');
  const [bookingLoadingBox, setBookingLoadingBox] = useState(false);
  const [bookingSuccessBox, setBookingSuccessBox] = useState(false);
  const [bookingErrorBox, setBookingErrorBox] = useState('');
  const username = localStorage.getItem('username') || 'User';

  const [animatedCounts, setAnimatedCounts] = useState({
    aiSessions: 0,
    exercises: 0,
    therapistSessions: 0,
    contentViewed: 0
  });
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  // Add showProfile state for profile modal
  const [showProfile, setShowProfile] = useState(false);
  // Add profileData state for profile modal
  const [profileData, setProfileData] = useState({
    name: username,
    email: '',
    phone: '',
    emergencyContact: '',
    preferences: {
      notifications: false,
      reminders: false,
      dataSharing: false
    }
  });

  // Fetch real data and animate counters
  useEffect(() => {
    async function loadData() {
      try {
        const [therapistsData, exercisesData, resourcesData] = await Promise.all([
          fetchTherapists(),
          fetchExercises(),
          fetchResources()
        ]);
        setTherapists(therapistsData);
        setExercises(exercisesData);
        setResources(resourcesData);
        // Animate counters based on real data
        const realCounts = {
          aiSessions: therapistsData.length + exercisesData.length + resourcesData.length, // Example: sum for demo
          exercises: exercisesData.length,
          therapistSessions: therapistsData.length,
          contentViewed: resourcesData.length
        };
        const duration = 2000;
        const steps = 60;
        const stepDuration = duration / steps;
        const intervals: number[] = Object.keys(realCounts).map(key => {
          const target = realCounts[key as keyof typeof realCounts];
          const increment = target / steps;
          let current = 0;
          let step = 0;
          const interval = window.setInterval(() => {
            step++;
            current = Math.min(Math.round(increment * step), target);
            setAnimatedCounts(prev => ({ ...prev, [key]: current }));
            if (step >= steps) {
              clearInterval(interval);
            }
          }, stepDuration);
          return interval;
        });
        return () => intervals.forEach(interval => clearInterval(interval));
      } catch (err: any) {
        // Optionally handle error
      }
    }
    loadData();
  }, []);


  // Modal state for exercise
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [timer, setTimer] = useState<number>(0);
  const [timerActive, setTimerActive] = useState(false);

  // Parse duration string like "5 min" or "10 min" to seconds
  function parseDuration(duration: string): number {
    const match = duration.match(/(\d+)/);
    if (!match) return 0;
    return parseInt(match[1], 10) * 60;
  }

  useEffect(() => {
    let interval: number | null = null;
    if (timerActive && timer > 0) {
      interval = window.setInterval(() => {
        setTimer(t => t - 1);
      }, 1000);
    } else if (timer === 0 && timerActive) {
      setTimerActive(false);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [timerActive, timer]);

  const ProgressRing = ({ progress, size = 60, strokeWidth = 4 }: { progress: number, size?: number, strokeWidth?: number }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (progress / 100) * circumference;

    return (
      <svg width={size} height={size} className="progress-ring">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#00AEEF"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="progress-ring-circle"
          strokeLinecap="round"
        />
      </svg>
    );
  };

  return (
    <div className="dashboard-bg font-body">

      {/* Book a Session Box */}
      <div className="max-w-2xl mx-auto mt-8 mb-8">
        <div className="glass-card rounded-2xl p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-heading font-bold text-gray-900">Book a Session</h2>
            <button
              className="bg-klarvia-blue text-white px-4 py-2 rounded font-semibold hover:bg-klarvia-blue-dark transition-colors"
              onClick={() => setShowBookingBox((v) => !v)}
            >
              {showBookingBox ? 'Close' : 'Book Now'}
            </button>
          </div>
          {showBookingBox && (
            <form
              className="mt-4 flex flex-col gap-3"
              onSubmit={async e => {
                e.preventDefault();
                setBookingLoadingBox(true);
                setBookingSuccessBox(false);
                setBookingErrorBox('');
                try {
                  if (!bookingTherapistId) throw new Error('Select a therapist');
                  await bookTherapistSession(
                    Number(bookingTherapistId),
                    1, // Replace with real user id if available
                    bookingDateBox,
                    bookingTimeBox
                  );
                  setBookingSuccessBox(true);
                  setBookingTherapistId('');
                  setBookingDateBox('');
                  setBookingTimeBox('');
                  // Refresh sessions
                  fetchUserSessions(1).then(setSessions).catch(() => setSessions([]));
                } catch (err: any) {
                  setBookingErrorBox(err.message || 'Failed to book session');
                } finally {
                  setBookingLoadingBox(false);
                }
              }}
            >
              <div>
                <label className="block text-gray-700 mb-1">Therapist</label>
                <select
                  className="w-full border rounded px-3 py-2"
                  value={bookingTherapistId}
                  onChange={e => setBookingTherapistId(e.target.value)}
                  required
                >
                  <option value="">Select Therapist</option>
                  {therapists.map(t => (
                    <option key={t.id} value={t.id}>{t.name} ({t.specialization})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  className="w-full border rounded px-3 py-2"
                  value={bookingDateBox}
                  onChange={e => setBookingDateBox(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Time</label>
                <input
                  type="time"
                  className="w-full border rounded px-3 py-2"
                  value={bookingTimeBox}
                  onChange={e => setBookingTimeBox(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-klarvia-blue text-white py-2 rounded font-semibold"
                disabled={bookingLoadingBox}
              >
                {bookingLoadingBox ? 'Booking...' : 'Book Session'}
              </button>
              {bookingSuccessBox && (
                <div className="text-green-600 font-bold text-center mt-2">Session booked successfully!</div>
              )}
              {bookingErrorBox && (
                <div className="text-red-600 font-bold text-center mt-2">{bookingErrorBox}</div>
              )}
            </form>
          )}
        </div>
      </div>
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-klarvia-blue to-klarvia-blue-dark rounded-xl flex items-center justify-center mr-3">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-heading font-bold text-gray-900">Klarvia</span>
            </div>
            <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-klarvia-blue to-klarvia-blue-dark rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">{username.charAt(0).toUpperCase()}</span>
                </div>
                <span className="text-gray-700 font-medium">{username}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Booked Sessions Box */}
        <div className="mb-12">
          <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">Your Booked Sessions</h2>
          {sessions.length === 0 ? (
            <div className="text-gray-500">No sessions booked yet.</div>
          ) : (
            <ul className="divide-y divide-gray-200 bg-white rounded-xl shadow p-4">
              {sessions.map(session => (
                <li key={session.id} className="py-3 flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <span className="font-semibold text-klarvia-blue">Therapist:</span> {therapists.find(t => t.id === session.therapistId)?.name || `ID ${session.therapistId}`}
                  </div>
                  <div>
                    <span className="font-semibold">Date:</span> {session.date} <span className="font-semibold ml-4">Time:</span> {session.time}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* Welcome Section */}

        <div className="mb-12">
          <h1 className="text-4xl font-heading font-bold text-gray-900 mb-3">
            Heyy.. 👋 How are you feeling today?
          </h1>
          <p className="text-xl text-gray-600 font-body">
            We're here for you. Start a session or browse tools that help.
          </p>

        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="glass-card glass-card-hover rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <ProgressRing progress={75} size={50} />
            </div>
            <div className="text-3xl font-heading font-bold text-gray-900 mb-1 counter-animate">
              {animatedCounts.aiSessions}
            </div>
            <div className="text-gray-600 text-sm font-medium">AI Sessions</div>
          </div>

          <div className="glass-card glass-card-hover rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <ProgressRing progress={60} size={50} />
            </div>
            <div className="text-3xl font-heading font-bold text-gray-900 mb-1 counter-animate">
              {animatedCounts.exercises}
            </div>
            <div className="text-gray-600 text-sm font-medium">Exercises Completed</div>
          </div>

          <div className="glass-card glass-card-hover rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <ProgressRing progress={30} size={50} />
            </div>
            <div className="text-3xl font-heading font-bold text-gray-900 mb-1 counter-animate">
              {animatedCounts.therapistSessions}
            </div>
            <div className="text-gray-600 text-sm font-medium">Human Therapist Sessions</div>
          </div>

          <div className="glass-card glass-card-hover rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <ProgressRing progress={40} size={50} />
            </div>
            <div className="text-3xl font-heading font-bold text-gray-900 mb-1 counter-animate">
              {animatedCounts.contentViewed}
            </div>
            <div className="text-gray-600 text-sm font-medium">Content Viewed</div>
          </div>
        </div>

        {/* AI Therapist CTA Section */}
        <section className="mb-12">
          <div className="glass-card rounded-3xl p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">
                  Your Personal AI Therapist
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Available 24/7. Trained in real-world techniques. Ready when you are.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    className="btn-primary text-white px-8 py-4 rounded-xl font-heading font-semibold text-lg"
                    onClick={() => alert('AI Session started! (Real integration coming soon)')}
                  >
                    Start Session
                  </button>
                  <button
                    className="btn-secondary px-8 py-4 rounded-xl font-heading font-semibold text-lg"
                    onClick={() => alert('Feature coming soon!')}
                  >
                    View Past Conversations
                  </button>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="avatar-glow">
                  <div className="w-48 h-48 bg-gradient-to-b from-gray-100 to-gray-200 rounded-full flex items-end justify-center overflow-hidden">
                    <div className="w-40 h-40 relative">
                      {/* Avatar Body */}
                      <div className="absolute bottom-0 w-full h-20 bg-gradient-to-b from-blue-200 to-blue-300 rounded-t-full"></div>
                      <div className="absolute bottom-0 w-full h-24 bg-gradient-to-b from-orange-100 to-orange-200 rounded-t-full opacity-90"></div>
                      
                      {/* Head */}
                      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-16 h-20 bg-gradient-to-b from-orange-200 to-orange-300 rounded-full">
                        {/* Hair */}
                        <div className="absolute -top-2 -left-2 w-20 h-14 bg-gray-800 rounded-t-full"></div>
                        <div className="absolute top-2 -left-1 w-18 h-12 bg-gray-800 rounded-full"></div>
                        <div className="absolute top-2 -right-1 w-18 h-12 bg-gray-800 rounded-full"></div>
                        
                        {/* Eyes */}
                        <div className="absolute top-6 left-3 w-1.5 h-1.5 bg-gray-800 rounded-full"></div>
                        <div className="absolute top-6 right-3 w-1.5 h-1.5 bg-gray-800 rounded-full"></div>
                        
                        {/* Smile */}
                        <div className="absolute top-9 left-1/2 transform -translate-x-1/2 w-3 h-1 bg-gray-700 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Exercises Section */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-heading font-bold text-gray-900">Quick Exercises</h2>
            <button className="text-klarvia-blue font-medium hover:text-klarvia-blue-dark transition-colors" onClick={() => alert('Feature coming soon!')}>
              View All
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {exercises.map((exercise) => (
              <div
                key={exercise.id}
                className="glass-card exercise-card rounded-2xl p-6 cursor-pointer"
                onClick={() => {
                  setSelectedExercise(exercise);
                  setTimer(parseDuration(exercise.duration));
                  setTimerActive(false);
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-klarvia-blue to-klarvia-blue-dark rounded-lg flex items-center justify-center">
                      {exercise.tag === 'Focus' && <Zap className="w-5 h-5 text-white" />}
                      {exercise.tag === 'Anxiety Relief' && <Heart className="w-5 h-5 text-white" />}
                      {exercise.tag === 'Stress Relief' && <Wind className="w-5 h-5 text-white" />}
                      {exercise.tag === 'Mindfulness' && <Smile className="w-5 h-5 text-white" />}
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-gray-900">{exercise.title}</h3>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Clock className="w-4 h-4 mr-1" />
                        {exercise.duration}
                      </div>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${exercise.tagColor}`}>
                    {exercise.tag}
                  </span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{exercise.description}</p>
              </div>
            ))}

            {/* Exercise Modal */}
            {selectedExercise && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full relative">
                  <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                    onClick={() => setSelectedExercise(null)}
                  >
                    ×
                  </button>
                  <h2 className="text-2xl font-bold mb-2">{selectedExercise.title}</h2>
                  <div className="mb-2 text-gray-600">{selectedExercise.description}</div>
                  <div className="mb-4 flex items-center text-gray-500">
                    <Clock className="w-5 h-5 mr-2" />
                    {selectedExercise.duration}
                  </div>
                  <div className="mb-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${selectedExercise.tagColor}`}>
                      {selectedExercise.tag}
                    </span>
                  </div>
                  <div className="flex flex-col items-center mb-4">
                    <div className="text-4xl font-mono mb-2">
                      {Math.floor(timer / 60).toString().padStart(2, '0')}:{(timer % 60).toString().padStart(2, '0')}
                    </div>
                    <button
                      className="bg-klarvia-blue text-white px-6 py-2 rounded-lg font-semibold hover:bg-klarvia-blue-dark transition-colors"
                      onClick={() => setTimerActive(t => !t)}
                    >
                      {timerActive ? 'Pause' : (timer === 0 ? 'Restart' : 'Start')}
                    </button>
                  </div>
                  {timer === 0 && (
                    <div className="text-green-600 font-bold text-center mt-2">Exercise Complete!</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>


        {/* Book Human Therapist Section (removed, now handled by Book a Session box) */}

        {/* Learning Resources Section */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-heading font-bold text-gray-900">Learning Resources</h2>
            <button className="text-klarvia-blue font-medium hover:text-klarvia-blue-dark transition-colors" onClick={() => alert('Feature coming soon!')}>
              View All
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((resource) => {
              // Prefer fileUrl if present
              let url = resource.fileUrl || `/uploads/${encodeURIComponent(resource.title)}.mp3`;
              return (
                <div
                  key={resource.id}
                  className="glass-card resource-card rounded-2xl p-6 cursor-pointer"
                  onClick={() => {
                    if ((resource.type === 'podcast' || resource.type === 'audiobook') && resource.fileUrl) {
                      navigate('/audio', { state: { resource: { ...resource, url: resource.fileUrl } } });
                    } else if (resource.type === 'podcast' || resource.type === 'audiobook') {
                      navigate('/audio', { state: { resource: { ...resource, url } } });
                    }
                  }}
                >
                  {/* Preview for image, audio, video */}
                  {resource.fileUrl && resource.fileUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i) && (
                    <img src={resource.fileUrl} alt={resource.title} className="w-full h-32 object-cover rounded-xl mb-3" />
                  )}
                  {resource.fileUrl && resource.fileUrl.match(/\.(mp3|wav|ogg)$/i) && (
                    <audio controls className="w-full mb-3">
                      <source src={resource.fileUrl} />
                    </audio>
                  )}
                  {resource.fileUrl && resource.fileUrl.match(/\.(mp4|webm|ogg)$/i) && (
                    <video controls className="w-full h-32 object-cover rounded-xl mb-3">
                      <source src={resource.fileUrl} />
                    </video>
                  )}
                  {/* Fallback icon if no preview */}
                  {!resource.fileUrl && (
                    <div className="w-12 h-12 bg-gradient-to-br from-klarvia-blue to-klarvia-blue-dark rounded-xl flex items-center justify-center mb-4">
                      {resource.type === 'podcast' && <Headphones className="w-6 h-6 text-white" />}
                      {resource.type === 'audiobook' && <BookOpen className="w-6 h-6 text-white" />}
                      {resource.type === 'course' && <Play className="w-6 h-6 text-white" />}
                    </div>
                  )}
                  <h3 className="font-heading font-semibold text-gray-900 mb-2">{resource.title}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <span className="capitalize">{resource.type}</span>
                    <span>{resource.duration}</span>
                  </div>
                  <span className="inline-block px-3 py-1 bg-pastel-blue text-blue-700 rounded-full text-xs font-medium">
                    {resource.category}
                  </span>
                </div>
              );
            })}

          </div>
        </section>
      </div>

      {/* Profile Modal */}
      {showProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-heading font-bold text-gray-900">Profile Settings</h2>
                <button
                  onClick={() => setShowProfile(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-klarvia-blue to-klarvia-blue-dark rounded-full flex items-center justify-center mr-6">
                  <span className="text-white font-bold text-2xl">{profileData.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{profileData.name}</h3>
                  <p className="text-gray-600">{profileData.email}</p>
                  <button className="text-klarvia-blue text-sm font-medium mt-1 hover:text-klarvia-blue-dark transition-colors">
                    Change Photo
                  </button>
                </div>
              </div>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-klarvia-blue focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-klarvia-blue focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-klarvia-blue focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact</label>
                    <input
                      type="text"
                      value={profileData.emergencyContact}
                      onChange={(e) => setProfileData({...profileData, emergencyContact: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-klarvia-blue focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Preferences</h4>
                  <div className="space-y-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={profileData.preferences.notifications}
                        onChange={(e) => setProfileData({
                          ...profileData,
                          preferences: {...profileData.preferences, notifications: e.target.checked}
                        })}
                        className="rounded border-gray-300 text-klarvia-blue focus:ring-klarvia-blue"
                      />
                      <span className="ml-3 text-gray-700">Email notifications</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={profileData.preferences.reminders}
                        onChange={(e) => setProfileData({
                          ...profileData,
                          preferences: {...profileData.preferences, reminders: e.target.checked}
                        })}
                        className="rounded border-gray-300 text-klarvia-blue focus:ring-klarvia-blue"
                      />
                      <span className="ml-3 text-gray-700">Session reminders</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={profileData.preferences.dataSharing}
                        onChange={(e) => setProfileData({
                          ...profileData,
                          preferences: {...profileData.preferences, dataSharing: e.target.checked}
                        })}
                        className="rounded border-gray-300 text-klarvia-blue focus:ring-klarvia-blue"
                      />
                      <span className="ml-3 text-gray-700">Share anonymized data for research</span>
                    </label>
                  </div>
                </div>
                
                <div className="flex space-x-4 pt-6">
                  <button
                    type="button"
                    onClick={() => setShowProfile(false)}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-klarvia-blue text-white py-3 rounded-xl font-semibold hover:bg-klarvia-blue-dark transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}