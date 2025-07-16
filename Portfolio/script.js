// Mobile Navigation with enhanced responsiveness
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    // Enhanced click handler with touch support
    hamburger.addEventListener('click', (e) => {
        e.preventDefault();
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Enhanced body scroll lock for mobile devices
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
        } else {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        }
    });

    // Enhanced touch support for mobile menu links
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        });
    });

    // Enhanced outside click detection with touch support
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        }
    });

    // Touch support for mobile devices
    document.addEventListener('touchstart', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        }
    });
}

// Enhanced smooth scroll with responsive offset calculation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navbar = document.querySelector('.navbar');
            let headerHeight = 0;
            
            if (navbar) {
                headerHeight = navbar.offsetHeight;
                // Add extra spacing for mobile devices
                if (window.innerWidth <= 768) {
                    headerHeight += 20;
                }
            }
            
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced intersection observer with responsive thresholds
const getObserverOptions = () => {
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth <= 1024;
    
    return {
        threshold: isMobile ? 0.05 : isTablet ? 0.08 : 0.1,
        rootMargin: isMobile ? '0px 0px -30px 0px' : '0px 0px -50px 0px'
    };
};

let observer;

const createObserver = () => {
    if (observer) observer.disconnect();
    
    observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, getObserverOptions());

    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
};

// Create observer initially
createObserver();

// Enhanced contact form with better mobile validation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const inputs = this.querySelectorAll('input, textarea');
        let isValid = true;
        
        inputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#dc2626';
                input.style.boxShadow = '0 0 0 2px rgba(220, 38, 38, 0.2)';
            } else {
                input.style.borderColor = '';
                input.style.boxShadow = '';
            }
        });
        
        if (!isValid) {
            // Better mobile-friendly alert
            const isMobile = window.innerWidth <= 768;
            if (isMobile) {
                const firstInvalidInput = this.querySelector('input[style*="border-color: rgb(220, 38, 38)"], textarea[style*="border-color: rgb(220, 38, 38)"]');
                if (firstInvalidInput) {
                    firstInvalidInput.focus();
                    firstInvalidInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
            alert('Please fill in all required fields');
            return;
        }
        
        const email = formData.get('email') || this.querySelector('input[type="email"]')?.value;
        if (email && !isValidEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Enhanced Resume Download Function with Mobile Support
function downloadResume() {
    try {
        // Show loading state
        const downloadBtns = document.querySelectorAll('.download-btn, .resume-download-btn');
        downloadBtns.forEach(btn => {
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Downloading...</span>';
            btn.style.pointerEvents = 'none';
            
            // Restore button after 2 seconds
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.pointerEvents = 'auto';
            }, 2000);
        });

        // Direct download link
        const downloadUrl = 'https://drive.google.com/uc?export=download&id=1ge8IiYZOo_fGwMOYN4LEumJeVfGeR_FH';
        
        // Create a temporary link element for download
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'Shivraj_Singh_Resume.pdf';
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        
        // Append to body temporarily
        document.body.appendChild(link);
        
        // Trigger download
        link.click();
        
        // Clean up
        document.body.removeChild(link);
        
        // Show success message
        setTimeout(() => {
            if (window.innerWidth <= 768) {
                // Mobile-friendly notification
                showMobileNotification('Resume download started!', 'success');
            } else {
                console.log('Resume download initiated successfully');
            }
        }, 500);
        
    } catch (error) {
        console.error('Download failed:', error);
        
        // Fallback: Open in new tab
        window.open('https://drive.google.com/file/d/1ge8IiYZOo_fGwMOYN4LEumJeVfGeR_FH/view?usp=drivesdk', '_blank');
        
        // Show error message
        if (window.innerWidth <= 768) {
            showMobileNotification('Opening resume in new tab...', 'info');
        }
    }
}

// Mobile-friendly notification system
function showMobileNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.mobile-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `mobile-notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === 'success' ? '#059669' : type === 'error' ? '#dc2626' : '#0ea5e9'};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 9999;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        animation: slideInDown 0.3s ease-out;
        max-width: 90vw;
        text-align: center;
        font-size: 0.9rem;
        font-weight: 500;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInDown {
            from {
                opacity: 0;
                transform: translateX(-50%) translateY(-100%);
            }
            to {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
        }
        .notification-content {
            display: flex;
            align-items: center;
            gap: 8px;
        }
    `;
    document.head.appendChild(style);
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideInDown 0.3s ease-out reverse';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Enhanced image loading with responsive handling
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        if (!img.complete) {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
            
            img.addEventListener('load', function() {
                this.style.opacity = '1';
            });
        }
    });
});

// Enhanced card animations with responsive delays
const cards = document.querySelectorAll('.project-card, .service-card, .skill-category, .contact-item');

const createCardObserver = () => {
    const isMobile = window.innerWidth <= 768;
    const animationDelay = isMobile ? 50 : 100;
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * animationDelay);
            }
        });
    }, {
        threshold: isMobile ? 0.05 : 0.1
    });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        cardObserver.observe(card);
    });
};

createCardObserver();

// Enhanced download button handling with proper event delegation
document.addEventListener('click', function(e) {
    // Handle download button clicks
    if (e.target.matches('.download-btn, .resume-download-btn') || 
        e.target.closest('.download-btn, .resume-download-btn')) {
        e.preventDefault();
        
        const btn = e.target.matches('.download-btn, .resume-download-btn') ? 
                    e.target : e.target.closest('.download-btn, .resume-download-btn');
        
        // Visual feedback
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            btn.style.transform = '';
        }, 150);
        
        // Trigger download
        downloadResume();
    }
});

// Enhanced button interactions
document.querySelectorAll('.btn').forEach(btn => {
    // Mouse hover effects (excluding touch devices)
    btn.addEventListener('mouseenter', function() {
        if (!('ontouchstart' in window)) { 
            this.style.transform = 'translateY(-2px)';
        }
    });
    
    btn.addEventListener('mouseleave', function() {
        if (!('ontouchstart' in window)) { 
            this.style.transform = 'translateY(0)';
        }
    });
    
    // Touch interactions
    btn.addEventListener('touchstart', function() {
        this.style.transform = 'scale(0.95)';
    });
    
    btn.addEventListener('touchend', function() {
        this.style.transform = 'scale(1)';
    });
});

// Utility function for debouncing
function debounce(func, wait) {
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

// Enhanced resize handler
const handleResize = debounce(() => {
    // Recreate observers with new responsive settings
    createObserver();
    createCardObserver();
    
    // Close mobile menu on desktop
    if (window.innerWidth > 768) {
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        }
    }
}, 250);

window.addEventListener('resize', handleResize);

// Handle orientation change
window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        handleResize();
    }, 100);
});

// Prevent zoom on double tap for mobile
document.addEventListener('touchstart', function(e) {
    if (e.touches.length > 1) {
        e.preventDefault();
    }
});

let lastTouchEnd = 0;
document.addEventListener('touchend', function(e) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Enhanced keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        }
    }
});

// Enhanced navbar scroll effect
let lastScrollY = window.scrollY;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (navbar) {
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide navbar on scroll down, show on scroll up (mobile)
        if (window.innerWidth <= 768) {
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
        }
    }
    
    lastScrollY = currentScrollY;
});

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Add loading states
    document.body.classList.add('loaded');
    
    // Initialize any additional mobile-specific features
    if (window.innerWidth <= 768) {
        // Add mobile-specific classes or initialization
        document.body.classList.add('mobile-device');
        
        // Optimize touch interactions
        document.querySelectorAll('a, button').forEach(element => {
            element.style.touchAction = 'manipulation';
        });
    }
    
    console.log('Portfolio website loaded successfully');
});
