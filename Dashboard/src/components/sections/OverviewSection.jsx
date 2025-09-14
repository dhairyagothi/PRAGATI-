import React from 'react';
import { 
  Train, 
  AlertTriangle, 
  Clock, 
  TrendingUp,
  MapPin,
  Activity,
  CheckCircle,
  XCircle
} from 'lucide-react';

const OverviewSection = ({ trains, stations, conflicts, currentTime }) => {
  // Calculate statistics
  const totalTrains = trains.length;
  const runningTrains = trains.filter(t => t.status === 'running').length;
  const delayedTrains = trains.filter(t => t.delay > 0).length;
  const onTimeTrains = trains.filter(t => t.delay <= 0).length;
  const highPriorityConflicts = conflicts.filter(c => c.priority === 'high').length;
  const avgDelay = trains.reduce((sum, t) => sum + Math.max(0, t.delay), 0) / totalTrains;

  const StatCard = ({ title, value, subtitle, icon: Icon, color, trend }) => (
    <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-700 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-300">{title}</p>
          <p className={`text-3xl font-bold ${color}`}>{value}</p>
          {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-full ${color.replace('text-', 'bg-').replace('-600', '-800')}`}>
          <Icon className={`w-6 h-6 ${color.replace('-600', '-400')}`} />
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center">
          <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
          <span className="text-sm text-green-300">+{trend}% from yesterday</span>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">System Overview</h1>
        <p className="text-gray-300 mt-2">
          Real-time status of Indore-Ujjain section • Last updated: {currentTime.toLocaleTimeString()}
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Trains"
          value={totalTrains}
          subtitle={`${runningTrains} running`}
          icon={Train}
          color="text-blue-600"
          trend="5"
        />
        <StatCard
          title="On Time Performance"
          value={`${Math.round((onTimeTrains / totalTrains) * 100)}%`}
          subtitle={`${onTimeTrains} of ${totalTrains} trains`}
          icon={CheckCircle}
          color="text-green-600"
          trend="12"
        />
        <StatCard
          title="Active Conflicts"
          value={conflicts.length}
          subtitle={`${highPriorityConflicts} high priority`}
          icon={AlertTriangle}
          color="text-red-600"
        />
        <StatCard
          title="Average Delay"
          value={`${avgDelay.toFixed(1)}m`}
          subtitle="Across all trains"
          icon={Clock}
          color="text-orange-600"
        />
      </div>

      {/* Real-time Status Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Trains Status */}
        <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Active Trains</h3>
          <div className="space-y-3">
            {trains.slice(0, 5).map(train => (
              <div key={train.id} className="flex items-center justify-between py-2 border-b border-gray-700 last:border-b-0">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    train.status === 'running' ? 'bg-green-500' :
                    train.status === 'halted' ? 'bg-red-500' : 'bg-yellow-500'
                  }`}></div>
                  <div>
                    <p className="font-medium text-white">{train.name}</p>
                    <p className="text-sm text-gray-400">{train.id} • {train.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${
                    train.delay > 0 ? 'text-red-400' : 'text-green-400'
                  }`}>
                    {train.delay > 0 ? `+${train.delay}m` : 'On Time'}
                  </p>
                  <p className="text-xs text-gray-400">{train.speed} km/h</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Current Conflicts */}
        <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Priority Conflicts</h3>
          <div className="space-y-3">
            {conflicts.slice(0, 3).map(conflict => (
              <div key={conflict.id} className="border border-gray-700 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className={`inline-block w-2 h-2 rounded-full ${
                        conflict.priority === 'high' ? 'bg-red-500' :
                        conflict.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                      }`}></span>
                      <p className="font-medium text-white capitalize">{conflict.type} Conflict</p>
                    </div>
                    <p className="text-sm text-gray-300 mt-1">{conflict.description}</p>
                    <p className="text-xs text-gray-400 mt-2">{conflict.location}</p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-sm font-medium text-red-400">{conflict.timeToConflict}m</p>
                    <p className="text-xs text-gray-400">to conflict</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Network Status */}
      <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Network Status</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stations.map(station => (
            <div key={station.id} className="text-center p-3 bg-gray-800 rounded-lg">
              <MapPin className="w-5 h-5 text-gray-300 mx-auto mb-2" />
              <p className="font-medium text-white text-sm">{station.code}</p>
              <p className="text-xs text-gray-400">{station.name}</p>
              <div className="mt-2 flex justify-center space-x-1">
                {station.platforms.map((platform, idx) => (
                  <div
                    key={idx}
                    className={`w-2 h-2 rounded-full ${
                      platform.status === 'occupied' ? 'bg-red-500' :
                      platform.status === 'free' ? 'bg-green-500' : 'bg-yellow-500'
                    }`}
                    title={`Platform ${platform.id}: ${platform.status}`}
                  ></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* System Health */}
      <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">System Health</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <Activity className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <p className="font-semibold text-green-400">COA Integration</p>
            <p className="text-sm text-gray-300">Connected & Syncing</p>
          </div>
          <div className="text-center">
            <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <p className="font-semibold text-green-400">AI Engine</p>
            <p className="text-sm text-gray-300">Processing Normally</p>
          </div>
          <div className="text-center">
            <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <p className="font-semibold text-green-400">Data Feed</p>
            <p className="text-sm text-gray-300">Real-time Updates</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewSection;