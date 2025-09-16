document.addEventListener('DOMContentLoaded', function () {
    // Mobile Navigation
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileNavClose = document.getElementById('mobile-nav-close');

    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', () => mobileNav.classList.add('open'));
        hamburgerMenu.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') mobileNav.classList.add('open');
        });
    }

    if (mobileNavClose) {
        mobileNavClose.addEventListener('click', () => mobileNav.classList.remove('open'));
    }

    // Function to close mobile nav when a link is clicked (used in onclick attributes)
    window.closeMobileNav = function() {
        mobileNav.classList.remove('open');
    }

    // Hero Section Typing Effect
    const typingElement = document.getElementById('hero-typing');
    if (typingElement) {
        const words = ["For Your Web3 Project", "To Boost Your Community", "To Drive Real Engagement"];
        let i = 0, j = 0, isDeleting = false;

        function type() {
            const currentWord = words[i];
            if (isDeleting) {
                typingElement.textContent = currentWord.substring(0, j - 1);
                j--;
                if (j === 0) {
                    isDeleting = false;
                    i = (i + 1) % words.length;
                }
            } else {
                typingElement.textContent = currentWord.substring(0, j + 1);
                j++;
                if (j === currentWord.length) {
                    isDeleting = true;
                    setTimeout(type, 1000); // Reduced pause at end of word
                    return;
                }
            }
            setTimeout(type, isDeleting ? 75 : 150);
        }
        type();
    }

    // Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    const formSuccessMessage = document.getElementById('form-success');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(contactForm);

            // Many form backend services use a special `_subject` field to set the
            // email's subject line. This code checks if a "subject" field exists
            // in your form and uses its value to create the `_subject` field that
            // the backend service will recognize.
            if (formData.has('subject')) {
                formData.append('_subject', formData.get('subject'));
            }

            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            }).then(response => {
                if (response.ok) {
                    contactForm.reset();
                    contactForm.style.display = 'none';
                    formSuccessMessage.style.display = 'block';
                } else {
                    response.json().then(data => {
                        const message = data.errors ? data.errors.map(e => e.message).join("\n") : "Oops! There was a problem submitting your form.";
                        alert(message);
                    }).catch(() => alert('Oops! There was a problem submitting your form.'));
                }
            }).catch(error => {
                console.error('Error submitting form:', error);
                alert('Oops! There was a problem with your submission.');
            });
        });
    }

    // Intersection Observer for animations on scroll
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add a staggered delay for each item
                entry.target.style.transitionDelay = `${index * 100}ms`;
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null, // observes intersections relative to the viewport
        threshold: 0.1 // trigger when 10% of the element is visible
    });

    // A helper function to observe multiple elements
    const observeElements = (selector) => {
        const elements = document.querySelectorAll(selector);
        if (elements.length > 0) {
            elements.forEach(el => {
                observer.observe(el);
            });
        }
    };

    // Observe all elements you want to animate
    observeElements('.team-member');
    observeElements('.service-card');
    observeElements('.metric-card');
    observeElements('.case-study');
    observeElements('.demo-service');
});