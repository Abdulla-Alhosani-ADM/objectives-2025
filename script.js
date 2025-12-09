// ===================================
// Document Ready and Loading
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initLoadingScreen();
    initNavigation();
    initSmoothScroll();
    initAnimatedCounters();
    initProgressBars();
    initGalleryFilter();
    initModal();
    initCharts();
    initScrollAnimations();
});

// ===================================
// Loading Screen
// ===================================
function initLoadingScreen() {
    window.addEventListener('load', function() {
        const loadingScreen = document.getElementById('loading-screen');
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 1000);
    });
}

// ===================================
// Navigation
// ===================================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-link');
    
    // Sticky navbar on scroll with performance optimization
    let lastScroll = 0;
    let ticking = false;
    
    const handleScroll = () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            if (currentScroll > lastScroll) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
        }
        
        lastScroll = currentScroll;
        
        // Update active link based on scroll position
        updateActiveLink();
        ticking = false;
    };
    
    const requestScrollUpdate = () => {
        if (!ticking) {
            requestAnimationFrame(handleScroll);
            ticking = true;
        }
    };
    
    window.addEventListener('scroll', requestScrollUpdate, { passive: true });
    
    // Mobile menu toggle
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
    
    // Close mobile menu when link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
}

function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

// ===================================
// Smooth Scrolling
// ===================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===================================
// Animated Counters
// ===================================
function initAnimatedCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                animateCounter(counter);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// ===================================
// Progress Bars
// ===================================
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const progress = progressBar.getAttribute('data-progress');
                const progressLabel = progressBar.closest('.progress-container').querySelector('.progress-percentage');
                
                // Animate progress bar
                setTimeout(() => {
                    progressBar.style.width = progress + '%';
                }, 200);
                
                // Animate percentage counter
                animateProgressCounter(progressLabel, progress);
                
                observer.unobserve(progressBar);
            }
        });
    }, observerOptions);
    
    progressBars.forEach(bar => observer.observe(bar));
}

function animateProgressCounter(element, target) {
    const duration = 1500;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current) + '%';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '%';
        }
    };
    
    updateCounter();
}

