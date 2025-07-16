const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    
    hamburger.addEventListener('click', (e) => {
        e.preventDefault();
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
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

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        });
    });

    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        }
    });

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

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navbar = document.querySelector('.navbar');
            let headerHeight = 0;
            
            if (navbar) {
                headerHeight = navbar.offsetHeight;
                
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

createObserver();

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

document.querySelectorAll('.download-btn, .resume-download-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        
        e.preventDefault();
        
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            btn.style.transform = '';
        }, 150);
        
        console.log('Resume downloaded');
    });
});

document.querySelectorAll('.btn').forEach(btn => {
    
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
    
    btn.addEventListener('touchstart', function() {
        this.style.transform = 'scale(0.95)';
    });
    
    btn.addEventListener('touchend', function() {
        this.style.transform = 'scale(1)';
    });
});

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

const handleResize = debounce(() => {
    
    createObserver();
    createCardObserver();
    
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

window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        handleResize();
    }, 100);
});


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
