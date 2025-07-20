// Language switching functionality
let currentLanguage = 'en';

// Language data
const languages = {
    en: {
        name: 'English',
        switchText: '中文'
    },
    zh: {
        name: '中文',
        switchText: 'English'
    }
};

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initializeLanguage();
    initializeMobileMenu();
    initializeScrollAnimations();
    initializeSmoothScrolling();
    initializeNavbarScroll();
});

// Language switching
function initializeLanguage() {
    const langBtn = document.getElementById('langBtn');
    const langText = langBtn.querySelector('.lang-text');
    
    // Set initial language button text
    langText.textContent = languages[currentLanguage].switchText;
    
    langBtn.addEventListener('click', function() {
        switchLanguage();
    });
}

function switchLanguage() {
    // Toggle language
    currentLanguage = currentLanguage === 'en' ? 'zh' : 'en';
    
    // Update all elements with language data
    const elementsWithLang = document.querySelectorAll('[data-en], [data-zh]');
    
    elementsWithLang.forEach(element => {
        const text = element.getAttribute(`data-${currentLanguage}`);
        if (text) {
            // Handle different element types
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = text;
            } else {
                element.textContent = text;
            }
        }
    });
    
    // Update language button text
    const langText = document.querySelector('.lang-text');
    langText.textContent = languages[currentLanguage].switchText;
    
    // Update page title and meta description
    const titleMap = {
        en: 'Ziyue Yin - Personal Website',
        zh: '尹子跃 - 个人网站'
    };
    
    const descriptionMap = {
        en: "Ziyue Yin's personal website - Software Developer & Engineer",
        zh: "尹子跃的个人网站 - 软件开发工程师"
    };
    
    document.title = titleMap[currentLanguage];
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.content = descriptionMap[currentLanguage];
    }
    
    // Update HTML lang attribute
    document.documentElement.lang = currentLanguage;
    
    // Store language preference
    localStorage.setItem('preferredLanguage', currentLanguage);
    
    // Add animation effect
    document.body.style.opacity = '0.8';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 150);
}

// Load saved language preference
function loadLanguagePreference() {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && savedLanguage !== currentLanguage) {
        currentLanguage = savedLanguage;
        switchLanguage();
    }
}

// Mobile menu functionality
function initializeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking on links
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navMenu.contains(event.target) && !hamburger.contains(event.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerOffset = 80; // Account for fixed navbar
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Navbar scroll effect
function initializeNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove shadow based on scroll position
        if (scrollTop > 50) {
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
        
        // Hide/show navbar on scroll (optional)
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add staggered animation for skill items
                if (entry.target.classList.contains('skill-category')) {
                    const skillItems = entry.target.querySelectorAll('.skill-item');
                    skillItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.animation = `fadeInUp 0.5s ease forwards`;
                        }, index * 100);
                    });
                }
                
                // Add staggered animation for project cards
                if (entry.target.classList.contains('project-card')) {
                    const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.2}s`;
                    entry.target.classList.add('slide-in-up');
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.skill-category, .project-card, .stat, .about-text, .contact-content');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Add CSS animations dynamically
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .slide-in-up {
            animation: slideInUp 0.8s ease forwards;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
    `;
    document.head.appendChild(style);
}

// Initialize dynamic styles
addDynamicStyles();

// Typing effect for hero title (optional enhancement)
function initializeTypingEffect() {
    const titleElement = document.querySelector('.hero-title');
    if (!titleElement) return;
    
    const titles = {
        en: ["Hello, I'm Ziyue Yin", "Software Developer", "Problem Solver", "Innovation Creator"],
        zh: ["你好，我是尹子跃", "软件开发工程师", "问题解决者", "创新创造者"]
    };
    
    let currentIndex = 0;
    const currentTitles = titles[currentLanguage];
    
    function typeTitle() {
        const title = currentTitles[currentIndex];
        let charIndex = 0;
        
        titleElement.innerHTML = '<span class="highlight">|</span>';
        
        const typeInterval = setInterval(() => {
            if (charIndex < title.length) {
                titleElement.innerHTML = title.substring(0, charIndex + 1) + '<span class="highlight">|</span>';
                charIndex++;
            } else {
                clearInterval(typeInterval);
                setTimeout(() => {
                    currentIndex = (currentIndex + 1) % currentTitles.length;
                    typeTitle();
                }, 2000);
            }
        }, 100);
    }
    
    // Uncomment the next line to enable typing effect
    // typeTitle();
}

// Form handling (if contact form is added later)
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        console.log('Contact form submitted:', data);
        
        // Show success message
        showNotification(currentLanguage === 'en' ? 'Message sent successfully!' : '消息发送成功！');
        
        // Reset form
        contactForm.reset();
    });
}

// Notification system
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Load language preference on page load
loadLanguagePreference();

// Performance optimization: Lazy load images (if any are added later)
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Initialize lazy loading
initializeLazyLoading();

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    // Language switch with Ctrl/Cmd + L
    if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault();
        switchLanguage();
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add subtle entrance animation
    const style = document.createElement('style');
    style.textContent = `
        body {
            opacity: 0;
            animation: fadeIn 0.5s ease forwards;
        }
        
        body.loaded {
            opacity: 1;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}); 