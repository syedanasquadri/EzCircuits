// ============================================
// NAVIGATION & SCROLL EFFECTS
// ============================================

// Get DOM elements
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Sticky navbar on scroll with shadow effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Reveal elements on scroll
    revealOnScroll();
});

// Hamburger menu toggle for mobile
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// SCROLL REVEAL ANIMATION
// ============================================

function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 150;
        
        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('active');
        }
    });
}

// Initial check for elements already in viewport
window.addEventListener('DOMContentLoaded', revealOnScroll);

// ============================================
// BUTTON CLICK EFFECTS
// ============================================

// Add ripple effect to all buttons
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const glow = this.querySelector('.btn-glow');
        
        if (glow) {
            // Reset animation
            glow.style.width = '0';
            glow.style.height = '0';
            
            // Trigger reflow to restart animation
            void glow.offsetWidth;
            
            // Animate glow
            setTimeout(() => {
                glow.style.width = '300px';
                glow.style.height = '300px';
            }, 10);
            
            // Reset after animation
            setTimeout(() => {
                glow.style.width = '0';
                glow.style.height = '0';
            }, 600);
        }
    });
});

// ============================================
// SMOOTH SCROLL TO SECTION HELPER
// ============================================

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    
    if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Attach smooth scroll to CTA buttons
document.addEventListener('DOMContentLoaded', () => {
    // Hero buttons
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    if (heroButtons.length >= 2) {
        heroButtons[0].addEventListener('click', () => scrollToSection('masterclass'));
        heroButtons[1].addEventListener('click', () => scrollToSection('offerings'));
    }
});

// ============================================
// INTERSECTION OBSERVER FOR BETTER PERFORMANCE
// ============================================

// More efficient scroll reveal using Intersection Observer
if ('IntersectionObserver' in window) {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: stop observing after reveal
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all reveal elements
    document.addEventListener('DOMContentLoaded', () => {
        const revealElements = document.querySelectorAll('.reveal');
        revealElements.forEach(el => observer.observe(el));
    });
}

// ============================================
// ANIMATED CIRCUIT NODES
// ============================================

// Add random animation delays to circuit nodes for variety
document.addEventListener('DOMContentLoaded', () => {
    const circuitNodes = document.querySelectorAll('.circuit-node');
    
    circuitNodes.forEach((node, index) => {
        const randomDelay = Math.random() * 2;
        node.style.animationDelay = `${randomDelay}s`;
    });
});

// ============================================
// PARALLAX EFFECT FOR HERO SECTION
// ============================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroVisual && scrolled < window.innerHeight) {
        // Subtle parallax effect
        heroVisual.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// ============================================
// CURSOR TRAIL EFFECT (Optional Enhancement)
// ============================================

// Create subtle cursor trail for glass cards
document.addEventListener('DOMContentLoaded', () => {
    const glassCards = document.querySelectorAll('.glass-card');
    
    glassCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Create subtle light effect following cursor
            card.style.background = `
                radial-gradient(
                    circle at ${x}px ${y}px,
                    rgba(0, 217, 255, 0.15),
                    rgba(26, 31, 58, 0.5) 50%
                )
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            // Reset background on mouse leave
            card.style.background = 'rgba(26, 31, 58, 0.5)';
        });
    });
});

// ============================================
// FORM VALIDATION (For future contact forms)
// ============================================

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ============================================
// COUNTER ANIMATION FOR STATS
// ============================================

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16); // 60fps
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '%');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (element.textContent.includes('+') ? '+' : '%');
        }
    }, 16);
}

// Trigger counter animation when stats come into view
if ('IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('.stat-number');
                if (statNumber && !statNumber.classList.contains('animated')) {
                    statNumber.classList.add('animated');
                    const text = statNumber.textContent;
                    const hasPlus = text.includes('+');
                    const hasPercent = text.includes('%');
                    const number = parseInt(text.replace(/\D/g, ''));
                    
                    statNumber.textContent = '0' + (hasPlus ? '+' : hasPercent ? '%' : '');
                    animateCounter(statNumber, number);
                }
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    document.addEventListener('DOMContentLoaded', () => {
        const statCards = document.querySelectorAll('.stat-card');
        statCards.forEach(card => statsObserver.observe(card));
    });
}

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Debounce function for scroll events
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll-heavy functions
window.addEventListener('scroll', debounce(() => {
    // Scroll-dependent functions here
}, 10));

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape key
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Add focus visible for keyboard navigation
document.addEventListener('DOMContentLoaded', () => {
    // Add focus styles to interactive elements
    const interactiveElements = document.querySelectorAll('a, button');
    
    interactiveElements.forEach(element => {
        element.addEventListener('focus', () => {
            element.style.outline = '2px solid var(--color-primary)';
            element.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', () => {
            element.style.outline = 'none';
        });
    });
});

// ============================================
// CONSOLE WELCOME MESSAGE
// ============================================

console.log(
    '%c⚡ Ez Circuits %c- Build. Innovate. Master Electronics.',
    'color: #00d9ff; font-size: 20px; font-weight: bold;',
    'color: #94a3b8; font-size: 14px;'
);
console.log(
    '%cInterested in how this site was built? Check out the source code!',
    'color: #7c3aed; font-size: 12px;'
);