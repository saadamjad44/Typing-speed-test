# Typing Speed Test App – Software Design Specification
*Version 1.0 | Created 2026-05-08*

---

## 1. Project Overview

### 1.1 Purpose
Build a professional typing speed test application that measures typing speed (WPM), accuracy, and provides multiple difficulty levels with custom text input support. The app runs entirely client-side with no backend dependencies.

### 1.2 Target Users
- Students and professionals looking to improve typing skills
- Job seekers preparing for typing tests
- Anyone wanting to measure and track their typing performance

### 1.3 Success Criteria
- Accurate WPM and accuracy calculations
- Smooth, distraction-free typing experience
- Responsive design working on desktop and tablet devices
- Performance: page load < 1s, instant feedback on keystrokes
- Accessibility: WCAG 2.2 Level AA compliant

---

## 2. Technical Stack

### 2.1 Core Technologies
- **HTML5** – Semantic structure
- **CSS3** – Styling with custom properties and modern features
- **Vanilla JavaScript (ES6+)** – All interactivity and logic

### 2.2 No Dependencies
- No frameworks or libraries required
- No build tools or bundlers
- Pure client-side execution
- localStorage for score persistence

---

## 3. Functional Requirements

### 3.1 Core Features

#### 3.1.1 Typing Test Engine
- Display random text passage for user to type
- Real-time character-by-character validation
- Visual feedback for correct/incorrect characters
- Timer starts on first keystroke
- Test duration: 60 seconds (configurable)
- Calculate Words Per Minute (WPM) = (characters typed / 5) / (time in minutes)
- Calculate Accuracy = (correct characters / total characters typed) × 100

#### 3.1.2 Difficulty Levels
**Easy Mode:**
- Common English words (200-500 most frequent)
- No punctuation or special characters
- Simple sentence structures

**Medium Mode:**
- Mixed vocabulary (1000+ words)
- Basic punctuation (periods, commas)
- Varied sentence lengths

**Hard Mode:**
- Complex vocabulary
- Full punctuation (quotes, semicolons, parentheses)
- Numbers and special characters
- Longer, complex sentences

#### 3.1.3 Custom Text Input
- Allow users to paste or type their own practice text
- Minimum 50 characters required
- Maximum 2000 characters
- Preserve user's text formatting

#### 3.1.4 Results Display
After test completion, show:
- Words Per Minute (WPM)
- Accuracy percentage
- Total characters typed
- Correct vs incorrect characters
- Time taken
- Option to restart or try different difficulty

#### 3.1.5 Local Score History
- Store last 10 test results in localStorage
- Display personal best WPM and accuracy
- Show improvement trends
- Clear history option

### 3.2 User Interface Requirements

#### 3.2.1 Layout Structure
```
┌─────────────────────────────────────┐
│           Header / Logo             │
├─────────────────────────────────────┤
│  [Easy] [Medium] [Hard] [Custom]    │
├─────────────────────────────────────┤
│                                     │
│     Text Display Area               │
│     (with character highlighting)   │
│                                     │
├─────────────────────────────────────┤
│     Typing Input Field              │
├─────────────────────────────────────┤
│  Timer: 60s | WPM: 0 | Accuracy: 0% │
├─────────────────────────────────────┤
│     Personal Best & History         │
└─────────────────────────────────────┘
```

#### 3.2.2 Visual Design – Dark Mode Professional
**Color Palette:**
- Background: `#0f172a` (dark slate)
- Surface: `#1e293b` (lighter slate)
- Primary: `#3b82f6` (blue)
- Success: `#10b981` (green)
- Error: `#ef4444` (red)
- Text: `#f1f5f9` (light gray)
- Muted: `#64748b` (gray)

**Typography:**
- Headings: Inter or system-ui
- Typing area: `'Fira Code', 'Consolas', monospace`
- Font sizes: 16px base, 1.125rem for typing area

