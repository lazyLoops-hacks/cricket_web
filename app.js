// ================= Pinnacle Cricket Experiences - Premium JavaScript =================

class PinnacleWebsite {
  constructor() {
    this.isLoaded = false;
    this.customCursor = null;
    this.particlesCanvas = null;
    this.particles = [];
    this.stats = [];
    this.isAnimatingStats = false;
    
    this.init();
  }

  init() {
    this.setupLoadingScreen();
    this.setupCustomCursor();
    this.setupNavigation();
    this.setupParticles();
    this.setupScrollAnimations();
    this.setupStatsCounter();
    this.setupVideoModal();
    this.setupContactForm();
    this.setupClientCarousel();
    this.setupMobileMenu();
    this.setupSmoothScrolling();
    this.bindEvents();
    
    console.log('🏏 Pinnacle Cricket Experiences - Premium features loaded');
  }

  // ================= Loading Screen =================
  setupLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const progress = document.querySelector('.loading-progress');
    
    if (!loadingScreen) return;

    let loadProgress = 0;
    const loadingInterval = setInterval(() => {
      loadProgress += Math.random() * 15 + 5;
      
      if (loadProgress >= 100) {
        loadProgress = 100;
        clearInterval(loadingInterval);
        
        setTimeout(() => {
          loadingScreen.classList.add('hidden');
          this.isLoaded = true;
          this.triggerEntranceAnimations();
        }, 800);
      }
      
      if (progress) {
        progress.style.transform = `translateX(${loadProgress - 100}%)`;
      }
    }, 150);
  }

  triggerEntranceAnimations() {
    // Trigger hero animations
    const heroElements = document.querySelectorAll('.hero-content > *');
    heroElements.forEach((el, index) => {
      setTimeout(() => {
        el.style.animation = `slideInUp 0.8s ease-out forwards`;
        el.style.animationDelay = `${index * 0.2}s`;
      }, index * 200);
    });
  }

  // ================= Custom Cursor =================
  setupCustomCursor() {
    this.customCursor = document.getElementById('custom-cursor');
    if (!this.customCursor) return;

    document.addEventListener('mousemove', (e) => {
      if (this.customCursor) {
        this.customCursor.style.left = e.clientX + 'px';
        this.customCursor.style.top = e.clientY + 'px';
      }
    });

    // Cursor hover effects
    const interactiveElements = document.querySelectorAll('a, button, .service-card, .portfolio-item, .team-member');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        if (this.customCursor) {
          this.customCursor.classList.add('hover');
        }
      });
      
      el.addEventListener('mouseleave', () => {
        if (this.customCursor) {
          this.customCursor.classList.remove('hover');
        }
      });
    });
  }

  // ================= Particles System =================
  setupParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;

    this.particlesCanvas = canvas;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create particles
    this.createParticles();
    this.animateParticles();
  }

  createParticles() {
    const particleCount = window.innerWidth < 768 ? 30 : 60;
    this.particles = [];

    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        color: Math.random() > 0.5 ? '#00ff88' : '#f4d03f'
      });
    }
  }

  animateParticles() {
    if (!this.particlesCanvas) return;

    const ctx = this.particlesCanvas.getContext('2d');
    ctx.clearRect(0, 0, this.particlesCanvas.width, this.particlesCanvas.height);

    this.particles.forEach(particle => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Wrap around edges
      if (particle.x < 0) particle.x = this.particlesCanvas.width;
      if (particle.x > this.particlesCanvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = this.particlesCanvas.height;
      if (particle.y > this.particlesCanvas.height) particle.y = 0;

      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.globalAlpha = particle.opacity;
      ctx.fill();
    });

    // Draw connections
    this.particles.forEach((particle1, i) => {
      this.particles.slice(i + 1).forEach(particle2 => {
        const distance = Math.sqrt(
          Math.pow(particle1.x - particle2.x, 2) + 
          Math.pow(particle1.y - particle2.y, 2)
        );

        if (distance < 100) {
          ctx.beginPath();
          ctx.moveTo(particle1.x, particle1.y);
          ctx.lineTo(particle2.x, particle2.y);
          ctx.strokeStyle = '#00ff88';
          ctx.globalAlpha = (100 - distance) / 100 * 0.2;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });
    });

    ctx.globalAlpha = 1;
    requestAnimationFrame(() => this.animateParticles());
  }

  // ================= Navigation =================
  setupNavigation() {
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Header scroll effect
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        header?.classList.add('scrolled');
      } else {
        header?.classList.remove('scrolled');
      }
      
      this.updateActiveNavigation();
    });

    // Initial active nav
    this.updateActiveNavigation();
  }

  updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let activeSection = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        activeSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${activeSection}`) {
        link.classList.add('active');
      }
    });
  }

  // ================= Smooth Scrolling =================
  setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
          const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
          const targetPosition = targetSection.offsetTop - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          
          // Close mobile menu if open
          this.closeMobileMenu();
        }
      });
    });
  }

  // ================= Mobile Menu =================
  setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    if (!mobileMenuBtn || !nav) return;

    mobileMenuBtn.addEventListener('click', () => {
      nav.classList.toggle('active');
      mobileMenuBtn.classList.toggle('active');
    });

    // Close menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        this.closeMobileMenu();
      });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        this.closeMobileMenu();
      }
    });
  }

  closeMobileMenu() {
    const nav = document.querySelector('.nav');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    nav?.classList.remove('active');
    mobileMenuBtn?.classList.remove('active');
  }

  // ================= Scroll Animations =================
  setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          
          // Trigger specific animations
          if (entry.target.classList.contains('service-card')) {
            this.animateServiceCard(entry.target);
          }
          
          if (entry.target.classList.contains('team-member')) {
            this.animateTeamMember(entry.target);
          }
          
          if (entry.target.classList.contains('portfolio-item')) {
            this.animatePortfolioItem(entry.target);
          }
        }
      });
    }, observerOptions);

    // Observe elements for animation
    const animatableElements = document.querySelectorAll(`
      .service-card,
      .team-member,
      .portfolio-item,
      .testimonial-card,
      .value-card,
      .contact-card
    `);

    animatableElements.forEach(el => observer.observe(el));
  }

  animateServiceCard(card) {
    card.style.animation = 'slideInUp 0.6s ease-out forwards';
  }

  animateTeamMember(member) {
    member.style.animation = 'slideInUp 0.6s ease-out forwards';
  }

  animatePortfolioItem(item) {
    item.style.animation = 'slideInUp 0.6s ease-out forwards';
  }

  // ================= Stats Counter =================
  setupStatsCounter() {
    const statsNumbers = document.querySelectorAll('.stat-number');
    if (!statsNumbers.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.isAnimatingStats) {
          this.isAnimatingStats = true;
          this.animateStats();
        }
      });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
      observer.observe(heroStats);
    }
  }

  animateStats() {
    const statsNumbers = document.querySelectorAll('.stat-number');
    
    statsNumbers.forEach(numberElement => {
      const finalCount = parseInt(numberElement.dataset.count);
      const duration = 2000;
      const steps = 60;
      const stepValue = finalCount / steps;
      let currentCount = 0;
      
      const counter = setInterval(() => {
        currentCount += stepValue;
        
        if (currentCount >= finalCount) {
          currentCount = finalCount;
          clearInterval(counter);
        }
        
        // Format numbers
        let displayValue = Math.floor(currentCount);
        if (finalCount >= 1000000) {
          displayValue = (displayValue / 1000000).toFixed(1) + 'M';
        } else if (finalCount >= 1000) {
          displayValue = Math.floor(displayValue / 1000) * 1000;
        }
        
        numberElement.textContent = displayValue + (finalCount < 1000 ? '+' : '');
      }, duration / steps);
    });
  }

  // ================= Video Modal =================
  setupVideoModal() {
    const modal = document.getElementById('video-modal');
    const modalVideo = document.getElementById('modal-video');
    const closeBtn = document.getElementById('video-modal-close');
    const playButtons = document.querySelectorAll('#play-showreel, .video-placeholder');

    if (!modal || !modalVideo || !closeBtn) return;

    // Open modal
    playButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openVideoModal();
      });
    });

    // Close modal
    closeBtn.addEventListener('click', () => {
      this.closeVideoModal();
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.closeVideoModal();
      }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        this.closeVideoModal();
      }
    });
  }

  openVideoModal() {
    const modal = document.getElementById('video-modal');
    const modalVideo = document.getElementById('modal-video');
    
    if (modal && modalVideo) {
      modal.classList.add('active');
      modalVideo.src = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0';
      document.body.style.overflow = 'hidden';
    }
  }

  closeVideoModal() {
    const modal = document.getElementById('video-modal');
    const modalVideo = document.getElementById('modal-video');
    
    if (modal && modalVideo) {
      modal.classList.remove('active');
      modalVideo.src = '';
      document.body.style.overflow = '';
    }
  }

  // ================= Contact Form =================
  setupContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    // Real-time validation
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearFieldError(input));
    });

    // Form submission
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleFormSubmission(form);
    });

    // Floating labels effect
    this.setupFloatingLabels();
  }

  setupFloatingLabels() {
    const formGroups = document.querySelectorAll('.form-group');
    
    formGroups.forEach(group => {
      const input = group.querySelector('input, textarea, select');
      const label = group.querySelector('label');
      
      if (!input || !label) return;

      input.addEventListener('focus', () => {
        label.style.transform = 'translateY(-20px) scale(0.9)';
        label.style.color = '#00ff88';
      });

      input.addEventListener('blur', () => {
        if (!input.value) {
          label.style.transform = '';
          label.style.color = '';
        }
      });

      // Check initial state
      if (input.value) {
        label.style.transform = 'translateY(-20px) scale(0.9)';
      }
    });
  }

  validateField(field) {
    const formGroup = field.closest('.form-group');
    let isValid = true;
    let errorMessage = '';

    // Remove existing error
    this.clearFieldError(field);

    // Validation rules
    if (field.hasAttribute('required') && !field.value.trim()) {
      isValid = false;
      errorMessage = 'This field is required';
    } else if (field.type === 'email' && field.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(field.value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
      }
    } else if (field.type === 'tel' && field.value) {
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      if (!phoneRegex.test(field.value.replace(/\s/g, ''))) {
        isValid = false;
        errorMessage = 'Please enter a valid phone number';
      }
    }

    if (!isValid) {
      this.showFieldError(field, errorMessage);
    }

    return isValid;
  }

  showFieldError(field, message) {
    const formGroup = field.closest('.form-group');
    field.style.borderColor = '#ff6b6b';
    
    let errorElement = formGroup.querySelector('.error-message');
    if (!errorElement) {
      errorElement = document.createElement('span');
      errorElement.className = 'error-message';
      errorElement.style.cssText = `
        color: #ff6b6b;
        font-size: 0.8rem;
        margin-top: 0.25rem;
        display: block;
      `;
      formGroup.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
  }

  clearFieldError(field) {
    const formGroup = field.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    
    field.style.borderColor = '';
    if (errorElement) {
      errorElement.remove();
    }
  }

  handleFormSubmission(form) {
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    // Validate all fields
    const fields = form.querySelectorAll('input[required], textarea[required]');
    let isFormValid = true;
    
    fields.forEach(field => {
      if (!this.validateField(field)) {
        isFormValid = false;
      }
    });

    if (!isFormValid) {
      this.showNotification('Please correct the errors above', 'error');
      return;
    }

    // Show loading state
    submitBtn.innerHTML = `
      <span>Sending...</span>
      <i class="fas fa-spinner fa-spin"></i>
    `;
    submitBtn.disabled = true;

    // Simulate form submission
    setTimeout(() => {
      // Success state
      submitBtn.innerHTML = `
        <span>Message Sent!</span>
        <i class="fas fa-check"></i>
      `;
      
      this.showNotification('Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.', 'success');
      
      // Reset form
      setTimeout(() => {
        form.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Reset floating labels
        const labels = form.querySelectorAll('label');
        labels.forEach(label => {
          label.style.transform = '';
          label.style.color = '';
        });
      }, 3000);
      
    }, 2000);
  }

  showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
      existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
      position: fixed;
      top: 2rem;
      right: 2rem;
      max-width: 400px;
      padding: 1rem 1.5rem;
      background: ${type === 'success' ? 'var(--gradient-primary)' : 'rgba(255, 107, 107, 0.9)'};
      color: white;
      border-radius: 10px;
      backdrop-filter: blur(10px);
      z-index: 10000;
      animation: slideInRight 0.5s ease-out;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    `;
    
    notification.innerHTML = `
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
      </div>
    `;

    document.body.appendChild(notification);

    // Remove after 5 seconds
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.5s ease-out forwards';
      setTimeout(() => notification.remove(), 500);
    }, 5000);
  }

  // ================= Client Carousel =================
  setupClientCarousel() {
    const track = document.querySelector('.client-track');
    if (!track) return;

    // Duplicate logos for seamless loop
    const logos = track.innerHTML;
    track.innerHTML = logos + logos;

    // Pause on hover
    track.addEventListener('mouseenter', () => {
      track.style.animationPlayState = 'paused';
    });

    track.addEventListener('mouseleave', () => {
      track.style.animationPlayState = 'running';
    });
  }

  // ================= Performance Optimizations =================
  setupPerformanceOptimizations() {
    // Lazy load images
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach(img => imageObserver.observe(img));
    }

    // Reduce animations on low-end devices
    if (navigator.hardwareConcurrency <= 2) {
      document.documentElement.style.setProperty('--transition-smooth', 'all 0.15s ease');
      this.particles = this.particles.slice(0, 20); // Reduce particles
    }
  }

  // ================= Event Bindings =================
  bindEvents() {
    // Window events
    window.addEventListener('resize', () => {
      if (this.particlesCanvas) {
        this.particlesCanvas.width = window.innerWidth;
        this.particlesCanvas.height = window.innerHeight;
        this.createParticles();
      }
    });

    // Performance optimization
    window.addEventListener('load', () => {
      this.setupPerformanceOptimizations();
    });

    // Add CSS animations
    this.addDynamicStyles();
  }

  addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideInRight {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      
      @keyframes slideOutRight {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(100%);
          opacity: 0;
        }
      }
      
      .animate-in {
        animation: slideInUp 0.6s ease-out forwards;
      }
      
      .notification {
        font-family: var(--font-primary);
        font-weight: 500;
      }
    `;
    
    document.head.appendChild(style);
  }
}

// ================= Initialize Website =================
document.addEventListener('DOMContentLoaded', () => {
  new PinnacleWebsite();
});

// ================= Additional Utilities =================

// Smooth reveal for sections
const revealSection = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
};

// Performance monitoring
if (typeof PerformanceObserver !== 'undefined') {
  const perfObserver = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.entryType === 'largest-contentful-paint') {
        console.log('LCP:', entry.startTime);
      }
    });
  });
  
  try {
    perfObserver.observe({ entryTypes: ['largest-contentful-paint'] });
  } catch (e) {
    // Fallback for older browsers
  }
}

// Service Worker for caching (optional)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Service worker registration could go here for production
  });
}

// Error handling for production
window.addEventListener('error', (e) => {
  console.error('Application error:', e.error);
  // In production, you might want to send this to an error tracking service
});

// Accessibility enhancements
document.addEventListener('keydown', (e) => {
  // Enhanced keyboard navigation
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-navigation');
  }
});

document.addEventListener('mousedown', () => {
  document.body.classList.remove('keyboard-navigation');
});

// Add focus styles for keyboard navigation
const keyboardStyle = document.createElement('style');
keyboardStyle.textContent = `
  .keyboard-navigation *:focus {
    outline: 2px solid var(--neon-green) !important;
    outline-offset: 2px;
  }
`;
document.head.appendChild(keyboardStyle);