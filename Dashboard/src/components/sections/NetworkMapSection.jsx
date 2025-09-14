import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Train, 
  Circle, 
  Square,
  Zap,
  Info,
  ZoomIn,
  ZoomOut
} from 'lucide-react';

const NetworkMapSection = ({ trains, stations }) => {
  const [selectedStation, setSelectedStation] = useState(null);
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [mapZoom, setMapZoom] = useState(1);

  // Calculate train positions on the route
  const getTrainPosition = (train) => {
    const currentStation = stations.find(s => s.position <= train.currentPosition);
    const nextStation = stations.find(s => s.position > train.currentPosition);
    
    if (!currentStation || !nextStation) return { x: 0, y: 0 };
    
    const progress = (train.currentPosition - currentStation.position) / 
                    (nextStation.position - currentStation.position);
    
    return {
      x: currentStation.position + progress * (nextStation.position - currentStation.position),
      y: 150 // Fixed Y position for horizontal layout
    };
  };

  const getSignalColor = (station, train) => {
    const platform = station.platforms.find(p => p.train === train?.id);
    if (platform?.status === 'occupied') return '#DC2626'; // Red
    
    // Simulate signal logic
    const nearbyTrains = trains.filter(t => 
      Math.abs(t.currentPosition - station.position) < 10
    );
    
    if (nearbyTrains.length > 0) return '#F59E0B'; // Yellow
    return '#16A34A'; // Green
  };

  const StationMarker = ({ station, x, y }) => (
    <g
      onClick={() => setSelectedStation(station)}
      className="cursor-pointer hover:opacity-80 transition-opacity"
    >
      {/* Station Circle */}
      <circle
        cx={x}
        cy={y}
        r="12"
        fill="#4A5568"
        stroke="#fff"
        strokeWidth="3"
      />
      
      {/* Platform indicators */}
      {station.platforms.map((platform, idx) => (
        <rect
          key={idx}
          x={x - 8 + (idx * 4)}
          y={y - 25}
          width="3"
          height="8"
          fill={
            platform.status === 'occupied' ? '#DC2626' :
            platform.status === 'maintenance' ? '#F59E0B' : '#16A34A'
          }
        />
      ))}
      
      {/* Station Label */}
      <text
        x={x}
        y={y + 35}
        textAnchor="middle"
        className="text-xs font-medium fill-gray-700"
      >
        {station.code}
      </text>
      
      {/* Signal Light */}
      <circle
        cx={x + 15}
        cy={y - 15}
        r="4"
        fill={getSignalColor(station)}
        className="animate-pulse"
      />
    </g>
  );

  const TrainMarker = ({ train, x, y }) => {
    const trainColor = train.type === 'Superfast' ? '#2563EB' :
                      train.type === 'Express' ? '#059669' :
                      train.type === 'Passenger' ? '#7C3AED' : '#DC2626';
    
    return (
      <g
        onClick={() => setSelectedTrain(train)}
        className="cursor-pointer hover:opacity-80 transition-opacity"
      >
        {/* Train Body */}
        <rect
          x={x - 8}
          y={y - 6}
          width="16"
          height="12"
          rx="3"
          fill={trainColor}
          stroke="#fff"
          strokeWidth="2"
        />
        
        {/* Direction Arrow */}
        <polygon
          points={train.direction === 'up' ? 
            `${x + 8},${y} ${x + 12},${y - 3} ${x + 12},${y + 3}` :
            `${x - 8},${y} ${x - 12},${y - 3} ${x - 12},${y + 3}`
          }
          fill={trainColor}
        />
        
        {/* Train Label */}
        <text
          x={x}
          y={y - 15}
          textAnchor="middle"
          className="text-xs font-bold fill-gray-900"
        >
          {train.id}
        </text>
        
        {/* Speed Indicator */}
        <text
          x={x}
          y={y + 25}
          textAnchor="middle"
          className="text-xs fill-gray-600"
        >
          {train.speed}km/h
        </text>
        
        {/* Delay Indicator */}
        {train.delay > 0 && (
          <circle
            cx={x + 10}
            cy={y - 10}
            r="6"
            fill="#DC2626"
            className="animate-pulse"
          />
        )}
      </g>
    );
  };

  const StationDetails = ({ station, onClose }) => (
    <div className="absolute top-4 right-4 bg-gray-900 rounded-lg shadow-lg border border-gray-700 p-4 w-80 z-10">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-white">{station.name}</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-300">✕</button>
      </div>
      
      <div className="space-y-3">
        <div>
          <p className="text-sm text-gray-300">Station Code: {station.code}</p>
          <p className="text-sm text-gray-300">Position: {station.position}km</p>
          <p className="text-sm text-gray-300">Loop Lines: {station.loopLines}</p>
        </div>
        
        <div>
          <h4 className="font-medium text-white mb-2">Platform Status</h4>
          <div className="grid grid-cols-2 gap-2">
            {station.platforms.map((platform, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm">
                <span>Platform {platform.id}</span>
                <span className={`px-2 py-1 rounded text-xs ${
                  platform.status === 'occupied' ? 'bg-red-100 text-red-700' :
                  platform.status === 'maintenance' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {platform.status}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {station.platforms.some(p => p.train) && (
          <div>
            <h4 className="font-medium text-white mb-2">Current Trains</h4>
            {station.platforms.filter(p => p.train).map((platform, idx) => (
              <div key={idx} className="text-sm text-gray-300">
                {platform.train} on Platform {platform.id}
                {platform.estimatedClearTime && (
                  <span className="text-gray-500"> (Clear: {platform.estimatedClearTime})</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const TrainDetails = ({ train, onClose }) => (
    <div className="absolute top-4 left-4 bg-gray-900 rounded-lg shadow-lg border border-gray-700 p-4 w-80 z-10">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-white">{train.name}</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-300">✕</button>
      </div>
      
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-300">Train No: {train.id}</p>
            <p className="text-gray-300">Type: {train.type}</p>
            <p className="text-gray-300">Status: {train.status}</p>
          </div>
          <div>
            <p className="text-gray-300">Speed: {train.speed} km/h</p>
            <p className={`${train.delay > 0 ? 'text-red-600' : 'text-green-600'}`}>
              Delay: {train.delay > 0 ? `+${train.delay}m` : 'On Time'}
            </p>
            <p className="text-gray-300">Priority: {train.priority}/10</p>
          </div>
        </div>
        
        <div>
          <p className="font-medium text-white">Next Station</p>
          <p className="text-sm text-gray-300">{train.nextStation} - ETA: {train.estimatedArrival}</p>
        </div>
        
        <div>
          <p className="font-medium text-white">Route</p>
          <p className="text-sm text-gray-300">{train.origin} → {train.destination}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Network Map</h1>
          <p className="text-gray-300 mt-2">
            Live visualization of Indore-Ujjain railway section
          </p>
        </div>
        
        {/* Map Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setMapZoom(Math.max(0.5, mapZoom - 0.1))}
            className="p-2 bg-gray-900 border border-gray-600 rounded-lg hover:bg-gray-800"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-sm text-gray-300 px-2">
            {Math.round(mapZoom * 100)}%
          </span>
          <button
            onClick={() => setMapZoom(Math.min(2, mapZoom + 0.1))}
            className="p-2 bg-gray-900 border border-gray-600 rounded-lg hover:bg-gray-800"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-700 p-4">
        <h3 className="font-semibold text-white mb-3">Legend</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-600 rounded"></div>
            <span>Superfast Train</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-600 rounded"></div>
            <span>Express Train</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-purple-600 rounded"></div>
            <span>Passenger Train</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-600 rounded"></div>
            <span>Goods Train</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Clear Signal</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span>Caution Signal</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>Stop Signal</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-2 bg-gray-600 rounded"></div>
            <span>Railway Track</span>
          </div>
        </div>
      </div>

      {/* Network Map */}
      <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-700 p-6 relative overflow-auto">
        <div style={{ transform: `scale(${mapZoom})`, transformOrigin: 'top left' }}>
          <svg width="1200" height="300" viewBox="0 0 1200 300">
            {/* Track Line */}
            <line
              x1="50"
              y1="150"
              x2="1150"
              y2="150"
              stroke="#8B7355"
              strokeWidth="6"
            />
            
            {/* Track Sleepers */}
            {Array.from({ length: 20 }, (_, i) => (
              <rect
                key={i}
                x={50 + (i * 55)}
                y="145"
                width="4"
                height="10"
                fill="#6B6B6B"
              />
            ))}
            
            {/* Stations */}
            {stations.map((station) => {
              const x = 50 + (station.position / 100) * 1100;
              const y = 150;
              return (
                <StationMarker
                  key={station.id}
                  station={station}
                  x={x}
                  y={y}
                />
              );
            })}
            
            {/* Trains */}
            {trains.map((train) => {
              const position = getTrainPosition(train);
              const x = 50 + (position.x / 100) * 1100;
              const y = position.y;
              return (
                <TrainMarker
                  key={train.id}
                  train={train}
                  x={x}
                  y={y}
                />
              );
            })}
          </svg>
        </div>
        
        {/* Station Details Popup */}
        {selectedStation && (
          <StationDetails
            station={selectedStation}
            onClose={() => setSelectedStation(null)}
          />
        )}
        
        {/* Train Details Popup */}
        {selectedTrain && (
          <TrainDetails
            train={selectedTrain}
            onClose={() => setSelectedTrain(null)}
          />
        )}
      </div>

      {/* Network Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-700 p-4">
          <h3 className="font-semibold text-white mb-3">Track Utilization</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Main Line</span>
              <span className="text-green-600">85% Capacity</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-700 p-4">
          <h3 className="font-semibold text-white mb-3">Signal Status</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Clear Signals</span>
              <span className="text-green-600">12</span>
            </div>
            <div className="flex justify-between">
              <span>Caution Signals</span>
              <span className="text-yellow-600">3</span>
            </div>
            <div className="flex justify-between">
              <span>Stop Signals</span>
              <span className="text-red-600">1</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-700 p-4">
          <h3 className="font-semibold text-white mb-3">Section Performance</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Average Speed</span>
              <span className="text-blue-600">82 km/h</span>
            </div>
            <div className="flex justify-between">
              <span>On-Time Performance</span>
              <span className="text-green-600">94%</span>
            </div>
            <div className="flex justify-between">
              <span>Active Conflicts</span>
              <span className="text-red-600">2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkMapSection;
