document.addEventListener('DOMContentLoaded', function() {
    
    // --- COMMON SCRIPTS (for all pages) ---

    // Theme switcher
    const themeSwitch = document.getElementById('checkbox');
    const themeSwitchMobile = document.getElementById('checkbox-mobile');

    function setTheme(isLight) {
        document.documentElement.setAttribute('data-theme', isLight ? 'light' : 'dark');
        if (themeSwitch) themeSwitch.checked = isLight;
        if (themeSwitchMobile) themeSwitchMobile.checked = isLight;
    }
    
    function saveTheme(isLight) {
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    }

    function handleThemeChange() {
        setTheme(this.checked);
        saveTheme(this.checked);
    }

    if (themeSwitch) {
        themeSwitch.addEventListener('change', handleThemeChange);
    }
    if (themeSwitchMobile) {
        themeSwitchMobile.addEventListener('change', handleThemeChange);
    }

    // Set initial theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme === 'light');
    } else {
        const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
        setTheme(prefersLight);
    }

    // Mobile menu functionality
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            mobileMenuBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.addEventListener('click', function(e) {
            if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mobileMenuBtn.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    mobileMenuBtn.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        });
    }

    // --- PAGE-SPECIFIC SCRIPTS ---

    // --- GALLERY PAGE (gallery.html) SCRIPTS ---
    const galleryModal = document.getElementById('gallery-modal');
    if (galleryModal) {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabPanels = document.querySelectorAll('.tab-panel');
        const modalContentContainer = document.getElementById('modal-content-container');
        const closeModalBtn = document.getElementById('modal-close-btn');
        const galleryItems = document.querySelectorAll('.gallery-item');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanels.forEach(panel => panel.classList.remove('active'));
                button.classList.add('active');
                const targetPanelId = button.getAttribute('data-tab') + '-panel';
                document.getElementById(targetPanelId).classList.add('active');
            });
        });

        function closeGalleryModal() {
            galleryModal.classList.remove('active');
            modalContentContainer.innerHTML = ''; // Stop video playback
        }

        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const type = item.getAttribute('data-type');
                const source = item.getAttribute('data-source');
                modalContentContainer.innerHTML = '';
                if (type === 'image') {
                    modalContentContainer.innerHTML = `<img src="${source}" alt="Gallery image">`;
                } else if (type === 'video') {
                    modalContentContainer.innerHTML = `<div class="modal-video-container"><iframe src="${source}?autoplay=1" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div>`;
                }
                galleryModal.classList.add('active');
            });
        });

        closeModalBtn.addEventListener('click', closeGalleryModal);
        galleryModal.addEventListener('click', (e) => {
            if (e.target === galleryModal) {
                closeGalleryModal();
            }
        });
    }

    // --- BLOG PAGE (blog.html) SCRIPTS ---
    const blogModal = document.getElementById('blog-modal');
    if (blogModal) {
        const closeModalBtn = document.getElementById('blog-modal-close-btn');
        const modalTitle = document.getElementById('modal-blog-title');
        const modalContent = document.getElementById('modal-blog-content');
        const blogCards = document.querySelectorAll('.blog-card');

        function openBlogModal(card) {
            const title = card.querySelector('.blog-card-title a').innerText;
            const fullContentElement = card.querySelector('.blog-card-full-content');
            modalTitle.innerText = title;
            modalContent.innerHTML = fullContentElement ? fullContentElement.innerHTML : '<p>Content coming soon...</p>';
            blogModal.classList.add('active');
        }

        function closeBlogModal() {
            blogModal.classList.remove('active');
        }

        blogCards.forEach(card => {
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => {
                openBlogModal(card);
            });
        });

        closeModalBtn.addEventListener('click', closeBlogModal);
        blogModal.addEventListener('click', (e) => {
            if (e.target === blogModal) {
                closeBlogModal();
            }
        });
    }

    // --- HOME PAGE (index.html) SCRIPTS ---
    const particlesJsEl = document.getElementById('particles-js');
    if (particlesJsEl) {
        particlesJS('particles-js', {
            "particles": { "number": { "value": 160, "density": { "enable": true, "value_area": 800 } }, "color": { "value": ["#3498db", "#9b59b6", "#1abc9c", "#e91e63"] }, "shape": { "type": ["circle", "triangle", "edge"], "stroke": { "width": 0, "color": "#000000" }, "polygon": { "nb_sides": 5 } }, "opacity": { "value": 0.5, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false } }, "size": { "value": 4, "random": true, "anim": { "enable": true, "speed": 2, "size_min": 0.1, "sync": false } }, "line_linked": { "enable": false }, "move": { "enable": true, "speed": 1, "direction": "none", "random": true, "straight": false, "out_mode": "out", "attract": { "enable": false, "rotateX": 600, "rotateY": 1200 } } }, "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": true, "mode": "bubble" }, "onclick": { "enable": true, "mode": "push" }, "resize": true }, "modes": { "bubble": { "distance": 100, "size": 10, "duration": 2, "opacity": 0.8, "speed": 3 }, "push": { "particles_nb": 4 } } }, "retina_detect": true
        });

        const navbar = document.getElementById('navbar');
        const backToTopBtn = document.getElementById('back-to-top');

        // Navbar scroll effects
        if (navbar) {
            let ticking = false;
            function updateNavbar() {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                ticking = false;
            }
            window.addEventListener('scroll', function() {
                if (!ticking) {
                    requestAnimationFrame(updateNavbar);
                    ticking = true;
                }
            });
        }

        // Active navigation highlighting
        if (navLinks.length > 0) {
            function updateActiveLink() {
                const sections = document.querySelectorAll('section[id]');
                if (sections.length === 0) return;
                const scrollPos = window.scrollY + 100;
                sections.forEach(section => {
                    if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
                        navLinks.forEach(link => link.classList.remove('active'));
                        const activeLink = document.querySelector(`.nav-link[href="#${section.getAttribute('id')}"]`);
                        if (activeLink) activeLink.classList.add('active');
                    }
                });
            }
            let linkTicking = false;
            window.addEventListener('scroll', function() {
                if (!linkTicking) {
                    requestAnimationFrame(updateActiveLink);
                    linkTicking = true;
                }
            });
        }

        // Back to top button
        if (backToTopBtn) {
            let backToTopTicking = false;
            function updateBackToTop() {
                if (window.scrollY > 300) {
                    backToTopBtn.classList.add('show');
                } else {
                    backToTopBtn.classList.remove('show');
                }
                backToTopTicking = false;
            }
            window.addEventListener('scroll', function() {
                if (!backToTopTicking) {
                    requestAnimationFrame(updateBackToTop);
                    backToTopTicking = true;
                }
            });
            backToTopBtn.addEventListener('click', function() {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

        // Smooth scrolling for nav links
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetSection = document.querySelector(href);
                    if (targetSection) {
                        const headerHeight = navbar ? navbar.offsetHeight : 80;
                        const targetPosition = targetSection.offsetTop - headerHeight;
                        window.scrollTo({
                            top: Math.max(0, targetPosition),
                            behavior: 'smooth'
                        });
                    }
                });
            }
        });

        // Fade-in animations on scroll
        const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);
        document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

        // Animate skill progress bars when visible
        const skillObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target.querySelector('.skill-progress');
                    if (progressBar) {
                        progressBar.style.transition = 'width 2s ease';
                    }
                }
            });
        }, { threshold: 0.5 });
        document.querySelectorAll('.skill-card').forEach(card => skillObserver.observe(card));

        // Initialize ScrollReveal if available
        const sr = (typeof ScrollReveal !== 'undefined') ? ScrollReveal({ origin: 'bottom', distance: '30px', duration: 1000, delay: 200, reset: false }) : null;
        if (sr) {
            try {
                sr.reveal('.hero-content > *', { interval: 200 });
                sr.reveal('.profile-container', { origin: 'right', distance: '50px' });
                sr.reveal('.card', { interval: 100 });
                sr.reveal('.skill-card', { interval: 100 });
                sr.reveal('.project-card', { interval: 150 });
            } catch (error) {
                console.log('ScrollReveal initialization failed:', error);
            }
        }

        // Function to load data from JSON
        async function loadJsonData() {
            try {
                const response = await fetch('data.json');
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                
                const experienceGrid = document.getElementById('experience-grid');
                if (experienceGrid && data.experience) {
                    experienceGrid.innerHTML = data.experience.map(job => `
                        <div class="card">
                            <div class="flex items-start gap-4">
                                <div class="w-12 h-12 bg-primary-blue/20 rounded-xl flex items-center justify-center flex-shrink-0 p-1">
                                    <img class="rounded" src="${job.logo}" alt="${job.alt}">
                                </div>
                                <div>
                                    <h4 class="font-semibold text-lg mb-2">${job.title}</h4>
                                    <p class="text-primary-blue mono text-sm mb-2">${job.company} • ${job.period}</p>
                                    <p class="text-text-secondary text-sm">${job.description}</p>
                                </div>
                            </div>
                        </div>
                    `).join('');

                    // Re-apply ScrollReveal to the newly added cards
                    if (sr) {
                        sr.reveal('#experience-grid .card', { interval: 100 });
                    }
                }
            } catch (error) {
                console.error("Could not load data from JSON:", error);
            }
        }

        // Load dynamic content from JSON
        loadJsonData();
    }
});