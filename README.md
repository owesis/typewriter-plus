# TypeWriterPlus

[![npm version](https://img.shields.io/npm/v/typewriter-plus.svg)](https://www.npmjs.com/package/typewriter-plus)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A lightweight, customizable typing animation library that supports multiple elements and advanced text animations.

## Features

- 🚀 Lightweight
- 🎯 Multiple element support
- ⚙️ Highly customizable
- 🎨 Custom cursor and text styling
- 🔄 Loop control
- 📱 Mobile-friendly
- 📦 No dependencies

## Installation

```bash
npm install typewriter-plus
```

Or include via CDN:

```html
<script src="https://unpkg.com/typewriter-plus@1.0.0/dist/typewriter-plus.min.js"></script>
```

## Usage

### Basic Usage
``` This method allow all characters special/normal ```
```html
<div class="type-text" data-type='["First sentence.", "Second sentence."]'></div>
```
OR

``` Use this if you don't care about special characters | note each word is comma spareted```
```html
<div class="type-text" data-type='First sentence., Second sentence., Second sentence.'></div>
```

###  Usage

```javascript
new TypeWriterPlus('.type-text', {
  speed: 90,
  deleteSpeed: 50,
  pauseBetweenSentences: 1000,
  loop: true,
  cursor: true,
  cursorColor: '#0066cc',
  textColor: '#333333',
  textSize: '16px',
  cursorSize: '18px'
}).create();
```
OR
``` This method will select all elements with * data-type ```
```javascript
new TypeWriterPlus('[data-type]', {
  speed: 90,
  deleteSpeed: 50,
  pauseBetweenSentences: 1000,
  loop: true,
  cursor: true,
  cursorColor: '#0066cc',
  textColor: '#333333',
  textSize: '16px',
  cursorSize: '18px'
}).create();
```

## Options

| Option | Type | Default | Description                    |
|--------|------|---------|--------------------------------|
| speed | number | 90 | Typing speed in milliseconds   |
| deleteSpeed | number | 50 | Deletion speed in milliseconds |
| pauseBetweenSentences | number | 1000 | Pause duration between sentences |
| loop | boolean | true | Whether to loop the animation  |
| cursor | boolean | true | Show/hide cursor               |
| cursorColor | string | 'black' | Cursor color                   |
| textColor | string | 'black' | Text color                     |
| cursorSize | string | 'auto' | Cursor font size               |
| textSize | string | 'auto' | Text font size                 |

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- IE11 (with appropriate polyfills)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
