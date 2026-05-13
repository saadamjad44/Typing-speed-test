// Main Application
import TestEngine from './test-engine.js';
import TextGenerator from './text-generator.js';
import Storage from './storage.js';
import utils from './utils.js';

class TypingTestApp {
  constructor() {
    this.testEngine = null;
    this.textGenerator = new TextGenerator();
    this.storage = new Storage();
    this.currentDifficulty = 'medium';
    this.customText = null;

    this.initializeElements();
    this.attachEventListeners();
    this.loadInitialText();
    this.renderHistory();
  }

  initializeElements() {
    // Difficulty buttons
    this.difficultyButtons = document.querySelectorAll('.difficulty-btn');

    // Test area
    this.textDisplay = document.getElementById('text-display');
    this.inputField = document.getElementById('input-field');

    // Stats
    this.timerDisplay = document.getElementById('timer');
    this.wpmDisplay = document.getElementById('wpm');
    this.accuracyDisplay = document.getElementById('accuracy');

    // Results
    this.resultsSection = document.getElementById('results');
    this.resultsWpm = document.getElementById('results-wpm');
    this.resultsAccuracy = document.getElementById('results-accuracy');
    this.resultsTime = document.getElementById('results-time');
    this.resultsCorrect = document.getElementById('results-correct');
    this.resultsIncorrect = document.getElementById('results-incorrect');
    this.resultsTotal = document.getElementById('results-total');

    // Buttons
    this.restartBtn = document.getElementById('restart-btn');
    this.newTestBtn = document.getElementById('new-test-btn');

    // History
    this.historyList = document.getElementById('history-list');
    this.clearHistoryBtn = document.getElementById('clear-history-btn');

    // Custom text modal
    this.customModal = document.getElementById('custom-modal');
    this.customTextarea = document.getElementById('custom-textarea');
    this.customStartBtn = document.getElementById('custom-start-btn');
    this.customCancelBtn = document.getElementById('custom-cancel-btn');
    this.modalCloseBtn = document.getElementById('modal-close-btn');

    // Practice modal
    this.practiceModal = document.getElementById('practice-modal');
    this.practiceModalCloseBtn = document.getElementById('practice-modal-close-btn');
    this.practiceLessonBtns = document.querySelectorAll('.practice-lesson__btn');

    // Test area container
    this.testArea = document.getElementById('test-area');
  }

