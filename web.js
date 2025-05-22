// Debounce function to limit the rate at which a function can fire
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Slider functionality
const sliderFrame = document.querySelector('.slider-frame');
const slideImages = document.querySelector('.slide-images');
const prevButton = document.querySelector('.nav-button.prev');
const nextButton = document.querySelector('.nav-button.next');

let currentIndex = 0;
const slides = document.querySelectorAll('.slide-images section');
const totalSlides = slides.length;

function updateSliderPosition() {
    const slideWidth = sliderFrame.clientWidth;
    slideImages.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateSliderPosition();
    }
});

nextButton.addEventListener('click', () => {
    if (currentIndex < totalSlides - 1) {
        currentIndex++;
        updateSliderPosition();
    }
});

// Use debounce to optimize resize event
window.addEventListener('resize', debounce(updateSliderPosition, 200));

// PDF linking functionality
function setupPdfLinks() {
    const buttons = document.querySelectorAll('.slide-images .btn');

    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const pdfLink = button.getAttribute('href');
            // Check if pdfLink is valid
            if (pdfLink) {
                window.open(pdfLink, '_blank');
            } else {
                console.error('PDF link is missing.');
            }
        });
    });
}

// Smooth scrolling functionality
function setupSmoothScrolling() {
    const links = document.querySelectorAll('.navbar a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            } else {
                console.error('Target section not found.');
            }
        });
    });
}

// Read More functionality for About Us section
function toggleReadMore() {
    const moreText = document.getElementById('more');
    const dots = document.getElementById('dots');
    const button = document.querySelector('.read-more-btn');

    if (moreText.style.maxHeight === '0px' || moreText.style.maxHeight === '') {
        moreText.style.maxHeight = moreText.scrollHeight + 'px';
        dots.style.display = 'none';
        button.textContent = 'Read Less';
    } else {
        moreText.style.maxHeight = '0px';
        dots.style.display = 'inline';
        button.textContent = 'Read More';
    }
}

// Document ready function
document.addEventListener('DOMContentLoaded', function() {
    const infoBoxes = document.querySelectorAll('.info-box');
    const form = document.getElementById('contact-form');

    // Info box click event
    infoBoxes.forEach(box => {
        box.addEventListener('click', function() {
            infoBoxes.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const type = this.getAttribute('data-type');
            const subjectInput = form.querySelector('input[placeholder="Subject"]');
            subjectInput.value = `Inquiry regarding ${type}`;
        });
    });

    // Form submission event
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        // Basic validation
        const emailInput = form.querySelector('input[type="email"]');
        if (!emailInput.value) {
            alert('Please enter a valid email address.');
            return;
        }

        console.log('Form submitted!');
        alert('Thank you for your message. We will get back to you soon!');
        form.reset();
    });

    setupPdfLinks(); // Initialize PDF links
    setupSmoothScrolling(); // Initialize smooth scrolling
});
