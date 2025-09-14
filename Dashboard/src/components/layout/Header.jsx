import React from 'react';
import { 
  Bell, 
  Settings, 
  User, 
  Clock, 
  Wifi,
  Menu
} from 'lucide-react';

const Header = ({ currentTime, toggleSidebar }) => {
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-IN', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <header className="bg-black shadow-sm border-b border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Menu className="w-5 h-5 text-gray-300" />
          </button>
          
          <div>
            <h1 className="text-2xl font-bold text-white">
              PRAGATI
            </h1>
            <p className="text-sm text-gray-300">
              Predictive Rail AI-based Guidance & Automated Traffic Intelligence
            </p>
          </div>
        </div>

        {/* Center Section - System Status */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-200">System Online</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Wifi className="w-4 h-4 text-green-500" />
            <span className="text-sm text-gray-300">COA Connected</span>
          </div>
          
          <div className="text-center">
            <div className="text-sm text-gray-300">Section: Indore-Ujjain</div>
            <div className="text-xs text-gray-400">Ratlam Division</div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Current Time */}
          <div className="text-right">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-lg font-mono font-semibold text-white">
                {formatTime(currentTime)}
              </span>
            </div>
            <div className="text-xs text-gray-400">
              {formatDate(currentTime)}
            </div>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button className="p-2 rounded-lg hover:bg-gray-800 relative">
              <Bell className="w-5 h-5 text-gray-300" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
            </button>
          </div>

          {/* Settings */}
          <button className="p-2 rounded-lg hover:bg-gray-800">
            <Settings className="w-5 h-5 text-gray-300" />
          </button>

          {/* User Profile */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="text-sm">
              <div className="font-medium text-white">Section Controller</div>
              <div className="text-gray-400">Ratlam Division</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;