  attachEventListeners() {
    // Difficulty selection
    this.difficultyButtons.forEach(btn => {
      btn.addEventListener('click', () => this.handleDifficultyChange(btn.dataset.difficulty));
    });

    // Input field
    this.inputField.addEventListener('input', (e) => this.handleInput(e));
    this.inputField.addEventListener('keydown', (e) => this.handleKeyDown(e));
    this.inputField.addEventListener('paste', (e) => e.preventDefault());

    // Restart and new test buttons
    this.restartBtn.addEventListener('click', () => this.restartTest());
    this.newTestBtn.addEventListener('click', () => this.newTest());

    // History
    this.clearHistoryBtn.addEventListener('click', () => this.clearHistory());

    // Custom text modal
    this.customStartBtn.addEventListener('click', () => this.startCustomTest());
    this.customCancelBtn.addEventListener('click', () => this.closeCustomModal());
    this.modalCloseBtn.addEventListener('click', () => this.closeCustomModal());

    // Practice modal
    this.practiceModalCloseBtn.addEventListener('click', () => this.closePracticeModal());
    this.practiceLessonBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const lessonType = e.target.closest('.practice-lesson').dataset.lesson;
        this.startPracticeLesson(lessonType);
      });
    });

    // Close modal on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (this.customModal.classList.contains('active')) {
          this.closeCustomModal();
        }
        if (this.practiceModal.classList.contains('active')) {
          this.closePracticeModal();
        }
      }
    });

    // Close modal on backdrop click
    this.customModal.addEventListener('click', (e) => {
      if (e.target === this.customModal) {
        this.closeCustomModal();
      }
    });

    this.practiceModal.addEventListener('click', (e) => {
      if (e.target === this.practiceModal) {
        this.closePracticeModal();
      }
    });
  }

  handleDifficultyChange(difficulty) {
    // Update active button
    this.difficultyButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.difficulty === difficulty);
    });

    this.currentDifficulty = difficulty;

    if (difficulty === 'custom') {
      this.openCustomModal();
    } else if (difficulty === 'practice') {
      this.openPracticeModal();
    } else {
      this.customText = null;
      this.loadInitialText();
    }
  }

  loadInitialText() {
    let text;

    switch (this.currentDifficulty) {
      case 'easy':
        text = this.textGenerator.generateEasy();
        break;
      case 'medium':
        text = this.textGenerator.generateMedium();
        break;
      case 'hard':
        text = this.textGenerator.generateHard();
        break;
      default:
        text = this.textGenerator.generateMedium();
    }

    this.initializeTest(text);
  }

  initializeTest(text) {
    // Stop any existing stats update loop
    this.stopStatsUpdateLoop();

    // Create new test engine
    this.testEngine = new TestEngine(text, 60);

    // Set up callback for when test ends
    this.testEngine.onTestEnd = () => {
      this.completeTest();
    };

    // Start stats update loop
    this.startStatsUpdateLoop();

    // Render text display
    this.renderTextDisplay();

    // Reset input
    this.inputField.value = '';
    this.inputField.disabled = false;
    this.inputField.focus();

    // Reset stats
    this.updateStats();

    // Hide results
    this.resultsSection.classList.remove('active');
    this.testArea.classList.remove('hidden');
  }

  renderTextDisplay() {
    const text = this.testEngine.originalText;
    const chars = text.split('');

    this.textDisplay.innerHTML = chars
      .map((char, index) => {
        const escaped = utils.escapeHtml(char);
        return `<span class="text-display__char" data-index="${index}">${escaped === ' ' ? '&nbsp;' : escaped}</span>`;
      })
      .join('');
  }

  handleInput(e) {
    const value = e.target.value;
    const lastChar = value[value.length - 1];

    if (lastChar) {
      const result = this.testEngine.handleKeyPress(lastChar);

      if (result.success) {
        this.updateTextDisplay();
        this.updateStats();

        if (result.completed) {
          this.completeTest();
        }
      }

      // Clear input for next character
      this.inputField.value = '';
    }
  }

  startStatsUpdateLoop() {
    // Clear any existing interval
    if (this.statsUpdateInterval) {
      clearInterval(this.statsUpdateInterval);
    }

    // Update stats every 100ms for smooth timer display
    this.statsUpdateInterval = setInterval(() => {
      if (this.testEngine && this.testEngine.isActive) {
        this.updateStats();
      }
    }, 100);
  }

  stopStatsUpdateLoop() {
    if (this.statsUpdateInterval) {
      clearInterval(this.statsUpdateInterval);
      this.statsUpdateInterval = null;
    }
  }

  handleKeyDown(e) {
    if (e.key === 'Backspace' && this.inputField.value === '') {
      e.preventDefault();
      this.testEngine.handleBackspace();
      this.updateTextDisplay();
      this.updateStats();
    }
  }

  updateTextDisplay() {
    const states = this.testEngine.getCharacterStates();
    const chars = this.textDisplay.querySelectorAll('.text-display__char');

    chars.forEach((char, index) => {
      char.className = 'text-display__char';
      if (states[index] !== 'pending') {
        char.classList.add(states[index]);
      }
    });

    // Scroll to current character if needed
    const currentChar = chars[this.testEngine.currentIndex];
    if (currentChar) {
      currentChar.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  updateStats() {
    const stats = this.testEngine.getCurrentStats();

    this.timerDisplay.textContent = Math.ceil(stats.timeRemaining);
    this.wpmDisplay.textContent = stats.wpm;
    this.accuracyDisplay.textContent = stats.accuracy + '%';
  }

  completeTest() {
    this.testEngine.end();
    this.stopStatsUpdateLoop();
    this.inputField.disabled = true;

    const results = this.testEngine.getResults();

    // Save to history
    this.storage.saveResult({
      wpm: results.wpm,
      accuracy: results.accuracy,
      difficulty: this.currentDifficulty,
      timestamp: new Date().toISOString()
    });

    // Show results
    this.showResults(results);

    // Update history display
    this.renderHistory();
  }

  showResults(results) {
    this.resultsWpm.textContent = results.wpm;
    this.resultsAccuracy.textContent = results.accuracy + '%';
    this.resultsTime.textContent = results.timeInSeconds + 's';
    this.resultsCorrect.textContent = results.correctCharacters;
    this.resultsIncorrect.textContent = results.incorrectCharacters;
    this.resultsTotal.textContent = results.totalCharacters;

    this.testArea.classList.add('hidden');
    this.resultsSection.classList.add('active');

    utils.announceToScreenReader(`Test completed. ${results.wpm} words per minute. ${results.accuracy} percent accuracy.`);
  }

  restartTest() {
    this.loadInitialText();
  }

  newTest() {
    this.loadInitialText();
  }

  renderHistory() {
    const history = this.storage.getHistory();

    if (history.length === 0) {
      this.historyList.innerHTML = '<div class="history__empty">No test history yet. Complete a test to see your results here!</div>';
      return;
    }

    this.historyList.innerHTML = history
      .map(result => {
        const difficultyLabel = utils.getDifficultyLabel(result.difficulty);
        const timeAgo = utils.formatDate(result.timestamp);

        return `
          <div class="history__item">
            <div class="history__item-info">
              <span class="history__item-wpm">${result.wpm} WPM</span>
              <span>${result.accuracy}% accuracy</span>
              <span>${difficultyLabel}</span>
            </div>
            <span class="history__item-time">${timeAgo}</span>
          </div>
        `;
      })
      .join('');
  }

  clearHistory() {
    if (confirm('Are you sure you want to clear your test history?')) {
      this.storage.clearHistory();
      this.renderHistory();
      utils.announceToScreenReader('History cleared');
    }
  }

  openCustomModal() {
    this.customModal.classList.add('active');
    this.customTextarea.value = '';
    this.customTextarea.focus();
  }

  closeCustomModal() {
    this.customModal.classList.remove('active');

    // Reset to medium if custom was not started
    if (!this.customText) {
      this.currentDifficulty = 'medium';
      this.difficultyButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.difficulty === 'medium');
      });
    }
  }

  startCustomTest() {
    const text = this.customTextarea.value;
    const validation = this.textGenerator.validateCustomText(text);

    if (!validation.valid) {
      alert(validation.error);
      return;
    }

    this.customText = validation.text;
    this.closeCustomModal();
    this.initializeTest(this.customText);
  }

  openPracticeModal() {
    this.practiceModal.classList.add('active');
  }

  closePracticeModal() {
    this.practiceModal.classList.remove('active');

    // Reset to medium if practice was not started
    if (this.currentDifficulty === 'practice') {
      this.currentDifficulty = 'medium';
      this.difficultyButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.difficulty === 'medium');
      });
    }
  }

  startPracticeLesson(lessonType) {
    const text = this.textGenerator.generatePracticeLesson(lessonType);
    this.closePracticeModal();
    this.initializeTest(text);
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new TypingTestApp();
});
