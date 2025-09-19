import React, { useState, useEffect } from 'react';
import { 
  PlusCircle, 
  Edit3, 
  Trash2, 
  Search, 
  Calendar,
  MapPin,
  Users,
  Clock,
  X,
  Check,
  AlertTriangle,
  Filter,
  Eye
} from 'lucide-react';


import './global.css'; // import the animations


interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  description: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  attendees: number;
  banner?: string;
}

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

function App() {
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      name: 'Alumni Networking Gala 2025',
      date: '2025-02-15',
      time: '18:00',
      location: 'Grand Ballroom, Campus Center',
      description: 'Annual networking event connecting alumni across different industries and graduation years.',
      status: 'upcoming',
      attendees: 245
    },
    {
      id: '2',
      name: 'Tech Innovation Summit',
      date: '2025-01-28',
      time: '09:00',
      location: 'Auditorium A, Engineering Building',
      description: 'Showcasing latest technology trends and innovations by our alumni entrepreneurs.',
      status: 'upcoming',
      attendees: 180
    },
    {
      id: '3',
      name: 'Career Mentorship Workshop',
      date: '2025-01-10',
      time: '14:00',
      location: 'Conference Room 201',
      description: 'Interactive workshop connecting students with alumni mentors for career guidance.',
      status: 'completed',
      attendees: 95
    }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'upcoming' | 'ongoing' | 'completed'>('all');
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [pageLoaded, setPageLoaded] = useState(false);

  const [formData, setFormData] = useState<{
    name: string;
    date: string;
    time: string;
    location: string;
    description: string;
    status: 'upcoming' | 'ongoing' | 'completed';
  }>({
    name: '',
    date: '',
    time: '',
    location: '',
    description: '',
    status: 'upcoming'
  });

  useEffect(() => {
    setPageLoaded(true);
  }, []);

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 4000);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      date: '',
      time: '',
      location: '',
      description: '',
      status: 'upcoming'
    });
  };

  const handleCreate = () => {
    setShowCreateModal(true);
    resetForm();
  };

  const handleEdit = (event: Event) => {
    setSelectedEvent(event);
    setFormData({
      name: event.name,
      date: event.date,
      time: event.time,
      location: event.location,
      description: event.description,
      status: event.status
    });
    setShowEditModal(true);
  };

  const handleDelete = (event: Event) => {
    setSelectedEvent(event);
    setShowDeleteModal(true);
  };

  const handleSaveEvent = () => {
    if (!formData.name || !formData.date || !formData.time || !formData.location) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    const eventData = {
      ...formData,
      id: selectedEvent?.id || Date.now().toString(),
      attendees: selectedEvent?.attendees || 0
    };

    if (showEditModal && selectedEvent) {
      setEvents(prev => prev.map(event => event.id === selectedEvent.id ? eventData : event));
      showToast('Event updated successfully!', 'success');
      setShowEditModal(false);
    } else {
      setEvents(prev => [...prev, eventData]);
      showToast('Event created successfully!', 'success');
      setShowCreateModal(false);
    }

    resetForm();
    setSelectedEvent(null);
  };

  const confirmDelete = () => {
    if (selectedEvent) {
      setEvents(prev => prev.filter(event => event.id !== selectedEvent.id));
      showToast('Event deleted successfully!', 'success');
      setShowDeleteModal(false);
      setSelectedEvent(null);
    }
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || event.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'ongoing': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'completed': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 transition-all duration-1000 ${pageLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Background Effects */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-900 to-black pointer-events-none"></div>
      <div className="fixed inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(34,197,94,0.05)_50%,transparent_75%)] pointer-events-none"></div>

      <div className="relative z-10">
        {/* Header Section */}
        <header className={`p-6 md:p-8 border-b border-slate-700/50 backdrop-blur-sm transition-all duration-700 delay-300 ${pageLoaded ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent">
                  Manage Events
                </h1>
                <p className="text-slate-400 text-lg">
                  Create, update, and manage alumni & student events with ease.
                </p>
              </div>
              <button
                onClick={handleCreate}
                className="group flex items-center gap-2 bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-400 hover:to-teal-400 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/25"
              >
                <PlusCircle size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                Create Event
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto p-6 md:p-8">
          {/* Search and Filter Bar */}
          <div className={`mb-8 transition-all duration-700 delay-500 ${pageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 shadow-xl">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search events..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300"
                  />
                </div>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as any)}
                    className="pl-10 pr-8 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300 appearance-none cursor-pointer"
                  >
                    <option value="all">All Events</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Events Grid */}
          <div className={`grid gap-6 md:gap-8 transition-all duration-700 delay-700 ${pageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {filteredEvents.map((event, index) => (
              <div
                key={event.id}
                className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-500 hover:scale-[1.02] hover:bg-slate-800/70"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: pageLoaded ? 'slideInUp 0.6s ease-out forwards' : 'none'
                }}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors duration-300">
                          {event.name}
                        </h3>
                        <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                          <div className="flex items-center gap-2">
                            <Calendar size={16} />
                            {new Date(event.date).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock size={16} />
                            {event.time}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin size={16} />
                            {event.location}
                          </div>
                          <div className="flex items-center gap-2">
                            <Users size={16} />
                            {event.attendees} attendees
                          </div>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(event.status)}`}>
                        {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                      </div>
                    </div>
                    <p className="text-slate-300 mb-4">
                      {event.description}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(event)}
                      className="p-3 bg-blue-500/20 text-blue-400 rounded-xl hover:bg-blue-500/30 hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
                    >
                      <Edit3 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(event)}
                      className="p-3 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/25"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {filteredEvents.length === 0 && (
              <div className="text-center py-12">
                <div className="text-slate-400 text-lg mb-2">No events found</div>
                <div className="text-slate-500">Try adjusting your search or filter criteria</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create/Edit Modal */}
      {(showCreateModal || showEditModal) && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-slideUp">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                {showCreateModal ? 'Create New Event' : 'Edit Event'}
              </h2>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setShowEditModal(false);
                  resetForm();
                }}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-all duration-200"
              >
                <X size={20} />
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-slate-300 font-medium mb-2">Event Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300"
                  placeholder="Enter event name"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-2">Date *</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-2">Time *</label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-2">Location *</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300"
                  placeholder="Enter event location"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300"
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300 resize-none"
                  placeholder="Enter event description"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleSaveEvent}
                  className="flex-1 bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 rounded-xl font-semibold hover:from-green-400 hover:to-teal-400 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/25"
                >
                  {showCreateModal ? 'Create Event' : 'Update Event'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    setShowEditModal(false);
                    resetForm();
                  }}
                  className="px-6 py-3 bg-slate-700 text-slate-300 rounded-xl font-semibold hover:bg-slate-600 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedEvent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 w-full max-w-md animate-slideUp">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-500/20 mb-4">
                <AlertTriangle className="h-6 w-6 text-red-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Delete Event</h3>
              <p className="text-slate-400 mb-6">
                Are you sure you want to delete "<span className="text-white font-semibold">{selectedEvent.name}</span>"? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={confirmDelete}
                  className="flex-1 bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-400 transition-all duration-300 hover:scale-105"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedEvent(null);
                  }}
                  className="flex-1 bg-slate-700 text-slate-300 py-3 rounded-xl font-semibold hover:bg-slate-600 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notifications */}
      <div className="fixed top-4 right-4 space-y-2 z-50">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center gap-3 px-6 py-4 rounded-xl shadow-lg backdrop-blur-sm border animate-slideInFromRight ${
              toast.type === 'success'
                ? 'bg-green-500/20 border-green-500/30 text-green-400'
                : toast.type === 'error'
                ? 'bg-red-500/20 border-red-500/30 text-red-400'
                : 'bg-blue-500/20 border-blue-500/30 text-blue-400'
            }`}
          >
            {toast.type === 'success' && <Check size={20} />}
            {toast.type === 'error' && <AlertTriangle size={20} />}
            <span className="font-medium">{toast.message}</span>
          </div>
        ))}
      </div>

      
    </div>
  );
}

export default App;