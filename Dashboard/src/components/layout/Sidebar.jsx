import React from 'react';
import { 
  LayoutDashboard,
  Train,
  MapPin,
  AlertTriangle,
  FlaskConical,
  Building2,
  Activity,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const Sidebar = ({ activeSection, setActiveSection, collapsed, setCollapsed }) => {
  const navigationItems = [
    {
      id: 'overview',
      label: 'Overview',
      icon: LayoutDashboard,
      description: 'System dashboard'
    },
    {
      id: 'trains',
      label: 'Train Monitoring',
      icon: Train,
      description: 'Live train tracking'
    },
    {
      id: 'network',
      label: 'Network Map',
      icon: MapPin,
      description: 'Railway network visualization'
    },
    {
      id: 'conflicts',
      label: 'Conflict Prediction',
      icon: AlertTriangle,
      description: 'AI-powered conflict analysis'
    },
    {
      id: 'simulation',
      label: 'What-If Simulator',
      icon: FlaskConical,
      description: 'Scenario testing'
    },
    {
      id: 'platforms',
      label: 'Platform Management',
      icon: Building2,
      description: 'Platform availability & routing'
    },
    {
      id: 'assets',
      label: 'Asset Insights',
      icon: Activity,
      description: 'Predictive maintenance'
    },
    {
      id: 'alerts',
      label: 'Notifications',
      icon: Bell,
      description: 'System alerts & warnings'
    }
  ];

  return (
    <div className={`bg-black shadow-lg border-r border-gray-800 transition-all duration-300 ${
      collapsed ? 'w-16' : 'w-64'
    } fixed left-0 top-0 h-full z-10`}>
      {/* Logo Section */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div>
              <h2 className="text-xl font-bold text-blue-400">PRAGATI</h2>
              <p className="text-xs text-gray-400">Control Center</p>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded-md hover:bg-gray-800"
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4 text-gray-300" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-gray-300" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-2">
        <ul className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    isActive
                      ? 'bg-blue-900 text-blue-300 border-r-2 border-blue-400'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                  title={collapsed ? item.label : ''}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-blue-400' : 'text-gray-400'}`} />
                  {!collapsed && (
                    <div>
                      <div className={`font-medium ${isActive ? 'text-blue-300' : 'text-white'}`}>
                        {item.label}
                      </div>
                      <div className="text-xs text-gray-400">
                        {item.description}
                      </div>
                    </div>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* System Status */}
      {!collapsed && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-green-950 border border-green-800 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-green-300">
                All Systems Operational
              </span>
            </div>
            <div className="text-xs text-green-400 mt-1">
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;