
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
tl.from('.login-sec .login-sign-btn', {
  y: -30,
  duration: 0.6,
  opacity: 0,
  stagger: 0.2,
});

////////////////////////



/////////   toggle button   /////////////
const menuIcon = document.getElementById('menuIcon');
const menuList = document.getElementById('menuList');

menuIcon.addEventListener('click', () => {
  if (menuList.style.maxHeight === '0px' || menuList.style.maxHeight === '') {
    menuList.style.maxHeight = '550px';
    console.log(menuIcon);
    console.log(menuList);

  } else {
    menuList.style.maxHeight = '0px';
  }
});


// Fetch Data
const fetchData = async () => {
  try {
    const res = await fetch('https://dummyjson.com/recipes');
    let result = await res.json();
    return result;
  } catch (error) {
    console.log('Data not fetched', error);
  }
};

// Variables for Pagination
let recipes = [];
let currentPage = 1;
const cardsPerPage = 6;

// Display Recipes with Pagination
const displayRecipes = () => {
  const container = document.getElementById('cardsContainer');
  container.innerHTML = ""; // Clear previous content

  // Calculate start and end index
  const start = (currentPage - 1) * cardsPerPage;
  const end = start + cardsPerPage;
  const paginatedRecipes = recipes.slice(start, end);

  // Generate cards
  paginatedRecipes.forEach(recipe => {
    const card = document.createElement('div');
    card.classList.add('cardBox');

    const tag = recipe.tags && recipe.tags.length > 1 ? recipe.tags[0] : "No Tag";

    card.innerHTML = `
      <div class="card" style="width: 18rem;">
        <img src="${recipe.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <div class="d-flex justify-content-between p-1">
            <p class="card-text"><i class="ri-user-fill"></i> By Admin</p>
            <p class="card-text"><i class="ri-bubble-chart-fill"></i>${tag}</p>
          </div>
          <p class="card-text fw-bold fs-5 Recipe-about-name">${recipe.name}</p>
          <button class="learn-more">
            <span class="circle" aria-hidden="true">
              <span class="icon arrow"></span>
            </span>
            <span class="button-text">Read More</span>
          </button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });

  updatePaginationButtons();
};

// Load Data and Display First Page
const getData = async () => {
  const resultData = await fetchData();
  if (resultData) {
    recipes = resultData.recipes;
    displayRecipes();
  }
};

// Pagination Controls
const totalPages = () => Math.ceil(recipes.length / cardsPerPage);

const changePage = (page) => {
  if (page >= 1 && page <= totalPages()) {
    currentPage = page;
    displayRecipes();
  }
};

// Update Pagination Buttons
const updatePaginationButtons = () => {
  document.getElementById("startBtn").disabled = currentPage === 1;
  document.getElementById("prev").disabled = currentPage === 1;
  document.getElementById("next").disabled = currentPage === totalPages();
  document.getElementById("endBtn").disabled = currentPage === totalPages();

  document.querySelectorAll(".link").forEach((btn, index) => {
    btn.classList.toggle("active", index + 1 === currentPage);
  });
};

// Event Listeners for Pagination
document.getElementById("startBtn").addEventListener("click", () => changePage(1));
document.getElementById("endBtn").addEventListener("click", () => changePage(totalPages()));
document.getElementById("prev").addEventListener("click", () => changePage(currentPage - 1));
document.getElementById("next").addEventListener("click", () => changePage(currentPage + 1));

document.querySelectorAll(".link").forEach((btn, index) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    changePage(index + 1);
  });
});

// Initialize
getData();
