// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
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

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.padding = '10px 0';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.padding = '15px 0';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Image Lightbox Modal Controller
const imageModal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImg');
const modalCaption = document.getElementById('modalCaption');
const modalClose = document.getElementById('modalClose');
const modalBackdrop = document.querySelector('.modal-backdrop');

function openImageModal(imgSrc, titleText, altText) {
    if (!imageModal || !modalImg) return;

    modalImg.src = imgSrc;
    modalImg.alt = altText || titleText || 'Project screenshot preview';

    if (modalCaption) {
        modalCaption.textContent = titleText || altText || '';
        modalCaption.style.display = (titleText || altText) ? 'block' : 'none';
    }

    imageModal.removeAttribute('hidden');
    // Force DOM reflow to trigger smooth CSS transition
    void imageModal.offsetWidth;
    imageModal.classList.add('active');
    document.body.style.overflow = 'hidden';

    if (modalClose) {
        modalClose.focus();
    }
}

function closeImageModal() {
    if (!imageModal) return;

    imageModal.classList.remove('active');
    document.body.style.overflow = '';

    setTimeout(() => {
        if (!imageModal.classList.contains('active')) {
            imageModal.setAttribute('hidden', '');
            if (modalImg) modalImg.src = '';
        }
    }, 300);
}

// Attach click listeners to all project card images
document.querySelectorAll('.project-card .project-img').forEach(cardImg => {
    cardImg.setAttribute('title', 'Click to view full image');

    cardImg.addEventListener('click', (e) => {
        e.preventDefault();
        const img = cardImg.querySelector('img');
        if (!img) return;

        const card = cardImg.closest('.project-card');
        const titleEl = card ? card.querySelector('.project-content h3') : null;
        const title = titleEl ? titleEl.textContent.trim() : (img.alt || '');

        openImageModal(img.src, title, img.alt);
    });
});

// Close when clicking close button
if (modalClose) {
    modalClose.addEventListener('click', closeImageModal);
}

// Close when clicking on backdrop
if (modalBackdrop) {
    modalBackdrop.addEventListener('click', closeImageModal);
}

// Close when pressing Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && imageModal && imageModal.classList.contains('active')) {
        closeImageModal();
    }
});

