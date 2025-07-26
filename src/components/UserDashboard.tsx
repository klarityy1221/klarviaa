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
                  <span className="text-white font-semibold text-sm">A</span>
                </div>
                <span className="text-gray-700 font-medium">Alex</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-heading font-bold text-gray-900 mb-3">
            Hi Alex 👋 How are you feeling today?
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

        {/* Book Human Therapist Section */}
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
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center text-2xl mr-4">
                    {therapist.image}
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-gray-900">{therapist.name}</h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <Star className="w-3 h-3 text-yellow-400 mr-1" />
                      {therapist.rating}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">{therapist.specialization}</p>
                <p className="text-sm text-green-600 font-medium mb-4">{therapist.availability}</p>
                <button className="w-full bg-klarvia-blue text-white py-3 rounded-xl font-medium hover:bg-klarvia-blue-dark transition-colors">
                  Book Session
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Learning Resources Section */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-heading font-bold text-gray-900">Learning Resources</h2>
            <button className="text-klarvia-blue font-medium hover:text-klarvia-blue-dark transition-colors">
              View All
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((resource) => (
              <div key={resource.id} className="glass-card resource-card rounded-2xl p-6 cursor-pointer">
                <div className="w-12 h-12 bg-gradient-to-br from-klarvia-blue to-klarvia-blue-dark rounded-xl flex items-center justify-center mb-4">
                  {resource.type === 'podcast' && <Headphones className="w-6 h-6 text-white" />}
                  {resource.type === 'audiobook' && <BookOpen className="w-6 h-6 text-white" />}
                  {resource.type === 'course' && <Play className="w-6 h-6 text-white" />}
                </div>
                <h3 className="font-heading font-semibold text-gray-900 mb-2">{resource.title}</h3>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <span className="capitalize">{resource.type}</span>
                  <span>{resource.duration}</span>
                </div>
                <span className="inline-block px-3 py-1 bg-pastel-blue text-blue-700 rounded-full text-xs font-medium">
                  {resource.category}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}