import React, { useState } from 'react';
import { 
  FlaskConical, 
  Play, 
  Pause, 
  RotateCcw, 
  Settings,
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Zap,
  Brain
} from 'lucide-react';

const SimulationSection = ({ trains, stations }) => {
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState('delay');
  const [simulationResults, setSimulationResults] = useState(null);
  const [customParameters, setCustomParameters] = useState({
    trainId: trains[0]?.id || '',
    delayMinutes: 10,
    station: stations[0]?.id || '',
    action: 'halt'
  });

  const predefinedScenarios = [
    {
      id: 'delay',
      name: 'Train Delay Simulation',
      description: 'Simulate the impact of a train delay on network performance',
      icon: Clock,
      color: 'text-yellow-600 bg-yellow-100'
    },
    {
      id: 'breakdown',
      name: 'Equipment Breakdown',
      description: 'Simulate locomotive failure and emergency procedures',
      icon: AlertTriangle,
      color: 'text-red-600 bg-red-100'
    },
    {
      id: 'weather',
      name: 'Weather Impact',
      description: 'Simulate fog, rain, or extreme weather conditions',
      icon: TrendingUp,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      id: 'priority',
      name: 'Priority Train Insert',
      description: 'Simulate insertion of high-priority train into schedule',
      icon: Zap,
      color: 'text-purple-600 bg-purple-100'
    }
  ];

  const runSimulation = () => {
    setSimulationRunning(true);
    
    // Simulate analysis time
    setTimeout(() => {
      setSimulationResults({
        scenarioType: selectedScenario,
        parameters: customParameters,
        predictions: {
          totalDelayImpact: Math.floor(Math.random() * 50) + 10,
          affectedTrains: Math.floor(Math.random() * 4) + 2,
          recoveryTime: Math.floor(Math.random() * 30) + 15,
          alternativeRoutes: Math.floor(Math.random() * 3) + 1
        },
        recommendations: [
          'Halt train ' + customParameters.trainId + ' at ' + customParameters.station + ' for ' + customParameters.delayMinutes + ' minutes',
          'Reroute following trains to alternative platforms',
          'Adjust signal timing for optimal flow recovery',
          'Notify passengers of expected delays'
        ],
        timeline: [
          { time: '0m', event: 'Simulation Start', status: 'active' },
          { time: '5m', event: 'Initial Impact Assessment', status: 'completed' },
          { time: '12m', event: 'Network Adjustment', status: 'active' },
          { time: '25m', event: 'Recovery Begins', status: 'pending' },
          { time: '45m', event: 'Normal Operations Restored', status: 'pending' }
        ]
      });
      setSimulationRunning(false);
    }, 3000);
  };

  const ScenarioCard = ({ scenario }) => {
    const Icon = scenario.icon;
    return (
      <div
        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
          selectedScenario === scenario.id
            ? `${scenario.color} border-current`
            : 'bg-gray-900 border-gray-700 hover:border-gray-600'
        }`}
        onClick={() => setSelectedScenario(scenario.id)}
      >
        <div className="flex items-center space-x-3 mb-2">
          <div className={`p-2 rounded-lg ${scenario.color}`}>
            <Icon className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-white">{scenario.name}</h3>
        </div>
        <p className="text-sm text-gray-300">{scenario.description}</p>
      </div>
    );
  };

  const SimulationControls = () => (
    <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Simulation Parameters</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Select Train
          </label>
          <select
            value={customParameters.trainId}
            onChange={(e) => setCustomParameters({...customParameters, trainId: e.target.value})}
            className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {trains.map(train => (
              <option key={train.id} value={train.id}>
                {train.name} ({train.id})
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Station
          </label>
          <select
            value={customParameters.station}
            onChange={(e) => setCustomParameters({...customParameters, station: e.target.value})}
            className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {stations.map(station => (
              <option key={station.id} value={station.id}>
                {station.name} ({station.code})
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Delay Duration (minutes)
          </label>
          <input
            type="number"
            min="1"
            max="120"
            value={customParameters.delayMinutes}
            onChange={(e) => setCustomParameters({...customParameters, delayMinutes: parseInt(e.target.value)})}
            className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Action Type
          </label>
          <select
            value={customParameters.action}
            onChange={(e) => setCustomParameters({...customParameters, action: e.target.value})}
            className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="halt">Halt at Station</option>
            <option value="slow">Reduce Speed</option>
            <option value="reroute">Reroute Train</option>
            <option value="priority">Change Priority</option>
          </select>
        </div>
      </div>
      
      <div className="mt-6 flex space-x-4">
        <button
          onClick={runSimulation}
          disabled={simulationRunning}
          className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {simulationRunning ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Running Simulation...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              <span>Run Simulation</span>
            </>
          )}
        </button>
        
        <button
          onClick={() => {
            setSimulationResults(null);
            setSimulationRunning(false);
          }}
          className="flex items-center space-x-2 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset</span>
        </button>
      </div>
    </div>
  );

  const SimulationResults = ({ results }) => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-700 p-4">
          <h4 className="font-medium text-white mb-2">Total Delay Impact</h4>
          <p className="text-2xl font-bold text-red-600">+{results.predictions.totalDelayImpact}m</p>
        </div>
        <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-700 p-4">
          <h4 className="font-medium text-white mb-2">Affected Trains</h4>
          <p className="text-2xl font-bold text-orange-600">{results.predictions.affectedTrains}</p>
        </div>
        <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-700 p-4">
          <h4 className="font-medium text-white mb-2">Recovery Time</h4>
          <p className="text-2xl font-bold text-blue-600">{results.predictions.recoveryTime}m</p>
        </div>
        <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-700 p-4">
          <h4 className="font-medium text-white mb-2">Alt. Routes</h4>
          <p className="text-2xl font-bold text-green-600">{results.predictions.alternativeRoutes}</p>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Predicted Timeline</h3>
        <div className="space-y-3">
          {results.timeline.map((item, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                item.status === 'completed' ? 'bg-green-100 text-green-700' :
                item.status === 'active' ? 'bg-blue-100 text-blue-700' :
                'bg-gray-100 text-gray-300'
              }`}>
                {item.time}
              </div>
              <div className="flex-1">
                <p className="font-medium text-white">{item.event}</p>
                <div className={`inline-block px-2 py-1 rounded text-xs ${
                  item.status === 'completed' ? 'bg-green-100 text-green-700' :
                  item.status === 'active' ? 'bg-blue-100 text-blue-700' :
                  'bg-gray-100 text-gray-300'
                }`}>
                  {item.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Brain className="w-6 h-6 text-purple-600" />
          <h3 className="text-lg font-semibold text-white">AI Recommendations</h3>
        </div>
        <div className="space-y-2">
          {results.recommendations.map((rec, index) => (
            <div key={index} className="flex items-start space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <p className="text-gray-300">{rec}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">What-If Simulation Sandbox</h1>
        <p className="text-gray-300 mt-2">
          Test scenarios and predict outcomes before implementation
        </p>
      </div>

      {/* Scenario Selection */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Select Scenario Type</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {predefinedScenarios.map(scenario => (
            <ScenarioCard key={scenario.id} scenario={scenario} />
          ))}
        </div>
      </div>

      {/* Simulation Controls */}
      <SimulationControls />

      {/* Results */}
      {simulationResults && (
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Simulation Results</h2>
          <SimulationResults results={simulationResults} />
        </div>
      )}

      {/* Historical Simulations */}
      <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Simulations</h3>
        <div className="space-y-3">
          {[
            { time: '2 hours ago', scenario: 'Train Delay', impact: '+15m', user: 'Section Controller' },
            { time: '1 day ago', scenario: 'Weather Impact', impact: '+32m', user: 'Section Controller' },
            { time: '2 days ago', scenario: 'Priority Insert', impact: '+8m', user: 'Section Controller' }
          ].map((sim, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-gray-700 last:border-b-0">
              <div>
                <p className="font-medium text-white">{sim.scenario} Simulation</p>
                <p className="text-sm text-gray-300">{sim.time} by {sim.user}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-red-600">{sim.impact} network delay</p>
                <button className="text-xs text-blue-600 hover:text-blue-800">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimulationSection;
