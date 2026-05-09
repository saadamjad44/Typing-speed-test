// Test Engine Module
import utils from './utils.js';

class TestEngine {
  constructor(text, duration = 60) {
    this.originalText = text;
    this.duration = duration;
    this.reset();
  }

  reset() {
    this.isActive = false;
    this.isPaused = false;
    this.startTime = null;
    this.endTime = null;
    this.elapsedTime = 0;
    this.currentIndex = 0;
    this.typedCharacters = [];
    this.correctCharacters = 0;
    this.incorrectCharacters = 0;
    this.timer = null;
  }

  start() {
    if (this.isActive) return;

    this.isActive = true;
    this.isPaused = false;
    this.startTime = Date.now();
    this.elapsedTime = 0;

    // Start timer
    this.timer = setInterval(() => {
      this.updateElapsedTime();

      // Check if time is up
      if (this.elapsedTime >= this.duration) {
        this.end();
      }
    }, 100); // Update every 100ms for smooth display

    utils.announceToScreenReader('Test started');
  }

  updateElapsedTime() {
    if (this.startTime && this.isActive) {
      this.elapsedTime = (Date.now() - this.startTime) / 1000;
    }
  }

  handleKeyPress(char) {
    if (!this.isActive) {
      this.start();
    }

    // Don't allow typing beyond the text length
    if (this.currentIndex >= this.originalText.length) {
      return {
        success: false,
        reason: 'completed'
      };
    }

    const expectedChar = this.originalText[this.currentIndex];
    const isCorrect = char === expectedChar;

    this.typedCharacters.push({
      char: char,
      expected: expectedChar,
      correct: isCorrect,
      index: this.currentIndex
    });

    if (isCorrect) {
      this.correctCharacters++;
    } else {
      this.incorrectCharacters++;
    }

    this.currentIndex++;

    // Check if text is completed
    if (this.currentIndex >= this.originalText.length) {
      this.end();
      return {
        success: true,
        completed: true,
        correct: isCorrect
      };
    }

    return {
      success: true,
      completed: false,
      correct: isCorrect
    };
  }

  handleBackspace() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      const removed = this.typedCharacters.pop();

      if (removed) {
        if (removed.correct) {
          this.correctCharacters--;
        } else {
          this.incorrectCharacters--;
        }
      }

      return true;
    }
    return false;
  }

  end() {
    if (!this.isActive) return;

    this.isActive = false;
    this.endTime = Date.now();
    this.updateElapsedTime();

    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }

    utils.announceToScreenReader('Test completed');
  }

  getResults() {
    const totalTyped = this.typedCharacters.length;
    const timeInSeconds = this.elapsedTime || 1; // Prevent division by zero

    return {
      wpm: utils.calculateWPM(this.correctCharacters, timeInSeconds),
      accuracy: utils.calculateAccuracy(this.correctCharacters, totalTyped),
      correctCharacters: this.correctCharacters,
      incorrectCharacters: this.incorrectCharacters,
      totalCharacters: totalTyped,
      timeInSeconds: Math.round(timeInSeconds),
      completed: this.currentIndex >= this.originalText.length
    };
  }

  getCurrentStats() {
    const totalTyped = this.typedCharacters.length;
    const timeInSeconds = this.elapsedTime || 1;

    return {
      wpm: utils.calculateWPM(this.correctCharacters, timeInSeconds),
      accuracy: utils.calculateAccuracy(this.correctCharacters, totalTyped),
      timeRemaining: Math.max(0, this.duration - this.elapsedTime),
      progress: (this.currentIndex / this.originalText.length) * 100
    };
  }

  getCharacterStates() {
    const states = new Array(this.originalText.length).fill('pending');

    this.typedCharacters.forEach((typed, index) => {
      if (typed.correct) {
        states[index] = 'correct';
      } else {
        states[index] = 'incorrect';
      }
    });

    // Mark current character
    if (this.currentIndex < this.originalText.length) {
      states[this.currentIndex] = 'current';
    }

    return states;
  }

  pause() {
    if (this.isActive && !this.isPaused) {
      this.isPaused = true;
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    }
  }

  resume() {
    if (this.isActive && this.isPaused) {
      this.isPaused = false;
      const pausedTime = Date.now() - this.startTime - (this.elapsedTime * 1000);
      this.startTime = Date.now() - (this.elapsedTime * 1000);

      this.timer = setInterval(() => {
        this.updateElapsedTime();
        if (this.elapsedTime >= this.duration) {
          this.end();
        }
      }, 100);
    }
  }
}

export default TestEngine;
