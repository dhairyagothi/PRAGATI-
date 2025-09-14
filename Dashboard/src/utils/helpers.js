// Utility functions for the PRAGATI Dashboard

export const formatTime = (date) => {
  return date.toLocaleTimeString('en-IN', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};

export const formatDate = (date) => {
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const getStatusColor = (status) => {
  switch (status) {
    case 'running': return 'text-green-600 bg-green-100';
    case 'halted': return 'text-red-600 bg-red-100';
    case 'approaching': return 'text-yellow-600 bg-yellow-100';
    case 'delayed': return 'text-red-600 bg-red-100';
    default: return 'text-gray-600 bg-gray-100';
  }
};

export const getDelayColor = (delay) => {
  if (delay <= 0) return 'text-green-600';
  if (delay <= 5) return 'text-yellow-600';
  return 'text-red-600';
};

export const getPriorityColor = (priority) => {
  switch (priority) {
    case 'high': return 'text-red-600 bg-red-100 border-red-200';
    case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
    case 'low': return 'text-green-600 bg-green-100 border-green-200';
    default: return 'text-gray-600 bg-gray-100 border-gray-200';
  }
};

export const calculateDistance = (pos1, pos2) => {
  return Math.abs(pos1 - pos2);
};

export const getTrainTypeColor = (type) => {
  switch (type) {
    case 'Superfast': return 'bg-blue-600';
    case 'Express': return 'bg-green-600';
    case 'Passenger': return 'bg-purple-600';
    case 'Goods': return 'bg-red-600';
    default: return 'bg-gray-600';
  }
};

export const formatDuration = (minutes) => {
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const sortByPriority = (items, priorityField = 'priority') => {
  const priorityOrder = { high: 3, medium: 2, low: 1 };
  return items.sort((a, b) => {
    return priorityOrder[b[priorityField]] - priorityOrder[a[priorityField]];
  });
};

export const filterByStatus = (items, status, statusField = 'status') => {
  if (status === 'all') return items;
  return items.filter(item => item[statusField] === status);
};

export const searchItems = (items, query, fields = ['name', 'id']) => {
  if (!query) return items;
  const lowerQuery = query.toLowerCase();
  return items.filter(item => 
    fields.some(field => 
      item[field]?.toLowerCase().includes(lowerQuery)
    )
  );
};