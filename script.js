// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
    
    //  NAVBAR SCROLL EFFECT 
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

    //  MOBILE MENU 
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

    //  COUNTDOWN 
    const targetDate = new Date('2026-03-07T10:00:00').getTime();
    const countdownEl = document.getElementById('countdown');
    const countdownLoader = document.getElementById('countdownLoader');
    
    // Show countdown after brief loading delay
    setTimeout(function() {
        if (countdownLoader) countdownLoader.style.display = 'none';
        if (countdownEl) countdownEl.style.display = 'grid';
    }, 300);
    
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

    //  SYSTEM LOG ROTATION 
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

    //  ENROLLMENT ANIMATION 
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

    //  SCROLL REVEAL 
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

    //  HERO PARALLAX — content fades out as user scrolls down
    var heroContentCol = document.querySelector('#hero .lg\\:col-span-7');
    var heroRightCol   = document.querySelector('#hero .lg\\:col-span-5');
    var heroSection    = document.getElementById('hero');
    if (heroContentCol && heroSection) {
        window.addEventListener('scroll', function() {
            var scrollY = window.scrollY;
            var heroH   = heroSection.offsetHeight;
            if (scrollY < heroH) {
                var progress = scrollY / heroH;                 // 0 → 1
                var fade     = Math.max(0, 1 - progress * 1.6);
                var drift    = progress * 28;                   // px up
                heroContentCol.style.opacity   = fade;
                heroContentCol.style.transform = 'translateY(-' + drift + 'px)';
                if (heroRightCol) {
                    heroRightCol.style.opacity   = Math.max(0, 1 - progress * 1.9);
                    heroRightCol.style.transform = 'translateY(-' + drift * 0.6 + 'px)';
                }
            } else {
                heroContentCol.style.opacity = '0';
                if (heroRightCol) heroRightCol.style.opacity = '0';
            }
        }, { passive: true });
    }

    //  DIRECTIONAL SCROLL REVEALS  — assign classes dynamically
    // Section badge labels => slide from left
    document.querySelectorAll(
        '#value .text-center > span, #arena .mb-6 span.inline-flex, ' +
        '#schedule span.inline-flex, #register .mb-8 span.inline-flex, ' +
        '#faq .text-center span.inline-flex, #stats .flex span'
    ).forEach(function(el) {
        el.classList.add('reveal-left');
    });
    // Section headings → clip reveal wrap
    document.querySelectorAll(
        '#value h3, #arena h2, #schedule h2, #register h2, #faq h2, #stats h2, #sponsors .text-center h2'
    ).forEach(function(heading) {
        if (!heading.closest('.reveal-heading')) {
            var wrap = document.createElement('span');
            wrap.className = 'reveal-heading';
            // Move heading content into the wrap
            var inner = document.createElement('span');
            inner.className = 'reveal-heading-inner';
            while (heading.firstChild) { inner.appendChild(heading.firstChild); }
            wrap.appendChild(inner);
            heading.appendChild(wrap);
        }
    });
    // Section description paragraphs → scale-up reveal
    document.querySelectorAll(
        '#value .text-center > p, #arena .mb-6 > p, #register .mb-8 > p, ' +
        '#schedule .md\\:text-right, #sponsors .text-center p'
    ).forEach(function(el) {
        el.classList.add('reveal-scale');
    });
    // Right-aligned blocks → slide from right
    document.querySelectorAll(
        '#schedule .md\\:text-right'
    ).forEach(function(el) {
        el.classList.remove('reveal-scale');
        el.classList.add('reveal-right');
    });
    // Add delay helpers
    var revealDelays = [
        { sel: '#value .text-center > span',       delay: 0 },
        { sel: '#value h3 .reveal-heading',        delay: '0.1s' },
        { sel: '#value .text-center > p',          delay: '0.18s' },
        { sel: '#arena .mb-6 span.inline-flex',    delay: 0 },
        { sel: '#arena h2 .reveal-heading',        delay: '0.1s' },
        { sel: '#register .mb-8 span.inline-flex', delay: 0 },
        { sel: '#register h2 .reveal-heading',     delay: '0.1s' },
        { sel: '#register .mb-8 > p',              delay: '0.18s' },
    ];
    revealDelays.forEach(function(item) {
        var el = document.querySelector(item.sel);
        if (el && item.delay) el.style.transitionDelay = item.delay;
    });

    // Unified observer for directional reveals + heading clip reveals
    var dirRevealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                dirRevealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal-left, .reveal-right, .reveal-scale, .reveal-heading').forEach(function(el) {
        dirRevealObserver.observe(el);
    });

    //  SECTION NAV DOTS  — persistent position indicator with click navigation
    var dotSections = ['hero','sponsors','value','arena','schedule','stats','register','faq'];
    var dotContainer = document.createElement('div');
    dotContainer.id = 'section-dots';
    dotSections.forEach(function(id, i) {
        var dot = document.createElement('button');
        dot.className = 'section-dot';
        dot.setAttribute('aria-label', 'Go to ' + id + ' section');
        dot.setAttribute('title', id.charAt(0).toUpperCase() + id.slice(1));
        dot.addEventListener('click', function() {
            var sec = document.getElementById(id);
            if (sec) sec.scrollIntoView({ behavior: 'smooth' });
        });
        dotContainer.appendChild(dot);
    });
    document.body.appendChild(dotContainer);
    var allDots = dotContainer.querySelectorAll('.section-dot');
    var dotObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            var idx = dotSections.indexOf(entry.target.id);
            if (idx === -1) return;
            if (entry.isIntersecting) {
                allDots.forEach(function(d) { d.classList.remove('active'); });
                allDots[idx].classList.add('active');
            }
        });
    }, { threshold: 0.4 });
    dotSections.forEach(function(id) {
        var sec = document.getElementById(id);
        if (sec) dotObserver.observe(sec);
    });

    //  FAQ ACCORDION 
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

    //  FAQ SLIDE-IN  (INSPIRE tl-item style staggered entrance)
    faqItems.forEach(function(item) {
        item.classList.add('will-animate');
    });
    var faqSlideObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                var idx = Array.prototype.indexOf.call(faqItems, entry.target);
                setTimeout(function() {
                    entry.target.classList.add('faq-visible');
                }, idx * 55);
                faqSlideObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    faqItems.forEach(function(item) {
        faqSlideObserver.observe(item);
    });

    //  SCROLL TO TOP 
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

    //  SMOOTH SCROLL FOR ANCHOR LINKS 
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

    //  REGISTRATION MODAL 
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

    //  BOOT SCREEN 
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
                    setTimeout(function() { bootScreen.style.display = 'none'; }, 400);
                }, 450);
            }
        }, 20);
    }

    //  CUSTOM CURSOR 
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

    //  PARTICLE CANVAS  (mouse-reactive: particles flee cursor)
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
        for (var i = 0; i < 90; i++) {
            particles.push({
                x:   Math.random() * canvas.width,
                y:   Math.random() * canvas.height,
                ox:  0, oy: 0,
                vx:  (Math.random() - 0.5) * 0.32,
                vy:  (Math.random() - 0.5) * 0.32,
                r:   Math.random() * 1.6 + 0.5,
                a:   Math.random() * 0.55 + 0.12,
                baseVx: 0, baseVy: 0
            });
        }
        particles.forEach(function(p) { p.baseVx = p.vx; p.baseVy = p.vy; });

        var REPEL_RADIUS = 130, REPEL_FORCE = 0.55;
        (function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Particle connections
            for (var i = 0; i < particles.length; i++) {
                for (var j = i + 1; j < particles.length; j++) {
                    var dx = particles[i].x - particles[j].x;
                    var dy = particles[i].y - particles[j].y;
                    var dist = Math.sqrt(dx*dx + dy*dy);
                    if (dist < 120) {
                        var alpha = 0.12 * (1 - dist / 120);
                        ctx.beginPath();
                        ctx.strokeStyle = 'rgba(220,38,38,' + alpha + ')';
                        ctx.lineWidth = 0.6;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            particles.forEach(function(p) {
                // Mouse repulsion
                var mdx = p.x - heroMouseX;
                var mdy = p.y - heroMouseY;
                var mdist = Math.sqrt(mdx*mdx + mdy*mdy);
                if (mdist < REPEL_RADIUS && mdist > 0) {
                    var force = (REPEL_RADIUS - mdist) / REPEL_RADIUS;
                    p.vx += (mdx / mdist) * force * REPEL_FORCE;
                    p.vy += (mdy / mdist) * force * REPEL_FORCE;
                }
                // Ease velocity back to base
                p.vx += (p.baseVx - p.vx) * 0.04;
                p.vy += (p.baseVy - p.vy) * 0.04;

                p.x += p.vx; p.y += p.vy;
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width)  p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                // Glow near mouse
                var glow = Math.max(0, 1 - Math.sqrt(Math.pow(p.x-heroMouseX,2)+Math.pow(p.y-heroMouseY,2)) / REPEL_RADIUS);
                var alpha = p.a + glow * 0.5;
                var radius = p.r + glow * 2;
                ctx.beginPath();
                ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(220,38,38,' + Math.min(alpha, 0.95) + ')';
                if (glow > 0.3) {
                    ctx.shadowBlur  = 8 * glow;
                    ctx.shadowColor = '#dc2626';
                }
                ctx.fill();
                ctx.shadowBlur = 0;
            });
            requestAnimationFrame(draw);
        })();
    }

    //  STAGGER CHILDREN OBSERVER 
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

    //  MOBILE CARD SCROLL ACTIVATOR  — highlights card in viewport
    if (isTouchDevice) {
        var cardScrollObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('scroll-active');
                } else {
                    entry.target.classList.remove('scroll-active');
                }
            });
        }, {
            threshold: 0.55,               // card must be >55% visible
            rootMargin: '-5% 0px -5% 0px'  // trim top & bottom 5%
        });
        document.querySelectorAll('.tilt-card').forEach(function(card) {
            cardScrollObserver.observe(card);
        });
    }

    //  STATS COUNTER 
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

    //  POINTER vs TOUCH — gate mouse-only interactions
    var isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

    //  MAGNETIC BUTTONS  (pointer devices only)
    if (!isTouchDevice) {
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
    }

    //  TEXT SCRAMBLE  — headings decode from random chars
    var SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&!?<>[]{}';
    function scrambleElement(el) {
        var original = el.getAttribute('data-scramble') || el.textContent;
        el.setAttribute('data-scramble', original);
        var frame = 0;
        var totalFrames = 22;
        var revealed = 0;
        function tick() {
            var out = '';
            for (var i = 0; i < original.length; i++) {
                if (original[i] === ' ' || original[i] === '\n' || original[i] === '.') {
                    out += original[i];
                } else if (i < revealed) {
                    out += original[i];
                } else {
                    out += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
                }
            }
            el.textContent = out;
            frame++;
            if (frame % 2 === 0) revealed++;
            if (revealed <= original.length) {
                requestAnimationFrame(tick);
            } else {
                el.textContent = original;
            }
        }
        tick();
    }
    var scrambleObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                scrambleElement(entry.target);
                scrambleObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });
    document.querySelectorAll('[data-scramble]').forEach(function(el) {
        scrambleObserver.observe(el);
    });

    //  3D PERSPECTIVE TILT  — pointer only; touch gets ripple

    if (!isTouchDevice) {
        document.querySelectorAll('.tilt-card').forEach(function(card) {
            card.style.transformStyle = 'preserve-3d';
            card.style.transition     = 'transform 0.12s ease, box-shadow 0.3s ease';
            card.style.willChange     = 'transform';

            card.addEventListener('mousemove', function(e) {
                var rect   = card.getBoundingClientRect();
                var x      = e.clientX - rect.left;
                var y      = e.clientY - rect.top;
                var cx     = rect.width  / 2;
                var cy     = rect.height / 2;
                var maxRot = 8;
                var rotX   = ((y - cy) / cy) * -maxRot;
                var rotY   = ((x - cx) / cx) *  maxRot;
                card.style.transform = 'perspective(900px) rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg) scale3d(1.02,1.02,1.02)';
            });
            card.addEventListener('mouseleave', function() {
                card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
            });
            card.addEventListener('mouseenter', function() {
                card.style.transition = 'transform 0.12s ease, box-shadow 0.3s ease';
            });
        });
    } else {
        // ─ Touch: tap ripple feedback on all interactive cards
        document.querySelectorAll('.tilt-card').forEach(function(card) {
            card.style.position = 'relative';
            card.style.overflow = 'hidden';
            card.addEventListener('touchstart', function(e) {
                var touch = e.touches[0];
                var rect  = card.getBoundingClientRect();
                var ripple = document.createElement('div');
                ripple.className = 'touch-ripple-el';
                ripple.style.left = (touch.clientX - rect.left) + 'px';
                ripple.style.top  = (touch.clientY - rect.top)  + 'px';
                card.appendChild(ripple);
                setTimeout(function() { if (ripple.parentNode) ripple.parentNode.removeChild(ripple); }, 600);
            }, { passive: true });
        });
    }

    // ─ Sponsor logos: auto-colourful on mobile when scrolled into view
    if (isTouchDevice) {
        var sponsorWraps = document.querySelectorAll('.sponsor-logo-wrap');
        if (sponsorWraps.length) {
            var sponsorObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        entry.target.style.transition = 'filter 0.9s ease, transform 0.9s ease';
                        entry.target.classList.add('sponsor-colour');
                        sponsorObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.35 });
            sponsorWraps.forEach(function(w) { sponsorObserver.observe(w); });
        }
    }

    //  CURSOR SPARK TRAIL  — colored sparks on mouse move
    if (window.innerWidth > 768) {
        var sparkColors = ['#dc2626','#ff4444','#ff6600','#00bfff','#ff00ff','#ff2626'];
        var lastSparkX  = 0, lastSparkY = 0;
        document.addEventListener('mousemove', function(e) {
            var dx = e.clientX - lastSparkX;
            var dy = e.clientY - lastSparkY;
            var dist = Math.sqrt(dx*dx + dy*dy);
            if (dist < 10) return;
            lastSparkX = e.clientX;
            lastSparkY = e.clientY;
            var count = Math.min(4, Math.floor(dist / 12));
            for (var i = 0; i < count; i++) {
                (function() {
                    var spark = document.createElement('div');
                    var size  = Math.random() * 5 + 2;
                    var color = sparkColors[Math.floor(Math.random() * sparkColors.length)];
                    var angle = Math.random() * Math.PI * 2;
                    var speed = Math.random() * 55 + 25;
                    var life  = Math.random() * 380 + 200;
                    spark.style.cssText = [
                        'position:fixed',
                        'pointer-events:none',
                        'z-index:99999',
                        'border-radius:50%',
                        'width:'  + size + 'px',
                        'height:' + size + 'px',
                        'background:' + color,
                        'box-shadow:0 0 ' + (size*2) + 'px ' + color,
                        'left:' + e.clientX + 'px',
                        'top:'  + e.clientY + 'px',
                        'transform:translate(-50%,-50%)',
                        'transition:none',
                        'opacity:1'
                    ].join(';');
                    document.body.appendChild(spark);
                    var startTime = performance.now();
                    var tx = Math.cos(angle) * speed;
                    var ty = Math.sin(angle) * speed - 30;
                    (function animSpark(now) {
                        var elapsed  = now - startTime;
                        var progress = elapsed / life;
                        if (progress >= 1) {
                            if (spark.parentNode) spark.parentNode.removeChild(spark);
                            return;
                        }
                        var eased = 1 - Math.pow(progress, 1.5);
                        spark.style.opacity   = eased;
                        spark.style.transform = 'translate(calc(-50% + ' + (tx * progress) + 'px), calc(-50% + ' + (ty * progress + 20 * progress * progress) + 'px))';
                        requestAnimationFrame(animSpark);
                    })(startTime);
                })();
            }
        });
    }

    //  MOUSE-REACTIVE PARTICLES  — hero canvas particles flee cursor
    var heroMouseX = -9999, heroMouseY = -9999;
    var heroSection = document.getElementById('hero');
    if (heroSection) {
        heroSection.addEventListener('mousemove', function(e) {
            var rect  = heroSection.getBoundingClientRect();
            heroMouseX = e.clientX - rect.left;
            heroMouseY = e.clientY - rect.top;
        });
        heroSection.addEventListener('mouseleave', function() {
            heroMouseX = -9999; heroMouseY = -9999;
        });
    }

    //  TYPING EFFECT  — hero description typewriter
    var typingTarget = document.getElementById('heroTyping');
    if (typingTarget) {
        var lines = [
            'THE ULTIMATE CAMPUS CODING BATTLEFIELD.',
            'SOLO + DUO EVENTS. TWO GROUPS. MAX PRIZES.',
            'BEGINNER FRIENDLY. PRO LEVEL REWARDS.'
        ];
        var lineIdx = 0, charIdx = 0, isDeleting = false, typePause = false;
        function typeStep() {
            var current = lines[lineIdx];
            if (!isDeleting) {
                charIdx++;
                typingTarget.textContent = current.slice(0, charIdx);
                if (charIdx === current.length) {
                    typePause = true;
                    setTimeout(function() { typePause = false; isDeleting = true; typeStep(); }, 1800);
                    return;
                }
            } else {
                charIdx--;
                typingTarget.textContent = current.slice(0, charIdx);
                if (charIdx === 0) {
                    isDeleting = false;
                    lineIdx = (lineIdx + 1) % lines.length;
                }
            }
            var delay = isDeleting ? 22 : (charIdx === 0 ? 400 : 38);
            setTimeout(typeStep, delay);
        }
        setTimeout(typeStep, 1200);
    }

});
