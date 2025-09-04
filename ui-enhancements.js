/**
 * UI Enhancement script for TheSevensClub website
 * Improves UI structure and interaction
 */
document.addEventListener('DOMContentLoaded', function() {
    // Fix service card heights for consistent rows
    const equalizeCardHeights = () => {
        const rows = {};
        const cards = document.querySelectorAll('.service-card');
        
        // Reset heights
        cards.forEach(card => card.style.height = 'auto');
        
        // Get cards positions and group by rows
        cards.forEach(card => {
            const top = card.getBoundingClientRect().top;
            if (!rows[top]) rows[top] = [];
            rows[top].push(card);
        });
        
        // Set equal heights for each row
        Object.keys(rows).forEach(top => {
            const rowCards = rows[top];
            const maxHeight = Math.max(...rowCards.map(card => card.offsetHeight));
            rowCards.forEach(card => card.style.height = `${maxHeight}px`);
        });
    };
    
    // Improve scroll behavior for smoother navigation
    const enhanceScrolling = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get target section
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const headerOffset = 0;
                    const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };
    
    // Add scroll indicators and active state to navigation
    const updateActiveNavigation = () => {
        const sections = document.querySelectorAll('section[id]');
        const navItems = document.querySelectorAll('nav ul li a');
        
        window.addEventListener('scroll', () => {
            let current = '';
            const scrollPosition = window.pageYOffset;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 150;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${current}`) {
                    item.classList.add('active');
                }
            });
        });
    };
    
    // Initialize enhancements
    const initEnhancements = () => {
        equalizeCardHeights();
        enhanceScrolling();
        updateActiveNavigation();
        
        // Re-run on window resize
        window.addEventListener('resize', equalizeCardHeights);
    };
    
    // Apply all enhancements
    initEnhancements();

    
});
