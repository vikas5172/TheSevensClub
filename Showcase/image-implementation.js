/**
 * Image loading optimization and effects for TheSevensClub Engagement & Outreach Services website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Progressive image loading
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                    }
                    
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // Image hover effects for service cards
    const serviceImages = document.querySelectorAll('.service-image img');
    
    serviceImages.forEach(img => {
        img.addEventListener('mouseenter', () => {
            img.style.transform = 'scale(1.05)';
            img.style.filter = 'brightness(1.1)';
            img.parentElement.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
        });
        
        img.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1)';
            img.style.filter = 'brightness(1)';
            img.parentElement.style.boxShadow = 'none';
        });
    });
    
    // Add glass effect to images on scroll
    const addGlassEffect = () => {
        const images = document.querySelectorAll('.case-study-image, .service-image');
        const scrollPosition = window.scrollY;
        
        images.forEach(img => {
            const position = img.getBoundingClientRect().top;
            
            if (position < window.innerHeight * 0.75 && position > 0) {
                img.classList.add('glass-effect-active');
            }
        });
    };
    
    window.addEventListener('scroll', addGlassEffect);
    
    // Initialize
    addGlassEffect();
});
