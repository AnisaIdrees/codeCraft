//  cursor
const cursorB = document.querySelector(".cursor");
const cursorTrailB = document.querySelector(".cursor-trail");




// Smooth follow effect using GSAP
document.addEventListener("mousemove", (e) => {
  gsap.to(cursorB, { x: e.clientX, y: e.clientY, duration: 0.1, ease: "power2.out" });
  gsap.to(cursorTrailB, { x: e.clientX, y: e.clientY, duration: 0.3, ease: "power3.out" });
});



// Click Animation
document.addEventListener("click", () => {
  gsap.to(cursorB, { scale: 1.5, duration: 0.1, ease: "power2.out", yoyo: true, repeat: 1 });
  gsap.to(cursorTrailB, { scale: 2, duration: 0.3, opacity: 0, ease: "power2.out", yoyo: true, repeat: 1 });
});
/////////   toggle button   /////////////
var menuIcon = document.getElementById('menuIcon');
var menuList = document.getElementById('menuList');

menuIcon.addEventListener('click', () => {
  if (menuList.style.maxHeight === '0px' || menuList.style.maxHeight === '') {
    menuList.style.maxHeight = '550px';
    console.log(menuIcon);
    console.log(menuList);

  } else {
    menuList.style.maxHeight = '0px';
  }
});

// // slider
class SliderClip {
	constructor(el) {
		this.el = el;
		this.Slides = Array.from(this.el.querySelectorAll('li'));
		this.Nav = Array.from(this.el.querySelectorAll('nav a'));
		this.totalSlides = this.Slides.length;
		this.current = 0;
		this.autoPlay = true; // true or false
		this.timeTrans = 4000; // transition time in milliseconds
		this.IndexElements = [];

		for (let i = 0; i < this.totalSlides; i++) {
			this.IndexElements.push(i);
		}

		this.setCurret();
		this.initEvents();
	}
	setCurret() {
		this.Slides[this.current].classList.add('current');
		this.Nav[this.current].classList.add('current_dot');
	}
	initEvents() {
		const self = this;

		this.Nav.forEach((dot) => {
			dot.addEventListener('click', (ele) => {
				ele.preventDefault();
				this.changeSlide(this.Nav.indexOf(dot));
			});
		});

		this.el.addEventListener('mouseenter', () => (self.autoPlay = false));
		this.el.addEventListener('mouseleave', () => (self.autoPlay = true));

		setInterval(function () {
			if (self.autoPlay) {
				self.current = self.current < self.Slides.length - 1 ? self.current + 1 : 0;
				self.changeSlide(self.current);
			}
		}, this.timeTrans);
	}

	changeSlide(index) {
		this.Nav.forEach((allDot) => allDot.classList.remove('current_dot'));

		this.Slides.forEach((allSlides) =>
			allSlides.classList.remove('prev', 'current')
		);

		const getAllPrev = (value) => value < index;

		const prevElements = this.IndexElements.filter(getAllPrev);

		prevElements.forEach((indexPrevEle) =>
			this.Slides[indexPrevEle].classList.add('prev')
		);

		this.Slides[index].classList.add('current');
		this.Nav[index].classList.add('current_dot');
	}
}

const slider = new SliderClip(document.querySelector('.slider'));

document.addEventListener('DOMContentLoaded', () => {
	const leftText = document.querySelector('.left > div');

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					leftText.classList.add('visible');
				}
			});
		},
		{ threshold: 0.5 }
	);

	observer.observe(document.querySelector('.intro'));
});

// cards with API
let allRecipes = [];

const fetchAndDisplayCards = async (url, containerSelector, courseType) => {
	try {
		const response = await fetch(url);
		const data = await response.json();
		const items = (data.meals || data.drinks || data.recipes || []).filter(item => item.course === courseType).slice(0, 6);

		allRecipes = [...allRecipes, ...items];
		const containerTitle = document.querySelector(containerSelector).previousElementSibling;
		containerTitle.textContent = courseType.charAt(0).toUpperCase() + courseType.slice(1);

		const container = document.querySelector(containerSelector);
		container.innerHTML = "";
		items.forEach((item) => {
			const card = document.createElement('div');
			card.className = 'card';
			card.innerHTML = `
				<div class="position-relative">
					<img class="cardimg img-fluid" src="${item.strMealThumb || item.strDrinkThumb || item.image}" alt="${item.strMeal || item.strDrink || item.name}">
					<span class="heart-icon position-absolute top-0 end-0 m-2">
						<i class="bi bi-heart"></i>
					</span>
				</div>
				<div class="product-title mt-4">
					<h5>${item.strMeal || item.strDrink || item.name}</h5>
				</div>
`;

card.querySelector('.heart-icon').addEventListener('click', function() {
    this.classList.toggle('active');
});


			
			container.appendChild(card);
		});
	} catch (error) {
		console.error(`Error fetching data from ${url}:`, error);
	}
};

