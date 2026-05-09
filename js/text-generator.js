// Text Generator Module
class TextGenerator {
  constructor() {
    this.easyWords = [
      'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'it',
      'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at', 'this',
      'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she', 'or',
      'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what', 'so',
      'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me', 'when',
      'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take', 'people',
      'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other', 'than',
      'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also', 'back',
      'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way', 'even',
      'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us', 'is'
    ];

    this.mediumWords = [
      'government', 'company', 'number', 'group', 'problem', 'fact', 'hand', 'place',
      'case', 'week', 'system', 'program', 'question', 'work', 'night', 'point',
      'home', 'water', 'room', 'mother', 'area', 'money', 'story', 'fact', 'month',
      'different', 'study', 'book', 'eye', 'job', 'word', 'business', 'issue', 'side',
      'kind', 'head', 'house', 'service', 'friend', 'father', 'power', 'hour', 'game',
      'line', 'end', 'member', 'law', 'car', 'city', 'community', 'name', 'president',
      'team', 'minute', 'idea', 'body', 'information', 'back', 'parent', 'face', 'others',
      'level', 'office', 'door', 'health', 'person', 'art', 'war', 'history', 'party',
      'result', 'change', 'morning', 'reason', 'research', 'girl', 'guy', 'moment', 'air',
      'teacher', 'force', 'education', 'technology', 'experience', 'society', 'development'
    ];

    this.hardWords = [
      'phenomenon', 'consciousness', 'infrastructure', 'philosophical', 'unprecedented',
      'sophisticated', 'comprehensive', 'fundamental', 'revolutionary', 'extraordinary',
      'implementation', 'methodology', 'architecture', 'paradigm', 'hypothesis',
      'algorithm', 'optimization', 'synchronization', 'authentication', 'encryption',
      'bureaucracy', 'entrepreneur', 'jurisdiction', 'manipulation', 'negotiation',
      'perspective', 'psychology', 'renaissance', 'sustainability', 'transformation',
      'ambiguous', 'arbitrary', 'coherent', 'contemporary', 'controversial',
      'deliberate', 'empirical', 'inevitable', 'intrinsic', 'legitimate',
      'paradoxical', 'preliminary', 'reciprocal', 'substantial', 'theoretical'
    ];

    this.punctuation = ['.', ',', '!', '?', ';', ':'];
    this.specialChars = ['(', ')', '"', "'", '-', '—'];

    this.practiceLessons = {
      'home-row': {
        chars: ['a', 's', 'd', 'f', 'j', 'k', 'l'],
        words: ['sad', 'dad', 'lad', 'lass', 'fall', 'all', 'ask', 'flask', 'salad', 'lass']
      },
      'top-row': {
        chars: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        words: ['quit', 'wire', 'tire', 'type', 'ripe', 'wipe', 'poet', 'quote', 'trout', 'power']
      },
      'bottom-row': {
        chars: ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
        words: ['zone', 'maze', 'cave', 'move', 'beam', 'name', 'zoom', 'venom', 'cabin', 'maven']
      },
      'numbers': {
        chars: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
        words: ['123', '456', '789', '2024', '1000', '5050', '9999', '1234', '5678', '9012']
      },
      'punctuation': {
        chars: ['.', ',', '!', '?', ';', ':', '"', "'", '-', '(', ')'],
        words: ['Hello!', 'Yes?', 'Wait...', 'Stop!', 'Really?', 'Oh, no!', 'Hi there!', 'What?', 'Wow!', 'Nice!']
      },
      'common-words': {
        chars: [],
        words: ['the', 'quick', 'brown', 'fox', 'jumps', 'over', 'lazy', 'dog', 'hello', 'world',
                'computer', 'keyboard', 'typing', 'speed', 'practice', 'lesson', 'master', 'skill']
      }
    };
  }

