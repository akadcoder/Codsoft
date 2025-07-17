
const app = {
    init() {
        this.setupNav();
        this.setupScrolling();
        this.setupAnimations();
        this.setupForms();
        this.setupNavbarScroll();
        this.setupDownloadButtons();
        document.body.classList.add('loaded');
    },
    
    setupNav() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (!hamburger || !navMenu) return;
        
        hamburger.addEventListener('click', () => {
            const isActive = navMenu.classList.contains('active');
            hamburger.classList.toggle('active', !isActive);
            navMenu.classList.toggle('active', !isActive);
            document.body.style.overflow = !isActive ? 'hidden' : '';
        });
        
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    },
    
    setupScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const headerHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                    const offset = window.innerWidth <= 768 ? 20 : 0;
                    window.scrollTo({
                        top: target.offsetTop - headerHeight - offset,
                        behavior: 'smooth'
                    });
                }
            });
        });
    },
    
    setupAnimations() {
        const observerOptions = {
            threshold: window.innerWidth <= 768 ? 0.05 : 0.1,
            rootMargin: window.innerWidth <= 768 ? '0px 0px -30px 0px' : '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('section, .project-card, .service-card, .skill-category, .contact-item').forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    },
    
    setupForms() {
        const form = document.querySelector('.contact-form');
        if (!form) return;
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const inputs = form.querySelectorAll('input, textarea');
            let isValid = true;
            
            inputs.forEach(input => {
                input.style.borderColor = '';
                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ef4444';
                }
            });
            
            const email = form.querySelector('input[type="email"]')?.value;
            if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                this.showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            if (isValid) {
                this.showNotification('Thank you for your message! I will get back to you soon.', 'success');
                form.reset();
            } else {
                this.showNotification('Please fill in all required fields', 'error');
            }
        });
    },
    
    setupNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;
        
        let lastScrollY = window.scrollY;
        
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            navbar.classList.toggle('scrolled', currentScrollY > 50);
            
            if (window.innerWidth <= 768 && currentScrollY > 100) {
                navbar.style.transform = currentScrollY > lastScrollY ? 'translateY(-100%)' : 'translateY(0)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        };
        
        window.addEventListener('scroll', this.debounce(handleScroll, 10));
    },
    
    setupDownloadButtons() {
        document.addEventListener('click', (e) => {
            if (e.target.matches('.download-btn, .resume-download-btn') || 
                e.target.closest('.download-btn, .resume-download-btn')) {
                e.preventDefault();
                this.downloadResume();
            }
        });
    },
    
    downloadResume() {
        const downloadBtns = document.querySelectorAll('.download-btn, .resume-download-btn');
        
        downloadBtns.forEach(btn => {
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
            btn.disabled = true;
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 2000);
        });
        
        try {
            
            const link = document.createElement('a');
            link.href = 'https://drive.google.com/uc?export=download&id=1ge8IiYZOo_fGwMOYN4LEumJeVfGeR_FH';
            link.download = 'Shivraj_Singh_Resume.pdf';
            link.style.display = 'none';
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            this.showNotification('Resume download started!', 'success');
        } catch (error) {
            console.error('Download failed:', error);
           
            window.open('https://drive.google.com/file/d/1ge8IiYZOo_fGwMOYN4LEumJeVfGeR_FH/view?usp=drivesdk', '_blank');
            this.showNotification('Opening resume in new tab...', 'info');
        }
    },
    
    showNotification(message, type = 'info') {
        
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) existingNotification.remove();
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    },
    
    debounce(func, wait) {
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
};

document.addEventListener('DOMContentLoaded', () => app.init());

window.addEventListener('resize', app.debounce(() => {
    
    if (window.innerWidth > 768) {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
}, 250));

window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        app.init();
    }, 100);
});
