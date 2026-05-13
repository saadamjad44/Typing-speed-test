# Typing Speed Test

A modern, professional typing speed test application to measure your typing speed (WPM) and accuracy. Built with vanilla JavaScript, featuring multiple difficulty levels, practice lessons, and detailed performance tracking.

![Typing Speed Test](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## Features

- **Real-time Statistics**: Live WPM, accuracy, and timer updates
- **Multiple Difficulty Levels**: Easy, Medium, Hard, Practice, and Custom modes
- **Practice Lessons**: Structured lessons for home row, top row, bottom row, numbers, punctuation, and common words
- **Custom Text Mode**: Test with your own text (50-2000 characters)
- **Performance History**: Track your progress over time
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Accessibility**: Full keyboard navigation and screen reader support
- **Auto-complete**: Automatic results display after 60 seconds or text completion

## Demo

[Live Demo](https://your-username.github.io/typing-speed-test)

## Screenshots

### Main Test Interface
![Main Interface](assets/screenshot-main.png)

### Results Screen
![Results](assets/screenshot-results.png)

### Practice Lessons
![Practice](assets/screenshot-practice.png)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/typing-speed-test.git
```

2. Navigate to the project directory:
```bash
cd typing-speed-test
```

3. Open `index.html` in your browser or use a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve

# Using PHP
php -S localhost:8000
```

4. Visit `http://localhost:8000` in your browser

## Usage

### Starting a Test

1. Select your preferred difficulty level (Easy, Medium, Hard, Practice, or Custom)
2. Click on the input field or start typing
3. The timer starts automatically when you begin typing
4. Type the displayed text as accurately and quickly as possible
5. Results appear automatically after 60 seconds or when you complete the text

### Difficulty Levels

- **Easy**: Simple, common words with basic punctuation
- **Medium**: Mixed complexity with moderate vocabulary
- **Hard**: Complex sentences with advanced vocabulary and punctuation
- **Practice**: Structured lessons focusing on specific key groups
- **Custom**: Use your own text for personalized practice

### Practice Lessons

- **Home Row Keys**: Master A S D F J K L
- **Top Row Keys**: Practice Q W E R T Y U I O P
- **Bottom Row Keys**: Practice Z X C V B N M
- **Numbers**: Improve number typing skills (0-9)
- **Punctuation**: Master special characters
- **Common Words**: Practice frequently used English words

### Keyboard Shortcuts

- **Backspace**: Delete the last typed character
- **Escape**: Close modals
- **Tab**: Navigate between elements

## Project Structure

```
typing-speed-test/
├── index.html              # Main HTML file
├── css/
│   ├── reset.css          # CSS reset
│   ├── variables.css      # CSS custom properties
│   ├── main.css           # Main styles
│   └── responsive.css     # Responsive styles
├── js/
│   ├── app.js             # Main application logic
│   ├── test-engine.js     # Test engine and timer logic
│   ├── text-generator.js  # Text generation for different modes
│   ├── storage.js         # LocalStorage management
│   └── utils.js           # Utility functions
├── assets/                # Images and icons
├── spec.md               # Project specifications
├── TESTING.md            # Testing documentation
└── README.md             # This file
```

## Technical Details

### Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with custom properties and flexbox/grid
- **JavaScript (ES6+)**: Modular architecture with ES6 modules
- **LocalStorage**: Client-side data persistence

### Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Performance

- Lightweight: ~50KB total size
- No external dependencies
- Fast load time: <1 second
- Smooth 60fps animations

## Features in Detail

### Real-time Timer
The timer updates continuously every 100ms, providing smooth and accurate time tracking throughout the test.

### Accuracy Calculation
Accuracy is calculated based on correct characters typed versus total characters typed, displayed as a percentage.

### WPM Calculation
Words Per Minute (WPM) is calculated using the standard formula:
```
WPM = (Correct Characters / 5) / (Time in Minutes)
```

### History Tracking
All test results are saved locally and displayed in the history section, showing:
- WPM score
- Accuracy percentage
- Difficulty level
- Time completed

## Development

### Running Tests

```bash
# Open TESTING.md for manual testing procedures
```

### Building for Production

The application is production-ready as-is. Simply deploy the files to any static hosting service:

- GitHub Pages
- Netlify
- Vercel
- AWS S3
- Any web server

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by popular typing test websites
- Built with accessibility and user experience in mind
- Thanks to all contributors and testers

## Contact

Your Name - [@your-twitter](https://twitter.com/your-twitter)

Project Link: [https://github.com/your-username/typing-speed-test](https://github.com/your-username/typing-speed-test)

## Changelog

### Version 1.0.0 (2026-05-13)
- Initial release
- Multiple difficulty levels
- Practice lessons
- Custom text mode
- Performance history
- Responsive design
- Accessibility features
- Continuous timer updates
- Auto-complete after 60 seconds

---

Made with ❤️ by [Your Name]
