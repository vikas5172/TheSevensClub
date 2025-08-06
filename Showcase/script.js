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

        // Determine gradient colors based on percentage
        let startColor, endColor;
        if (percentage >= 80) {
            startColor = '#4CAF50'; // Green for high performance
            endColor = '#8BC34A';
        } else if (percentage >= 50) {
            startColor = '#FFC107'; // Yellow for medium performance
            endColor = '#FFEB3B';
        } else {
            startColor = '#F44336'; // Red for low performance
            endColor = '#FF9800';
        }

        // Define gradient
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        const linearGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        linearGradient.setAttribute('id', 'gradient'); // ID must match stroke URL
        linearGradient.setAttribute('x1', '0%');
        linearGradient.setAttribute('y1', '0%');
        linearGradient.setAttribute('x2', '100%');
        linearGradient.setAttribute('y2', '0%');

        const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop1.setAttribute('offset', '0%');
        stop1.setAttribute('stop-color', startColor);
        linearGradient.appendChild(stop1);

        const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop2.setAttribute('offset', '100%');
        stop2.setAttribute('stop-color', endColor);
        linearGradient.appendChild(stop2);

        defs.appendChild(linearGradient);
        svg.appendChild(defs);

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

        // Percentage text
        const percentageText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        percentageText.setAttribute('x', SVG_SIZE / 2);
        percentageText.setAttribute('y', SVG_SIZE / 2);
        percentageText.setAttribute('text-anchor', 'middle');
        percentageText.setAttribute('dominant-baseline', 'middle');
        percentageText.classList.add('speedometer-text');
        percentageText.textContent = `${percentage}%`;
        svg.appendChild(percentageText);

        // Benchmark line
        const benchmark = parseInt(chartElement.dataset.benchmark, 10);
        if (!isNaN(benchmark)) {
            const benchmarkOffset = START_OFFSET + ARC_LENGTH - (ARC_LENGTH * (benchmark / 100));

            // Calculate start and end points for the benchmark line
            // We need to convert polar coordinates (offset) to Cartesian (x,y)
            const angleRad = (benchmarkOffset / CIRCUMFERENCE) * 2 * Math.PI + (Math.PI / 2); // Convert dashoffset to angle, adjust for 225 deg start
            const lineLength = STROKE_WIDTH * 0.8; // Length of the benchmark line

            const startX = SVG_SIZE / 2 + (RADIUS - STROKE_WIDTH / 2) * Math.cos(angleRad);
            const startY = SVG_SIZE / 2 + (RADIUS - STROKE_WIDTH / 2) * Math.sin(angleRad);
            const endX = SVG_SIZE / 2 + (RADIUS + STROKE_WIDTH / 2) * Math.cos(angleRad);
            const endY = SVG_SIZE / 2 + (RADIUS + STROKE_WIDTH / 2) * Math.sin(angleRad);

            const benchmarkLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            benchmarkLine.setAttribute('x1', startX);
            benchmarkLine.setAttribute('y1', startY);
            benchmarkLine.setAttribute('x2', endX);
            benchmarkLine.setAttribute('y2', endY);
            benchmarkLine.setAttribute('stroke', 'rgba(255, 255, 255, 0.7)'); /* White color for benchmark */
            benchmarkLine.setAttribute('stroke-width', STROKE_WIDTH / 4);
            benchmarkLine.setAttribute('stroke-linecap', 'round');
            svg.appendChild(benchmarkLine);
        }

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

                // Add glow effect for high percentages
                if (percentage >= 80) {
                    chart.classList.add('glow');
                } else {
                    chart.classList.remove('glow'); // Ensure glow is removed if not high
                }
            }
        });
    }

    window.addEventListener('scroll', checkSpeedometerAnimation);
    checkSpeedometerAnimation(); // Initial check on load

    // Case Study Modal Logic
    const caseStudyLinks = document.querySelectorAll('.case-study .read-more');
    const modal = document.createElement('div');
    modal.id = 'case-study-modal';
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-content glass-panel">
            <span class="close-button">&times;</span>
            <img id="modal-image" src="" alt="Case Study Image">
            <h2 id="modal-title"></h2>
            <p id="modal-details"></p>
        </div>
    `;
    document.body.appendChild(modal);

    const modalContent = modal.querySelector('.modal-content');
    const closeButton = modal.querySelector('.close-button');
    const modalImage = modal.querySelector('#modal-image');
    const modalTitle = modal.querySelector('#modal-title');
    const modalDetails = modal.querySelector('#modal-details');

    caseStudyLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const caseStudy = this.closest('.case-study');
            const title = caseStudy.dataset.title;
            const image = caseStudy.dataset.image;
            const details = caseStudy.dataset.details;

            modalTitle.textContent = title;
            modalImage.src = image;
            modalDetails.textContent = details;

            modal.style.display = 'flex';
        });
    });

    function closeModal() {
        modal.style.display = 'none';
    }

    closeButton.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
});
