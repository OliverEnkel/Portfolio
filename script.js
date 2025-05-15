document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initSmoothScroll();
    initSkillsAnimation();
    initTypingEffect();
    initProjectFilters();
    initScrollAnimations();
    initFormValidation();
    initThemeToggle();
    initBackToTop();
});

function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');

            navLinksItems.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
        });
    }

    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');

                navLinksItems.forEach(link => {
                    link.style.animation = '';
                });
            }
        });
    });

    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initSkillsAnimation() {
    const skillsSection = document.querySelector('.skills');
    const progressBars = document.querySelectorAll('.progress');

    if (!skillsSection || !progressBars.length) return;

    let animated = false;

    function animateSkills() {
        if (isElementInViewport(skillsSection) && !animated) {
            progressBars.forEach(progress => {
                const value = progress.getAttribute('data-value');
                progress.style.width = value + '%';
            });
            animated = true;
        }
    }

    // Check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }

    // Initial check
    animateSkills();

    // Check on scroll
    window.addEventListener('scroll', animateSkills);
}

// Typing effect for hero section
function initTypingEffect() {
    const element = document.querySelector('.typing-effect');
    if (!element) return;

    const text = element.getAttribute('data-text');
    const words = text ? JSON.parse(text) : ['Developer', 'Designer', 'Freelancer'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            element.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            element.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 150;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            // Pause at the end of word
            typingSpeed = 1500;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            // Pause before typing next word
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    // Start typing effect
    setTimeout(type, 1000);
}

// Project filtering functionality
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (!filterButtons.length || !projectCards.length) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filter === 'all' || card.classList.contains(filter)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 200);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 500);
                }
            });
        });
    });
}

// Scroll animations for sections
function initScrollAnimations() {
    const sections = document.querySelectorAll('section');

    function checkScroll() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (sectionTop < windowHeigh * .75) {
                section.classList.add('active');
            }
        });

        // Animate timeline items
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (itemTop < windowHeigh * .85) {
                item.classList.add('active');
            }
        });
    }

    // Initial check
    checkScroll();

    // Check on scroll
    window.addEventListener('scroll', checkScroll);
}

// Form validation
function initFormValidation() {
    const contactForm = document.getElementById('contact-form');

    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form fields
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        // Basic validation
        let valid = true;

        if (!nameInput.value.trim()) {
            showError(nameInput, 'Name is required');
            valid = false;
        } else {
            removeError(nameInput);
        }

        if (!emailInput.value.trim()) {
            showError(emailInput, 'Email is required');
            valid = false;
        } else if (!isValidEmail(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email');
            valid = false;
        } else {
            removeError(emailInput);
        }

        if (!messageInput.value.trim()) {
            showError(messageInput, 'Message is required');
            valid = false;
        } else {
            removeError(messageInput);
        }

        // If form is valid, show success message
        if (valid) {
            // Normally you would submit the form or make an AJAX request here
            // For demo purposes, we'll just show a success message
            const formSuccess = document.createElement('div');
            formSuccess.className = 'form-success';
            formSuccess.textContent = 'Your message has been sent successfully!';

            // Clear form fields
            contactForm.reset();

            // Add success message
            contactForm.appendChild(formSuccess);

            // Remove success message after 5 seconds
            setTimeout(() => {
                formSuccess.remove();
            }, 5000);
        }
    });

    // Helper functions
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');

        errorElement.className = 'error-message';
        errorElement.textContent = message;

        if (!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(errorElement);
        }

        input.classList.add('error');
    }

    function removeError(input) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');

        if (errorElement) {
            errorElement.remove();
        }

        input.classList.remove('error');
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

<light>// Theme toggle functionality </light>
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');

    if (!themeToggle) return;

    // Check for saved theme preference or respect OS preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
        document.body.classList.add('dark-theme');
        themeToggle.checked = true;
    }

    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light');
        }
    });
}

// Back to top button
function initBackToTop() {
    const backToTopButton = document.querySelector('.back-to-top');

    if (!backToTopButton) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Helper function to preload images
function preloadImages(images) {
    images.forEach(image => {
        const img = new Image();
        img.src = image;
    });
}

// Add fadeIn animation for elements with data-animation attribute
function fadeInAnimation() {
    const fadeElements = document.querySelectorAll('[data-animation="fade-in"]');

    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeigh * .85) {
            element.classList.add('animated');
        }
    });

    window.addEventListener('scroll', () => {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeigh * .85) {
                element.classList.add('animated');
            }
        });
    });
}

// Initialize all animations after page load
window.addEventListener('load', () => {
    fadeInAnimation();

    // Add animation classes to elements
    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        if (index % 2 === 0) {
            item.classList.add('slide-in-left');
        } else {
            item.classList.add('slide-in-right');
        }
    });

    // Preload project images
    const projectImages = Array.from(document.querySelectorAll('.project-img img')).map(img => img.src);
    preloadImages(projectImages);
});