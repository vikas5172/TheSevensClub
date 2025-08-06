/**
 * Image loading error handling and fallback
 */
document.addEventListener('DOMContentLoaded', function() {
    // Handle image loading errors
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Set data attribute for placeholder text
        const alt = img.getAttribute('alt') || '';
        const parent = img.closest('.service-image, .case-study-image, .member-image');
        if (parent) {
            parent.setAttribute('data-service', alt);
        }
        
        // Handle error
        img.addEventListener('error', function() {
            console.log('Image failed to load:', img.src);
            
            // Add error class to parent
            if (parent) {
                parent.classList.add('image-error');
            }
            
            // Use default image or remove src
            img.src = ''; 
        });
    });
    
    // Check if images directory exists and files are properly named
    function testImagePath(path) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = path;
        });
    }
    
    // Test a sample image path
    testImagePath('images/twitter-engagement.jpg').then(exists => {
        if (!exists) {
            console.warn('Images may not be in the correct location. Please ensure your images folder is at:', window.location.href + 'images/');
        }
    });
});