**Visual Feedback:**
- Correct characters: green highlight
- Incorrect characters: red highlight with underline
- Current character: blue cursor/indicator
- Smooth transitions (150ms ease)

#### 3.2.3 Responsive Breakpoints
- Desktop: 1024px+ (optimal experience)
- Tablet: 768px - 1023px (adjusted layout)
- Mobile: < 768px (simplified, portrait warning)

---

## 4. Non-Functional Requirements

### 4.1 Performance
- First Contentful Paint (FCP): < 1s
- Time to Interactive (TTI): < 1.5s
- Keystroke response time: < 16ms (60fps)
- Minified CSS: < 10KB
- Minified JS: < 20KB

### 4.2 Accessibility
- Keyboard-only navigation support
- ARIA labels for all interactive elements
- Focus indicators visible and clear
- Color contrast ratio: 7:1 for text (AAA level)
- Screen reader announcements for test start/end
- Skip to main content link

### 4.3 Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### 4.4 Data Privacy
- No data sent to external servers
- All data stored locally in browser
- No cookies or tracking
- No external API calls

---

## 5. Technical Architecture

### 5.1 File Structure
```
typing-speed-test/
├── index.html
├── css/
│   ├── reset.css
│   ├── variables.css
│   ├── main.css
│   └── responsive.css
├── js/
│   ├── app.js (main application logic)
│   ├── test-engine.js (typing test logic)
│   ├── text-generator.js (difficulty levels & text)
│   ├── storage.js (localStorage management)
│   └── utils.js (helper functions)
└── assets/
    └── (optional icons/images)
```

### 5.2 Core Modules

#### 5.2.1 TestEngine Module
```javascript
class TestEngine {
  constructor(text, duration)
  start()
  handleKeyPress(event)
  calculateWPM()
  calculateAccuracy()
  end()
  reset()
}
```

#### 5.2.2 TextGenerator Module
```javascript
class TextGenerator {
  generateEasy()
  generateMedium()
  generateHard()
  validateCustomText(text)
}
```

#### 5.2.3 Storage Module
```javascript
class Storage {
  saveResult(result)
  getHistory()
  getPersonalBest()
  clearHistory()
}
```

### 5.3 State Management
Simple state object:
```javascript
const appState = {
  currentTest: null,
  difficulty: 'medium',
  isTestActive: false,
  results: [],
  customText: null
}
```

---

## 6. User Flows

### 6.1 Standard Test Flow
1. User lands on page
2. Selects difficulty level (default: Medium)
3. Text passage appears
4. User clicks input field or starts typing
5. Timer starts on first keystroke
6. Real-time feedback as user types
7. Test ends after 60 seconds or text completion
8. Results displayed with option to retry

### 6.2 Custom Text Flow
1. User clicks "Custom" tab
2. Text input modal/area appears
3. User pastes or types text (50-2000 chars)
4. Clicks "Start Test"
5. Proceeds with standard test flow

---

## 7. Implementation Phases

### Phase 1: Core Structure (Day 1)
- [ ] HTML structure with semantic elements
- [ ] CSS reset and variables
- [ ] Basic layout and responsive grid
- [ ] Dark mode color scheme implementation

### Phase 2: Test Engine (Day 1-2)
- [ ] Text display component
- [ ] Input handling and validation
- [ ] Character-by-character comparison
- [ ] Timer implementation
- [ ] WPM and accuracy calculations

### Phase 3: Difficulty Levels (Day 2)
- [ ] Text generator for Easy mode
- [ ] Text generator for Medium mode
- [ ] Text generator for Hard mode
- [ ] Difficulty selector UI

### Phase 4: Custom Text (Day 2)
- [ ] Custom text input interface
- [ ] Text validation
- [ ] Integration with test engine

### Phase 5: Results & Storage (Day 3)
- [ ] Results display screen
- [ ] localStorage integration
- [ ] History display
- [ ] Personal best tracking

