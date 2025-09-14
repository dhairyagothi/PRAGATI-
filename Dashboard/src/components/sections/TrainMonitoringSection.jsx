import React, { useState } from 'react';
import { 
  Train, 
  Clock, 
  MapPin, 
  Gauge, 
  AlertCircle, 
  CheckCircle,
  Users,
  Settings,
  Filter,
  Search
} from 'lucide-react';

const TrainMonitoringSection = ({ trains, stations }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedTrain, setSelectedTrain] = useState(null);

  const filteredTrains = trains.filter(train => {
    const matchesSearch = train.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         train.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || train.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'running': return 'text-green-400 bg-green-900';
      case 'halted': return 'text-red-400 bg-red-900';
      case 'approaching': return 'text-yellow-400 bg-yellow-900';
      default: return 'text-gray-300 bg-gray-100';
    }
  };

  const getDelayColor = (delay) => {
    if (delay <= 0) return 'text-green-400';
    if (delay <= 5) return 'text-yellow-400';
    return 'text-red-400';
  };

  const TrainCard = ({ train }) => (
    <div 
      className="bg-gray-900 rounded-lg shadow-sm border border-gray-700 p-6 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => setSelectedTrain(train)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Train className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-white">{train.name}</h3>
            <p className="text-sm text-gray-300">{train.id} • {train.type}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(train.status)}`}>
          {train.status.toUpperCase()}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-300">
            <MapPin className="w-4 h-4 mr-2" />
            <span>Next: {train.nextStation}</span>
          </div>
          <div className="flex items-center text-sm text-gray-300">
            <Clock className="w-4 h-4 mr-2" />
            <span>ETA: {train.estimatedArrival}</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-300">
            <Gauge className="w-4 h-4 mr-2" />
            <span>{train.speed} km/h</span>
          </div>
          <div className={`flex items-center text-sm font-medium ${getDelayColor(train.delay)}`}>
            <AlertCircle className="w-4 h-4 mr-2" />
            <span>{train.delay > 0 ? `+${train.delay}m delay` : 'On Time'}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>Priority: {train.priority}/10</span>
        <span>{train.direction === 'up' ? '↑ UP' : '↓ DOWN'}</span>
      </div>
    </div>
  );

  const TrainDetails = ({ train, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">{train.name}</h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-300"
            >
              ✕
            </button>
          </div>
          <p className="text-gray-300">{train.id} • {train.type}</p>
        </div>

        <div className="p-6 space-y-6">
          {/* Current Status */}
          <div>
            <h3 className="font-semibold text-white mb-3">Current Status</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-300">Status</p>
                <p className={`font-medium ${getStatusColor(train.status).replace('bg-', 'text-').replace('-100', '-600')}`}>
                  {train.status.toUpperCase()}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-300">Current Speed</p>
                <p className="font-medium text-white">{train.speed} km/h</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-300">Delay</p>
                <p className={`font-medium ${getDelayColor(train.delay)}`}>
                  {train.delay > 0 ? `+${train.delay} minutes` : 'On Time'}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-300">Priority</p>
                <p className="font-medium text-white">{train.priority}/10</p>
              </div>
            </div>
          </div>

          {/* Route Information */}
          <div>
            <h3 className="font-semibold text-white mb-3">Route Information</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-300">Origin</p>
                  <p className="font-medium text-white">{train.origin}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-300">Destination</p>
                  <p className="font-medium text-white">{train.destination}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-gray-300">Route:</span>
                {train.route.map((station, index) => (
                  <React.Fragment key={station}>
                    <span className={`${
                      stations.find(s => s.id === station)?.platforms.some(p => p.train === train.id) 
                        ? 'font-semibold text-blue-600' 
                        : 'text-white'
                    }`}>
                      {station}
                    </span>
                    {index < train.route.length - 1 && <span className="text-gray-400">→</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* Technical Details */}
          <div>
            <h3 className="font-semibold text-white mb-3">Technical Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-300">Locomotive</p>
                <p className="font-medium text-white">{train.locomotive}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-300">Coaches</p>
                <p className="font-medium text-white">{train.coaches}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-300">Crew</p>
                <p className="font-medium text-white">{train.crew}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-300">Platform Assigned</p>
                <p className="font-medium text-white">
                  {train.platformAssigned || 'Not Assigned'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Train Monitoring</h1>
        <p className="text-gray-300 mt-2">
          Real-time tracking of all trains in the Indore-Ujjain section
        </p>
      </div>

      {/* Filters and Search */}
      <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-700 p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search trains..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-gray-800 text-white border border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="running">Running</option>
                <option value="halted">Halted</option>
                <option value="approaching">Approaching</option>
              </select>
            </div>
          </div>
          <div className="text-sm text-gray-300">
            Showing {filteredTrains.length} of {trains.length} trains
          </div>
        </div>
      </div>

      {/* Train Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTrains.map(train => (
          <TrainCard key={train.id} train={train} />
        ))}
      </div>

      {/* Empty State */}
      {filteredTrains.length === 0 && (
        <div className="text-center py-12">
          <Train className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">No trains found</h3>
          <p className="text-gray-300">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Train Details Modal */}
      {selectedTrain && (
        <TrainDetails 
          train={selectedTrain} 
          onClose={() => setSelectedTrain(null)} 
        />
      )}
    </div>
  );
};

export default TrainMonitoringSection;
