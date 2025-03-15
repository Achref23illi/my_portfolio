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
