// Utility functions
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatNumber = (num) => {
  // Handle undefined, null, or non-number values
  if (num === undefined || num === null || isNaN(num)) {
    return '0';
  }
  
  const number = Number(num);
  
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + 'M';
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1) + 'K';
  }
  return number.toString();
};

export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
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

export const capitalizeFirst = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getStatusColor = (status) => {
  const colors = {
    active: 'green',
    inactive: 'gray',
    suspended: 'red',
    pending: 'yellow',
  };
  return colors[status] || 'gray';
};

export const getRoleColor = (role) => {
  const colors = {
    admin: 'red',
    user: 'blue',
    guest: 'gray',
    moderator: 'purple',
  };
  return colors[role] || 'gray';
};
