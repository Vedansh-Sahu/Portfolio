document.addEventListener('DOMContentLoaded', () => {

    // Smooth Scrolling for Navigation Links
    // This function makes clicking on nav links scroll smoothly to the target section.
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Prevents the default jump to the anchor
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - document.querySelector('header').offsetHeight, // Adjusts for the fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animate sections into view on scroll
    // This creates a subtle fade-in effect as the user scrolls down the page.
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2 // Trigger the animation when 20% of the section is visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once the animation is triggered
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.classList.add('hidden'); // Add a hidden class for the initial state
        sectionObserver.observe(section);
    });

    // Simple Form Validation
    const contactForm = document.querySelector('#contact form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevents the form from submitting immediately

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        let isValid = true;
        let errorMessage = '';

        if (nameInput.value.trim() === '') {
            isValid = false;
            errorMessage += 'Please enter your name.\n';
        }

        if (emailInput.value.trim() === '' || !emailInput.value.includes('@')) {
            isValid = false;
            errorMessage += 'Please enter a valid email address.\n';
        }

        if (messageInput.value.trim() === '') {
            isValid = false;
            errorMessage += 'Please enter a message.\n';
        }

        if (isValid) {
            alert('Thank you for your message! I will get back to you shortly.');
            contactForm.reset(); // Clears the form after successful submission
        } else {
            alert('Form submission failed:\n' + errorMessage);
        }
    });
});