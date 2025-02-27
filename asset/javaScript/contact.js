//  cursor
const cursor = document.querySelector(".cursor");
const cursorTrail = document.querySelector(".cursor-trail");




// Smooth follow effect using GSAP
document.addEventListener("mousemove", (e) => {
  gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1, ease: "power2.out" });
  gsap.to(cursorTrail, { x: e.clientX, y: e.clientY, duration: 0.3, ease: "power3.out" });
});



// Click Animation
document.addEventListener("click", () => {
  gsap.to(cursor, { scale: 1.5, duration: 0.1, ease: "power2.out", yoyo: true, repeat: 1 });
  gsap.to(cursorTrail, { scale: 2, duration: 0.3, opacity: 0, ease: "power2.out", yoyo: true, repeat: 1 });
});

// gsap nav items animation
let tl = gsap.timeline()
tl.from('.logo img', {
  y: -30,
  duration: 1,
  delay: 0.4,
  opacity: 0
})
tl.from('nav li', {
  y: -30,
  duration: 0.4,
  opacity: 0,
  stagger: 0.3,
})
tl.from('.login-sec button', {
  y: -30,
  duration: 0.6,
  opacity: 0,
  stagger: 0.2,
});

/////////   toggle button   /////////////
const menuIcon = document.getElementById('menuIcon');
const menuList = document.getElementById('menuList');

menuIcon.addEventListener('click', () => {
  if (menuList.style.maxHeight === '0px' || menuList.style.maxHeight === '') {
    menuList.style.maxHeight = '350px';
    console.log(menuIcon);
    console.log(menuList);

  } else {
    menuList.style.maxHeight = '0px';
  }
});


////////////// FOAM 

const inputs = document.querySelectorAll(".input");

function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add("focus");
}

function blurFunc() {
  let parent = this.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc);
  input.addEventListener("blur", blurFunc);
});

/////////////////////////////////////

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  form.addEventListener("submit", function (event) {
      event.preventDefault(); // Form submit hone se roknay ke liye

      let name = document.querySelector("input[name='name']").value.trim();
      let email = document.querySelector("input[name='email']").value.trim();
      let phone = document.querySelector("input[name='phone']").value.trim();
      let message = document.querySelector("textarea[name='message']").value.trim();

      if (name === "" || email === "" || phone === "" || message === "") {
          alert("Please fill all fields before submitting!");
      } else {
          alert("Form submitted successfully!");
          form.submit(); // Form ko manually submit karne ke liye
      }
  });
});

////////////Footer 



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