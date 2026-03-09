document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');

    // Sticky Header Logic
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Simple reveal animation observer
    const revealOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, revealOptions);

    // Initial targeting for reveal sections
    const revealSelectors = [
        '.hero-content',
        '.hero-visual',
        '.problem-solution',
        '.feature-item',
        '.step-card',
        '.use-case-card',
        '.pricing-card',
        '.final-cta .container'
    ];

    document.querySelectorAll(revealSelectors.join(', ')).forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
        revealObserver.observe(el);
    });
});

// Add revealed class styles dynamically
const style = document.createElement('style');
style.textContent = `
    .revealed {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    /* Staggered steps for grid items */
    .step-card:nth-child(2) { transition-delay: 0.1s !important; }
    .step-card:nth-child(3) { transition-delay: 0.2s !important; }
    
    .pricing-card:nth-child(2) { transition-delay: 0.1s !important; }
    .pricing-card:nth-child(3) { transition-delay: 0.2s !important; }
`;
document.head.appendChild(style);
