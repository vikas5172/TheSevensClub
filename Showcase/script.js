document.addEventListener('DOMContentLoaded', function() {
    // Floating elements animation
    const floatElements = document.querySelectorAll('.float-element');
    
    floatElements.forEach(element => {
        const speed = element.getAttribute('data-speed');
        
        window.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth - e.pageX * speed) / 100;
            const y = (window.innerHeight - e.pageY * speed) / 100;
            
            element.style.transform = `translateX(${x}px) translateY(${y}px)`;
        });
    });

    // Parallax scrolling for case studies
    const caseStudies = document.querySelectorAll('.case-study');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        
        caseStudies.forEach(study => {
            const speed = study.getAttribute('data-parallax');
            const yPos = scrollTop * speed;
            
            study.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Navigation scroll effects
    const header = document.querySelector('.glass-nav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.15)';
            header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.1)';
            header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.05)';
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add hover effects to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.03)';
            card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.07)';
        });
    });

    // Animate metric values on scroll
    const metricValues = document.querySelectorAll('.metric-value');
    let animated = false;
    
    function animateMetrics() {
        if (animated) return;
        
        const metricsSection = document.querySelector('.metrics');
        const metricsSectionTop = metricsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (metricsSectionTop < windowHeight * 0.75) {
            metricValues.forEach(value => {
                const targetValue = value.innerText;
                const startValue = 0;
                const duration = 2000;
                const startTime = Date.now();
                
                function updateValue() {
                    const currentTime = Date.now();
                    const elapsed = currentTime - startTime;
                    
                    if (elapsed < duration) {
                        const progress = elapsed / duration;
                        const currentValue = Math.round(startValue + (parseInt(targetValue.replace(/[^0-9-]/g, '')) - startValue) * progress);
                        value.innerText = `+${currentValue}%`;
                        requestAnimationFrame(updateValue);
                    } else {
                        value.innerText = targetValue;
                    }
                }
                
                updateValue();
            });
            
            animated = true;
        }
    }
    
    window.addEventListener('scroll', animateMetrics);

    // Form submission feedback
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Normally would send form data to server here
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            
            submitBtn.innerText = 'Sending...';
            
            // Simulate server response
            setTimeout(() => {
                form.innerHTML = '<div class="success-message">Thank you! We\'ll be in touch soon.</div>';
            }, 1500);
        });
    });
});
