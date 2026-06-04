const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });
}

// Inventory Carousel Logic
const inventoryCarousel = () => {
    const wrapper = document.querySelector('.inventory-wrapper');
    const prevBtn = document.getElementById('prevSkill');
    const nextBtn = document.getElementById('nextSkill');

    // Debugging check
    if (!wrapper) console.error("Carousel Wrapper not found");
    if (!prevBtn) console.error("Prev Button not found");
    if (!nextBtn) console.error("Next Button not found");

    if (!wrapper || !prevBtn || !nextBtn) return;

    // Get width of one slide
    const getSlideWidth = () => {
        const slide = wrapper.querySelector('.inventory-category');
        return slide ? slide.clientWidth : wrapper.offsetWidth;
    }

    nextBtn.addEventListener('click', () => {
        console.log("Next clicked");
        wrapper.scrollBy({
            left: getSlideWidth(),
            behavior: 'smooth'
        });
    });

    prevBtn.addEventListener('click', () => {
        console.log("Prev clicked");
        wrapper.scrollBy({
            left: -getSlideWidth(),
            behavior: 'smooth'
        });
    });
}

// Stage Carousel Logic
const stageCarousel = () => {
    const wrapper = document.querySelector('.stage-scroll-wrapper');
    const prevBtn = document.getElementById('prevProject');
    const nextBtn = document.getElementById('nextProject');

    if (!wrapper || !prevBtn || !nextBtn) return;

    // Scroll amount: full width of the wrapper since it works as a slider now
    const getScrollAmount = () => {
        return wrapper.clientWidth; // Exactly wrapper width for full slide
    };

    nextBtn.addEventListener('click', () => {
        wrapper.scrollBy({
            left: getScrollAmount(),
            behavior: 'smooth'
        });
    });

    prevBtn.addEventListener('click', () => {
        wrapper.scrollBy({
            left: -getScrollAmount(),
            behavior: 'smooth'
        });
    });
}

const app = () => {
    navSlide();
    inventoryCarousel();
    stageCarousel();
    
    // Start Screen Logic
    const startBtn = document.getElementById('start-btn');
    const startScreen = document.getElementById('start-screen');
    
    if (startBtn && startScreen) {
        // Prevent scrolling while on start screen
        document.body.style.overflow = 'hidden';
        
        startBtn.addEventListener('click', () => {
            // Hide the initial content
            const content = document.querySelector('.start-content');
            if (content) content.style.display = 'none';

            // Show loading animation
            const loadingContainer = document.querySelector('.loading-container');
            if (loadingContainer) {
                loadingContainer.style.display = 'flex';
                loadingContainer.classList.add('loading-active');
            }

            // Wait for loading to finish then enter site
            setTimeout(() => {
                startScreen.classList.add('hidden');
                // Enable scrolling again
                document.body.style.overflow = 'auto';
                
                // Trigger animations for the first section immediately
                revealOnScroll();
            }, 2500); // Slightly longer than animation for effect
        });
    }

    // Scroll Reveal Logic
    const revealOnScroll = () => {
        const reveals = document.querySelectorAll('.reveal-on-scroll');
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);
    // Call once on load in case start screen is already bypassed or short page
    revealOnScroll();

    console.log('Portfolio ready!');
}

app();
