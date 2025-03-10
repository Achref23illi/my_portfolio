document.addEventListener("DOMContentLoaded", function () {
    const darkModeToggle = document.getElementById("darkModeToggle");
    const body = document.body;
    const header = document.querySelector('header');
    const sections = document.querySelectorAll('section:not(.hero)');
    
    // Initialize custom cursor
    createCustomCursor();
    
    // Check for previously stored dark mode preference
    if (localStorage.getItem("darkMode") === "enabled") {
        body.classList.add("dark-mode");
        darkModeToggle.textContent = "🌙";
    } else if (localStorage.getItem("darkMode") === "light") {
        body.classList.add("light-mode");
        darkModeToggle.textContent = "☀";
    }

    darkModeToggle.addEventListener("click", function () {
        if (body.classList.contains("light-mode")) {
            body.classList.remove("light-mode");
            body.classList.add("dark-mode");
            localStorage.setItem("darkMode", "enabled");
            darkModeToggle.textContent = "🌙";
        } else if (body.classList.contains("dark-mode")) {
            body.classList.remove("dark-mode");
            body.classList.add("light-mode");
            localStorage.setItem("darkMode", "light");
            darkModeToggle.textContent = "☀";
        } else {
            body.classList.add("light-mode");
            localStorage.setItem("darkMode", "light");
            darkModeToggle.textContent = "☀";
        }
    });
    
    // Scroll events for animations
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // Header scroll effect
        if (scrollPosition > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Reveal sections on scroll
        sections.forEach(section => {
            const sectionTop = section.offsetTop - window.innerHeight * 0.8;
            if (scrollPosition > sectionTop) {
                section.classList.add('appear');
            }
        });
    });
    
    // Trigger initial scroll to activate visible sections
    setTimeout(() => {
        window.dispatchEvent(new Event('scroll'));
    }, 100);
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Project hover animations
    const projects = document.querySelectorAll('.project');
    projects.forEach(project => {
        project.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        
        project.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
    });
    
    // Type animation for hero section
    const heroTitle = document.querySelector('.hero h1 span');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        
        setTimeout(() => {
            typeText(heroTitle, originalText, 100);
        }, 1000);
    }
    
    // Add animated background effect
    createAnimatedBackground();
});

// Function to create custom cursor
function createCustomCursor() {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', e => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Add pulse effect on clickable elements
    document.querySelectorAll('a, button, .project').forEach(item => {
        item.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
        });
        
        item.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
        });
    });
}

// Function for typewriter effect
function typeText(element, text, speed) {
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
            
            // Add blinking cursor effect
            const cursor = document.createElement('span');
            cursor.innerHTML = '|';
            cursor.style.opacity = '1';
            cursor.style.marginLeft = '2px';
            cursor.style.animation = 'blink 1s infinite';
            element.appendChild(cursor);
            
            // Add style for cursor blink
            const style = document.createElement('style');
            style.innerHTML = `
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }, speed);
}

// Function to create animated background
function createAnimatedBackground() {
    const hero = document.querySelector('.hero');
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random styling
        const size = Math.random() * 15 + 5;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            position: absolute;
            top: ${posY}%;
            left: ${posX}%;
            width: ${size}px;
            height: ${size}px;
            background-color: rgba(88, 166, 255, ${Math.random() * 0.1});
            border-radius: 50%;
            pointer-events: none;
            opacity: ${Math.random() * 0.6 + 0.2};
            animation: float ${duration}s ease-in-out infinite;
            animation-delay: -${delay}s;
            z-index: 0;
        `;
        
        hero.appendChild(particle);
    }
}

// Add dynamic progress bar at top of page
function addProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.classList.add('progress-bar');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #58a6ff, #e94560);
        z-index: 1001;
        width: 0%;
        transition: width 0.2s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollPercentage = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrollPercentage + '%';
    });
}

// Call this function at the end of DOMContentLoaded
addProgressBar();