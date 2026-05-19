document.addEventListener('DOMContentLoaded', () => {
    // --- SECURITY & ANTI-COPY PROTECTION ---
    // Disable right click (Context Menu)
    document.addEventListener('contextmenu', event => event.preventDefault());

    // Disable dragging of images
    document.addEventListener('dragstart', event => {
        if (event.target.tagName === 'IMG') {
            event.preventDefault();
        }
    });

    // Disable key combinations (F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Ctrl+S, Cmd+Opt+I)
    document.addEventListener('keydown', event => {
        if (
            event.keyCode === 123 || // F12
            (event.ctrlKey && event.shiftKey && event.keyCode === 73) || // Ctrl+Shift+I
            (event.ctrlKey && event.shiftKey && event.keyCode === 74) || // Ctrl+Shift+J
            (event.ctrlKey && event.shiftKey && event.keyCode === 67) || // Ctrl+Shift+C
            (event.ctrlKey && event.keyCode === 85) || // Ctrl+U (View Source)
            (event.ctrlKey && event.keyCode === 83) || // Ctrl+S (Save)
            (event.metaKey && event.altKey && event.keyCode === 73) || // Cmd+Opt+I (Safari DevTools)
            (event.metaKey && event.altKey && event.keyCode === 74) || // Cmd+Opt+J
            (event.metaKey && event.keyCode === 85) || // Cmd+U
            (event.metaKey && event.keyCode === 83)    // Cmd+S
        ) {
            event.preventDefault();
            return false;
        }
    });

    // Reveal animations on scroll
    const observerOptions = {
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                observer.unobserve(entry.target); // Animasyon bir kez tetiklensin
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- NEW LOGIC ADDED HERE ---

    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        // Close menu on link click
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // Pricing Toggle
    const pricingToggle = document.getElementById('pricing-toggle');
    const labelMonthly = document.getElementById('label-monthly');
    const labelAnnual = document.getElementById('label-annual');
    const prices = document.querySelectorAll('.price');
    const annualTexts = document.querySelectorAll('.annual-desc');

    if (pricingToggle) {
        // Set transition defaults
        prices.forEach(p => p.style.transition = 'opacity 0.2s');
        annualTexts.forEach(t => t.style.transition = 'opacity 0.2s');

        pricingToggle.addEventListener('change', (e) => {
            const isAnnual = e.target.checked;
            
            if (isAnnual) {
                labelAnnual.classList.add('active');
                labelMonthly.classList.remove('active');
            } else {
                labelMonthly.classList.add('active');
                labelAnnual.classList.remove('active');
            }

            prices.forEach(priceEl => {
                const monthlyPrice = priceEl.getAttribute('data-monthly');
                const annualPrice = priceEl.getAttribute('data-annual');
                
                priceEl.style.opacity = '0';
                setTimeout(() => {
                    priceEl.innerHTML = (isAnnual ? annualPrice : monthlyPrice) + (isAnnual ? ' <span>/ yıl</span>' : ' <span>/ ay</span>');
                    priceEl.style.opacity = '1';
                }, 200);
            });
            
            annualTexts.forEach(desc => {
                desc.style.opacity = '0';
                setTimeout(() => {
                    desc.style.display = isAnnual ? 'none' : 'block';
                    if (!isAnnual) desc.style.opacity = '1';
                }, 200);
            });
        });
    }

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const wasActive = item.classList.contains('active');
            
            // Close all others
            document.querySelectorAll('.faq-item').forEach(faq => {
                faq.classList.remove('active');
                faq.querySelector('.faq-answer').style.maxHeight = null;
                faq.querySelector('.ri-add-line').style.transform = 'rotate(0deg)';
            });

            if (!wasActive) {
                item.classList.add('active');
                const answer = item.querySelector('.faq-answer');
                answer.style.maxHeight = answer.scrollHeight + "px";
                item.querySelector('.ri-add-line').style.transform = 'rotate(45deg)';
            }
        });
    });

    // ----------------------------

    // Portal Particle Effect (Simple)
    const portal = document.querySelector('.portal-particles');
    if (portal) {
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            const size = Math.random() * 4 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.setProperty('--tx', `${(Math.random() - 0.5) * 200}px`);
            particle.style.setProperty('--ty', `${(Math.random() - 0.5) * 200}px`);
            particle.style.animation = `float ${Math.random() * 3 + 2}s infinite alternate ease-in-out`;
            portal.appendChild(particle);
        }
    }
    
    // Contact Form Submission
    const contactForm = document.getElementById('main-contact-form');
    const formSuccess = document.getElementById('form-success');
    
    if (contactForm && formSuccess) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // In a real app, you would send this to a backend/API
            // For now, we simulate success with a premium animation
            contactForm.style.transition = 'all 0.5s ease';
            contactForm.style.opacity = '0';
            contactForm.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                contactForm.style.display = 'none';
                formSuccess.style.display = 'block';
                formSuccess.style.opacity = '0';
                formSuccess.style.transform = 'translateY(20px)';
                
                // Trigger success entrance
                setTimeout(() => {
                    formSuccess.style.transition = 'all 0.5s ease';
                    formSuccess.style.opacity = '1';
                    formSuccess.style.transform = 'translateY(0)';
                }, 50);
            }, 500);
        });
    }
});

// CSS for Particles (Injecting via JS for simplicity or add to style.css)
const style = document.createElement('style');
style.textContent = `
    .particle {
        position: absolute;
        background: var(--primary);
        border-radius: 50%;
        opacity: 0.3;
        filter: blur(1px);
    }
    @keyframes float {
        to {
            transform: translate(var(--tx), var(--ty));
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

function showLegal(id) {
    // Hide sections that are not the target
    const legalSections = document.querySelectorAll('.legal-content');
    legalSections.forEach(section => {
        if (section.id === id) {
            section.style.display = 'block';
            setTimeout(() => {
                window.scrollTo({
                    top: section.offsetTop - 100,
                    behavior: 'smooth'
                });
            }, 100);
        } else {
            section.style.display = 'none';
        }
    });
    
    // Also scroll if already visible
    const target = document.getElementById(id);
    if (target && target.style.display === 'block') {
         window.scrollTo({
            top: target.offsetTop - 100,
            behavior: 'smooth'
        });
    }
}

// --- INTERACTIVE VISUAL EFFECTS ---

// 1. Mouse Follower Glow (Lerp)
const mouseGlow = document.querySelector('.mouse-glow');
if (mouseGlow) {
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;
    const lerpSpeed = 0.08;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (mouseGlow.style.opacity === '0' || mouseGlow.style.opacity === '') {
            mouseGlow.style.opacity = '1';
        }
    });

    window.addEventListener('mouseleave', () => {
        mouseGlow.style.opacity = '0';
    });

    function updateGlowPosition() {
        glowX += (mouseX - glowX) * lerpSpeed;
        glowY += (mouseY - glowY) * lerpSpeed;
        
        mouseGlow.style.left = `${glowX}px`;
        mouseGlow.style.top = `${glowY}px`;
        
        requestAnimationFrame(updateGlowPosition);
    }
    requestAnimationFrame(updateGlowPosition);
}

// 2. 3D Bento Tilt Effect
const bentoItems = document.querySelectorAll('.bento-item');
bentoItems.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // x coordinate inside the card
        const y = e.clientY - rect.top;  // y coordinate inside the card
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Max angle of rotation = 8deg
        const rotateX = ((centerY - y) / centerY) * 8;
        const rotateY = ((x - centerX) / centerX) * 8;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
});

