// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
    
    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.getElementById('navbar');
    const scrollProgress = document.querySelector('.scroll-progress');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrolled / totalHeight) * 100;
        
        if (scrollProgress) {
            scrollProgress.style.width = progress + '%';
        }
        
        if (navbar) {
            if (scrolled > 20) {
                navbar.classList.add('bg-black/95', 'backdrop-blur-xl', 'border-b', 'border-white/5');
            } else {
                navbar.classList.remove('bg-black/95', 'backdrop-blur-xl', 'border-b', 'border-white/5');
            }
        }
    });

    // ===== MOBILE MENU =====
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const menuIcon = document.querySelector('.menu-icon');
    const closeIcon = document.querySelector('.close-icon');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('open');
            if (mobileMenu.classList.contains('open')) {
                document.body.style.overflow = 'hidden';
                if (menuIcon) menuIcon.style.display = 'none';
                if (closeIcon) closeIcon.style.display = 'block';
            } else {
                document.body.style.overflow = '';
                if (menuIcon) menuIcon.style.display = 'block';
                if (closeIcon) closeIcon.style.display = 'none';
            }
        });
    }
    
    if (mobileMenuClose && mobileMenu) {
        mobileMenuClose.addEventListener('click', function() {
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
            if (menuIcon) menuIcon.style.display = 'block';
            if (closeIcon) closeIcon.style.display = 'none';
        });
    }
    
    // Close menu when clicking menu items
    document.querySelectorAll('[data-close-menu]').forEach(function(item) {
        item.addEventListener('click', function() {
            if (mobileMenu) {
                mobileMenu.classList.remove('open');
                document.body.style.overflow = '';
                if (menuIcon) menuIcon.style.display = 'block';
                if (closeIcon) closeIcon.style.display = 'none';
            }
        });
    });

    // ===== COUNTDOWN =====
    const targetDate = new Date('2026-02-24T10:00:00').getTime();
    const countdownEl = document.getElementById('countdown');
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        if (distance <= 0) {
            if (countdownEl) {
                countdownEl.innerHTML = '<div class="text-primary font-black animate-pulse tracking-widest uppercase text-lg py-4">ARENA_IS_LIVE</div>';
            }
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        const units = [
            { label: 'DD', value: days },
            { label: 'HH', value: hours },
            { label: 'MM', value: minutes },
            { label: 'SS', value: seconds }
        ];
        
        if (countdownEl) {
            countdownEl.innerHTML = units.map(function(item) {
                return '<div class="flex flex-col items-center">' +
                    '<div class="text-3xl md:text-5xl font-black font-mono text-white tracking-tighter leading-none mb-2">' + 
                    String(item.value).padStart(2, '0') + 
                    '</div>' +
                    '<div class="text-[9px] font-black text-primary tracking-widest uppercase">' + 
                    item.label + 
                    '</div>' +
                '</div>';
            }).join('');
        }
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // ===== SYSTEM LOG ROTATION =====
    const logs = [
        "SYS_BOOT::ACTIVE",
        "ENROLLMENT_SYNC::OK",
        "CORE_STABLE::99.9%",
        "TRAFFIC_REROUTING...",
        "ARENA_STATUS::READY",
        "LATENCY::12MS",
        "ENCRYPTION::STABLE"
    ];
    let logIndex = 0;
    const systemLogEl = document.getElementById('systemLog');
    
    setInterval(function() {
        logIndex = (logIndex + 1) % logs.length;
        if (systemLogEl) {
            systemLogEl.textContent = logs[logIndex];
        }
    }, 2000);

    // ===== ENROLLMENT ANIMATION =====
    let enrollment = 84.2;
    let activeUsers = 142;
    const enrollmentFill = document.getElementById('enrollmentFill');
    const enrollmentPercent = document.getElementById('enrollmentPercent');
    const activeNodesEl = document.getElementById('activeNodes');
    
    setInterval(function() {
        enrollment += Math.random() * 0.05;
        if (enrollment > 99.8) enrollment = 99.8;
        
        const drift = Math.floor(Math.random() * 5) - 2;
        activeUsers += drift;
        if (activeUsers < 120) activeUsers = 120;
        if (activeUsers > 250) activeUsers = 250;
        
        if (enrollmentFill) {
            enrollmentFill.style.width = enrollment + '%';
        }
        if (enrollmentPercent) {
            enrollmentPercent.textContent = enrollment.toFixed(1) + '%_CAPACITY';
        }
        if (activeNodesEl) {
            activeNodesEl.textContent = '[' + activeUsers + ' ACTIVE_NODES]';
        }
    }, 2000);

    // ===== SCROLL REVEAL =====
    const revealElements = document.querySelectorAll('.reveal-sector');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);
    
    revealElements.forEach(function(el) {
        observer.observe(el);
    });

    // ===== FAQ ACCORDION =====
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(function(item) {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', function() {
                // Close all other items
                faqItems.forEach(function(otherItem) {
                    if (otherItem !== item) {
                        otherItem.classList.remove('open');
                    }
                });
                // Toggle current item
                item.classList.toggle('open');
            });
        }
    });

    // ===== SCROLL TO TOP =====
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                targetEl.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
