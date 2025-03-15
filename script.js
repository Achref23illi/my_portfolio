// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Page loader
    window.addEventListener('load', function() {
        const pageLoader = document.querySelector('.page-loader');
        
        setTimeout(() => {
            pageLoader.style.opacity = '0';
            pageLoader.style.visibility = 'hidden';
            
            // Animate elements with the fade-in-element class
            document.querySelectorAll('.fade-in-element').forEach(element => {
                element.style.opacity = '1';
            });
        }, 1000);
    });
    
    // Variables
    const body = document.body;
    const header = document.querySelector('header');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navBackdrop = document.querySelector('.nav-backdrop');
    const navLinks = document.querySelectorAll('.nav-link');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const scrollIndicator = document.querySelector('.scroll-indicator-progress');
    const skillProgressBars = document.querySelectorAll('.skill-progress-bar');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project');
    const contactForm = document.getElementById('contactForm');
    const sections = document.querySelectorAll('section[id]');
    const currentYearElements = document.querySelectorAll('.current-year');
    const pageTransition = document.querySelector('.page-transition');
    
    // Update current year
    const currentYear = new Date().getFullYear();
    currentYearElements.forEach(element => {
        element.textContent = currentYear;
    });
    
    // Header scroll effect
    function updateHeader() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    // Check initial scroll position
    updateHeader();
    window.addEventListener('scroll', updateHeader);
    
    // Scroll Progress Indicator
    function updateScrollProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollIndicator.style.width = scrollPercent + '%';
    }
    
    window.addEventListener('scroll', updateScrollProgress);
    
    // Mobile menu toggle
    function toggleMobileMenu() {
        body.classList.toggle('mobile-menu-open');
        
        if (body.classList.contains('mobile-menu-open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    navBackdrop.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (body.classList.contains('mobile-menu-open')) {
                toggleMobileMenu();
            }
        });
    });
    
    // Dark mode toggle
    function initTheme() {
        // Check for saved theme preference or use system preference
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        const currentTheme = localStorage.getItem('theme');
        
        if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
            body.classList.add('dark-mode');
        }
    }
    
    initTheme();
    
    darkModeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        
        const theme = body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Add page transition effect
                pageTransition.classList.add('active');
                
                setTimeout(() => {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    setTimeout(() => {
                        pageTransition.classList.remove('active');
                    }, 400);
                }, 300);
            }
        });
    });
    
    // Active link on scroll
    function setActiveNavLink() {
        const scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', setActiveNavLink);
    
    // Animate skill progress bars on scroll
    function animateSkillBars() {
        skillProgressBars.forEach(bar => {
            const parent = bar.closest('.skill-item');
            const level = parent.dataset.level || 0;
            
            const rect = bar.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
            
            if (isVisible) {
                bar.style.width = level + '%';
            }
        });
    }
    
    // Call once on load
    setTimeout(animateSkillBars, 1000);
    window.addEventListener('scroll', animateSkillBars);
    
    // Project filtering
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            projects.forEach(project => {
                const category = project.getAttribute('data-category');
                
                if (filterValue === 'all' || filterValue === category) {
                    project.style.display = 'block';
                    setTimeout(() => {
                        project.style.opacity = '1';
                        project.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    project.style.opacity = '0';
                    project.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        project.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Create animated background particles
    function createParticles() {
        const particlesContainer = document.querySelector('.moving-particles');
        if (!particlesContainer) return;
        
        const particleCount = 30;
        
        for (let i = 0; i < particleCount; i++) {
            createParticle(particlesContainer);
        }
    }
    
    function createParticle(container) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random size between 5px and 25px
        const size = Math.random() * 20 + 5;
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Random transparency
        const opacity = Math.random() * 0.3 + 0.1;
        
        // Random animation duration
        const duration = Math.random() * 20 + 10;
        
        // Set particle styles
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background-color: ${Math.random() > 0.5 ? '#5e17eb' : '#17b1eb'};
            border-radius: 50%;
            left: ${posX}%;
            top: ${posY}%;
            opacity: ${opacity};
            filter: blur(${Math.random() * 2 + 1}px);
            animation: float ${duration}s linear infinite;
            animation-delay: -${Math.random() * duration}s;
        `;
        
        container.appendChild(particle);
    }
    
    // Add floating animation
    function addFloatingAnimation() {
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            @keyframes float {
                0% {
                    transform: translate(0, 0);
                }
                25% {
                    transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
                }
                50% {
                    transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
                }
                75% {
                    transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
                }
                100% {
                    transform: translate(0, 0);
                }
            }
        `;
        
        document.head.appendChild(styleElement);
    }
    
    // Contact form handling
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Construct mailto URL
            const mailtoUrl = `mailto:achraf.arabi@yahoo.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
            
            // Open default mail client
            window.location.href = mailtoUrl;
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Form input animation
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        // Check if input already has value on page load
        if (input.value !== '') {
            input.parentNode.classList.add('focused');
        }
        
        // Handle focus events
        input.addEventListener('focus', function() {
            this.parentNode.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentNode.classList.remove('focused');
            }
        });
    });
    
    // Reveal animations on scroll
    function revealOnScroll() {
        const revealElements = document.querySelectorAll('.project, .skill-category, .contact-card');
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('fade-in-element');
            }
        });
    }
    
    window.addEventListener('scroll', revealOnScroll);
    
    // Initialize all functions
    function init() {
        createParticles();
        addFloatingAnimation();
        setActiveNavLink();
        revealOnScroll();
    }
    
    init();
    
    // Add hover effect to project cards
    projects.forEach(project => {
        project.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        project.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Typing effect for hero subtitle
    function typeWriter() {
        const heroSubtitle = document.querySelector('.hero h2');
        if (!heroSubtitle) return;
        
        const originalText = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        heroSubtitle.style.borderRight = '2px solid var(--primary-color)';
        
        let i = 0;
        const speed = 50; // Speed in milliseconds
        
        function type() {
            if (i < originalText.length) {
                heroSubtitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                // Remove blinking cursor when done
                setTimeout(() => {
                    heroSubtitle.style.borderRight = 'none';
                }, 1000);
            }
        }
        
        // Start typing after page load animation
        setTimeout(type, 1500);
    }
    
    typeWriter();

    // Additional animations and interactions
    function addAdditionalInteractions() {
        // Add parallax effect to hero section
        const heroShape = document.querySelector('.hero-shape');
        if (heroShape) {
            window.addEventListener('mousemove', function(e) {
                const moveX = (e.clientX / window.innerWidth - 0.5) * 20;
                const moveY = (e.clientY / window.innerHeight - 0.5) * 20;
                
                heroShape.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        }

        // Animate section titles on scroll
        const sectionTitles = document.querySelectorAll('.reveal-text');
        function revealSectionTitles() {
            sectionTitles.forEach(title => {
                const titlePosition = title.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.2;
                
                if (titlePosition < screenPosition) {
                    title.style.opacity = '1';
                }
            });
        }
        
        window.addEventListener('scroll', revealSectionTitles);
        
        // Add focus effects to form inputs
        const formGroups = document.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            const input = group.querySelector('input, textarea');
            if (!input) return;
            
            input.addEventListener('focus', () => {
                group.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (input.value === '') {
                    group.classList.remove('focused');
                }
            });
            
            // Check initial state
            if (input.value !== '') {
                group.classList.add('focused');
            }
        });
    }
    
    addAdditionalInteractions();
    
    // Preload and optimize images
    function preloadImages() {
        const imageElements = document.querySelectorAll('img[loading="lazy"]');
        
        // Create observer for lazy loading
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    if (src) {
                        img.src = src;
                    }
                    
                    observer.unobserve(img);
                }
            });
        });
        
        // Observe all images
        imageElements.forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Run preload if intersection observer is supported
    if ('IntersectionObserver' in window) {
        preloadImages();
    }
    
    // Add scroll to top functionality
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.style.opacity = '1';
                backToTopButton.style.visibility = 'visible';
            } else {
                backToTopButton.style.opacity = '0';
                backToTopButton.style.visibility = 'hidden';
            }
        });
    }
});

// First, let's create the language data structure that will hold all translatable content
const languageData = {
    en: {
      // Navigation
      home: "Home",
      projects: "Projects",
      skills: "Skills",
      contact: "Contact",
      
      // Hero Section
      heroGreeting: "Hi, I am",
      heroTitle: "A Full Stack Developer and UI/UX Designer.",
      heroDescription: "I create elegant, user-friendly digital experiences that solve complex problems with simplicity and style. Let's build something amazing together.",
      resume: "Resume",
      scrollDown: "Scroll Down",
      
      // Projects Section
      projectsTitle: "Projects",
      projectsSubtitle: "Recent work I've completed",
      filterAll: "All",
      filterMobile: "Mobile",
      filterWeb: "Web",
      filterDesign: "UI/UX Design",
      viewMoreProjects: "View More Projects",
      
      // Skills Section
      skillsTitle: "Skills",
      skillsSubtitle: "Technologies I work with",
      frontendTitle: "Frontend",
      backendTitle: "Backend",
      designTitle: "Design",
      otherSkillsTitle: "Other Skills",
      
      // Contact Section
      contactTitle: "Contact",
      contactSubtitle: "Let's work together",
      emailTitle: "Email",
      linkedinTitle: "LinkedIn",
      githubTitle: "GitHub",
      yourName: "Your Name",
      yourEmail: "Your Email",
      subject: "Subject",
      yourMessage: "Your Message",
      sendMessage: "Send Message",
      
      // Footer
      footerTagline: "Full Stack Developer & UI/UX Designer",
      quickLinks: "Quick Links",
      connect: "Connect",
      allRightsReserved: "All rights reserved."
    },
    
    fr: {
      // Navigation
      home: "Accueil",
      projects: "Projets",
      skills: "Compétences",
      contact: "Contact",
      
      // Hero Section
      heroGreeting: "Bonjour, je suis",
      heroTitle: "Développeur Full Stack et Designer UI/UX.",
      heroDescription: "Je crée des expériences numériques élégantes et conviviales qui résolvent des problèmes complexes avec simplicité et style. Construisons ensemble quelque chose d'extraordinaire.",
      resume: "CV",
      scrollDown: "Défiler vers le bas",
      
      // Projects Section
      projectsTitle: "Projets",
      projectsSubtitle: "Travaux récents que j'ai réalisés",
      filterAll: "Tous",
      filterMobile: "Mobile",
      filterWeb: "Web",
      filterDesign: "Design UI/UX",
      viewMoreProjects: "Voir plus de projets",
      
      // Skills Section
      skillsTitle: "Compétences",
      skillsSubtitle: "Technologies avec lesquelles je travaille",
      frontendTitle: "Frontend",
      backendTitle: "Backend",
      designTitle: "Design",
      otherSkillsTitle: "Autres compétences",
      
      // Contact Section
      contactTitle: "Contact",
      contactSubtitle: "Travaillons ensemble",
      emailTitle: "Email",
      linkedinTitle: "LinkedIn",
      githubTitle: "GitHub",
      yourName: "Votre nom",
      yourEmail: "Votre email",
      subject: "Sujet",
      yourMessage: "Votre message",
      sendMessage: "Envoyer le message",
      
      // Footer
      footerTagline: "Développeur Full Stack & Designer UI/UX",
      quickLinks: "Liens rapides",
      connect: "Connecter",
      allRightsReserved: "Tous droits réservés."
    },
    
    ar: {
      // Navigation
      home: "الرئيسية",
      projects: "المشاريع",
      skills: "المهارات",
      contact: "اتصل بي",
      
      // Hero Section
      heroGreeting: "مرحباً، أنا",
      heroTitle: "مطور ويب شامل ومصمم واجهات المستخدم.",
      heroDescription: "أقوم بإنشاء تجارب رقمية أنيقة وسهلة الاستخدام تحل المشكلات المعقدة ببساطة وأناقة. دعنا نبني شيئًا مذهلاً معًا.",
      resume: "السيرة الذاتية",
      scrollDown: "انتقل للأسفل",
      
      // Projects Section
      projectsTitle: "المشاريع",
      projectsSubtitle: "الأعمال الحديثة التي أكملتها",
      filterAll: "الكل",
      filterMobile: "الجوال",
      filterWeb: "الويب",
      filterDesign: "تصميم واجهات",
      viewMoreProjects: "عرض المزيد من المشاريع",
      
      // Skills Section
      skillsTitle: "المهارات",
      skillsSubtitle: "التقنيات التي أعمل بها",
      frontendTitle: "الواجهة الأمامية",
      backendTitle: "الخلفية",
      designTitle: "التصميم",
      otherSkillsTitle: "مهارات أخرى",
      
      // Contact Section
      contactTitle: "اتصل بي",
      contactSubtitle: "لنعمل معًا",
      emailTitle: "البريد الإلكتروني",
      linkedinTitle: "لينكد إن",
      githubTitle: "جيت هاب",
      yourName: "اسمك",
      yourEmail: "بريدك الإلكتروني",
      subject: "الموضوع",
      yourMessage: "رسالتك",
      sendMessage: "إرسال الرسالة",
      
      // Footer
      footerTagline: "مطور ويب شامل ومصمم واجهات المستخدم",
      quickLinks: "روابط سريعة",
      connect: "تواصل",
      allRightsReserved: "جميع الحقوق محفوظة."
    }
  };
  
  // Function to update page content based on selected language
  function updatePageContent(lang) {
    // Store the selected language in local storage
    localStorage.setItem('selectedLanguage', lang);
    
    // Update language selector
    document.querySelectorAll('.language-option').forEach(option => {
      if (option.getAttribute('data-lang') === lang) {
        option.classList.add('active');
      } else {
        option.classList.remove('active');
      }
    });
    
    // Get language data
    const data = languageData[lang];
    
    // Apply RTL for Arabic, LTR for others
    if (lang === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
      document.body.classList.add('rtl-layout');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      document.body.classList.remove('rtl-layout');
    }
    
    // Update navigation items
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (data[key]) {
        // Special case for input placeholders
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
          element.placeholder = data[key];
        } 
        // Special case for labels
        else if (element.tagName === 'LABEL') {
          element.textContent = data[key];
        }
        // Default case
        else {
          element.textContent = data[key];
        }
      }
    });
  }
  
  // Detect user's preferred language from browser or location
  async function detectUserLanguage() {
    // First, try to get from localStorage if user has a preference
    const storedLanguage = localStorage.getItem('selectedLanguage');
    if (storedLanguage && languageData[storedLanguage]) {
      return storedLanguage;
    }
    
    // Try to get language from browser
    const browserLang = navigator.language.split('-')[0]; // Get primary language code
    
    // Check if the language is supported
    if (languageData[browserLang]) {
      return browserLang;
    }
    
    // If browser language is not supported, try to get location via IP
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      
      // Map country codes to languages
      const countryToLang = {
        // French-speaking countries
        'FR': 'fr', 'BE': 'fr', 'CH': 'fr', 'CA': 'fr', 
        'LU': 'fr', 'MC': 'fr', 'DZ': 'fr', 'MA': 'fr', 
        'TN': 'fr', 'SN': 'fr', 'CI': 'fr', 'ML': 'fr',
        
        // Arabic-speaking countries
        'SA': 'ar', 'AE': 'ar', 'QA': 'ar', 'KW': 'ar', 
        'BH': 'ar', 'OM': 'ar', 'JO': 'ar', 'LB': 'ar', 
        'SY': 'ar', 'IQ': 'ar', 'EG': 'ar', 'SD': 'ar', 
        'LY': 'ar', 'TN': 'ar', 'DZ': 'ar', 'MA': 'ar', 'MR': 'ar'
      };
      
      const countryCode = data.country_code;
      if (countryToLang[countryCode]) {
        return countryToLang[countryCode];
      }
    } catch (error) {
      console.log('Error detecting location:', error);
    }
    
    // Default to English if all else fails
    return 'en';
  }
  
  // Initialize the language settings when the DOM is loaded
  document.addEventListener('DOMContentLoaded', async function() {
    // Add language selector to the DOM
    addLanguageSelectorToDOM();
    
    // Detect user language
    const userLang = await detectUserLanguage();
    
    // Add data-i18n attributes to all elements that need translation
    prepareElementsForTranslation();
    
    // Update page content with detected language
    updatePageContent(userLang);
    
    // Set click handlers for language options
    document.querySelectorAll('.language-option').forEach(option => {
      option.addEventListener('click', function() {
        const lang = this.getAttribute('data-lang');
        updatePageContent(lang);
      });
    });
  });
  
  // Function to add language selector to the DOM
  function addLanguageSelectorToDOM() {
    // Create language selector container
    const languageSelector = document.createElement('div');
    languageSelector.className = 'language-selector';
    
    // Create language options
    const languages = [
      { code: 'en', name: 'EN', flag: '🇬🇧' },
      { code: 'fr', name: 'FR', flag: '🇫🇷' },
      { code: 'ar', name: 'AR', flag: '🇸🇦' }
    ];
    
    // Create HTML for language options
    let languageOptionsHTML = '';
    languages.forEach(lang => {
      languageOptionsHTML += `
        <button class="language-option" data-lang="${lang.code}" title="${lang.name}">
          <span class="lang-flag">${lang.flag}</span>
          <span class="lang-name">${lang.name}</span>
        </button>
      `;
    });
    
    languageSelector.innerHTML = languageOptionsHTML;
    
    // Find the right place to insert the language selector (next to theme toggle)
    const themeToggleContainer = document.querySelector('.theme-toggle-container');
    
    // Create a container for both theme toggle and language selector
    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'header-controls';
    
    // Move the theme toggle to the new container and add the language selector
    const themeToggle = document.querySelector('.theme-toggle');
    const themeToggleClone = themeToggle.cloneNode(true);
    
    // Replace the original theme toggle container content with the new structure
    themeToggleContainer.innerHTML = '';
    controlsContainer.appendChild(languageSelector);
    controlsContainer.appendChild(themeToggleClone);
    themeToggleContainer.appendChild(controlsContainer);
    
    // Ensure the dark mode toggle still works
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
      darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
      });
    }
  }
  
  // Function to add data-i18n attributes to all elements that need translation
  function prepareElementsForTranslation() {
    // Navigation links
    document.querySelector('.nav-link[href="#hero"]').textContent = '';
    document.querySelector('.nav-link[href="#hero"]').appendChild(document.createTextNode('Home'));
    document.querySelector('.nav-link[href="#hero"]').setAttribute('data-i18n', 'home');
    
    document.querySelector('.nav-link[href="#projects"]').textContent = '';
    document.querySelector('.nav-link[href="#projects"]').appendChild(document.createTextNode('Projects'));
    document.querySelector('.nav-link[href="#projects"]').setAttribute('data-i18n', 'projects');
    
    document.querySelector('.nav-link[href="#skills"]').textContent = '';
    document.querySelector('.nav-link[href="#skills"]').appendChild(document.createTextNode('Skills'));
    document.querySelector('.nav-link[href="#skills"]').setAttribute('data-i18n', 'skills');
    
    document.querySelector('.nav-link[href="#contact"]').textContent = '';
    document.querySelector('.nav-link[href="#contact"]').appendChild(document.createTextNode('Contact'));
    document.querySelector('.nav-link[href="#contact"]').setAttribute('data-i18n', 'contact');
    
    // Hero section
    const heroGreeting = document.querySelector('.hero h1');
    const nameHighlight = heroGreeting.querySelector('.highlight');
    const nameText = nameHighlight.textContent;
    heroGreeting.textContent = '';
    heroGreeting.appendChild(document.createTextNode('Hi, I am '));
    heroGreeting.appendChild(nameHighlight);
    heroGreeting.setAttribute('data-i18n-prefix', 'heroGreeting');
    
    document.querySelector('.hero h2').setAttribute('data-i18n', 'heroTitle');
    document.querySelector('.hero p').setAttribute('data-i18n', 'heroDescription');
    
    const resumeBtn = document.querySelector('.btn.primary-btn .btn-text');
    resumeBtn.setAttribute('data-i18n', 'resume');
    
    document.querySelector('.scroll-down span').setAttribute('data-i18n', 'scrollDown');
    
    // Projects section
    document.querySelector('#projects .section-title').setAttribute('data-i18n', 'projectsTitle');
    document.querySelector('#projects .section-subtitle').setAttribute('data-i18n', 'projectsSubtitle');
    
    // Project filters
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns[0].setAttribute('data-i18n', 'filterAll'); // All
    filterBtns[1].setAttribute('data-i18n', 'filterMobile'); // Mobile
    filterBtns[2].setAttribute('data-i18n', 'filterWeb'); // Web
    filterBtns[3].setAttribute('data-i18n', 'filterDesign'); // UI/UX Design
    
    document.querySelector('#projects .btn.outline-btn .btn-text').setAttribute('data-i18n', 'viewMoreProjects');
    
    // Skills section
    document.querySelector('#skills .section-title').setAttribute('data-i18n', 'skillsTitle');
    document.querySelector('#skills .section-subtitle').setAttribute('data-i18n', 'skillsSubtitle');
    
    const skillCategories = document.querySelectorAll('.skill-category h3');
    skillCategories[0].setAttribute('data-i18n', 'frontendTitle'); // Frontend
    skillCategories[1].setAttribute('data-i18n', 'backendTitle'); // Backend
    skillCategories[2].setAttribute('data-i18n', 'designTitle'); // Design
    skillCategories[3].setAttribute('data-i18n', 'otherSkillsTitle'); // Other Skills
    
    // Contact section
    document.querySelector('#contact .section-title').setAttribute('data-i18n', 'contactTitle');
    document.querySelector('#contact .section-subtitle').setAttribute('data-i18n', 'contactSubtitle');
    
    const contactCards = document.querySelectorAll('.contact-details h3');
    contactCards[0].setAttribute('data-i18n', 'emailTitle'); // Email
    contactCards[1].setAttribute('data-i18n', 'linkedinTitle'); // LinkedIn
    contactCards[2].setAttribute('data-i18n', 'githubTitle'); // GitHub
    
    // Contact form
    document.querySelector('label[for="name"]').setAttribute('data-i18n', 'yourName');
    document.querySelector('label[for="email"]').setAttribute('data-i18n', 'yourEmail');
    document.querySelector('label[for="subject"]').setAttribute('data-i18n', 'subject');
    document.querySelector('label[for="message"]').setAttribute('data-i18n', 'yourMessage');
    
    document.querySelector('#contactForm .btn.primary-btn .btn-text').setAttribute('data-i18n', 'sendMessage');
    
    // Footer
    document.querySelector('.footer-logo p').setAttribute('data-i18n', 'footerTagline');
    document.querySelector('.footer-links h3').setAttribute('data-i18n', 'quickLinks');
    document.querySelector('.footer-social h3').setAttribute('data-i18n', 'connect');
    
    // Footer links
    const footerLinks = document.querySelectorAll('.footer-links ul li a');
    footerLinks[0].setAttribute('data-i18n', 'home');
    footerLinks[1].setAttribute('data-i18n', 'projects');
    footerLinks[2].setAttribute('data-i18n', 'skills');
    footerLinks[3].setAttribute('data-i18n', 'contact');
  }
  
  // Special handling for elements with dynamic content and translations
  function handleSpecialElements(lang) {
    const data = languageData[lang];
    
    // Handle hero greeting with name
    const heroGreeting = document.querySelector('.hero h1');
    if (heroGreeting) {
      const nameHighlight = heroGreeting.querySelector('.highlight');
      if (nameHighlight) {
        const nameText = nameHighlight.textContent;
        heroGreeting.textContent = data.heroGreeting + ' ';
        heroGreeting.appendChild(nameHighlight);
      }
    }
    
    // Handle the copyright text
    const copyrightElement = document.querySelector('.footer-bottom p');
    if (copyrightElement) {
      const year = new Date().getFullYear();
      copyrightElement.textContent = `© ${year} Arabi Achraf. ${data.allRightsReserved}`;
    }
  }
  
  // Update special elements when changing language
  document.addEventListener('DOMContentLoaded', function() {
    const languageOptions = document.querySelectorAll('.language-option');
    languageOptions.forEach(option => {
      option.addEventListener('click', function() {
        const lang = this.getAttribute('data-lang');
        handleSpecialElements(lang);
      });
    });
  });
