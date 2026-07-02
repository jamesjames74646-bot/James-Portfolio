document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------
    // CUSTOM CURSOR SETUP
    // -------------------------------------------------------------
    const dot = document.getElementById('cursor-dot');
    const outline = document.getElementById('cursor-outline');
    
    if (dot && outline) {
        let mouseX = 0;
        let mouseY = 0;
        let outlineX = 0;
        let outlineY = 0;
        
        // Active mouse moving detection
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Show cursor on first movement
            if (!document.body.classList.contains('cursor-active')) {
                document.body.classList.add('cursor-active');
            }
            
            // Instantly position dot
            dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
        });

        // Smooth outline cursor interpolation
        const updateOutline = () => {
            const easeFactor = 0.15; // Interpolation speed
            outlineX += (mouseX - outlineX) * easeFactor;
            outlineY += (mouseY - outlineY) * easeFactor;
            
            outline.style.transform = `translate3d(${outlineX}px, ${outlineY}px, 0) translate(-50%, -50%)`;
            requestAnimationFrame(updateOutline);
        };
        requestAnimationFrame(updateOutline);
        
        // Hide custom cursor when mouse leaves the viewport
        document.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-active');
        });
        
        // Hover effects on links and buttons
        const updateHoverListeners = () => {
            const hoverables = document.querySelectorAll('a, button, .btn, .gallery-card, .filter-btn');
            hoverables.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    outline.style.width = '55px';
                    outline.style.height = '55px';
                    outline.style.borderColor = 'var(--color-secondary)';
                    outline.style.backgroundColor = 'rgba(39, 174, 96, 0.05)';
                });
                el.addEventListener('mouseleave', () => {
                    outline.style.width = '32px';
                    outline.style.height = '32px';
                    outline.style.borderColor = 'var(--color-primary)';
                    outline.style.backgroundColor = 'transparent';
                });
            });
        };
        updateHoverListeners();
    }

    // -------------------------------------------------------------
    // MOBILE NAVIGATION DRAWER
    // -------------------------------------------------------------
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('open');
            navMenu.classList.toggle('open');
        });
        
        // Close menu when clicking nav links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('open');
                navMenu.classList.remove('open');
            });
        });
    }

    // -------------------------------------------------------------
    // SCROLL HEADER EFFECT & ACTIVE NAV STATE
    // -------------------------------------------------------------
    const header = document.querySelector('.header');
    const sections = document.querySelectorAll('section[id]');
    
    const handleScroll = () => {
        const scrollY = window.pageYOffset;
        
        // Header backdrop scrolling glow
        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Active link switching based on viewport scroll position
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 120;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href*=${sectionId}]`);
            
            if (correspondingLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    correspondingLink.classList.add('active');
                }
            }
        });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run initially on load

    // -------------------------------------------------------------
    // INTERSECTION OBSERVER FOR SCROLL REVEALS
    // -------------------------------------------------------------
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
    
    if (scrollRevealElements.length > 0) {
        const revealCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target); // Stop observing once revealed
                }
            });
        };
        
        const revealObserver = new IntersectionObserver(revealCallback, {
            root: null,
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });
        
        scrollRevealElements.forEach(element => {
            revealObserver.observe(element);
        });
    }
});