### Phase 6: Polish & Accessibility (Day 3)
- [ ] Visual feedback animations
- [ ] Keyboard navigation
- [ ] ARIA labels and roles
- [ ] Focus management
- [ ] Screen reader testing

### Phase 7: Testing & Optimization (Day 4)
- [ ] Cross-browser testing
- [ ] Performance optimization
- [ ] Minification
- [ ] Final accessibility audit

---

## 8. Testing Strategy

### 8.1 Manual Testing
- Test all difficulty levels
- Verify WPM calculations with known inputs
- Test custom text with edge cases (very short, very long)
- Keyboard navigation testing
- Screen reader testing (NVDA/VoiceOver)

### 8.2 Performance Testing
- Lighthouse audit (target: 95+ performance score)
- Test on throttled connections
- Memory leak testing (multiple test runs)

### 8.3 Edge Cases
- Rapid backspace/delete
- Paste into input field (should be blocked)
- Browser refresh during test
- localStorage quota exceeded
- Very fast typing (>150 WPM)

---

## 9. Deployment

### 9.1 Build Process
1. Minify CSS files
2. Minify JavaScript files
3. Optimize any images
4. Generate production index.html

### 9.2 Hosting Options
- GitHub Pages (recommended)
- Netlify
- Vercel
- Any static hosting service

### 9.3 Domain & SSL
- Custom domain optional
- SSL certificate (automatic with most hosts)

---

## 10. Future Enhancements (Out of Scope for v1.0)
- Multiple language support
- Sound effects toggle
- Typing statistics graphs
- Export results as PDF
- Social sharing
- Multiplayer/competitive mode
- Backend integration for global leaderboard

---

## 11. Acceptance Criteria

### Must Have (v1.0)
- ✓ Three difficulty levels working correctly
- ✓ Custom text input functional
- ✓ Accurate WPM and accuracy calculations
- ✓ Dark mode professional design
- ✓ Responsive on desktop and tablet
- ✓ localStorage persistence
- ✓ WCAG 2.2 Level AA compliant
- ✓ No console errors
- ✓ Lighthouse performance score > 90

### Nice to Have
- Smooth animations and transitions
- Typing sound effects (optional toggle)
- Keyboard shortcuts (Ctrl+R to restart)
- Export results feature

---

## 12. Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Inaccurate WPM calculation | High | Use industry-standard formula, test with known inputs |
| Poor mobile experience | Medium | Focus on tablet+, add portrait mode warning for phones |
| localStorage quota exceeded | Low | Limit history to 10 entries, add clear history option |
| Browser compatibility issues | Medium | Test on all major browsers, use feature detection |
| Accessibility gaps | High | Follow WCAG guidelines, test with screen readers |

---

## 13. Success Metrics

### Launch Metrics (Week 1)
- Zero critical bugs
- Lighthouse score > 90
- Accessibility audit passed
- Cross-browser compatibility verified

### User Experience Metrics
- Average test completion rate > 80%
- Repeat usage rate (localStorage check)
- No reported calculation errors

---

## 14. Appendix

### 14.1 WPM Calculation Formula
```
WPM = (Total Characters Typed / 5) / (Time in Minutes)
```
Standard: 5 characters = 1 word

### 14.2 Accuracy Calculation Formula
```
Accuracy = (Correct Characters / Total Characters Typed) × 100
```

### 14.3 Text Samples
**Easy Sample:**
"The quick brown fox jumps over the lazy dog. The sun is shining bright today. I love to read books in the park."

**Medium Sample:**
"Technology has transformed the way we communicate, work, and live. From smartphones to artificial intelligence, innovation continues to shape our future."

**Hard Sample:**
"The philosopher's argument—though compelling—failed to address the fundamental paradox: how can consciousness emerge from purely physical processes? (See Chapter 7, pp. 142-156.)"

---

*End of Specification*
