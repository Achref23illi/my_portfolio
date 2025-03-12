document.addEventListener('DOMContentLoaded', function() {
    // Page transition effect
    const pageTransition = document.querySelector('.page-transition');
    
    // Simulate page load transition
    pageTransition.classList.add('active');
    setTimeout(() => {
        pageTransition.classList.remove('active');
    }, 500);
    
    // Enhanced navbar functionality
    const header = document.querySelector('header');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navBackdrop = document.querySelector('.nav-backdrop');
    const navLinks = document.querySelectorAll('.nav-link');
    const body = document.body;
    let lastScrollTop = 0;
    
    // Scroll effect for header
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scrolled class
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide header on scroll down, show on scroll up
        if (scrollTop > lastScrollTop && scrollTop > 150) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Check initial scroll position
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    }
    
    // Mobile menu toggle
    function toggleMobileMenu() {
        body.classList.toggle('mobile-menu-open');
        
        if (body.classList.contains('mobile-menu-open')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }
    }
    
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    navBackdrop.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (body.classList.contains('mobile-menu-open')) {
                toggleMobileMenu();
            }
        });
    });
    
    // Improved active link functionality
    function setActiveNavLink() {
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        
        // Get all sections
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if(scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight && navLink) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                navLink.classList.add('active');
            }
        });
        
        // If we're at the top of the page and no section is active
        if(scrollPosition < 100) {
            const firstLink = document.querySelector('.nav-link');
            if(firstLink) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                firstLink.classList.add('active');
            }
        }
    }
    
    // Run setActiveNavLink on load and scroll
    setActiveNavLink();
    window.addEventListener('scroll', setActiveNavLink);
    
    // Dark mode toggle functionality
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    // Check for saved theme preference or use system preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
        body.classList.add('dark-mode');
        darkModeToggle.textContent = '☾';
    } else {
        darkModeToggle.textContent = '☀';
    }
    
    // Toggle dark mode
    darkModeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            darkModeToggle.textContent = '☾';
        } else {
            localStorage.setItem('theme', 'light');
            darkModeToggle.textContent = '☀';
        }
    });
    
    // Create animated background particles
    const particlesContainer = document.querySelector('.moving-particles');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }
    
    function createParticle() {
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
        
        particlesContainer.appendChild(particle);
    }
    
    // Add floating animation
    document.head.insertAdjacentHTML('beforeend', `
        <style>
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
        </style>
    `);
    
    // Scroll reveal animation
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.project, .skills-container span, #contact .contact-form, .section-title');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('fade-in');
                
                // Add delay for groups of elements
                if (element.classList.contains('project')) {
                    const index = Array.from(element.parentNode.children).indexOf(element);
                    element.style.animationDelay = `${0.1 * (index % 3)}s`;
                }
                
                if (element.parentNode.classList.contains('skills-container')) {
                    const index = Array.from(element.parentNode.children).indexOf(element);
                    element.style.animationDelay = `${0.05 * (index % 10)}s`;
                }
            }
        });
    };
    
    // Run once on load
    animateOnScroll();
    
    // Listen for scroll events
    window.addEventListener('scroll', animateOnScroll);
    
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
                    }, 300);
                }, 300);
            }
        });
    });
    
    // Active link indicator
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector(`nav a[href="#${sectionId}"]`).classList.add('active');
            } else {
                document.querySelector(`nav a[href="#${sectionId}"]`).classList.remove('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    
    // Form input animation
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentNode.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentNode.classList.remove('focused');
            }
        });
        
        // Check if input already has value on page load
        if (input.value !== '') {
            input.parentNode.classList.add('focused');
        }
    });
    
    // Update copyright year
    const yearElement = document.querySelector('.year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Add hover effect to project cards
    const projects = document.querySelectorAll('.project');
    
    projects.forEach(project => {
        project.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
        });
        
        project.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--box-shadow)';
        });
    });
    
    // Extra: Add a typing effect to the hero subtitle
    const heroSubtitle = document.querySelector('.hero h2');
    const originalText = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            heroSubtitle.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 50); // Adjust speed here
        }
    };
    
    // Start typing effect after a small delay
    setTimeout(typeWriter, 1000);
});
