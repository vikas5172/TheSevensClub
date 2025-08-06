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
        // Change from '.metrics' to '.results'
        const metricsSection = document.querySelector('.results'); 
        
        if (!metricsSection) return; // Ensure the section exists

        const metricsSectionTop = metricsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (metricsSectionTop < windowHeight * 0.75 && !animated) {
            metricValues.forEach(value => {
                if (value.classList.contains('animated')) return; // Skip if already animated

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
                        value.innerText = `${currentValue}${targetValue.includes('%') ? '%' : ''}`; // Handle percentage sign
                        requestAnimationFrame(updateValue);
                    } else {
                        value.innerText = targetValue;
                        value.classList.add('animated'); // Mark as animated
                    }
                }
                
                updateValue();
            });
            
            animated = true; // Set animated flag to true after initial animation
        }
    }
    
    window.addEventListener('scroll', animateMetrics);
    // Trigger on load in case the section is already in view
    animateMetrics();

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

    // Typing effect for hero subtitle
    const typingText = "Boost Your Social Media Presence";
    const typingEl = document.getElementById('hero-typing');
    let typingIdx = 0;
    function typeHeroSubtitle() {
        if (typingEl && typingIdx <= typingText.length) {
            typingEl.textContent = typingText.slice(0, typingIdx);
            typingIdx++;
            setTimeout(typeHeroSubtitle, 55);
        }
    }
    typeHeroSubtitle();

    // Contact form success message
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    if (contactForm && formSuccess) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            contactForm.style.display = 'none';
            formSuccess.style.display = 'block';
        });
    }

    // Speedometer Generation
    const speedometerCharts = document.querySelectorAll('.speedometer-chart');

    function drawSpeedometer(chartElement, percentage) {
        chartElement.innerHTML = ''; // Clear existing content

        const SVG_SIZE = 120;
        const STROKE_WIDTH = 12;
        const RADIUS = (SVG_SIZE / 2) - (STROKE_WIDTH / 2);
        const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
        const ARC_LENGTH = CIRCUMFERENCE * 0.75; // 270 degrees for the arc
        const START_OFFSET = CIRCUMFERENCE * 0.125; // To start at 225 degrees

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', `0 0 ${SVG_SIZE} ${SVG_SIZE}`);
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');

        // Background arc
        const backgroundArc = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        backgroundArc.setAttribute('cx', SVG_SIZE / 2);
        backgroundArc.setAttribute('cy', SVG_SIZE / 2);
        backgroundArc.setAttribute('r', RADIUS);
        backgroundArc.setAttribute('fill', 'none');
        backgroundArc.setAttribute('stroke', 'rgba(255, 255, 255, 0.1)');
        backgroundArc.setAttribute('stroke-width', STROKE_WIDTH);
        backgroundArc.setAttribute('stroke-dasharray', `${ARC_LENGTH} ${CIRCUMFERENCE - ARC_LENGTH}`);
        backgroundArc.setAttribute('stroke-dashoffset', START_OFFSET);
        backgroundArc.setAttribute('stroke-linecap', 'round');
        svg.appendChild(backgroundArc);

        // Foreground arc (animated)
        const foregroundArc = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        foregroundArc.setAttribute('cx', SVG_SIZE / 2);
        foregroundArc.setAttribute('cy', SVG_SIZE / 2);
        foregroundArc.setAttribute('r', RADIUS);
        foregroundArc.setAttribute('fill', 'none');
        foregroundArc.setAttribute('stroke', 'url(#gradient)'); // Use a CSS gradient for color
        foregroundArc.setAttribute('stroke-width', STROKE_WIDTH);
        foregroundArc.setAttribute('stroke-dasharray', `${ARC_LENGTH} ${CIRCUMFERENCE - ARC_LENGTH}`);
        foregroundArc.setAttribute('stroke-dashoffset', START_OFFSET + ARC_LENGTH);
        foregroundArc.setAttribute('stroke-linecap', 'round');
        foregroundArc.classList.add('speedometer-fill'); // Class for animation
        svg.appendChild(foregroundArc);

        // Append SVG to container
        chartElement.appendChild(svg);

        // Animate fill
        const animationDuration = 1000; // milliseconds
        const targetOffset = START_OFFSET + ARC_LENGTH - (ARC_LENGTH * (percentage / 100));

        let startTimestamp;
        function animateFill(timestamp) {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / animationDuration, 1);
            const animatedOffset = (START_OFFSET + ARC_LENGTH) - (ARC_LENGTH * (progress * percentage / 100));
            foregroundArc.setAttribute('stroke-dashoffset', animatedOffset);

            if (progress < 1) {
                requestAnimationFrame(animateFill);
            } else {
                foregroundArc.setAttribute('stroke-dashoffset', targetOffset);
                chartElement.classList.add('animated'); // Mark as animated
            }
        }
        requestAnimationFrame(animateFill);
    }

    // Integrate speedometer animation with scroll
    const animatedSpeedometers = new Set(); // To track animated speedometers

    function checkSpeedometerAnimation() {
        speedometerCharts.forEach(chart => {
            if (animatedSpeedometers.has(chart)) return; // Skip if already animated

            const chartRect = chart.getBoundingClientRect();
            const isVisible = (chartRect.top < window.innerHeight * 0.75) && (chartRect.bottom > 0);

            if (isVisible) {
                const percentage = parseInt(chart.dataset.percentage, 10);
                drawSpeedometer(chart, percentage);
                animatedSpeedometers.add(chart);
            }
        });
    }

    window.addEventListener('scroll', checkSpeedometerAnimation);
    checkSpeedometerAnimation(); // Initial check on load
});
