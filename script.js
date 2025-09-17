/*==================== toggle icon navbar ====================*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}; 


/*==================== scroll sections active link ====================*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active')
            });
        };
    });


    /*==================== sticky navbar ====================*/

     let header = document.querySelector('header');

     header.classList.toggle('sticky', window.scrollY > 100);



    /*==================== remove toggle icon and navbar when click navbar link (scroll) ====================*/
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');


};


/*==================== scroll reveal ====================*/

ScrollReveal({
   // reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading',{origin: 'top'});
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', 
    {origin: 'bottom'});
ScrollReveal().reveal('.home-content h1, .about-img', {origin: 'left'});
ScrollReveal().reveal('.home-content p, .about-content', {origin: 'right'});

/*==================== typed js ====================*/

// Update the typed animation with your actual skills
const typed = new Typed('.multiple-text',{
    strings: ['.NET Developer', 'Full Stack Developer', 'Python Developer', 'Web Developer'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

// Add the new sections to the ScrollReveal configuration
ScrollReveal().reveal('.experience-container, .education-container', 
    {origin: 'bottom'});


// Skills Carousel Functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.skills-card');
const indicators = document.querySelectorAll('.indicator');
const carousel = document.querySelector('.carousel-container');

function showSlide(n) {
  currentSlide = n;
  updateCarousel();
}

function moveSlide(n) {
  currentSlide += n;
  
  if (currentSlide < 0) {
    currentSlide = slides.length - 1;
  } else if (currentSlide >= slides.length) {
    currentSlide = 0;
  }
  
  updateCarousel();
}

function updateCarousel() {
  carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
  
  // Update indicators
  indicators.forEach((indicator, index) => {
    if (index === currentSlide) {
      indicator.classList.add('active');
    } else {
      indicator.classList.remove('active');
    }
  });
}

// Auto slide every 5 seconds
let carouselInterval = setInterval(() => {
  moveSlide(1);
}, 5000);

// Pause auto-slide on hover
const carouselContainer = document.querySelector('.skills-carousel');
carouselContainer.addEventListener('mouseenter', () => {
  clearInterval(carouselInterval);
});

carouselContainer.addEventListener('mouseleave', () => {
  carouselInterval = setInterval(() => {
    moveSlide(1);
  }, 5000);
});

// Add touch support for mobile devices
let touchStartX = 0;
let touchEndX = 0;

carousel.addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].screenX;
  clearInterval(carouselInterval); // Pause auto-slide during interaction
});

carousel.addEventListener('touchend', e => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
  
  // Resume auto-slide
  carouselInterval = setInterval(() => {
    moveSlide(1);
  }, 5000);
});

function handleSwipe() {
  const swipeThreshold = 50;
  
  if (touchEndX < touchStartX - swipeThreshold) {
    moveSlide(1); // Swipe left - next slide
  }
  
  if (touchEndX > touchStartX + swipeThreshold) {
    moveSlide(-1); // Swipe right - previous slide
  }
}

// Initialize carousel
updateCarousel();


// Enhanced tooltip functionality for project links
document.addEventListener('DOMContentLoaded', function() {
  const projectLinks = document.querySelectorAll('.project-links a');
  
  projectLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      // Hide all other tooltips first
      projectLinks.forEach(otherLink => {
        if (otherLink !== this) {
          otherLink.style.zIndex = '1';
        }
      });
      
      // Show this tooltip on top
      this.style.zIndex = '100';
    });
    
    link.addEventListener('mouseleave', function() {
      this.style.zIndex = '1';
    });
  });
});