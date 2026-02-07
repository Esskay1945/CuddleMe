document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const plushie = document.getElementById('plushie');
    const plushieWrapper = document.getElementById('plushieWrapper') || document.querySelector('.plushie-wrapper');
    const speechBubble = document.getElementById('speech-bubble');
    const plushieText = document.getElementById('plushie-text');
    const nameInput = document.getElementById('name-input');
    const bgMusic = document.getElementById('bg-music');
    const musicToggle = document.getElementById('music-toggle');
    const themeToggle = document.getElementById('theme-toggle');
    const happinessFill = document.getElementById('happiness-fill');
    const diaryModal = document.getElementById('diary-modal');
    const diaryInput = document.getElementById('diary-input');

    // v3 Elements
    const candyCounter = document.getElementById('candy-count');
    const wardrobeItems = document.querySelectorAll('.wardrobe-item');
    const accessoriesContainer = document.getElementById('accessories-container');
    const breathingOverlay = document.getElementById('breathing-overlay');
    const breathingText = document.getElementById('breathing-text');

    // Body parts
    const eyes = document.querySelectorAll('.eye');
    const mouth = document.querySelector('.mouth');

    // State
    let state = {
        name: localStorage.getItem('cuddleMeName') || '',
        happiness: 10,
        theme: localStorage.getItem('cuddleMeTheme') || 'day',
        isMusicPlaying: false,
        candy: parseInt(localStorage.getItem('cuddleMeCandy') || '0'),
        unlockedItems: JSON.parse(localStorage.getItem('cuddleMeUnlocked') || '[]'),
        activeItem: localStorage.getItem('cuddleMeActiveItem') || null,
        isFollowMode: true,
        isBreathing: false
    };

    // --- Initialization ---
    updateCandyDisplay();
    updateLockState();
    if (state.activeItem) wearItem(state.activeItem);

    if (state.theme === 'night') {
        document.documentElement.setAttribute('data-theme', 'night');
        themeToggle.textContent = '🌙';
    }

    if (state.name) {
        nameInput.value = state.name;
        setTimeout(() => speak(`Welcome back, ${state.name}! 💕`), 1000);
    } else {
        setTimeout(() => speechBubble.classList.add('visible'), 1000);
    }

    updateHappiness(0);
    plushie.style.animation = 'breathe 4s ease-in-out infinite';

    // --- INTERACTIVE & MOVEMENT ---

    // 1. Follow Mode (Waddle)
    const followToggle = document.getElementById('follow-toggle');
    followToggle.addEventListener('click', () => {
        state.isFollowMode = !state.isFollowMode;
        followToggle.classList.toggle('active');
        if (!state.isFollowMode) {
            plushieWrapper.style.transform = `translate(0px, 0px)`; // Reset
            plushieWrapper.classList.remove('waddle');
        }
    });

    let mouseX = 0, mouseY = 0;
    let plushieX = 0, plushieY = 0;

    document.addEventListener('mousemove', (e) => {
        resetSleepTimer(); // Wake up logic
        if (!state.isFollowMode || state.isBreathing) return;

        // Calculate relative from center of screen
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2 - 50; // Offset slightly up

        // Target is closer to mouse but clamped
        const deltaX = (e.clientX - centerX) / 8; // Dampen movement
        const deltaY = (e.clientY - centerY) / 8;

        // Apply to wrapper
        plushieWrapper.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

        // Waddle class trigger based on movement speed (simplified)
        plushieWrapper.classList.add('waddle');
        clearTimeout(window.waddleTimeout);
        window.waddleTimeout = setTimeout(() => {
            plushieWrapper.classList.remove('waddle');
        }, 100);
    });

    // 2. Auto-Sleep System
    let sleepTimer;
    function resetSleepTimer() {
        if (document.body.classList.contains('is-sleeping')) {
            // Wake Up!
            document.body.classList.remove('is-sleeping');
            setMood('happy');
            speak("I'm awake! Did I miss anything? 🥱");
        }
        clearTimeout(sleepTimer);
        sleepTimer = setTimeout(goToSleep, 30000); // 30s
    }

    function goToSleep() {
        if (state.isBreathing) return;
        document.body.classList.add('is-sleeping');
        setMood('tired'); // Helper handles visual sleep state
        speak("Zzz...");
    }

    resetSleepTimer(); // Start timer tracking
    document.addEventListener('click', resetSleepTimer);

    // 3. Candy & Rewards System
    function earnCandy(amount) {
        state.candy += amount;
        localStorage.setItem('cuddleMeCandy', state.candy);
        updateCandyDisplay();
        updateLockState(); // Check if new unlock available

        // Visual feedback
        createFloatingElements('🍬', amount);
    }

    function updateCandyDisplay() {
        candyCounter.textContent = state.candy;
    }

    function updateLockState() {
        wardrobeItems.forEach(item => {
            const cost = parseInt(item.dataset.cost);
            const itemName = item.dataset.item;

            // Unlock logic
            if (state.unlockedItems.includes(itemName) || state.candy >= cost) {
                item.classList.remove('locked');
                if (state.candy >= cost && !state.unlockedItems.includes(itemName)) {
                    // Just Unlocked!
                    // Not forcing unlock unless user clicks, but visually available
                }
            } else {
                item.classList.add('locked');
            }

            // Active State
            if (state.activeItem === itemName) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    // Wardrobe Interactions
    wardrobeItems.forEach(item => {
        item.addEventListener('click', () => {
            const cost = parseInt(item.dataset.cost);
            const itemName = item.dataset.item;

            if (item.classList.contains('locked') && !state.unlockedItems.includes(itemName)) {
                // Try buy
                if (state.candy >= cost) {
                    state.candy -= cost;
                    state.unlockedItems.push(itemName);
                    localStorage.setItem('cuddleMeUnlocked', JSON.stringify(state.unlockedItems));
                    localStorage.setItem('cuddleMeCandy', state.candy);
                    updateCandyDisplay();
                    updateLockState();
                    wearItem(itemName);
                    speak("Yay! New outfit! 🎀");
                } else {
                    speak(`You need ${cost} candies for this! 🍬`);
                }
            } else {
                // Wear / Take off
                wearItem(itemName);
            }
        });
    });

    function wearItem(item) {
        // Toggle off if same
        if (state.activeItem === item) {
            state.activeItem = null;
            accessoriesContainer.innerHTML = '';
            localStorage.removeItem('cuddleMeActiveItem');
            updateLockState();
            return;
        }

        state.activeItem = item;
        localStorage.setItem('cuddleMeActiveItem', item);

        // Clear previous
        accessoriesContainer.innerHTML = '';

        // Add new
        const el = document.createElement('div');
        el.className = `acc-item acc-${item}`;
        switch (item) {
            case 'bow': el.textContent = '🎀'; break;
            case 'hat': el.textContent = '🧢'; break;
            case 'scarf': el.textContent = '🧣'; break;
            case 'crown': el.textContent = '👑'; break;
        }
        accessoriesContainer.appendChild(el);
        updateLockState();
    }

    // 4. Breathing Mode (Deep Comfort)
    const breatheBtn = document.getElementById('breathe-btn');
    breatheBtn.addEventListener('click', startBreathing);

    function startBreathing() {
        state.isBreathing = true;
        breathingOverlay.classList.add('active');

        let cycle = 0;

        window.breathingInterval = setInterval(() => {
            // Cycle roughly matches animation 4s-4s-4s
            // Using time check or simple text updates
            setTimeout(() => breathingText.textContent = "Inhale...", 0);
            setTimeout(() => breathingText.textContent = "Hold...", 4000);
            setTimeout(() => breathingText.textContent = "Exhale...", 6000);
        }, 12000); // 12s total loop

        breathingText.textContent = "Inhale..."; // Start immediate
    }

    window.stopBreathing = () => {
        state.isBreathing = false;
        breathingOverlay.classList.remove('active');
        clearInterval(window.breathingInterval);
    };


    // --- EXISTING LOGIC (Updated with rewards) ---

    // Theme Toggle
    themeToggle.addEventListener('click', () => {
        if (state.theme === 'day') {
            document.documentElement.setAttribute('data-theme', 'night');
            state.theme = 'night';
            themeToggle.textContent = '🌙';
            speak("Getting cozy for the night... 💤");
        } else {
            document.documentElement.removeAttribute('data-theme');
            state.theme = 'day';
            themeToggle.textContent = '☀️';
            speak("Good morning sunshine! 🌸");
        }
        localStorage.setItem('cuddleMeTheme', state.theme);
    });

    // Mood System
    window.setMood = (mood) => {
        resetPlushie();
        const name = state.name ? state.name : 'friend';

        // Remove Rain
        const existingRain = document.querySelectorAll('.rain-drop');
        existingRain.forEach(r => r.remove());

        switch (mood) {
            case 'sad':
                plushie.classList.add('sad-eyes');
                mouth.className = 'mouth frown';
                speak(`Come here, ${name}... everything will be okay. 🫂`);
                createFloatingElements('💧', 5);
                startRain();
                break;
            case 'tired':
                plushie.classList.add('sleepy-eyes');
                mouth.className = 'mouth o-mouth';
                speak(`Rest with me a little, you deserve it. 💤`);
                createFloatingElements('💤', 5);
                break;
            case 'miss':
                plushie.classList.add('happy-eyes');
                plushie.classList.add('hugging');
                mouth.className = 'mouth smile';
                speak(`I'm always right here with you! 💗`);
                createFloatingElements('❤️', 10);
                updateHappiness(5);
                earnCandy(1);
                break;
            case 'happy':
                plushie.classList.add('happy-eyes');
                mouth.className = 'mouth smile';
                plushie.style.animation = 'jump 0.5s alternate infinite';
                setTimeout(() => plushie.style.animation = 'breathe 4s ease-in-out infinite', 2000);
                speak(`Yay! You made me smile! ✨`);
                createFloatingElements('✨', 10);
                updateHappiness(5);
                earnCandy(1);
                break;
        }
    };

    // Background Hearts Generator (Falling)
    // Background Hearts Generator (Floating Up)
    const isMobile = window.innerWidth < 600;
    const heartInterval = isMobile ? 800 : 400;

    function createBackgroundHeart() {
        const container = document.getElementById('background-hearts');
        if (!container) return;

        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.textContent = '❤';
        // Logic from snippet:
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.fontSize = Math.random() * 20 + 15 + "px"; // 15px to 35px

        container.appendChild(heart);

        // CSS animation 'floatUp' handles movement from 100vh to -10vh

        setTimeout(() => heart.remove(), 6000);
    }

    // Start continuous generation
    setInterval(createBackgroundHeart, heartInterval);

    function startRain() {
        // Simple rain
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const drop = document.createElement('div');
                drop.className = 'rain-drop';
                drop.textContent = '💙'; // Heart rain
                drop.style.left = Math.random() * 100 + 'vw';
                drop.style.animationDuration = (Math.random() * 2 + 1) + 's';
                document.body.appendChild(drop);
                setTimeout(() => drop.remove(), 3000);
            }, i * 300);
        }
    }

    function resetPlushie() {
        plushie.className = 'plushie';
        mouth.className = 'mouth';
        plushie.style.animation = 'breathe 4s ease-in-out infinite';
    }

    // Hug
    window.giveHug = () => {
        resetPlushie();
        plushie.classList.add('hugging');
        plushie.classList.add('happy-eyes');
        mouth.className = 'mouth smile';

        speak("Everything feels better with hugs 💖");
        createFloatingElements('🤗', 8);
        createFloatingElements('❤️', 8);
        updateHappiness(10);
        earnCandy(2); // Big candy reward

        document.body.style.transform = "scale(1.02)";
        setTimeout(() => document.body.style.transform = "scale(1)", 300);
    };

    // Feed
    window.feed = (item) => {
        resetPlushie();
        plushie.style.animation = 'eat 0.5s ease-in-out 3';
        mouth.className = 'mouth o-mouth';

        let msg = ""; let emoji = "";
        switch (item) {
            case 'cookie': msg = "Yummy! Cookies are the best! 🍪"; emoji = "🍪"; break;
            case 'strawberry': msg = "So sweet and healthy! 🍓"; emoji = "🍓"; break;
            case 'cupcake': msg = "Ooh, sugar rush! 🧁"; emoji = "🧁"; break;
        }

        setTimeout(() => {
            speak(msg);
            mouth.className = 'mouth smile';
            updateHappiness(8);
            earnCandy(1);
            createFloatingElements(emoji, 5);
        }, 1500);
    };

    // Surprise
    window.surpriseMe = () => {
        resetPlushie();
        const msgs = [
            "I'm proud of you today 💕",
            "You’re my favorite human ever 💗",
            "I love spending time with you! ✨",
            "Boop! 🧸"
        ];
        speak(msgs[Math.floor(Math.random() * msgs.length)]);
        plushie.classList.add('happy-eyes');
        mouth.className = 'mouth smile';
        updateHappiness(5);
        earnCandy(1);
        createFloatingElements('🎉', 10);
    };

    plushie.addEventListener('click', window.surpriseMe);

    // Diary
    window.openDiary = () => {
        diaryModal.classList.add('active');
        diaryInput.focus();
    };

    window.closeDiary = () => {
        diaryModal.classList.remove('active');
    };

    window.submitDiary = () => {
        if (diaryInput.value.trim()) {
            closeDiary();
            speak("I'm listening... 💭");
            setTimeout(() => {
                speak("I'm glad you told me. I'm here for you. 💗");
                updateHappiness(15);
                earnCandy(3); // Big reward for sharing feelings
                diaryInput.value = '';
            }, 1500);
        }
    };

    // Happiness
    function updateHappiness(amount) {
        state.happiness = Math.min(100, Math.max(0, state.happiness + amount));
        happinessFill.style.width = state.happiness + '%';
        if (state.happiness >= 100) celebrate();
    }

    function celebrate() {
        speak("We are SO happy right now! 🎉🎊");
        resetPlushie();
        plushie.style.animation = 'jump 0.4s ease infinite alternate';
        createFloatingElements('🎉', 20);
        earnCandy(5); // Completion reward
    }

    // Helper: Speak
    function speak(text) {
        speechBubble.classList.remove('visible');
        setTimeout(() => {
            plushieText.textContent = text;
            speechBubble.classList.add('visible');
        }, 300);
    }

    // Helper: Floating Elements
    function createFloatingElements(emoji, count) {
        const rect = plushie.getBoundingClientRect();
        for (let i = 0; i < count; i++) {
            const el = document.createElement('div');
            el.textContent = emoji;
            el.style.position = 'absolute';
            el.style.left = (rect.left + rect.width / 2) + 'px';
            el.style.top = (rect.top + rect.height / 2) + 'px';
            el.style.fontSize = '1.5rem';
            el.style.pointerEvents = 'none';
            el.style.transition = 'all 2s ease-out';
            el.style.opacity = '1';
            el.style.zIndex = '100';
            document.body.appendChild(el);
            const x = (Math.random() - 0.5) * 300;
            const y = (Math.random() - 1) * 300;
            const rot = Math.random() * 360;
            requestAnimationFrame(() => {
                el.style.transform = `translate(${x}px, ${y}px) rotate(${rot}deg)`;
                el.style.opacity = '0';
            });
            setTimeout(() => el.remove(), 2000);
        }
    }

    // Input Handler
    nameInput.addEventListener('input', (e) => {
        state.name = e.target.value;
        localStorage.setItem('cuddleMeName', state.name);
    });

    // Music
    musicToggle.addEventListener('click', () => {
        if (state.isMusicPlaying) {
            bgMusic.pause();
            musicToggle.classList.remove('active');
        } else {
            bgMusic.play().catch(console.error);
            musicToggle.classList.add('active');
        }
        state.isMusicPlaying = !state.isMusicPlaying;
    });
});
