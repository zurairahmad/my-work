// Mobile Menu Toggle
document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.querySelector('nav').classList.toggle('active');
});

// Smooth Scrolling for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Close mobile menu if open
        document.querySelector('nav').classList.remove('active');
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});

// Tab Functionality for Showcase Section
const tabButtons = document.querySelectorAll('.tab-btn');
const showcaseContents = document.querySelectorAll('.showcase-content');
        
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        showcaseContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Show corresponding content
        const tabId = button.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// Activate tab based on URL hash or button click from services
function activateTabFromHash() {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#showcase')) {
        // Check if there's a specific tab requested
        const params = new URLSearchParams(hash.split('?')[1]);
        const tab = params.get('tab');
        
        if (tab) {
            const tabButton = document.querySelector(`.tab-btn[data-tab="${tab}"]`);
            if (tabButton) {
                tabButton.click();
            }
        }
    }
}

// Handle service card buttons that link to showcase
document.querySelectorAll('[data-tab]').forEach(button => {
    if (button.getAttribute('href') === '#showcase') {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const tab = button.getAttribute('data-tab');
            const tabButton = document.querySelector(`.tab-btn[data-tab="${tab}"]`);
            if (tabButton) {
                tabButton.click();
                window.scrollTo({
                    top: document.getElementById('showcase').offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    }
});

// Form Submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // Here you would typically send the form data to a server
    alert('Thank you for your message! We will get back to you soon.');
    this.reset();
});

document.getElementById('newsletterForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for subscribing to our newsletter!');
    this.reset();
});

// Initialize tab based on URL when page loads
window.addEventListener('load', activateTabFromHash);
window.addEventListener('hashchange', activateTabFromHash);

// Sticky Header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});
///////////////////////////////////////////////
  let slideIndex = 1;
        let slideInterval;
        
        // Initialize the slideshow
        showSlides(slideIndex);
        
        // Auto-advance slides every 5 seconds
        startSlideShow();
        
        function startSlideShow() {
            slideInterval = setInterval(() => {
                plusSlides(1);
            }, 5000);
        }
        
        // Next/previous controls
        function plusSlides(n) {
            showSlides(slideIndex += n);
            // Reset the timer when manually changing slides
            resetInterval();
        }
        
        // Thumbnail image controls
        function currentSlide(n) {
            showSlides(slideIndex = n);
            // Reset the timer when manually changing slides
            resetInterval();
        }
        
        function showSlides(n) {
            let i;
            let slides = document.getElementsByClassName("slide");
            let dots = document.getElementsByClassName("dot");
            
            if (n > slides.length) {slideIndex = 1}
            if (n < 1) {slideIndex = slides.length}
            
            // Hide all slides
            for (i = 0; i < slides.length; i++) {
                slides[i].classList.remove("active");
            }
            
            // Remove active class from all dots
            for (i = 0; i < dots.length; i++) {
                dots[i].classList.remove("active");
            }
            
            // Show the current slide and activate its dot
            slides[slideIndex-1].classList.add("active");
            dots[slideIndex-1].classList.add("active");
        }
        
        function resetInterval() {
            clearInterval(slideInterval);
            startSlideShow();
        }
        //////////////////////////////////////////////////
         let current = 0;
    const images = document.querySelectorAll('.slideshow img');
    
    function cycleImages() {
        images[current].classList.remove('active');
        current = (current + 1) % images.length;
        images[current].classList.add('active');
    }
    
    setInterval(cycleImages, 3000);
    ////////////////////////////////////////////////////////////////////////
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwgsX6vxlvSMkTnHATe4NOaDEKUy6puDF5gBNdHfjB6JxViwb2oXmUjAfM_uzQ6z2nF1g/exec'; // Replace with your web app URL
        const form = document.forms['contactForm'];
        const responseDiv = document.getElementById('form-response');

        form.addEventListener('submit', e => {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            fetch(scriptURL, { 
                method: 'POST', 
                body: new FormData(form)
            })
            .then(response => response.json())
            .then(data => {
                responseDiv.style.display = 'block';
                if(data.result === 'success') {
                    responseDiv.className = 'success';
                    responseDiv.textContent = 'Message sent successfully!';
                    form.reset();
                } else {
                    responseDiv.className = 'error';
                    responseDiv.textContent = 'Error: ' + (data.error || 'Unknown error occurred');
                }
            })
            .catch(error => {
                responseDiv.style.display = 'block';
                responseDiv.className = 'error';
                responseDiv.textContent = 'Error: ' + error.message;
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
            });
        });