document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add simple animation to phone mockup on hover
    const phoneMockup = document.querySelector('.phone-frame');
    if (phoneMockup) {
        phoneMockup.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = phoneMockup.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;

            phoneMockup.style.transform = `
                perspective(1000px)
                rotateY(${x * 10}deg)
                rotateX(${-y * 10}deg)
                scale(1.02)
            `;
        });

        phoneMockup.addEventListener('mouseleave', () => {
            phoneMockup.style.transform = 'perspective(1000px) rotateY(-15deg) rotateX(5deg)';
        });
    }

    // Reveal animations on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });
});
