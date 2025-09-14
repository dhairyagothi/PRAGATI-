import React, { useState } from 'react';
import { 
  Activity, 
  AlertTriangle, 
  Gauge, 
  Thermometer,
  Zap,
  Wrench,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { mockAssetData } from '../../data/mockData';

const AssetInsightsSection = ({ trains }) => {
  const [selectedAsset, setSelectedAsset] = useState(null);

  const getHealthColor = (health) => {
    if (health >= 90) return 'text-green-600 bg-green-100';
    if (health >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getHealthStatus = (health) => {
    if (health >= 90) return 'Excellent';
    if (health >= 70) return 'Good';
    if (health >= 50) return 'Warning';
    return 'Critical';
  };

  const AssetCard = ({ asset }) => {
    const train = trains.find(t => t.id === asset.train);
    
    return (
      <div 
        className="bg-gray-900 rounded-lg shadow-sm border border-gray-700 p-6 hover:shadow-md transition-shadow cursor-pointer"
        onClick={() => setSelectedAsset(asset)}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-semibold text-white">{asset.id}</h3>
            <p className="text-sm text-gray-600">{train?.name || 'Unassigned'}</p>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold ${getHealthColor(asset.health).split(' ')[0]}`}>
              {asset.health}%
            </div>
            <div className={`px-2 py-1 rounded text-xs font-medium ${getHealthColor(asset.health)}`}>
              {getHealthStatus(asset.health)}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-blue-600">Power</span>
            </div>
            <p className="text-lg font-bold text-blue-600">{asset.metrics.powerConsumption}kW</p>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="flex items-center space-x-2">
              <Gauge className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-600">Efficiency</span>
            </div>
            <p className="text-lg font-bold text-green-600">{asset.metrics.efficiency}%</p>
          </div>
        </div>

        {asset.alerts.length > 0 && (
          <div className="border-t border-gray-700 pt-3">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <span className="text-sm font-medium text-red-600">Active Alerts</span>
            </div>
            <div className="space-y-1">
              {asset.alerts.slice(0, 2).map((alert, index) => (
                <p key={index} className="text-xs text-red-600">• {alert}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const AssetDetails = ({ asset, onClose }) => {
    const train = trains.find(t => t.id === asset.train);
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-gray-900 rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white">{asset.id}</h2>
                <p className="text-gray-600">{train?.name || 'Unassigned'} • {asset.type}</p>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Health Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className={`text-3xl font-bold mb-2 ${getHealthColor(asset.health).split(' ')[0]}`}>
                  {asset.health}%
                </div>
                <p className="text-sm text-gray-600">Overall Health</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  {asset.metrics.powerConsumption}
                </div>
                <p className="text-sm text-gray-600">Power (kW)</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">
                  {asset.metrics.efficiency}%
                </div>
                <p className="text-sm text-gray-600">Efficiency</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-orange-600 mb-2">
                  {asset.metrics.temperature}°C
                </div>
                <p className="text-sm text-gray-600">Temperature</p>
              </div>
            </div>

            {/* Performance Metrics */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Performance Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">Power Efficiency</span>
                      <span className="text-sm font-medium">{asset.metrics.efficiency}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${asset.metrics.efficiency}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">Temperature (Normal: &lt;70°C)</span>
                      <span className="text-sm font-medium">{asset.metrics.temperature}°C</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          asset.metrics.temperature > 70 ? 'bg-red-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${Math.min(100, (asset.metrics.temperature / 100) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-white mb-2">Vibration Analysis</h4>
                    <p className={`text-sm ${
                      asset.metrics.vibration === 'normal' ? 'text-green-600' :
                      asset.metrics.vibration === 'elevated' ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      Status: {asset.metrics.vibration.toUpperCase()}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-white mb-2">Power Consumption</h4>
                    <p className="text-sm text-gray-600">
                      Current: {asset.metrics.powerConsumption}kW
                    </p>
                    <p className="text-xs text-gray-500">
                      {asset.metrics.powerConsumption > 3000 ? 'Above average' : 'Within normal range'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Alerts and Recommendations */}
            {asset.alerts.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Active Alerts</h3>
                <div className="space-y-3">
                  {asset.alerts.map((alert, index) => (
                    <div key={index} className="border border-red-200 rounded-lg p-4 bg-red-50">
                      <div className="flex items-start space-x-3">
                        <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                        <div>
                          <p className="text-red-800 font-medium">Performance Alert</p>
                          <p className="text-red-700 text-sm">{alert}</p>
                          <div className="mt-2 flex space-x-2">
                            <button className="text-xs bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700">
                              Schedule Maintenance
                            </button>
                            <button className="text-xs bg-gray-600 text-white px-2 py-1 rounded hover:bg-gray-700">
                              Monitor
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Maintenance Schedule */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Maintenance Schedule</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Last Maintenance</span>
                    <span className="text-sm font-medium">15 days ago</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Next Scheduled</span>
                    <span className="text-sm font-medium">In 30 days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Running Hours</span>
                    <span className="text-sm font-medium">1,247 hrs</span>
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
      <div>
        <h1 className="text-3xl font-bold text-white">Predictive Asset Insights</h1>
        <p className="text-gray-600 mt-2">
          AI-powered locomotive health monitoring and maintenance prediction
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-700 p-4">
          <h4 className="font-medium text-white mb-2">Total Assets</h4>
          <p className="text-2xl font-bold text-blue-600">{mockAssetData.length}</p>
        </div>
        <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-700 p-4">
          <h4 className="font-medium text-white mb-2">Healthy</h4>
          <p className="text-2xl font-bold text-green-600">
            {mockAssetData.filter(a => a.health >= 90).length}
          </p>
        </div>
        <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-700 p-4">
          <h4 className="font-medium text-white mb-2">Needs Attention</h4>
          <p className="text-2xl font-bold text-yellow-600">
            {mockAssetData.filter(a => a.health < 90 && a.health >= 70).length}
          </p>
        </div>
        <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-700 p-4">
          <h4 className="font-medium text-white mb-2">Critical</h4>
          <p className="text-2xl font-bold text-red-600">
            {mockAssetData.filter(a => a.health < 70).length}
          </p>
        </div>
      </div>

      {/* Asset Cards */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Locomotive Health Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockAssetData.map(asset => (
            <AssetCard key={asset.id} asset={asset} />
          ))}
        </div>
      </div>

      {/* Predictive Analytics */}
      <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Predictive Analytics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-white mb-3">Maintenance Predictions</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                <div>
                  <p className="font-medium text-yellow-800">WAP-4 22683</p>
                  <p className="text-sm text-yellow-600">Maintenance recommended within 7 days</p>
                </div>
                <Wrench className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium text-green-800">WAP-7 30286</p>
                  <p className="text-sm text-green-600">Optimal performance, no action needed</p>
                </div>
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-white mb-3">Performance Trends</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Average Efficiency</span>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-600">+2.3%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Power Consumption</span>
                <div className="flex items-center space-x-2">
                  <TrendingDown className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-600">-1.8%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Unplanned Downtime</span>
                <div className="flex items-center space-x-2">
                  <TrendingDown className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-600">-15%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Asset Details Modal */}
      {selectedAsset && (
        <AssetDetails
          asset={selectedAsset}
          onClose={() => setSelectedAsset(null)}
        />
      )}
    </div>
  );
};

export default AssetInsightsSection;
