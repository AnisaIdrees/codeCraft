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


import { collection, addDoc, getAuth, db } from "./firebase.config.js"

const stareter = async () => {
    try {
        let getStarter = await fetch('https://web.langmingle.com/api/get-recipes');
        let setStarter = await getStarter.json()
        let myStarter = setStarter.recipes;
        let appetizers = myStarter.filter(item => item.course === 'appetizer');
        console.log(appetizers);
        recipes = appetizers
        return recipes;
    } catch (error) {
        console.log(error);
    }
}

// display cards\
const starterCardGenerate = (cards) => {
    let starterCard = document.getElementById('starter-cards')
    starterCard.innerHTML = ''
    let gridContainer = document.createElement('div');
    gridContainer.classList.add('grid-container');

    cards.forEach((product) => {
        let newCard = document.createElement('div')
        newCard.classList.add('newStarterCard')
       newCard.innerHTML = `
                <div class="card position-relative">
                   <img class="card-img img-fluid" src="${product.image}" alt="${product.name}">
                   <span class="heart-icon position-absolute top-0 end-0 m-2" 
                       data-recipe-id="${product.id}" data-user-id="CURRENT_USER_ID">
                       <i class="bi bi-heart"></i>
                   </span>
                   <div class="card-body">
                       <h3 class="card-title">${product.name}</h3>
                       <p class="card-desc">${product.description || "Salads!"}</p>
                       <button id="viewDetails" type="button" class="btn">
                           <a style="text-decoration: none; color: white;" href="showRecipePage.html?id=${product.id}">View Recipe</a>
                       </button>
                   </div>
               </div>
               `;
               newCard.querySelector('.heart-icon').addEventListener('click', function () {
                   this.classList.toggle('active');
               
                   const auth = getAuth();
                   const user = auth.currentUser;
                   if (user) {
                       const userId = user.uid;
                       
                       // Get the complete recipe object
                       const recipeToSave = {
                           id: product.id,
                           name: product.name,
                           image: product.image,
                           description: product.description
                       };
                       
                       addToWishlist(userId, recipeToSave);
                   } else {
                       console.log("User not logged in");
                   }
               });

newCard.querySelector('.heart-icon').addEventListener('click', function() {
    this.classList.toggle('active');
});

        gridContainer.appendChild(newCard)
    })
    starterCard.appendChild(gridContainer)
}
stareter().then((data) => {
    if (data) {
        starterCardGenerate(data)
    }
})
// Function to Add Recipe to Wishlist
const addToWishlist = (userId, recipeId) => {
    const wishlistRef = collection(db, 'wishList');
    addDoc(wishlistRef, {
        recipId: recipeId,
        userId: userId
    }).then(() => {
        console.log("Recipe added to wishlist!");
    }).catch(error => {
        console.error('Error adding to wishlist:', error);
    });
}


// Search filter
let recipes = [];

const search = () => {

    let searchField = document.getElementById('searchField')
    let filterData = searchField.value.toLowerCase()
    let setFilterData = recipes.filter((item)=>{
        console.log(recipes);
        
        return item.name.toLowerCase().includes(filterData)
    })
    let container = document.getElementById('noRecipe')
    if (setFilterData.length === 0) {
        container.innerHTML = `<p>No results found</p>`;
    }
    starterCardGenerate(setFilterData)
}
document.getElementById('searchField')?.addEventListener('keyup', search)