// ===================================
// Gallery Filter - Optimized
// ===================================
function initGalleryFilter() {
    const tabs = document.querySelectorAll('.gallery-tab');
    const items = document.querySelectorAll('.gallery-item');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const category = tab.getAttribute('data-category');
            
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Filter items with optimized transforms
            requestAnimationFrame(() => {
                items.forEach(item => {
                    const itemCategory = item.getAttribute('data-category');
                    
                    if (category === 'all' || itemCategory === category) {
                        item.style.display = 'block';
                        requestAnimationFrame(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translate3d(0, 0, 0)';
                        });
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translate3d(0, 20px, 0)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    });
}

// ===================================
// Modal for Images and Documents
// ===================================
function initModal() {
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const modalPdf = document.getElementById('modal-pdf');
    const closeBtn = document.querySelector('.modal-close');
    
    closeBtn.addEventListener('click', () => {
        closeModal();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

function openModal(src, type) {
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const modalPdf = document.getElementById('modal-pdf');
    const modalPptx = document.getElementById('modal-pptx');
    
    modal.classList.add('active');
    
    if (type === 'image') {
        modalImg.style.display = 'block';
        modalPdf.style.display = 'none';
        modalPptx.style.display = 'none';
        modalImg.src = src;
    } else if (type === 'pdf') {
        modalImg.style.display = 'none';
        modalPdf.style.display = 'block';
        modalPptx.style.display = 'none';
        modalPdf.src = src;
    } else if (type === 'pptx') {
        modalImg.style.display = 'none';
        modalPdf.style.display = 'none';
        modalPptx.style.display = 'block';
        // Use Microsoft Office Online Viewer for PowerPoint files
        const pptxUrl = window.location.origin + window.location.pathname.replace(/\/[^\/]*$/, '/') + src;
        modalPptx.src = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(pptxUrl)}`;
    }
}

function closeModal() {
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const modalPdf = document.getElementById('modal-pdf');
    const modalPptx = document.getElementById('modal-pptx');
    
    modal.classList.remove('active');
    modalImg.src = '';
    modalPdf.src = '';
    modalPptx.src = '';
}

function openDocument(filename) {
    // For PDFs, open in new tab
    if (filename.endsWith('.pdf')) {
        window.open(filename, '_blank');
    } else if (filename.endsWith('.pptx')) {
        // For PowerPoint files, download them
        const link = document.createElement('a');
        link.href = filename;
        link.download = filename;
        link.click();
    }
}

// ===================================
// Charts with Chart.js
// ===================================
function initCharts() {
    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
        console.warn('Chart.js not loaded, skipping charts initialization');
        return;
    }
    
    // Objectives Progress Chart
    const objectivesCtx = document.getElementById('objectivesChart');
    if (objectivesCtx) {
        new Chart(objectivesCtx, {
            type: 'bar',
            data: {
                labels: [
                    'تنفيذ الطلبات ذات الأولوية',
                    'تحقيق المستهدفات الاستراتيجية',
                    'تحقيق مؤشرات الأداء',
                    'تنفيذ الأنشطة الداعمة'
                ],
                datasets: [{
                    label: 'نسبة الإنجاز %',
                    data: [100, 100, 100, 100],
                    backgroundColor: [
                        'rgba(231, 76, 60, 0.8)',
                        'rgba(52, 152, 219, 0.8)',
                        'rgba(155, 89, 182, 0.8)',
                        'rgba(26, 188, 156, 0.8)'
                    ],
                    borderColor: [
                        'rgba(231, 76, 60, 1)',
                        'rgba(52, 152, 219, 1)',
                        'rgba(155, 89, 182, 1)',
                        'rgba(26, 188, 156, 1)'
                    ],
                    borderWidth: 2,
                    borderRadius: 8
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            font: {
                                family: 'Cairo, sans-serif',
                                size: 12
                            },
                            callback: function(value) {
                                return value + '%';
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    y: {
                        ticks: {
                            font: {
                                family: 'Cairo, sans-serif',
                                size: 13,
                                weight: '600'
                            }
                        },
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
    
    // KPI Chart
    const kpiCtx = document.getElementById('kpiChart');
    if (kpiCtx) {
        new Chart(kpiCtx, {
            type: 'doughnut',
            data: {
                labels: [
                    'التحكم في الحيوانات الضالة',
                    'الأحياء الصديقة للحيوانات',
                    'تحسين عمليات التفتيش',
                    'الحد من مخاطر الصحة'
                ],
                datasets: [{
                    label: 'التقدم',
                    data: [100, 100, 100, 100],
                    backgroundColor: [
                        'rgba(231, 76, 60, 0.8)',
                        'rgba(52, 152, 219, 0.8)',
                        'rgba(155, 89, 182, 0.8)',
                        'rgba(26, 188, 156, 0.8)'
                    ],
                    borderColor: [
                        'rgba(231, 76, 60, 1)',
                        'rgba(52, 152, 219, 1)',
                        'rgba(155, 89, 182, 1)',
                        'rgba(26, 188, 156, 1)'
                    ],
                    borderWidth: 3,
                    hoverOffset: 20
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        rtl: true,
                        labels: {
                            font: {
                                family: 'Cairo, sans-serif',
                                size: 13,
                                weight: '600'
                            },
                            padding: 15,
                            usePointStyle: true,
                            pointStyle: 'circle'
                        }
                    },
                    tooltip: {
                        rtl: true,
                        bodyFont: {
                            family: 'Cairo, sans-serif',
                            size: 14
                        },
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.parsed + '%';
                            }
                        }
                    }
                }
            }
        });
    }
}

// ===================================
// Scroll Animations - Optimized
// ===================================
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.objective-card, .stat-card, .gallery-item, .chart-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Use transform3d for hardware acceleration
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translate3d(0, 0, 0)';
                // Stop observing once animated to reduce performance overhead
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translate3d(0, 30px, 0)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });
}

// ===================================
// Parallax Effect - Optimized
// ===================================
(function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    let ticking = false;
    
    const updateParallax = () => {
        const scrolled = window.pageYOffset;
        // Use transform3d for hardware acceleration
        hero.style.transform = `translate3d(0, ${scrolled * 0.5}px, 0)`;
        ticking = false;
    };
    
    const requestParallaxUpdate = () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    };
    
    window.addEventListener('scroll', requestParallaxUpdate, { passive: true });
})();

// ===================================
// Utility Functions
// ===================================

// Debounce function for performance
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

// Intersection Observer polyfill fallback
if (!('IntersectionObserver' in window)) {
    console.warn('IntersectionObserver not supported, using fallback');
    // Add fallback logic if needed
}

// ===================================
// Print Styles
// ===================================
window.addEventListener('beforeprint', () => {
    // Adjust any dynamic content before printing
    document.querySelectorAll('.progress-fill').forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = progress + '%';
    });
});

// ===================================
// External Project Modal
// ===================================
function openExternalProject(url) {
    const projectModal = document.getElementById('project-modal');
    const projectIframe = document.getElementById('project-iframe');
    
    projectModal.classList.add('active');
    projectIframe.src = url;
}

function closeProjectModal() {
    const projectModal = document.getElementById('project-modal');
    const projectIframe = document.getElementById('project-iframe');
    
    projectModal.classList.remove('active');
    projectIframe.src = '';
}

// ===================================
// Export functions for inline use
// ===================================
window.openModal = openModal;
window.closeModal = closeModal;
window.openDocument = openDocument;
window.openExternalProject = openExternalProject;
window.closeProjectModal = closeProjectModal;

console.log('🎯 Objectives 2025 - Application Initialized Successfully');
console.log('📊 Dashboard loaded and ready');
console.log('بلدية مدينة أبوظبي - إدارة الرفق بالحيوان');
