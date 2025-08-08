import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Users, BookOpen, Activity, MessageCircle, Settings, BarChart3 } from 'lucide-react';

interface Content {
  id: number;
  title: string;
  type: 'podcast' | 'audiobook' | 'course';
  status: 'active' | 'archived';
}

interface Psychologist {
  id: number;
  name: string;
  specialization: string;
  availability: string;
}

interface Exercise {
  id: number;
  title: string;
  description: string;
}

export default function AdminDashboard() {
  const [showSettings, setShowSettings] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [adminProfile, setAdminProfile] = useState({
    name: 'Admin User',
    email: 'admin@klarvia.com',
    role: 'System Administrator',
    phone: '+1 (555) 123-4567',
    department: 'IT Operations'
  });
  const [systemSettings, setSystemSettings] = useState({
    maintenanceMode: false,
    userRegistration: true,
    emailNotifications: true,
    dataRetention: '365',
    sessionTimeout: '30',
    maxFileSize: '10'
  });

  const [showContentModal, setShowContentModal] = useState(false);
  const [showPsychologistModal, setShowPsychologistModal] = useState(false);
  const [showExerciseModal, setShowExerciseModal] = useState(false);
  const [editingContent, setEditingContent] = useState<Content | null>(null);
  const [editingPsychologist, setEditingPsychologist] = useState<Psychologist | null>(null);
  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null);

  const [contentList, setContentList] = useState<Content[]>([
    { id: 1, title: "Understanding Anxiety: A Complete Guide", type: "podcast", status: "active" },
    { id: 2, title: "Cognitive Behavioral Therapy Workbook", type: "audiobook", status: "active" },
    { id: 3, title: "Mindfulness-Based Stress Reduction Course", type: "course", status: "active" },
    { id: 4, title: "Sleep Hygiene and Mental Health", type: "podcast", status: "active" },
    { id: 5, title: "Managing Depression Through Daily Habits", type: "audiobook", status: "active" },
    { id: 6, title: "Workplace Mental Health Training", type: "course", status: "archived" },
  ]);

  const [psychologistList, setPsychologistList] = useState<Psychologist[]>([
    { id: 1, name: "Dr. Sarah Johnson", specialization: "Anxiety & Depression Specialist", availability: "Mon-Fri 9AM-5PM" },
    { id: 2, name: "Dr. Michael Chen", specialization: "Trauma & PTSD Therapy", availability: "Tue-Thu 10AM-6PM" },
    { id: 3, name: "Dr. Emily Rodriguez", specialization: "Cognitive Behavioral Therapy", availability: "Mon-Wed 8AM-4PM" },
    { id: 4, name: "Dr. James Wilson", specialization: "Family & Relationship Counseling", availability: "Wed-Fri 1PM-8PM" },
    { id: 5, name: "Dr. Lisa Park", specialization: "Addiction & Recovery Support", availability: "Mon-Fri 10AM-6PM" },
  ]);

  const [exerciseList, setExerciseList] = useState<Exercise[]>([
    { id: 1, title: "Box Breathing Technique", description: "A structured breathing exercise that helps regulate the nervous system and reduce anxiety through a 4-4-4-4 count pattern." },
    { id: 2, title: "5-4-3-2-1 Grounding Exercise", description: "An effective grounding technique that uses all five senses to bring awareness to the present moment and reduce overwhelming feelings." },
    { id: 3, title: "Progressive Muscle Relaxation", description: "A systematic approach to releasing physical tension by consciously tensing and then relaxing different muscle groups throughout the body." },
    { id: 4, title: "Mindful Walking Meditation", description: "A moving meditation practice that combines gentle physical activity with mindfulness to reduce stress and improve mental clarity." },
    { id: 5, title: "Body Scan Meditation", description: "A guided practice that involves systematically focusing attention on different parts of the body to promote relaxation and body awareness." },
    { id: 6, title: "Loving-Kindness Meditation", description: "A compassion-focused meditation that helps develop positive emotions and reduce negative self-talk through directed well-wishes." },
  ]);

  const handleDeleteContent = (id: number) => {
    setContentList(contentList.filter(item => item.id !== id));
  };

  const handleDeletePsychologist = (id: number) => {
    setPsychologistList(psychologistList.filter(item => item.id !== id));
  };

  const handleDeleteExercise = (id: number) => {
    setExerciseList(exerciseList.filter(item => item.id !== id));
  };

  const openContentModal = (content?: Content) => {
    setEditingContent(content || null);
    setShowContentModal(true);
  };

  const openPsychologistModal = (psychologist?: Psychologist) => {
    setEditingPsychologist(psychologist || null);
    setShowPsychologistModal(true);
  };

  const openExerciseModal = (exercise?: Exercise) => {
    setEditingExercise(exercise || null);
    setShowExerciseModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
              <p className="text-gray-400">Manage your AI therapist platform and additional resources.</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                <Settings 
                  className="w-5 h-5 text-gray-300" 
                  onClick={() => setShowSettings(true)}
                />
              </button>
              <button 
                onClick={() => setShowProfile(true)}
                className="flex items-center space-x-3 hover:bg-gray-700 rounded-lg p-2 transition-colors"
              >
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">A</span>
                </div>
                <span className="text-gray-300">{adminProfile.name}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* AI Therapist Management */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6">AI Therapist Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 border border-blue-500">
              <div className="flex items-center justify-between mb-4">
                <MessageCircle className="w-8 h-8 text-white" />
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Active Sessions</h3>
              <div className="text-3xl font-bold text-white mb-2">1,247</div>
              <p className="text-blue-100 text-sm mb-4">Active therapy sessions this month</p>
              <button className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                View All Sessions
              </button>
            </div>
            <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-6 border border-green-500">
              <div className="flex items-center justify-between mb-4">
                <BarChart3 className="w-8 h-8 text-white" />
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">AI Model Status</h3>
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                <span className="text-green-100 font-semibold">Optimal Performance</span>
              </div>
              <p className="text-green-100 text-sm mb-4">99.9% uptime this month</p>
              <button className="bg-white text-green-600 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                Model Settings
              </button>
            </div>
          </div>
        </section>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 border border-blue-500">
            <div className="flex items-center justify-between mb-4">
              <BookOpen className="w-8 h-8 text-white" />
              <div className="w-3 h-3 bg-white/30 rounded-full"></div>
            </div>
            <div>
              <p className="text-blue-100 text-sm font-medium mb-1">Learning Content</p>
              <p className="text-2xl font-bold text-white">{contentList.length}</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-6 border border-purple-500">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-white" />
              <div className="w-3 h-3 bg-white/30 rounded-full"></div>
            </div>
            <div>
              <p className="text-purple-100 text-sm font-medium mb-1">Human Therapists</p>
              <p className="text-2xl font-bold text-white">{psychologistList.length}</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-6 border border-green-500">
            <div className="flex items-center justify-between mb-4">
              <Activity className="w-8 h-8 text-white" />
              <div className="w-3 h-3 bg-white/30 rounded-full"></div>
            </div>
            <div>
              <p className="text-green-100 text-sm font-medium mb-1">Quick Exercises</p>
              <p className="text-2xl font-bold text-white">{exerciseList.length}</p>
            </div>
          </div>
        </div>

        {/* Manage Content Library */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-white">Manage Learning Resources</h2>
            <button
              onClick={() => openContentModal()}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center border border-blue-500"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Content
            </button>
          </div>
          <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {contentList.map((content) => (
                  <tr key={content.id} className="hover:bg-gray-700/50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{content.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        content.type === 'podcast' ? 'bg-blue-600/20 text-blue-400 border border-blue-600/30' :
                        content.type === 'audiobook' ? 'bg-purple-600/20 text-purple-400 border border-purple-600/30' :
                        'bg-green-600/20 text-green-400 border border-green-600/30'
                      }`}>
                        {content.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        content.status === 'active' ? 'bg-green-600/20 text-green-400 border border-green-600/30' : 'bg-gray-600/20 text-gray-400 border border-gray-600/30'
                      }`}>
                        {content.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => openContentModal(content)}
                        className="text-blue-400 hover:text-blue-300 p-1"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteContent(content.id)}
                        className="text-red-400 hover:text-red-300 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Manage Psychologists */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-white">Manage Human Therapists</h2>
            <button
              onClick={() => openPsychologistModal()}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center border border-purple-500"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Therapist
            </button>
          </div>
          <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Specialization</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Availability</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {psychologistList.map((psychologist) => (
                  <tr key={psychologist.id} className="hover:bg-gray-700/50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{psychologist.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{psychologist.specialization}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{psychologist.availability}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => openPsychologistModal(psychologist)}
                        className="text-blue-400 hover:text-blue-300 p-1"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeletePsychologist(psychologist.id)}
                        className="text-red-400 hover:text-red-300 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Manage Exercises */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-white">Manage Quick Exercises</h2>
            <button
              onClick={() => openExerciseModal()}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center border border-green-500"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Exercise
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exerciseList.map((exercise) => (
              <div key={exercise.id} className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                <h3 className="font-semibold text-white mb-2">{exercise.title}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-3">{exercise.description}</p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => openExerciseModal(exercise)}
                    className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors text-sm border border-blue-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteExercise(exercise.id)}
                    className="bg-red-600 text-white py-2 px-3 rounded-lg hover:bg-red-700 transition-colors text-sm border border-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Content Modal */}
        {showContentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-2xl p-6 max-w-md w-full mx-4 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-4">
                {editingContent ? 'Edit Content' : 'Add New Content'}
              </h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                  <input
                    type="text"
                    defaultValue={editingContent?.title || ''}
                    className="w-full border border-gray-600 rounded-lg px-3 py-2 bg-gray-700 text-white placeholder-gray-400"
                    placeholder="Enter content title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
                  <select
                    defaultValue={editingContent?.type || 'podcast'}
                    className="w-full border border-gray-600 rounded-lg px-3 py-2 bg-gray-700 text-white"
                  >
                    <option value="podcast">Podcast</option>
                    <option value="audiobook">Audiobook</option>
                    <option value="course">Course</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Upload Link</label>
                  <input
                    type="url"
                    className="w-full border border-gray-600 rounded-lg px-3 py-2 bg-gray-700 text-white placeholder-gray-400"
                    placeholder="https://example.com/content"
                  />
                </div>
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowContentModal(false)}
                    className="flex-1 bg-gray-700 text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors border border-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors border border-blue-500"
                  >
                    {editingContent ? 'Update' : 'Add'} Content
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Psychologist Modal */}
        {showPsychologistModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-2xl p-6 max-w-md w-full mx-4 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-4">
                {editingPsychologist ? 'Edit Therapist' : 'Add New Therapist'}
              </h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    defaultValue={editingPsychologist?.name || ''}
                    className="w-full border border-gray-600 rounded-lg px-3 py-2 bg-gray-700 text-white placeholder-gray-400"
                    placeholder="Dr. John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Specialization</label>
                  <input
                    type="text"
                    defaultValue={editingPsychologist?.specialization || ''}
                    className="w-full border border-gray-600 rounded-lg px-3 py-2 bg-gray-700 text-white placeholder-gray-400"
                    placeholder="Anxiety & Depression"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Schedule</label>
                  <select className="w-full border border-gray-600 rounded-lg px-3 py-2 bg-gray-700 text-white">
                    <option>Mon-Fri 9AM-5PM</option>
                    <option>Tue-Thu 10AM-6PM</option>
                    <option>Mon-Wed 8AM-4PM</option>
                    <option>Weekend only</option>
                  </select>
                </div>
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowPsychologistModal(false)}
                    className="flex-1 bg-gray-700 text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors border border-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors border border-purple-500"
                  >
                    {editingPsychologist ? 'Update' : 'Add'} Therapist
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Exercise Modal */}
        {showExerciseModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-2xl p-6 max-w-md w-full mx-4 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-4">
                {editingExercise ? 'Edit Exercise' : 'Add New Exercise'}
              </h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                  <input
                    type="text"
                    defaultValue={editingExercise?.title || ''}
                    className="w-full border border-gray-600 rounded-lg px-3 py-2 bg-gray-700 text-white placeholder-gray-400"
                    placeholder="Exercise title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                  <textarea
                    rows={4}
                    defaultValue={editingExercise?.description || ''}
                    className="w-full border border-gray-600 rounded-lg px-3 py-2 bg-gray-700 text-white placeholder-gray-400"
                    placeholder="Describe the exercise instructions..."
                  />
                </div>
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowExerciseModal(false)}
                    className="flex-1 bg-gray-700 text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors border border-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors border border-green-500"
                  >
                    {editingExercise ? 'Update' : 'Add'} Exercise
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
            <div className="p-6 border-b border-gray-700">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-white">System Settings</h2>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-gray-400 hover:text-gray-300 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">General Settings</h3>
                  <div className="space-y-4">
                    <label className="flex items-center justify-between">
                      <span className="text-gray-300">Maintenance Mode</span>
                      <input
                        type="checkbox"
                        checked={systemSettings.maintenanceMode}
                        onChange={(e) => setSystemSettings({...systemSettings, maintenanceMode: e.target.checked})}
                        className="rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500"
                      />
                    </label>
                    <label className="flex items-center justify-between">
                      <span className="text-gray-300">User Registration</span>
                      <input
                        type="checkbox"
                        checked={systemSettings.userRegistration}
                        onChange={(e) => setSystemSettings({...systemSettings, userRegistration: e.target.checked})}
                        className="rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500"
                      />
                    </label>
                    <label className="flex items-center justify-between">
                      <span className="text-gray-300">Email Notifications</span>
                      <input
                        type="checkbox"
                        checked={systemSettings.emailNotifications}
                        onChange={(e) => setSystemSettings({...systemSettings, emailNotifications: e.target.checked})}
                        className="rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500"
                      />
                    </label>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Security & Performance</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Data Retention (days)</label>
                      <input
                        type="number"
                        value={systemSettings.dataRetention}
                        onChange={(e) => setSystemSettings({...systemSettings, dataRetention: e.target.value})}
                        className="w-full border border-gray-600 rounded-lg px-3 py-2 bg-gray-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Session Timeout (minutes)</label>
                      <input
                        type="number"
                        value={systemSettings.sessionTimeout}
                        onChange={(e) => setSystemSettings({...systemSettings, sessionTimeout: e.target.value})}
                        className="w-full border border-gray-600 rounded-lg px-3 py-2 bg-gray-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Max File Size (MB)</label>
                      <input
                        type="number"
                        value={systemSettings.maxFileSize}
                        onChange={(e) => setSystemSettings({...systemSettings, maxFileSize: e.target.value})}
                        className="w-full border border-gray-600 rounded-lg px-3 py-2 bg-gray-700 text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-4 pt-8">
                <button
                  onClick={() => setShowSettings(false)}
                  className="flex-1 bg-gray-700 text-gray-300 py-3 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {showProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
            <div className="p-6 border-b border-gray-700">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-white">Admin Profile</h2>
                <button
                  onClick={() => setShowProfile(false)}
                  className="text-gray-400 hover:text-gray-300 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center mb-8">
                <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mr-6">
                  <span className="text-white font-bold text-2xl">A</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">{adminProfile.name}</h3>
                  <p className="text-gray-400">{adminProfile.role}</p>
                  <button className="text-blue-400 text-sm font-medium mt-1 hover:text-blue-300 transition-colors">
                    Change Photo
                  </button>
                </div>
              </div>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={adminProfile.name}
                      onChange={(e) => setAdminProfile({...adminProfile, name: e.target.value})}
                      className="w-full border border-gray-600 rounded-lg px-4 py-3 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      value={adminProfile.email}
                      onChange={(e) => setAdminProfile({...adminProfile, email: e.target.value})}
                      className="w-full border border-gray-600 rounded-lg px-4 py-3 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={adminProfile.phone}
                      onChange={(e) => setAdminProfile({...adminProfile, phone: e.target.value})}
                      className="w-full border border-gray-600 rounded-lg px-4 py-3 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Department</label>
                    <input
                      type="text"
                      value={adminProfile.department}
                      onChange={(e) => setAdminProfile({...adminProfile, department: e.target.value})}
                      className="w-full border border-gray-600 rounded-lg px-4 py-3 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
                  <select
                    value={adminProfile.role}
                    onChange={(e) => setAdminProfile({...adminProfile, role: e.target.value})}
                    className="w-full border border-gray-600 rounded-lg px-4 py-3 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="System Administrator">System Administrator</option>
                    <option value="Content Manager">Content Manager</option>
                    <option value="User Manager">User Manager</option>
                    <option value="Analytics Manager">Analytics Manager</option>
                  </select>
                </div>
                
                <div className="flex space-x-4 pt-6">
                  <button
                    type="button"
                    onClick={() => setShowProfile(false)}
                    className="flex-1 bg-gray-700 text-gray-300 py-3 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
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