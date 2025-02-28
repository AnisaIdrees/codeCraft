//  cursor
const cursorPointD = document.querySelector(".cursor");
const cursorTrailD = document.querySelector(".cursor-trail");




// Smooth follow effect using GSAP
document.addEventListener("mousemove", (e) => {
  gsap.to(cursorPointD, { x: e.clientX, y: e.clientY, duration: 0.1, ease: "power2.out" });
  gsap.to(cursorTrailD, { x: e.clientX, y: e.clientY, duration: 0.3, ease: "power3.out" });
});



// Click Animation
document.addEventListener("click", () => {
  gsap.to(cursorPointD, { scale: 1.5, duration: 0.1, ease: "power2.out", yoyo: true, repeat: 1 });
  gsap.to(cursorTrailD, { scale: 2, duration: 0.3, opacity: 0, ease: "power2.out", yoyo: true, repeat: 1 });
});

// gsap nav items animation
let tline = gsap.timeline()
tline.from('.logo img',{
  y:-30,
  duration:1,
  delay:0.4,
  opacity:0
})
tline.from('nav li',{
  y:-30,
  duration:0.5,
  opacity:0,
  stagger:0.3,
})
tline.from('.login-sec button',{
  y:-30,
  duration:0.6,
  opacity:0,
  stagger:0.2,
})


/////////   toggle button   /////////////

var menuIcon = document.getElementById('menuIcon');
var menuList = document.getElementById('menuList');

menuIcon.addEventListener('click', () => {
  if (menuList.style.maxHeight === '0px' || menuList.style.maxHeight === '') {
    menuList.style.maxHeight = '500px'; 
    console.log(menuIcon);
    console.log(menuList);
    
    
  } else {
    menuList.style.maxHeight = '0px';
  }
});

//////////////////////    Hero Section 

document.addEventListener('DOMContentLoaded', () => {
  // Counter Animation
  const counters = document.querySelectorAll('.about-stat-card h3');
  counters.forEach((counter) => {
      const target = +counter.getAttribute('data-target');
      const speed = 200;

      const updateCounter = () => {
          const current = +counter.innerText;
          const increment = target / speed;

          if (current < target) {
              counter.innerText = Math.ceil(current + increment);
              setTimeout(updateCounter, 10);
          } else {
              counter.innerText = target;
          }
      };

      updateCounter();
  });

  // Background Image and Text Animation
  const images = [
   'url("./assest/images/bg/bg1.avif")',
  'url("./assest/images/bg/bg 2.jpg")',
  'url("./assest/images/bg/bg 3.jpg")',

  'url("./assest/images/bg/bg 4.jpg")'
];
  

  let currentIndex = 0;
  const heroSection = document.querySelector('.about-hero');

  const animateText = () => {
      const heading = document.querySelector('.about-hero-content h1');
      const subheading = document.querySelector('.about-hero-content p');

      heading.style.animation = 'none';
      subheading.style.animation = 'none';
      void heading.offsetWidth;

      heading.style.animation = 'fadeInUp 1.5s ease-in-out forwards';
      subheading.style.animation = 'fadeInUp 1.5s ease-in-out forwards';
  };

  const changeBackground = () => {
      heroSection.style.backgroundImage = images[currentIndex];
      animateText();
      currentIndex = (currentIndex + 1) % images.length;
  };

  setInterval(changeBackground, 5000);
  changeBackground();
});



  ////////////// Second Hero Section  

// List of images
const images = ["./assest/images/img/img2.jpg",
 "./assest/images/img/img3.jpg",
 "./assest/images/bg/bg 5.jpg",
 "./assest/images/img/img4.jpg",
 "./assest/images/img/img7.jpg",
 "./assest/images/img/img5.jpg",
 "./assest/images/bg/bg 6.jpg",
  "./assest/images/img/img6.jpg"];
let currentIndex = 0;

const foodImage = document.getElementById("food-image");

// Function to change image every 5 seconds
setInterval(() => {
  currentIndex = (currentIndex + 1) % images.length;
  foodImage.src = images[currentIndex];
}, 5000);


///////////////////////  <!-- slider section  -->

const trandingSlider = new Swiper('.tranding-slider', {
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  loop: true,
  slidesPerView: 'auto',
  coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 2.5,
  },
  pagination: {
      el: '.swiper-pagination',
      clickable: true,
  },
  navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
  },
});

/////////////Footer 

// // back to top button
const backToTopButton = document.getElementById("customBackToTop");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            backToTopButton.style.display = "block";
        } else {
            backToTopButton.style.display = "none";
        }
    });

    backToTopButton.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

  // Footer Section
document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  gsap.from(".custom-footer-section", {
      opacity: 0,
      y: -50,
      duration: 1,
      stagger: 0.3,
      ease: "power3.out",
      scrollTrigger: {
          trigger: ".custom-footer-container",
          start: "top 80%",
          toggleActions: "restart none none none"
      }
  });
});

// Orange Info Box
gsap.from(".orange-info-box", {
  scrollTrigger: {
      trigger: ".orange-info-box",
      start: "top 80%",
      toggleActions: "restart none none none",
  },
  duration: 1.5,
  scale: 1,
  y: 50,
  ease: "power3.out",
});

gsap.from(".orange-info-box div", {
  scrollTrigger: {
      trigger: ".orange-info-box",
      start: "top 75%",
      toggleActions: "restart none none none"
  },
  duration: 1.5,
  opacity: 0,
  y: -30,
  stagger: 0.3,
  ease: "power2.out",
});  