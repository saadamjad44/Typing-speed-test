// Utility Functions
const utils = {
  // Format time in seconds to MM:SS
  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  },

  // Format date to readable string
  formatDate(isoString) {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;

    return date.toLocaleDateString();
  },

  // Debounce function
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Throttle function
  throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  // Escape HTML to prevent XSS
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  },

  // Calculate WPM (Words Per Minute)
  calculateWPM(characters, timeInSeconds) {
    if (timeInSeconds === 0) return 0;
    const words = characters / 5; // Standard: 5 characters = 1 word
    const minutes = timeInSeconds / 60;
    return Math.round(words / minutes);
  },

  // Calculate Accuracy
  calculateAccuracy(correctChars, totalChars) {
    if (totalChars === 0) return 100;
    return Math.round((correctChars / totalChars) * 100);
  },

  // Get difficulty label with emoji
  getDifficultyLabel(difficulty) {
    const labels = {
      easy: '🟢 Easy',
      medium: '🟡 Medium',
      hard: '🔴 Hard',
      custom: '✏️ Custom'
    };
    return labels[difficulty] || difficulty;
  },

  // Announce to screen readers
  announceToScreenReader(message) {
    const announcement = document.getElementById('screen-reader-announcement');
    if (announcement) {
      announcement.textContent = message;
      // Clear after a delay
      setTimeout(() => {
        announcement.textContent = '';
      }, 1000);
    }
  }
};

export default utils;
