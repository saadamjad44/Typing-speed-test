// Storage Module - localStorage management
class Storage {
  constructor() {
    this.storageKey = 'typingTestHistory';
    this.maxHistoryItems = 10;
  }

  saveResult(result) {
    try {
      const history = this.getHistory();

      // Add timestamp if not present
      if (!result.timestamp) {
        result.timestamp = new Date().toISOString();
      }

      // Add to beginning of array
      history.unshift(result);

      // Keep only last 10 results
      const trimmedHistory = history.slice(0, this.maxHistoryItems);

      localStorage.setItem(this.storageKey, JSON.stringify(trimmedHistory));
      return true;
    } catch (error) {
      console.error('Error saving result:', error);
      return false;
    }
  }

  getHistory() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading history:', error);
      return [];
    }
  }

  getPersonalBest() {
    const history = this.getHistory();

    if (history.length === 0) {
      return { wpm: 0, accuracy: 0 };
    }

    const bestWpm = Math.max(...history.map(result => result.wpm));
    const bestAccuracy = Math.max(...history.map(result => result.accuracy));

    return {
      wpm: bestWpm,
      accuracy: bestAccuracy
    };
  }

  clearHistory() {
    try {
      localStorage.removeItem(this.storageKey);
      return true;
    } catch (error) {
      console.error('Error clearing history:', error);
      return false;
    }
  }

  isStorageAvailable() {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (error) {
      return false;
    }
  }
}

export default Storage;