const apiSections = [
	{ url: 'https://web.langmingle.com/api/get-recipes', container: '.starter', course: 'appetizer' },
	{ url: 'https://web.langmingle.com/api/get-recipes', container: '.lunch', course: 'lunch' },
	{ url: 'https://web.langmingle.com/api/get-recipes', container: '.dinner', course: 'dinner' },
	{ url: 'https://web.langmingle.com/api/get-recipes', container: '.drinksSection', course: 'smoothies' },
	{ url: 'https://web.langmingle.com/api/get-recipes', container: '.pizzaSection', course: 'pizza' },
	{ url: 'https://web.langmingle.com/api/get-recipes', container: '.salad', course: 'salad' },
];

Promise.all(apiSections.map(section => fetchAndDisplayCards(section.url, section.container, section.course)))
	.then(() => console.log("All recipes loaded!"))
	.catch(err => console.error("Error loading recipes:", err));

// Search filter

const search = () => {
    let searchField = document.querySelector('#searchField').value.toLowerCase().trim();
    let searchType = document.querySelector('#searchType').value;

    if (allRecipes.length === 0) {
        console.log("No recipes data available yet.");
        return;
    }


    document.querySelectorAll('.card').forEach(card => {
        card.style.display = 'none';
    });

 
    if (searchField === '') {
        document.querySelectorAll('.card').forEach(card => {
            card.style.display = 'block';
        });
        document.querySelectorAll('.resTitle').forEach(title => {
            title.style.display = 'block';
            title.textContent = title.getAttribute('data-course').charAt(0).toUpperCase() + title.getAttribute('data-course').slice(1);
        });
        document.querySelectorAll('.moreRec').forEach(link => {
            link.style.display = 'block';
        });
        document.querySelectorAll('hr').forEach(hr => {
            hr.style.display = 'block';
        });
        return;
    }

    // Search by Name
    if (searchType === 'name') {
        allRecipes.forEach(item => {
            const itemName = (item.strMeal || item.strDrink || item.name || "").toLowerCase().trim();
            console.log("Item Name:", itemName); // Debugging line

            if (itemName.includes(searchField)) {
                const category = item.course;
                const container = document.querySelector(`[data-course="${category}"]`).nextElementSibling;
                container.previousElementSibling.style.display = 'block';
                container.previousElementSibling.textContent = category.charAt(0).toUpperCase() + category.slice(1);

                container.querySelectorAll('.card').forEach(card => {
                    const cardName = card.querySelector('h5')?.textContent.toLowerCase().trim() || "";
                    console.log("Card Name:", cardName); 
                    if (cardName.includes(searchField)) {
                        card.style.display = 'block';
                    }
                });
            }
        });
    }

    // Search by Category
    if (searchType === 'category') {
        const filteredCategories = new Set();
        allRecipes.forEach(item => {
            const category = item.course.toLowerCase().trim();
            console.log("Category:", category); // Debugging line

            if (category.includes(searchField)) {
                filteredCategories.add(category);

                const container = document.querySelector(`[data-course="${category}"]`).nextElementSibling;
                container.previousElementSibling.style.display = 'block';
                container.previousElementSibling.textContent = category.charAt(0).toUpperCase() + category.slice(1);

                container.querySelectorAll('.card').forEach(card => {
                    card.style.display = 'block';
                });
            }
        });

        // Agar koi category nahi mili tou sab kuch hide kar do
        if (filteredCategories.size === 0) {
            document.querySelectorAll('.resTitle').forEach(title => title.style.display = 'none');
            document.querySelectorAll('.moreRec').forEach(link => link.style.display = 'none');
            document.querySelectorAll('hr').forEach(hr => hr.style.display = 'none');
        }
    }
};


// Event listener to trigger search on keyup
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#searchField').addEventListener('keyup', search);
});
