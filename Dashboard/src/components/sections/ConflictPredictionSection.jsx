import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Clock, 
  TrendingUp, 
  Target,
  CheckCircle,
  XCircle,
  Brain,
  Zap,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';

const ConflictPredictionSection = ({ conflicts, trains }) => {
  const [selectedConflict, setSelectedConflict] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'low': return 'text-green-400 bg-green-900 border-green-700';
      default: return 'text-gray-300 bg-gray-100 border-gray-700';
    }
  };

  const getConflictTypeIcon = (type) => {
    switch (type) {
      case 'overtake': return <TrendingUp className="w-5 h-5" />;
      case 'crossing': return <Target className="w-5 h-5" />;
      case 'platform': return <CheckCircle className="w-5 h-5" />;
      default: return <AlertTriangle className="w-5 h-5" />;
    }
  };

  const ConflictCard = ({ conflict }) => (
    <div 
      className={`bg-gray-900 rounded-lg shadow-sm border-2 p-4 cursor-pointer hover:shadow-md transition-shadow ${
        getPriorityColor(conflict.priority)
      }`}
      onClick={() => setSelectedConflict(conflict)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          {getConflictTypeIcon(conflict.type)}
          <h3 className="font-semibold text-white capitalize">{conflict.type} Conflict</h3>
        </div>
        <div className="text-right">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(conflict.priority)}`}>
            {conflict.priority.toUpperCase()}
          </span>
        </div>
      </div>

      <p className="text-sm text-gray-300 mb-3">{conflict.description}</p>
      
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <p className="text-xs text-gray-500">Location</p>
          <p className="text-sm font-medium text-white">{conflict.location}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Time to Conflict</p>
          <p className="text-sm font-medium text-red-600">{conflict.timeToConflict} minutes</p>
        </div>
      </div>

      <div className="border-t border-gray-700 pt-3">
        <p className="text-xs text-gray-500 mb-1">AI Recommendation</p>
        <p className="text-sm text-gray-300">{conflict.recommendation}</p>
      </div>

      <div className="mt-3 flex justify-between items-center">
        <div className="text-xs text-gray-500">
          Network Delay Impact: +{conflict.impact.networkDelay}m
        </div>
        <div className={`text-xs px-2 py-1 rounded ${
          conflict.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
          conflict.status === 'resolved' ? 'bg-green-900 text-green-300' :
          'bg-blue-100 text-blue-700'
        }`}>
          {conflict.status}
        </div>
      </div>
    </div>
  );

  const ConflictDetails = ({ conflict, onClose }) => {
    const involvedTrains = trains.filter(t => conflict.trains.includes(t.id));
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-gray-900 rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getConflictTypeIcon(conflict.type)}
                <h2 className="text-xl font-semibold text-white capitalize">
                  {conflict.type} Conflict Analysis
                </h2>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(conflict.priority)}`}>
                  {conflict.priority.toUpperCase()} PRIORITY
                </span>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-300">✕</button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Conflict Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-red-50 p-4 rounded-lg">
                <Clock className="w-6 h-6 text-red-600 mb-2" />
                <p className="text-sm text-red-600">Time to Conflict</p>
                <p className="text-2xl font-bold text-red-600">{conflict.timeToConflict}m</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <Target className="w-6 h-6 text-blue-600 mb-2" />
                <p className="text-sm text-blue-600">Location</p>
                <p className="text-lg font-semibold text-blue-600">{conflict.location}</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <TrendingUp className="w-6 h-6 text-orange-600 mb-2" />
                <p className="text-sm text-orange-600">Network Impact</p>
                <p className="text-2xl font-bold text-orange-600">+{conflict.impact.networkDelay}m</p>
              </div>
            </div>

            {/* Involved Trains */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Involved Trains</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {involvedTrains.map((train, index) => (
                  <div key={train.id} className="border border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-white">{train.name}</h4>
                      <span className="text-sm text-gray-500">Train {index + 1}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-gray-500">Current Speed</p>
                        <p className="font-medium">{train.speed} km/h</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Current Delay</p>
                        <p className={`font-medium ${train.delay > 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {train.delay > 0 ? `+${train.delay}m` : 'On Time'}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Priority</p>
                        <p className="font-medium">{train.priority}/10</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Type</p>
                        <p className="font-medium">{train.type}</p>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-700">
                      <p className="text-gray-500 text-xs">Predicted Impact</p>
                      <p className="font-medium text-red-600">
                        +{index === 0 ? conflict.impact.delayTrain1 : conflict.impact.delayTrain2}m additional delay
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Recommendation */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="w-6 h-6 text-purple-600" />
                <h3 className="text-lg font-semibold text-white">AI Recommendation</h3>
                <span className="text-sm text-purple-600 bg-purple-100 px-2 py-1 rounded">
                  Network-wide Optimized
                </span>
              </div>
              <p className="text-gray-300 mb-4">{conflict.recommendation}</p>
              
              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  <CheckCircle className="w-4 h-4 inline mr-2" />
                  Implement Recommendation
                </button>
                <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors">
                  <Brain className="w-4 h-4 inline mr-2" />
                  Request Alternative
                </button>
                <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                  <Pause className="w-4 h-4 inline mr-2" />
                  Monitor Only
                </button>
              </div>
            </div>

            {/* Simulation Results */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">What-If Analysis</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-300">If No Action Taken</p>
                    <p className="text-xl font-bold text-red-600">+25m</p>
                    <p className="text-xs text-gray-500">Total Network Delay</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-300">With AI Recommendation</p>
                    <p className="text-xl font-bold text-green-600">+{conflict.impact.networkDelay}m</p>
                    <p className="text-xs text-gray-500">Total Network Delay</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-300">Improvement</p>
                    <p className="text-xl font-bold text-blue-600">
                      -{25 - conflict.impact.networkDelay}m
                    </p>
                    <p className="text-xs text-gray-500">Delay Reduction</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Conflict Prediction</h1>
          <p className="text-gray-300 mt-2">
            AI-powered conflict analysis and network-wide optimization
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              autoRefresh ? 'bg-green-900 text-green-300' : 'bg-gray-800 text-gray-300'
            }`}
          >
            {autoRefresh ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            <span>Auto Refresh</span>
          </button>
          
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <RotateCcw className="w-4 h-4" />
            <span>Refresh Analysis</span>
          </button>
        </div>
      </div>

      {/* AI Engine Status */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-100 rounded-full">
              <Brain className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">PRAGATI AI Engine</h3>
              <p className="text-gray-300">Network-wide optimization active</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2 text-green-600">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-medium">Processing</span>
            </div>
            <p className="text-sm text-gray-300">Last analysis: 30 seconds ago</p>
          </div>
        </div>
      </div>

      {/* Conflict Priority Queue */}
      <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Priority Conflict Queue</h3>
        <div className="space-y-3">
          {conflicts
            .sort((a, b) => {
              const priorityOrder = { high: 3, medium: 2, low: 1 };
              return priorityOrder[b.priority] - priorityOrder[a.priority] || a.timeToConflict - b.timeToConflict;
            })
            .map((conflict, index) => (
              <div key={conflict.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className="text-sm font-bold text-gray-500 w-8">#{index + 1}</div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    {getConflictTypeIcon(conflict.type)}
                    <span className="font-medium text-white capitalize">{conflict.type}</span>
                    <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(conflict.priority)}`}>
                      {conflict.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 mt-1">{conflict.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-red-600">{conflict.timeToConflict}m</p>
                  <p className="text-xs text-gray-500">to conflict</p>
                </div>
                <button
                  onClick={() => setSelectedConflict(conflict)}
                  className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
                >
                  Analyze
                </button>
              </div>
            ))}
        </div>
        
        {conflicts.length === 0 && (
          <div className="text-center py-8">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No Active Conflicts</h3>
            <p className="text-gray-300">All trains are operating smoothly with no predicted conflicts</p>
          </div>
        )}
      </div>

      {/* Conflict Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {conflicts.map(conflict => (
          <ConflictCard key={conflict.id} conflict={conflict} />
        ))}
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-700 p-4">
          <h4 className="font-medium text-white mb-2">Prediction Accuracy</h4>
          <p className="text-2xl font-bold text-green-600">96.8%</p>
          <p className="text-sm text-gray-300">Last 30 days</p>
        </div>
        
        <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-700 p-4">
          <h4 className="font-medium text-white mb-2">Avg Response Time</h4>
          <p className="text-2xl font-bold text-blue-600">1.2s</p>
          <p className="text-sm text-gray-300">Analysis to recommendation</p>
        </div>
        
        <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-700 p-4">
          <h4 className="font-medium text-white mb-2">Conflicts Prevented</h4>
          <p className="text-2xl font-bold text-purple-600">142</p>
          <p className="text-sm text-gray-300">This month</p>
        </div>
        
        <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-700 p-4">
          <h4 className="font-medium text-white mb-2">Delay Reduction</h4>
          <p className="text-2xl font-bold text-orange-600">-23%</p>
          <p className="text-sm text-gray-300">Compared to manual control</p>
        </div>
      </div>

      {/* Conflict Details Modal */}
      {selectedConflict && (
        <ConflictDetails
          conflict={selectedConflict}
          onClose={() => setSelectedConflict(null)}
        />
      )}
    </div>
  );
};

export default ConflictPredictionSection;