  generateEasy() {
    const sentences = [];
    const numSentences = 4 + Math.floor(Math.random() * 3);

    for (let i = 0; i < numSentences; i++) {
      const sentenceLength = 5 + Math.floor(Math.random() * 8);
      const words = [];

      for (let j = 0; j < sentenceLength; j++) {
        const word = this.easyWords[Math.floor(Math.random() * this.easyWords.length)];
        words.push(j === 0 ? this.capitalize(word) : word);
      }

      sentences.push(words.join(' ') + '.');
    }

    return sentences.join(' ');
  }

  generateMedium() {
    const sentences = [];
    const numSentences = 3 + Math.floor(Math.random() * 3);

    for (let i = 0; i < numSentences; i++) {
      const sentenceLength = 6 + Math.floor(Math.random() * 10);
      const words = [];

      for (let j = 0; j < sentenceLength; j++) {
        const wordPool = Math.random() > 0.5 ? this.mediumWords : this.easyWords;
        const word = wordPool[Math.floor(Math.random() * wordPool.length)];
        words.push(j === 0 ? this.capitalize(word) : word);
      }

      const punctuation = Math.random() > 0.7 ? this.punctuation[Math.floor(Math.random() * 2)] : '.';
      sentences.push(words.join(' ') + punctuation);
    }

    return sentences.join(' ');
  }

  generateHard() {
    const sentences = [];
    const numSentences = 2 + Math.floor(Math.random() * 3);

    for (let i = 0; i < numSentences; i++) {
      const sentenceLength = 8 + Math.floor(Math.random() * 12);
      const words = [];

      for (let j = 0; j < sentenceLength; j++) {
        let word;
        const rand = Math.random();

        if (rand > 0.7) {
          word = this.hardWords[Math.floor(Math.random() * this.hardWords.length)];
        } else if (rand > 0.4) {
          word = this.mediumWords[Math.floor(Math.random() * this.mediumWords.length)];
        } else {
          word = this.easyWords[Math.floor(Math.random() * this.easyWords.length)];
        }

        // Add numbers occasionally
        if (Math.random() > 0.9) {
          word = Math.floor(Math.random() * 1000).toString();
        }

        words.push(j === 0 ? this.capitalize(word) : word);

        // Add special characters occasionally
        if (Math.random() > 0.85 && j > 0 && j < sentenceLength - 1) {
          const special = this.specialChars[Math.floor(Math.random() * this.specialChars.length)];
          if (special === '(' || special === '"' || special === "'") {
            words[words.length - 1] = special + words[words.length - 1];
          } else {
            words[words.length - 1] = words[words.length - 1] + special;
          }
        }
      }

      const punctuation = this.punctuation[Math.floor(Math.random() * this.punctuation.length)];
      sentences.push(words.join(' ') + punctuation);
    }

    return sentences.join(' ');
  }

  validateCustomText(text) {
    if (!text || typeof text !== 'string') {
      return { valid: false, error: 'Text is required' };
    }

    const trimmed = text.trim();

    if (trimmed.length < 50) {
      return { valid: false, error: 'Text must be at least 50 characters long' };
    }

    if (trimmed.length > 2000) {
      return { valid: false, error: 'Text must be less than 2000 characters' };
    }

    return { valid: true, text: trimmed };
  }

  capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  generatePracticeLesson(lessonType) {
    const lesson = this.practiceLessons[lessonType];
    if (!lesson) {
      return this.generateMedium();
    }

    const sentences = [];
    const numSentences = 4 + Math.floor(Math.random() * 3);

    for (let i = 0; i < numSentences; i++) {
      const sentenceLength = 5 + Math.floor(Math.random() * 6);
      const words = [];

      for (let j = 0; j < sentenceLength; j++) {
        const word = lesson.words[Math.floor(Math.random() * lesson.words.length)];
        words.push(j === 0 ? this.capitalize(word) : word);
      }

      if (lessonType === 'punctuation') {
        sentences.push(words.join(' '));
      } else {
        sentences.push(words.join(' ') + '.');
      }
    }

    return sentences.join(' ');
  }
}

export default TextGenerator;
