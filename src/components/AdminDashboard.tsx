import React, { useState, useEffect } from 'react';
import {
  fetchTherapists,
  fetchExercises,
  fetchResources,
  uploadResource,
  API_BASE_URL
} from '../api';
import { Plus, Edit2, Trash2, Users, BookOpen, Activity, MessageCircle, Settings, BarChart3 } from 'lucide-react';


interface Resource {
  id: number;
  title: string;
  type: 'podcast' | 'audiobook' | 'course';
  duration: string;
  category: string;
}

interface Therapist {
  id: number;
  name: string;
  specialization: string;
  availability: string;
  rating: number;
  image: string;
}

interface Exercise {
  id: number;
  title: string;
  duration: string;
  description: string;
  tag: string;
  tagColor: string;
}

function AdminDashboard() {
  const [showContentModal, setShowContentModal] = useState(false);
  const [showPsychologistModal, setShowPsychologistModal] = useState(false);
  const [showExerciseModal, setShowExerciseModal] = useState(false);
  const [editingContent, setEditingContent] = useState<Resource | null>(null);
  const [editingPsychologist, setEditingPsychologist] = useState<Therapist | null>(null);
  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null);

  const [contentList, setContentList] = useState<Resource[]>([]);
  const [psychologistList, setPsychologistList] = useState<Therapist[]>([]);
  const [exerciseList, setExerciseList] = useState<Exercise[]>([]);

  // Fetch all data on mount
  useEffect(() => {
    fetchTherapists().then(setPsychologistList);
    fetchExercises().then(setExerciseList);
    fetchResources().then(setContentList);
  }, []);

  // Modal form state
  const [resourceForm, setResourceForm] = useState<{
    title: string;
    type: 'podcast' | 'audiobook' | 'course';
    duration: string;
    category: string;
  }>({
    title: '',
    type: 'podcast',
    duration: '',
    category: ''
  });
  const [resourceFile, setResourceFile] = useState<File | null>(null);
  const [resourceUploadError, setResourceUploadError] = useState('');
  const [therapistForm, setTherapistForm] = useState({
    name: '',
    specialization: '',
    availability: '',
    rating: 4.5,
    image: '👩‍⚕️'
  });
  const [exerciseForm, setExerciseForm] = useState({
    title: '',
    duration: '',
    description: '',
    tag: '',
    tagColor: ''
  });

  // Populate forms for edit
  useEffect(() => {
    if (editingContent) {
      setResourceForm({
        title: editingContent.title,
        type: editingContent.type,
        duration: editingContent.duration,
        category: editingContent.category
      });
      setResourceFile(null);
    } else {
      setResourceForm({ title: '', type: 'podcast', duration: '', category: '' });
      setResourceFile(null);
    }
    setResourceUploadError('');
  }, [editingContent]);
  useEffect(() => {
    if (editingPsychologist) {
      setTherapistForm({
        name: editingPsychologist.name,
        specialization: editingPsychologist.specialization,
        availability: editingPsychologist.availability,
        rating: editingPsychologist.rating,
        image: editingPsychologist.image
      });
    } else {
      setTherapistForm({ name: '', specialization: '', availability: '', rating: 4.5, image: '👩‍⚕️' });
    }
  }, [editingPsychologist]);
  useEffect(() => {
    if (editingExercise) {
      setExerciseForm({
        title: editingExercise.title,
        duration: editingExercise.duration,
        description: editingExercise.description,
        tag: editingExercise.tag,
        tagColor: editingExercise.tagColor
      });
    } else {
      setExerciseForm({ title: '', duration: '', description: '', tag: '', tagColor: '' });
    }
  }, [editingExercise]);

  // CRUD API helpers
  async function addTherapist(data: Partial<Therapist>) {
    const res = await fetch(`${API_BASE_URL}/therapists`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (res.ok) fetchTherapists().then(setPsychologistList);
  }
  async function updateTherapist(id: number, data: Partial<Therapist>) {
    const res = await fetch(`${API_BASE_URL}/therapists/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (res.ok) fetchTherapists().then(setPsychologistList);
  }
  async function deleteTherapist(id: number) {
    const res = await fetch(`${API_BASE_URL}/therapists/${id}`, { method: 'DELETE' });
    if (res.ok) fetchTherapists().then(setPsychologistList);
  }

  async function addExercise(data: Partial<Exercise>) {
    const res = await fetch(`${API_BASE_URL}/exercises`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (res.ok) fetchExercises().then(setExerciseList);
  }
  async function updateExercise(id: number, data: Partial<Exercise>) {
    const res = await fetch(`${API_BASE_URL}/exercises/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (res.ok) fetchExercises().then(setExerciseList);
  }
  async function deleteExercise(id: number) {
    const res = await fetch(`${API_BASE_URL}/exercises/${id}`, { method: 'DELETE' });
    if (res.ok) fetchExercises().then(setExerciseList);
  }

  async function addResourceWithFile(data: Partial<Resource>, file: File | null) {
    if (file) {
      const formData = new FormData();
      formData.append('title', data.title || '');
      formData.append('type', data.type || 'podcast');
      formData.append('duration', data.duration || '');
      formData.append('category', data.category || '');
      formData.append('file', file);
      try {
        await uploadResource(formData);
        fetchResources().then(setContentList);
      } catch (err: any) {
        setResourceUploadError(err.message || 'Failed to upload resource');
      }
    } else {
      // fallback to old method if no file
      const res = await fetch(`${API_BASE_URL}/resources`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) fetchResources().then(setContentList);
    }
  }
  async function updateResource(id: number, data: Partial<Resource>) {
    const res = await fetch(`${API_BASE_URL}/resources/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (res.ok) fetchResources().then(setContentList);
  }
  async function deleteResource(id: number) {
    const res = await fetch(`${API_BASE_URL}/resources/${id}`, { method: 'DELETE' });
    if (res.ok) fetchResources().then(setContentList);
  }

  const handleDeleteContent = (id: number) => deleteResource(id);
  const handleDeletePsychologist = (id: number) => deleteTherapist(id);
  const handleDeleteExercise = (id: number) => deleteExercise(id);

  const openContentModal = (content?: Resource) => {
    setEditingContent(content || null);
    setShowContentModal(true);
  };
  const openPsychologistModal = (psychologist?: Therapist) => {
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
                <Settings className="w-5 h-5 text-gray-300" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">A</span>
                </div>
                <span className="text-gray-300">Admin</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* AI Therapist Management */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6">AI Therapist Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-600 rounded-2xl p-6 border border-blue-500">
              <div className="flex items-center justify-between mb-4">
                <MessageCircle className="w-8 h-8 text-white" />
                <div className="w-3 h-3 bg-white/30 rounded-full"></div>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Active Sessions</h3>
              <div className="text-3xl font-bold text-white mb-2">247</div>
              <p className="text-blue-100 text-sm mb-4">Currently active therapy sessions</p>
              <button className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                View All Sessions
              </button>
            </div>
            <div className="bg-green-600 rounded-2xl p-6 border border-green-500">
              <div className="flex items-center justify-between mb-4">
                <BarChart3 className="w-8 h-8 text-white" />
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">AI Model Status</h3>
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                <span className="text-green-100 font-semibold">Online & Healthy</span>
              </div>
              <p className="text-green-100 text-sm mb-4">Last updated: 2 minutes ago</p>
              <button className="bg-white text-green-600 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                Model Settings
              </button>
            </div>
          </div>
        </section>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-600 rounded-2xl p-6 border border-blue-500">
            <div className="flex items-center justify-between mb-4">
              <BookOpen className="w-8 h-8 text-white" />
              <div className="w-3 h-3 bg-white/30 rounded-full"></div>
            </div>
            <div>
              <p className="text-blue-100 text-sm font-medium mb-1">Learning Content</p>
              <p className="text-2xl font-bold text-white">{contentList.length}</p>
            </div>
          </div>
          <div className="bg-purple-600 rounded-2xl p-6 border border-purple-500">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-white" />
              <div className="w-3 h-3 bg-white/30 rounded-full"></div>
            </div>
            <div>
              <p className="text-purple-100 text-sm font-medium mb-1">Human Therapists</p>
              <p className="text-2xl font-bold text-white">{psychologistList.length}</p>
            </div>
          </div>
          <div className="bg-green-600 rounded-2xl p-6 border border-green-500">
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
              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-600/20 text-green-400 border border-green-600/30">
                {content.category}
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
              <form className="space-y-4" onSubmit={async e => {
                e.preventDefault();
                if (!resourceForm.title.trim() || !resourceForm.type.trim() || !resourceForm.duration.trim() || !resourceForm.category.trim()) {
                  alert('Please fill in all required fields.');
                  return;
                }
                if (editingContent) {
                  await updateResource(editingContent.id, {
                    ...resourceForm,
                    type: resourceForm.type as 'podcast' | 'audiobook' | 'course',
                  });
                } else {
                  await addResourceWithFile({
                    ...resourceForm,
                    type: resourceForm.type as 'podcast' | 'audiobook' | 'course',
                  }, resourceFile);
                }
                setShowContentModal(false);
                setEditingContent(null);
              }}>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                  <input
                    type="text"
                    value={resourceForm.title}
                    onChange={e => setResourceForm(f => ({ ...f, title: e.target.value }))}
                    className="w-full border border-gray-600 rounded-lg px-3 py-2 bg-gray-700 text-white placeholder-gray-400"
                    placeholder="Enter content title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
                  <select
                    value={resourceForm.type}
                    onChange={e => setResourceForm(f => ({ ...f, type: e.target.value as 'podcast' | 'audiobook' | 'course' }))}
                    className="w-full border border-gray-600 rounded-lg px-3 py-2 bg-gray-700 text-white"
                  >
                    <option value="podcast">Podcast</option>
                    <option value="audiobook">Audiobook</option>
                    <option value="course">Course</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Duration</label>
                  <input
                    type="text"
                    value={resourceForm.duration}
                    onChange={e => setResourceForm(f => ({ ...f, duration: e.target.value }))}
                    className="w-full border border-gray-600 rounded-lg px-3 py-2 bg-gray-700 text-white placeholder-gray-400"
                    placeholder="e.g. 45 min"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                  <input
                    type="text"
                    value={resourceForm.category}
                    onChange={e => setResourceForm(f => ({ ...f, category: e.target.value }))}
                    className="w-full border border-gray-600 rounded-lg px-3 py-2 bg-gray-700 text-white placeholder-gray-400"
                    placeholder="e.g. Mindfulness"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Upload File (image, audio, video)</label>
                  <input
                    type="file"
                    accept="image/*,audio/*,video/*"
                    onChange={e => setResourceFile(e.target.files?.[0] || null)}
                    className="w-full border border-gray-600 rounded-lg px-3 py-2 bg-gray-700 text-white"
                  />
                  {resourceUploadError && <div className="text-red-400 text-xs mt-1">{resourceUploadError}</div>}
                </div>
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => { setShowContentModal(false); setEditingContent(null); }}
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
              <form className="space-y-4" onSubmit={async e => {
                e.preventDefault();
                if (!therapistForm.name.trim() || !therapistForm.specialization.trim() || !therapistForm.availability.trim() || !therapistForm.image.trim()) {
                  alert('Please fill in all required fields.');
                  return;
                }
                if (therapistForm.image.length > 2) {
                  alert('Please enter a single emoji for the image.');
                  return;
                }
                if (editingPsychologist) {
                  await updateTherapist(editingPsychologist.id, therapistForm);
                } else {
                  await addTherapist(therapistForm);
                }
                setShowPsychologistModal(false);
                setEditingPsychologist(null);
              }}>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    value={therapistForm.name}
                    onChange={e => setTherapistForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full border border-gray-600 rounded-lg px-3 py-2 bg-gray-700 text-white placeholder-gray-400"
                    placeholder="Dr. John Doe"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Specialization</label>
                  <input
                    type="text"
                    value={therapistForm.specialization}
                    onChange={e => setTherapistForm(f => ({ ...f, specialization: e.target.value }))}
                    className="w-full border border-gray-600 rounded-lg px-3 py-2 bg-gray-700 text-white placeholder-gray-400"
                    placeholder="Anxiety & Depression"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Availability</label>
                  <input
                    type="text"
                    value={therapistForm.availability}
                    onChange={e => setTherapistForm(f => ({ ...f, availability: e.target.value }))}
                    className="w-full border border-gray-600 rounded-lg px-3 py-2 bg-gray-700 text-white placeholder-gray-400"
                    placeholder="Mon-Fri 9AM-5PM"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Rating</label>
                  <input
                    type="number"
                    value={therapistForm.rating}
                    onChange={e => setTherapistForm(f => ({ ...f, rating: parseFloat(e.target.value) }))}
                    min={1}
                    max={5}
                    step={0.1}
                    className="w-full border border-gray-600 rounded-lg px-3 py-2 bg-gray-700 text-white placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Image Emoji</label>
                  <input
                    type="text"
                    value={therapistForm.image}
                    onChange={e => setTherapistForm(f => ({ ...f, image: e.target.value }))}
                    className="w-full border border-gray-600 rounded-lg px-3 py-2 bg-gray-700 text-white placeholder-gray-400"
                    placeholder="👩‍⚕️"
                    maxLength={2}
                    required
                  />
                  <p className="text-xs text-gray-400 mt-1">Enter a single emoji (e.g. 👩‍⚕️ or 👨‍⚕️)</p>
                </div>
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => { setShowPsychologistModal(false); setEditingPsychologist(null); }}
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
              <form className="space-y-4" onSubmit={async e => {
                e.preventDefault();
                if (!exerciseForm.title.trim() || !exerciseForm.duration.trim() || !exerciseForm.tag.trim() || !exerciseForm.tagColor.trim()) {
                  alert('Please fill in all required fields.');
                  return;
                }
                if (editingExercise) {
                  await updateExercise(editingExercise.id, exerciseForm);
                } else {
                  await addExercise(exerciseForm);
                }
                setShowExerciseModal(false);
                setEditingExercise(null);
              }}>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                  <input
                    type="text"
                    value={exerciseForm.title}
                    onChange={e => setExerciseForm(f => ({ ...f, title: e.target.value }))}
                    className="w-full border border-gray-600 rounded-lg px-3 py-2 bg-gray-700 text-white placeholder-gray-400"
                    placeholder="Exercise title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Duration</label>
                  <input
                    type="text"
                    value={exerciseForm.duration}
                    onChange={e => setExerciseForm(f => ({ ...f, duration: e.target.value }))}
                    className="w-full border border-gray-600 rounded-lg px-3 py-2 bg-gray-700 text-white placeholder-gray-400"
                    placeholder="e.g. 5 min"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                  <textarea
                    rows={4}
                    value={exerciseForm.description}
                    onChange={e => setExerciseForm(f => ({ ...f, description: e.target.value }))}
                    className="w-full border border-gray-600 rounded-lg px-3 py-2 bg-gray-700 text-white placeholder-gray-400"
                    placeholder="Describe the exercise instructions..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Tag</label>
                  <input
                    type="text"
                    value={exerciseForm.tag}
                    onChange={e => setExerciseForm(f => ({ ...f, tag: e.target.value }))}
                    className="w-full border border-gray-600 rounded-lg px-3 py-2 bg-gray-700 text-white placeholder-gray-400"
                    placeholder="e.g. Focus"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Tag Color (CSS class)</label>
                  <input
                    type="text"
                    value={exerciseForm.tagColor}
                    onChange={e => setExerciseForm(f => ({ ...f, tagColor: e.target.value }))}
                    className="w-full border border-gray-600 rounded-lg px-3 py-2 bg-gray-700 text-white placeholder-gray-400"
                    placeholder="e.g. tag-focus"
                  />
                </div>
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => { setShowExerciseModal(false); setEditingExercise(null); }}
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
    </div>
  );
}

export default AdminDashboard;