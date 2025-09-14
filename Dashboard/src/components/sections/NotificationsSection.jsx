import React, { useState } from 'react';
import { 
  Bell, 
  AlertTriangle, 
  Info, 
  CheckCircle, 
  XCircle,
  Clock,
  Filter,
  Archive,
  Settings
} from 'lucide-react';

const NotificationsSection = ({ conflicts, trains }) => {
  const [filter, setFilter] = useState('all');
  const [showSettings, setShowSettings] = useState(false);

  // Generate notifications based on conflicts and train data
  const generateNotifications = () => {
    const notifications = [];
    
    // Add conflict notifications
    conflicts.forEach(conflict => {
      notifications.push({
        id: `conflict-${conflict.id}`,
        type: conflict.priority === 'high' ? 'critical' : conflict.priority === 'medium' ? 'warning' : 'info',
        title: `${conflict.type.charAt(0).toUpperCase() + conflict.type.slice(1)} Conflict Detected`,
        message: conflict.description,
        location: conflict.location,
        time: new Date(Date.now() - Math.random() * 1800000), // Random time within last 30 mins
        action: 'View Details',
        read: false,
        category: 'conflict'
      });
    });

    // Add train delay notifications
    trains.filter(t => t.delay > 5).forEach(train => {
      notifications.push({
        id: `delay-${train.id}`,
        type: train.delay > 15 ? 'critical' : 'warning',
        title: `Train Delay Alert`,
        message: `${train.name} is running ${train.delay} minutes late`,
        location: `Next: ${train.nextStation}`,
        time: new Date(Date.now() - Math.random() * 900000), // Random time within last 15 mins
        action: 'Track Train',
        read: Math.random() > 0.3,
        category: 'delay'
      });
    });

    // Add system notifications
    notifications.push(
      {
        id: 'system-1',
        type: 'info',
        title: 'System Update Complete',
        message: 'PRAGATI AI engine has been updated to version 2.1.3',
        location: 'System Wide',
        time: new Date(Date.now() - 7200000), // 2 hours ago
        action: 'View Changelog',
        read: true,
        category: 'system'
      },
      {
        id: 'maintenance-1',
        type: 'warning',
        title: 'Scheduled Maintenance',
        message: 'Platform 4 at INDB will be under maintenance from 14:00-16:00',
        location: 'INDB Platform 4',
        time: new Date(Date.now() - 3600000), // 1 hour ago
        action: 'View Schedule',
        read: false,
        category: 'maintenance'
      }
    );

    return notifications.sort((a, b) => b.time - a.time);
  };

  const notifications = generateNotifications();

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    return notification.type === filter || notification.category === filter;
  });

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'critical': return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'info': return <Info className="w-5 h-5 text-blue-600" />;
      case 'success': return <CheckCircle className="w-5 h-5 text-green-600" />;
      default: return <Bell className="w-5 h-5 text-gray-300" />;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'critical': return 'border-red-200 bg-red-50';
      case 'warning': return 'border-yellow-200 bg-yellow-50';
      case 'info': return 'border-blue-200 bg-blue-50';
      case 'success': return 'border-green-200 bg-green-50';
      default: return 'border-gray-700 bg-gray-50';
    }
  };

  const formatTime = (time) => {
    const now = new Date();
    const diff = now - time;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  const NotificationCard = ({ notification }) => (
    <div className={`border rounded-lg p-4 mb-3 ${getNotificationColor(notification.type)} ${
      !notification.read ? 'border-l-4 border-l-blue-600' : ''
    }`}>
      <div className="flex items-start space-x-3">
        {getNotificationIcon(notification.type)}
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h4 className={`font-medium ${!notification.read ? 'text-white' : 'text-gray-300'}`}>
                {notification.title}
              </h4>
              <p className="text-sm text-gray-300 mt-1">{notification.message}</p>
              <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                <span>{notification.location}</span>
                <span>{formatTime(notification.time)}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {!notification.read && (
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              )}
              <button className="text-blue-600 hover:text-blue-800 text-sm">
                {notification.action}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const NotificationSettings = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg shadow-xl max-w-2xl w-full mx-4">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Notification Settings</h2>
            <button 
              onClick={() => setShowSettings(false)}
              className="text-gray-400 hover:text-gray-300"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="font-medium text-white mb-3">Alert Categories</h3>
            <div className="space-y-3">
              {[
                { id: 'conflicts', label: 'Conflict Predictions', enabled: true },
                { id: 'delays', label: 'Train Delays', enabled: true },
                { id: 'maintenance', label: 'Maintenance Alerts', enabled: true },
                { id: 'system', label: 'System Updates', enabled: false },
                { id: 'weather', label: 'Weather Warnings', enabled: true }
              ].map(category => (
                <div key={category.id} className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">{category.label}</span>
                  <button className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    category.enabled ? 'bg-blue-600' : 'bg-gray-200'
                  }`}>
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-gray-900 transition-transform ${
                      category.enabled ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium text-white mb-3">Sound Alerts</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Critical Alerts</span>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-gray-900 translate-x-6" />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Warning Alerts</span>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-gray-900 translate-x-6" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button 
              onClick={() => setShowSettings(false)}
              className="px-4 py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-800"
            >
              Cancel
            </button>
            <button 
              onClick={() => setShowSettings(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Notifications</h1>
          <p className="text-gray-300 mt-2">
            Real-time alerts and system notifications
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowSettings(true)}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800"
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
          
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Archive className="w-4 h-4" />
            <span>Mark All Read</span>
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-700 p-4">
          <h4 className="font-medium text-white mb-2">Total Alerts</h4>
          <p className="text-2xl font-bold text-blue-600">{notifications.length}</p>
        </div>
        <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-700 p-4">
          <h4 className="font-medium text-white mb-2">Unread</h4>
          <p className="text-2xl font-bold text-red-600">
            {notifications.filter(n => !n.read).length}
          </p>
        </div>
        <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-700 p-4">
          <h4 className="font-medium text-white mb-2">Critical</h4>
          <p className="text-2xl font-bold text-red-600">
            {notifications.filter(n => n.type === 'critical').length}
          </p>
        </div>
        <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-700 p-4">
          <h4 className="font-medium text-white mb-2">This Hour</h4>
          <p className="text-2xl font-bold text-green-600">
            {notifications.filter(n => (new Date() - n.time) < 3600000).length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-700 p-4">
        <div className="flex items-center space-x-4">
          <Filter className="w-5 h-5 text-gray-400" />
          <span className="text-sm font-medium text-gray-300">Filter:</span>
          <div className="flex space-x-2">
            {[
              { id: 'all', label: 'All' },
              { id: 'unread', label: 'Unread' },
              { id: 'critical', label: 'Critical' },
              { id: 'conflict', label: 'Conflicts' },
              { id: 'delay', label: 'Delays' },
              { id: 'system', label: 'System' }
            ].map(filterOption => (
              <button
                key={filterOption.id}
                onClick={() => setFilter(filterOption.id)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  filter === filterOption.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {filterOption.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-700">
        <div className="p-4 border-b border-gray-700">
          <h3 className="font-semibold text-white">
            Recent Notifications ({filteredNotifications.length})
          </h3>
        </div>
        
        <div className="p-4">
          {filteredNotifications.length > 0 ? (
            <div className="space-y-3">
              {filteredNotifications.map(notification => (
                <NotificationCard key={notification.id} notification={notification} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No notifications found</h3>
              <p className="text-gray-300">
                {filter === 'all' 
                  ? 'All caught up! No new notifications.'
                  : `No ${filter} notifications found.`
                }
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && <NotificationSettings />}
    </div>
  );
};

export default NotificationsSection;
