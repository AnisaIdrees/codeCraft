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


import {
    collection, getDocs, query, where, doc, getDoc, getAuth, db, onAuthStateChanged, addDoc, deleteDoc
} from "./firebase.config.js"

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
    if (user) {
        const userId = user.uid;
        console.log("Logged in User ID:", userId);
      
        // Load wishlist on page load
        fetchWishlist(userId);
      
        document.addEventListener('click', function (event) {
            if (event.target.closest('.heart-icon')) {
                const heartIcon = event.target.closest('.heart-icon');
                const recipeId = heartIcon.getAttribute('data-recipe-id');
                console.log("Recipe ID to Add:", recipeId);
                addToWishlist(userId, recipeId);
            }
        });
    } else {
        console.log("No user is logged in");
    }
});


const addToWishlist = async (userId, recipe) => {
    const wishlistRef = collection(db, 'wishList');
    const q = query(wishlistRef, where('userId', '==', userId), where('recipId', '==', recipe.id));

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
        await addDoc(wishlistRef, {
            recipId: recipe.id,
            userId: userId,
            name: recipe.name,
            image: recipe.image,
            description: recipe.description
        });
        console.log("Recipe added to wishlist!");
    } else {
        console.log("Recipe is already in the wishlist.");
    }
    fetchWishlist(userId);
}


async function fetchWishlist(userId) {
    const wishlistContainer = document.getElementById('wishlist-container');
    if (!wishlistContainer) {
        console.error('No element with ID "wishlist-container" found!');
        return;
    }
    const wishlistRef = collection(db, 'wishList');
    const q = query(wishlistRef, where('userId', '==', userId));

    const wishlistSnapshot = await getDocs(q);
    let wishlistIds = [];
    wishlistSnapshot.forEach(docSnapshot => {
        const recipData = docSnapshot.data().recipId;
        const recipId = recipData.id;
        wishlistIds.push(recipId ? recipId.toString() : '');
        console.log("Each Recipe ID:", recipId);
    });
    
    console.log("Wishlist Recipe IDs:", wishlistIds);
    let allRecipes = [];
    try {
        let response = await fetch('https://web.langmingle.com/api/get-recipes');
        let data = await response.json();
        allRecipes = data.recipes;
    } catch (error) {
        console.error('Error fetching recipes from API:', error);
        return;
    }

    console.log("All Recipes from API:", allRecipes);

    let wishlistRecipes = allRecipes.filter(recipe => wishlistIds.includes(recipe.id.toString()));
    wishlistContainer.innerHTML = ''; 
    if (wishlistRecipes.length === 0) {
        console.log("No items found in wishlist for this user.");
        wishlistContainer.innerHTML = "<p>No items in your wishlist.</p>";
    } else {
        wishlistRecipes.forEach(recipe => {
            wishlistContainer.innerHTML += `
    <div class="col-md-4 mb-4" id="wishlist-card-${recipe.id}">
        <div class="card h-100 shadow-sm border-0">
            <img class="card-img-top" src="${recipe.image}" alt="${recipe.name}" style="height: 200px; object-fit: cover;">
            <div class="card-body">
                <h5 class="card-title text-truncate">${recipe.name}</h5>
                <p class="card-text text-muted small">${recipe.description}</p>
            </div>
            <div class="card-footer bg-white border-0 text-center">
                <button class="btn btn-outline-danger remove-wishlist" data-recipe-id="${recipe.id}">
                    <i class="bi bi-heartbreak"></i> Remove from Wishlist
                </button>
            </div>
        </div>
    </div>
    `;

        });

        // Add Event Listener for Remove Button
        document.querySelectorAll('.remove-wishlist').forEach(button => {
            button.addEventListener('click', function() {
                const recipeId = this.getAttribute('data-recipe-id');
                removeFromWishlist(userId, recipeId);
            });
        });
    }
}
const removeFromWishlist = async (userId, recipeId) => {
    console.log("Recipe ID to Remove:", recipeId, "Type:", typeof recipeId);

    const wishlistRef = collection(db, 'wishList');
    const q = query(wishlistRef, where('userId', '==', userId), where('recipId.id', '==', Number(recipeId)));
    
    console.log("Querying with:", userId, recipeId);

    const querySnapshot = await getDocs(q);

    console.log("Query Result Size:", querySnapshot.size);
    
    if (!querySnapshot.empty) {
        querySnapshot.forEach(async (docSnapshot) => {
            console.log("Deleting Document ID:", docSnapshot.id);
            await deleteDoc(doc(db, 'wishList', docSnapshot.id));
            console.log("Recipe removed from wishlist:", recipeId);
        });

        const itemToRemove = document.getElementById(`wishlist-card-${recipeId}`);
        if (itemToRemove) {
            itemToRemove.remove();
        }
    } else {
        console.log("Recipe not found in wishlist.");
    }
};

