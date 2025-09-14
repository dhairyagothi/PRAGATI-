import React, { useState } from 'react';
import { 
  Building2, 
  CheckCircle, 
  XCircle, 
  Clock, 
  ArrowRight,
  AlertTriangle,
  RefreshCw,
  Users
} from 'lucide-react';

const PlatformManagementSection = ({ stations, trains }) => {
  const [selectedStation, setSelectedStation] = useState(stations[0]?.id || '');

  const selectedStationData = stations.find(s => s.id === selectedStation);

  const getPlatformStatusColor = (status) => {
    switch (status) {
      case 'free': return 'text-green-600 bg-green-100';
      case 'occupied': return 'text-red-600 bg-red-100';
      case 'maintenance': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-300 bg-gray-100';
    }
  };

  const PlatformCard = ({ platform, stationCode }) => (
    <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-700 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-white">Platform {platform.id}</h3>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPlatformStatusColor(platform.status)}`}>
          {platform.status.toUpperCase()}
        </span>
      </div>
      
      {platform.status === 'occupied' && platform.train && (
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-300">Train: {platform.train}</span>
          </div>
          {platform.estimatedClearTime && (
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-300">Clear by: {platform.estimatedClearTime}</span>
            </div>
          )}
        </div>
      )}
      
      {platform.status === 'free' && (
        <div className="text-sm text-gray-300">Available for assignment</div>
      )}
      
      {platform.status === 'maintenance' && (
        <div className="text-sm text-yellow-700">Under maintenance</div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Platform Management</h1>
        <p className="text-gray-300 mt-2">
          Real-time platform availability and dynamic routing recommendations
        </p>
      </div>

      {/* Station Selector */}
      <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-700 p-4">
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-300">Select Station:</label>
          <select
            value={selectedStation}
            onChange={(e) => setSelectedStation(e.target.value)}
            className="bg-gray-800 text-white border border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {stations.map(station => (
              <option key={station.id} value={station.id}>
                {station.name} ({station.code})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Station Overview */}
      {selectedStationData && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-700 p-4">
            <h4 className="font-medium text-white mb-2">Total Platforms</h4>
            <p className="text-2xl font-bold text-blue-600">{selectedStationData.platforms.length}</p>
          </div>
          <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-700 p-4">
            <h4 className="font-medium text-white mb-2">Available</h4>
            <p className="text-2xl font-bold text-green-600">
              {selectedStationData.platforms.filter(p => p.status === 'free').length}
            </p>
          </div>
          <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-700 p-4">
            <h4 className="font-medium text-white mb-2">Occupied</h4>
            <p className="text-2xl font-bold text-red-600">
              {selectedStationData.platforms.filter(p => p.status === 'occupied').length}
            </p>
          </div>
          <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-700 p-4">
            <h4 className="font-medium text-white mb-2">Loop Lines</h4>
            <p className="text-2xl font-bold text-purple-600">{selectedStationData.loopLines}</p>
          </div>
        </div>
      )}

      {/* Platform Status */}
      {selectedStationData && (
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Platform Status - {selectedStationData.name}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {selectedStationData.platforms.map(platform => (
              <PlatformCard 
                key={platform.id} 
                platform={platform} 
                stationCode={selectedStationData.code}
              />
            ))}
          </div>
        </div>
      )}

      {/* Dynamic Rerouting Recommendations */}
      <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Dynamic Rerouting Recommendations</h3>
        <div className="space-y-4">
          <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-medium text-blue-900">Platform Conflict Detected</h4>
                <p className="text-sm text-blue-700 mt-1">
                  Train 22911 (Shipra Express) scheduled for Platform 3 at UJN, but platform occupied
                </p>
                <div className="mt-3 flex items-center space-x-2 text-sm text-blue-700">
                  <span>Recommended:</span>
                  <span className="font-medium">Platform 3</span>
                  <ArrowRight className="w-4 h-4" />
                  <span className="font-medium">Platform 5</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700">
                  Accept
                </button>
                <button className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700">
                  Ignore
                </button>
              </div>
            </div>
          </div>
          
          <div className="border border-yellow-200 rounded-lg p-4 bg-yellow-50">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-medium text-yellow-900">Maintenance Window</h4>
                <p className="text-sm text-yellow-700 mt-1">
                  Platform 4 at INDB scheduled for maintenance 14:00-16:00
                </p>
                <div className="mt-3 flex items-center space-x-2 text-sm text-yellow-700">
                  <span>Action:</span>
                  <span className="font-medium">Reroute affected trains to Platforms 1-3</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                  Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* All Stations Overview */}
      <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Network Platform Status</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stations.map(station => (
            <div key={station.id} className="text-center p-3 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-white">{station.code}</h4>
              <p className="text-xs text-gray-300 mb-2">{station.name}</p>
              <div className="flex justify-center space-x-1">
                {station.platforms.map((platform, idx) => (
                  <div
                    key={idx}
                    className={`w-3 h-3 rounded-full ${
                      platform.status === 'free' ? 'bg-green-500' :
                      platform.status === 'occupied' ? 'bg-red-500' : 'bg-yellow-500'
                    }`}
                    title={`Platform ${platform.id}: ${platform.status}`}
                  ></div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {station.platforms.filter(p => p.status === 'free').length}/{station.platforms.length} free
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlatformManagementSection;
