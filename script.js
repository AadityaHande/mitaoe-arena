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
    const targetDate = new Date('2026-03-07T10:00:00').getTime();
    const countdownEl = document.getElementById('countdown');
    const countdownLoader = document.getElementById('countdownLoader');
    
    // Show countdown after brief loading delay
    setTimeout(function() {
        if (countdownLoader) countdownLoader.style.display = 'none';
        if (countdownEl) countdownEl.style.display = 'grid';
    }, 800);
    
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
    const progressRingFill = document.getElementById('progressRingFill');
    const ringCircumference = 208; // square perimeter: 52×4
    
    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = totalHeight > 0 ? Math.min(scrolled / totalHeight, 1) : 0;

        if (scrolled > 400) {
            if (scrollToTopBtn) scrollToTopBtn.classList.add('visible');
        } else {
            if (scrollToTopBtn) scrollToTopBtn.classList.remove('visible');
        }

        if (progressRingFill) {
            progressRingFill.style.strokeDashoffset = ringCircumference - (progress * ringCircumference);
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

    // ===== REGISTRATION MODAL =====
    const registrationModal = document.getElementById('registrationModal');
    const openModalBtn = document.getElementById('openRegistrationModal');
    const closeModalBtn = document.getElementById('closeModal');
    const cancelModalBtn = document.getElementById('cancelModal');
    
    if (openModalBtn) {
        openModalBtn.addEventListener('click', function() {
            if (registrationModal) {
                registrationModal.classList.remove('hidden');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    }
    
    function closeModal() {
        if (registrationModal) {
            registrationModal.classList.add('hidden');
            document.body.style.overflow = ''; // Restore scrolling
        }
    }
    
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (cancelModalBtn) cancelModalBtn.addEventListener('click', closeModal);
    
    // Close modal on backdrop click
    if (registrationModal) {
        registrationModal.addEventListener('click', function(e) {
            if (e.target === registrationModal) {
                closeModal();
            }
        });
    }

    // ===== BOOT SCREEN =====
    var bootScreen = document.getElementById('bootScreen');
    var bootProgressFill = document.getElementById('bootProgressFill');
    var bootLines = document.getElementById('bootLines');
    var bootPercent = document.getElementById('bootPercent');
    if (bootScreen) {
        var bootSeq = [
            '[ INITIALIZING  ARENA_OS  v3.1.0 ]',
            '[ LOADING  KERNEL  MODULES .............. OK ]',
            '[ MOUNTING  THREAT  DATABASE ............. OK ]',
            '[ CALIBRATING  JUDGE  ENGINE ............. OK ]',
            '[ SYNCING  PARTICIPANT_NODES ............. OK ]',
            '[ ENCRYPTING  SECURE  CHANNELS ........... OK ]',
            '[ PRIMING  COMBAT  INTERFACE ............. OK ]',
            '> ARENA_2026 :: ALL SYSTEMS NOMINAL  \u2713'
        ];
        var bProgress = 0, bLineIdx = 0;
        var bInterval = setInterval(function() {
            bProgress += 0.8;
            if (bProgress > 100) bProgress = 100;
            if (bootProgressFill) bootProgressFill.style.width = bProgress + '%';
            if (bootPercent) bootPercent.textContent = Math.floor(bProgress) + '%';
            var expectedLine = Math.floor(bProgress / (100 / bootSeq.length));
            while (bLineIdx <= expectedLine && bLineIdx < bootSeq.length) {
                var d = document.createElement('div');
                d.textContent = bootSeq[bLineIdx];
                d.style.cssText = 'opacity:0;transform:translateX(-6px);transition:opacity 0.2s,transform 0.2s;' +
                    (bLineIdx === bootSeq.length - 1 ? 'color:#84cc16;' : '');
                if (bootLines) bootLines.appendChild(d);
                (function(el) {
                    requestAnimationFrame(function() {
                        requestAnimationFrame(function() {
                            el.style.opacity = '1';
                            el.style.transform = 'none';
                        });
                    });
                })(d);
                bLineIdx++;
            }
            if (bProgress >= 100) {
                clearInterval(bInterval);
                setTimeout(function() {
                    bootScreen.classList.add('fade-out');
                    setTimeout(function() { bootScreen.style.display = 'none'; }, 750);
                }, 450);
            }
        }, 20);
    }

    // ===== CUSTOM CURSOR =====
    var cursorDot  = document.getElementById('cursor-dot');
    var cursorRing = document.getElementById('cursor-ring');
    var dotX = 0, dotY = 0, ringX = 0, ringY = 0;
    document.addEventListener('mousemove', function(e) {
        dotX = e.clientX; dotY = e.clientY;
        if (cursorDot) {
            cursorDot.style.left = dotX + 'px';
            cursorDot.style.top  = dotY + 'px';
        }
    });
    (function animateRing() {
        ringX += (dotX - ringX) * 0.12;
        ringY += (dotY - ringY) * 0.12;
        if (cursorRing) {
            cursorRing.style.left = ringX + 'px';
            cursorRing.style.top  = ringY + 'px';
        }
        requestAnimationFrame(animateRing);
    })();
    document.querySelectorAll('a, button, [role="button"]').forEach(function(el) {
        el.addEventListener('mouseenter', function() { document.body.classList.add('cursor-link'); });
        el.addEventListener('mouseleave', function() { document.body.classList.remove('cursor-link'); });
    });

    // ===== PARTICLE CANVAS =====
    var canvas = document.getElementById('heroCanvas');
    if (canvas) {
        var ctx = canvas.getContext('2d');
        var particles = [];
        function resizeCanvas() {
            canvas.width  = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        for (var i = 0; i < 65; i++) {
            particles.push({
                x:  Math.random() * canvas.width,
                y:  Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.28,
                vy: (Math.random() - 0.5) * 0.28,
                r:  Math.random() * 1.4 + 0.4,
                a:  Math.random() * 0.45 + 0.1
            });
        }
        (function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (var i = 0; i < particles.length; i++) {
                for (var j = i + 1; j < particles.length; j++) {
                    var dx = particles[i].x - particles[j].x;
                    var dy = particles[i].y - particles[j].y;
                    var dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 115) {
                        ctx.beginPath();
                        ctx.strokeStyle = 'rgba(220,38,38,' + (0.07 * (1 - dist / 115)) + ')';
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            particles.forEach(function(p) {
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width)  p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(220,38,38,' + p.a + ')';
                ctx.fill();
            });
            requestAnimationFrame(draw);
        })();
    }

    // ===== STAGGER CHILDREN OBSERVER =====
    var staggerObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                staggerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08 });
    document.querySelectorAll('.stagger-children').forEach(function(el) {
        staggerObserver.observe(el);
    });

    // ===== STATS COUNTER =====
    var counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                var el       = entry.target;
                var target   = parseInt(el.getAttribute('data-count'));
                var prefix   = el.getAttribute('data-prefix') || '';
                var suffix   = el.getAttribute('data-suffix') || '';
                var duration = 1500;
                var startTime = performance.now();
                (function tick(now) {
                    var elapsed  = now - startTime;
                    var progress = Math.min(elapsed / duration, 1);
                    var eased    = 1 - Math.pow(1 - progress, 3);
                    var val      = Math.floor(eased * target);
                    el.textContent = prefix + (target >= 1000 ? val.toLocaleString() : val) + suffix;
                    if (progress < 1) requestAnimationFrame(tick);
                })(startTime);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.4 });
    document.querySelectorAll('[data-count]').forEach(function(el) {
        counterObserver.observe(el);
    });

    // ===== MAGNETIC BUTTONS =====
    document.querySelectorAll('.magnetic').forEach(function(btn) {
        btn.addEventListener('mousemove', function(e) {
            var rect = btn.getBoundingClientRect();
            var cx = rect.left + rect.width  / 2;
            var cy = rect.top  + rect.height / 2;
            var dx = (e.clientX - cx) * 0.22;
            var dy = (e.clientY - cy) * 0.22;
            btn.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
        });
        btn.addEventListener('mouseleave', function() {
            btn.style.transform = '';
        });
    });
});
