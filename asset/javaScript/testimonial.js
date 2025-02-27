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
    menuList.style.maxHeight = '450px';
    console.log(menuIcon);
    console.log(menuList);

  } else {
    menuList.style.maxHeight = '0px';
  }
});

////////////////////////////// testimonails


	// Access the testimonials
	let testSlide = document.querySelectorAll('.testItem');
	// Access the indicators
	let dots = document.querySelectorAll('.dot');

	var counter = 0;

	// Add click event to the indicators
	function switchTest(currentTest){
		currentTest.classList.add('active');
		var testId = currentTest.getAttribute('attr');
		if(testId > counter){
			testSlide[counter].style.animation = 'next1 0.5s ease-in forwards';
			counter = testId;
			testSlide[counter].style.animation = 'next2 0.5s ease-in forwards';
		}
		else if(testId == counter){return;}
		else{
			testSlide[counter].style.animation = 'prev1 0.5s ease-in forwards';
			counter = testId;
			testSlide[counter].style.animation = 'prev2 0.5s ease-in forwards';
		}
		indicators();
	}

	// Add and remove active class from the indicators
	function indicators(){
		for(i = 0; i < dots.length; i++){
			dots[i].className = dots[i].className.replace(' active', '');
		}
		dots[counter].className += ' active';
	}

	// Code for auto sliding
	function slideNext(){
		testSlide[counter].style.animation = 'next1 0.5s ease-in forwards';
		if(counter >= testSlide.length - 1){
			counter = 0;
		}
		else{
			counter++;
		}
		testSlide[counter].style.animation = 'next2 0.5s ease-in forwards';
		indicators();
	}
	function autoSliding(){
		deleteInterval = setInterval(timer, 2000);
		function timer(){
			slideNext();
			indicators();
		}
	}
	autoSliding();

	// Stop auto sliding when mouse is over the indicators
	const container = document.querySelector('.indicators');
	container.addEventListener('mouseover', pause);
	function pause(){
		clearInterval(deleteInterval);
	}

	// Resume sliding when mouse is out of the indicators
	container.addEventListener('mouseout', autoSliding);
//////////////////

function switchTest(element) {
    let index = element.getAttribute("attr"); // Button ka index
    console.log("Clicked Index:", index);

    let activeItem = document.querySelector(".testItem.active");
    let newActiveItem = document.querySelectorAll(".testItem")[index];

    console.log("Current Active Item:", activeItem);
    console.log("New Active Item:", newActiveItem);

    if (activeItem !== newActiveItem) {
        console.log("Changing Active Class...");

        // Purani active class remove karo
        activeItem.classList.remove("active");

        // Naye testimonial ko active karo
        newActiveItem.classList.add("active");

        console.log("Active class changed!");

        // 🔥 Animation Reset and Restart
        let img = newActiveItem.querySelector("img");
        let h3 = newActiveItem.querySelector("h3");
        let p = newActiveItem.querySelector("p");

        console.log("Resetting animations...");
        
        img.style.animation = "none";
        h3.style.animation = "none";
        p.style.animation = "none";

        setTimeout(() => {
            img.style.animation = "fadeIn 0.8s ease-in-out";
            h3.style.animation = "slideIn 0.8s ease-in-out";
            p.style.animation = "slideIn 0.8s ease-in-out";
            console.log("Animations applied!");
        }, 10);
    } else {
        console.log("Clicked on the same testimonial, no change needed.");
    }
}

///////////////////// footer 


////bottom to top button 
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