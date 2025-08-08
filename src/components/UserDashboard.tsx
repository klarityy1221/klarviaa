import React, { useState, useEffect } from 'react';
import { 
  MessageCircle, 
  Activity, 
  Users, 
  BookOpen, 
  Play, 
  Clock, 
  Calendar,
  Headphones,
  Brain,
  Heart,
  Zap,
  Wind,
  Smile,
  User,
  Star
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
}

export default function UserDashboard() {
  const [showProfile, setShowProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Alex Johnson',
    email: 'alex@example.com',
    phone: '+1 (555) 123-4567',
    emergencyContact: 'Sarah Johnson - +1 (555) 987-6543',
    preferences: {
      notifications: true,
      reminders: true,
      dataSharing: false
    }
  });

  const [animatedCounts, setAnimatedCounts] = useState({
    aiSessions: 0,
    exercises: 0,
    therapistSessions: 0,
    contentViewed: 0
  });

  const targetCounts = {
    aiSessions: 24,
    exercises: 12,
    therapistSessions: 3,
    contentViewed: 8
  };

  // Animate counters on component mount
  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    const intervals = Object.keys(targetCounts).map(key => {
      const target = targetCounts[key as keyof typeof targetCounts];
      const increment = target / steps;
      let current = 0;
      let step = 0;

      return setInterval(() => {
        step++;
        current = Math.min(Math.round(increment * step), target);
        setAnimatedCounts(prev => ({ ...prev, [key]: current }));
        
        if (step >= steps) {
          clearInterval(intervals.find(interval => interval === this));
        }
      }, stepDuration);
    });

    return () => intervals.forEach(interval => clearInterval(interval));
  }, []);

  const exercises: Exercise[] = [
    {
      id: 1,
      title: "Box Breathing",
      duration: "5 min",
      description: "Calm your nervous system with structured breathing",
      tag: "Focus",
      tagColor: "tag-focus"
    },
    {
      id: 2,
      title: "5-4-3-2-1 Grounding",
      duration: "3 min",
      description: "Ground yourself using your five senses",
      tag: "Anxiety Relief",
      tagColor: "tag-anxiety"
    },
    {
      id: 3,
      title: "Progressive Muscle Relaxation",
      duration: "15 min",
      description: "Release physical tension throughout your body",
      tag: "Stress Relief",
      tagColor: "tag-stress"
    },
    {
      id: 4,
      title: "Mindful Walking",
      duration: "10 min",
      description: "Practice mindfulness through gentle movement",
      tag: "Mindfulness",
      tagColor: "tag-mindfulness"
    }
  ];

  const therapists: Therapist[] = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialization: "Anxiety & Depression",
      availability: "Available Today",
      rating: 4.9,
      image: "👩‍⚕️"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialization: "Trauma Therapy",
      availability: "Next Available: Tomorrow",
      rating: 4.8,
      image: "👨‍⚕️"
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      specialization: "Cognitive Behavioral Therapy",
      availability: "Available Today",
      rating: 4.9,
      image: "👩‍⚕️"
    }
  ];

  const resources: Resource[] = [
    {
      id: 1,
      title: "Mindfulness for Beginners",
      type: "podcast",
      duration: "45 min",
      category: "Mindfulness"
    },
    {
      id: 2,
      title: "Overcoming Anxiety",
      type: "audiobook",
      duration: "3h 20min",
      category: "Anxiety"
    },
    {
      id: 3,
      title: "Sleep Better Tonight",
      type: "course",
      duration: "2h 15min",
      category: "Sleep"
    },
    {
      id: 4,
      title: "Stress Management Techniques",
      type: "podcast",
      duration: "30 min",
      category: "Stress"
    }
  ];

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
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-12 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-heading font-bold text-gray-900 mb-3">
              Hi {profileData.name.split(' ')[0]} 👋 How are you feeling today?
            </h1>
            <p className="text-xl text-gray-600 font-body">
              We're here for you. Start a session or browse tools that help.
            </p>
          </div>
          <button
            onClick={() => setShowProfile(true)}
            className="flex items-center space-x-3 glass-card rounded-xl p-3 hover:shadow-lg transition-all"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-klarvia-blue to-klarvia-blue-dark rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">{profileData.name.split(' ').map(n => n[0]).join('')}</span>
            </div>
            <div className="text-left">
              <div className="text-gray-900 font-medium">{profileData.name}</div>
              <div className="text-gray-500 text-sm">View Profile</div>
            </div>
          </button>
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
                  <button className="btn-primary text-white px-8 py-4 rounded-xl font-heading font-semibold text-lg">
                    Start Session
                  </button>
                  <button className="btn-secondary px-8 py-4 rounded-xl font-heading font-semibold text-lg">
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
            <button className="text-klarvia-blue font-medium hover:text-klarvia-blue-dark transition-colors">
              View All
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {exercises.map((exercise) => (
              <div key={exercise.id} className="glass-card exercise-card rounded-2xl p-6 cursor-pointer">
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
          </div>
        </section>

        {/* Quick Exercises Section */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-heading font-bold text-gray-900">Quick Exercises</h2>
            <button className="text-klarvia-blue font-medium hover:text-klarvia-blue-dark transition-colors">
              View All
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {exercises.map((exercise) => (
              <div key={exercise.id} className="glass-card exercise-card rounded-2xl p-6 cursor-pointer">
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
          </div>
        </section>

        {/* Book Human Therapist Section - Moved to more prominent position */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-heading font-bold text-gray-900">Book Human Therapist</h2>
            <button className="text-klarvia-blue font-medium hover:text-klarvia-blue-dark transition-colors">
              View All Therapists
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {therapists.map((therapist) => (
              <div key={therapist.id} className="glass-card therapist-card rounded-2xl p-6">
                  </div>
                </div>
                <span className="inline-block px-3 py-1 bg-pastel-blue text-blue-700 rounded-full text-xs font-medium">
                  {resource.category}
                <p className="text-sm text-gray-600 mb-3">{therapist.specialization}</p>
                <p className="text-sm text-green-600 font-medium mb-4">{therapist.availability}</p>
                <button className="w-full bg-klarvia-blue text-white py-3 rounded-xl font-medium hover:bg-klarvia-blue-dark transition-colors">
                  Book Session
                </button>
              </div>
            ))}
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