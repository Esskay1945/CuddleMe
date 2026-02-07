# 🧸 CuddleMe - Your Comfort Plushie

<div align="center">

![CuddleMe Banner](https://img.shields.io/badge/CuddleMe-Your%20Comfort%20Companion-ff9ebd?style=for-the-badge)

[![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=flat-square&logo=netlify)](https://cuddleme.netlify.app/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

*A wholesome interactive web experience designed to bring comfort and joy* 💕

[View Demo](https://cuddleme.netlify.app/) · [Report Bug](https://github.com/yourusername/cuddleme/issues) · [Request Feature](https://github.com/yourusername/cuddleme/issues)

</div>

---

## 📖 About The Project

**CuddleMe** is an interactive virtual comfort companion built with pure HTML, CSS, and JavaScript. It creates a safe, warm space where users can interact with an adorable plushie character that responds to emotions, provides comfort, and grows alongside you through personalized interactions.

Perfect for:
- 🌟 Those seeking a moment of digital comfort
- 💭 Mental wellness and mindfulness practices
- 🎮 Casual interactive experiences
- 🧘 Stress relief and relaxation
- 💝 Anyone who loves cute, wholesome content

---

## ✨ Features

### 🎭 **Emotional Intelligence**
- **4 Mood States**: Express how you're feeling (Sad, Tired, Miss You, Excited)
- **Responsive Reactions**: Plushie responds with custom animations and comforting messages
- **Happiness Meter**: Visual representation of emotional progression
- **Rain Effects**: Ambient animations that match your mood

### 🤗 **Interactive Comfort**
- **Hug System**: Give your plushie warm hugs with satisfying animations
- **Feeding Mechanic**: Share treats (cookies, strawberries, cupcakes) with adorable eating animations
- **Surprise Generator**: Random encouraging messages and positive affirmations
- **Speech Bubbles**: Real-time conversational feedback

### 👔 **Customization & Rewards**
- **Candy Collection**: Earn candies through positive interactions
- **Wardrobe System**: Unlock accessories (bow, hat, scarf, crown)
- **Progressive Unlocks**: Rewards encourage continued engagement
- **Personalization**: Enter your name for a tailored experience

### 🌈 **Ambient Features**
- **Day/Night Themes**: Toggle between cozy rose-tinted day mode and calming purple night mode
- **Floating Hearts**: Continuous ambient heart animations in the background
- **Follow Mode**: Plushie subtly follows your cursor with gentle waddle animations
- **Auto-Sleep**: Plushie falls asleep after inactivity and wakes up when you return
- **Background Music**: Optional looping ambient music for enhanced atmosphere

### 🧘 **Wellness Tools**
- **Breathing Mode**: Guided breathing exercise with visual circles and timing
- **Comfort Diary**: Private journaling space to express your thoughts
- **Mindfulness Focus**: Calming animations and responses

### 🎨 **Visual Design**
- **Glassmorphism UI**: Modern frosted glass aesthetic
- **CSS Art Plushie**: Hand-crafted plushie character with no image dependencies
- **Smooth Animations**: Polished transitions and interactive feedback
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Accessibility**: Clean, readable interface with intuitive controls

---

## 🚀 Demo

**Live Site**: [https://cuddleme.netlify.app/](https://cuddleme.netlify.app/)

### Screenshots

<div align="center">

| Day Mode | Night Mode |
|----------|------------|
| ![Day Mode](https://via.placeholder.com/400x300/cf9ba9/ffffff?text=Day+Mode) | ![Night Mode](https://via.placeholder.com/400x300/2d3436/ffffff?text=Night+Mode) |

| Wardrobe System | Breathing Mode |
|-----------------|----------------|
| ![Wardrobe](https://via.placeholder.com/400x300/ff9ebd/ffffff?text=Wardrobe) | ![Breathing](https://via.placeholder.com/400x300/6c5ce7/ffffff?text=Breathing) |

</div>

---

## 🛠️ Built With

- **HTML5** - Semantic markup structure
- **CSS3** - Advanced styling with animations and glassmorphism
- **Vanilla JavaScript** - Pure JS with no frameworks or dependencies
- **LocalStorage API** - Persistent user data and progress
- **Google Fonts** - Baloo 2 & Nunito for friendly typography

---

## 📦 Installation

### Option 1: Direct Download

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/cuddleme.git
   cd cuddleme
   ```

2. **Open in browser**
   ```bash
   # Simply open index.html in your browser
   open index.html  # macOS
   start index.html # Windows
   xdg-open index.html # Linux
   ```

### Option 2: Local Server (Recommended)

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

---

## 💻 Usage

### Basic Interactions

1. **Express Your Mood**: Click mood buttons to set the emotional tone
2. **Give Hugs**: Click the "Hug Me" button for comforting animations
3. **Feed Your Plushie**: Choose from 3 food options to see eating animations
4. **Earn Candies**: Receive rewards for positive interactions
5. **Unlock Items**: Spend candies to unlock wardrobe accessories

### Advanced Features

- **Follow Mode**: Toggle cursor tracking (🐾 button in header)
- **Breathing Exercise**: Click 🌬️ button for guided breathing
- **Day/Night Toggle**: Click ☀️/🌙 button to switch themes
- **Diary Writing**: Share your thoughts through the diary feature
- **Personalization**: Enter your name for a customized greeting

### Keyboard Shortcuts

- `Esc` - Close breathing mode or diary modal
- `Space` - Quick hug (when focused on hug button)

---

## 📁 Project Structure

```
cuddleme/
│
├── index.html          # Main HTML structure
├── style.css           # All styling and animations
├── script.js           # Application logic and interactivity
└── README.md           # Project documentation
```

### Key Components

**HTML (`index.html`)**
- Semantic structure with accessibility in mind
- Modal overlays for diary and breathing mode
- External font imports (Google Fonts)

**CSS (`style.css`)**
- CSS custom properties for theming
- Glassmorphism effects with backdrop filters
- Keyframe animations for all interactions
- Responsive breakpoints for mobile optimization
- Pure CSS plushie character art

**JavaScript (`script.js`)**
- Event-driven interaction system
- LocalStorage for persistence
- State management for mood, items, and progress
- Animation and timing controllers
- Dynamic DOM manipulation

---

## 🎨 Customization

### Changing Colors

Edit CSS variables in `style.css`:

```css
:root {
    --bg-gradient: linear-gradient(135deg, #yourcolor1 0%, #yourcolor2 100%);
    --plushie-color: #yourcolor;
    --accent-glow: 0 0 15px rgba(your, rgb, values, 0.3);
}
```

### Adding New Moods

1. Add button in HTML:
```html
<button class="mood-btn custom" onclick="setMood('custom')">😊 Custom</button>
```

2. Add case in `script.js` `setMood()` function:
```javascript
case 'custom':
    speak("Your custom message!");
    // Add animations and effects
    break;
```

### Creating New Wardrobe Items

1. Add item in HTML:
```html
<div class="wardrobe-item locked" data-item="itemname" data-cost="25">🎩</div>
```

2. Add styling case in `script.js` `wearItem()` function

---

## 🌐 Browser Compatibility

| Browser | Supported Version |
|---------|-------------------|
| Chrome  | ✅ Latest (2 versions) |
| Firefox | ✅ Latest (2 versions) |
| Safari  | ✅ 14+ |
| Edge    | ✅ Latest (2 versions) |
| Opera   | ✅ Latest |

**Note**: Requires JavaScript enabled and LocalStorage support

---

## 📱 Mobile Support

Fully responsive design with optimizations for:
- 📱 Phones (320px - 600px)
- 📱 Tablets (601px - 1024px)
- 💻 Desktops (1025px+)

Special mobile features:
- Reduced animation complexity for performance
- Touch-optimized button sizes
- Adaptive wardrobe positioning
- Optimized heart generation rate

---

## 🔮 Future Enhancements

- [ ] 🎮 Mini-games integration
- [ ] 📊 Mood tracking analytics
- [ ] 🗓️ Diary history and entries viewing
- [ ] 🔊 Sound effects for interactions
- [ ] 🌍 Multi-language support
- [ ] 💾 Cloud save functionality
- [ ] 🎭 Additional plushie characters
- [ ] 🏆 Achievement system
- [ ] 📱 Progressive Web App (PWA) support
- [ ] 🤝 Share progress on social media

---

## 🤝 Contributing

Contributions are what make the open-source community amazing! Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style and structure
- Test across multiple browsers
- Ensure mobile responsiveness
- Document new features in README
- Keep accessibility in mind

---

## 📝 License

Distributed under the MIT License. See `LICENSE` file for more information.

```
MIT License

Copyright (c) 2024 CuddleMe

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

---

## 👤 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Website: [yourwebsite.com](https://yourwebsite.com)
- Twitter: [@yourhandle](https://twitter.com/yourhandle)

---

## 🙏 Acknowledgments

- Fonts: [Google Fonts](https://fonts.google.com/) (Baloo 2, Nunito)
- Background Music: [OpenGameArt](https://opengameart.org/)
- Inspiration: Virtual pet games and comfort apps
- Emojis: Native system emojis
- Hosting: [Netlify](https://www.netlify.com/)

---

## 💬 Support

If you like this project, please consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs or issues
- 💡 Suggesting new features
- 🔄 Sharing with friends

---

<div align="center">

**Made with 💕 for mental wellness and digital comfort**

[⬆ Back to Top](#-cuddleme---your-comfort-plushie)

</div>
