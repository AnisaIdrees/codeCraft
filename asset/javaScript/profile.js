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
    db,
    doc,
    collection,
    query,
    onSnapshot,
    getAuth,
    onAuthStateChanged,
    addDoc,
    where,
    getDocs,
    updateDoc,
    deleteDoc
} from "./firebase.config.js";

const auth = getAuth();
let currentUserId = null;
let editingRecipeId = null;

document.addEventListener('DOMContentLoaded', () => {
    const myRecipesBtn = document.getElementById('myRecipes');
    if (myRecipesBtn) {
        myRecipesBtn.addEventListener('click', function () {
            window.location.href = 'myRecipes.html';
        });
    } else {
        console.log('myRecipes button not found');
    }
});
// Auth State Change
onAuthStateChanged(auth, (user) => {
    if (user) {
        currentUserId = user.uid;
        console.log("User ID:", currentUserId);
        getAllRecipes();
    } else {
        console.log("No user is signed in.");
    }
});

// Save Recipe
const saveRecipe = async () => {
    const recipeName = document.getElementById('recipeName').value;
    const category = document.getElementById('category').value;
    const ingredients = document.getElementById('ingredients').value;
    const instructions = document.getElementById('instructions').value;
    const nutritions = document.getElementById('nutritions').value;
    const cookingMethod = document.getElementById('cooking_method').value
    const cusine = document.getElementById('cuisine').value
    const servings = document.getElementById('servings').value


    console.log(nutritions);

    if (recipeName && category && ingredients && instructions && nutritions && cookingMethod && cusine &&servings) {
        try {
            await addDoc(collection(db, "recipe"), {
                name: recipeName,
                category: category,
                ingredients: ingredients,
                instructions: instructions,
                nutritions: nutritions,
                cookingMethod: cookingMethod,
                cusine: cusine,
                servings : servings,
                userId: currentUserId,
                createdAt: new Date()
            });
            console.log("Recipe added successfully!");
            clearForm();
        } catch (error) {
            console.error("Error adding recipe:", error);
        }
    } else {
        alert('Please fill in all fields.');
    }
}

// Get All Recipes
const getAllRecipes = async () => {
    if (!currentUserId) {
        console.error("User is not logged in");
        return;
    }
    const ref = query(collection(db, "recipe"), where("userId", "==", currentUserId));
    onSnapshot(ref, (querySnapshot) => {
        const recipes = [];
        querySnapshot.forEach((doc) => {
            recipes.push({ id: doc.id, ...doc.data() });
        });
        renderCreatedRecipes(recipes);
    });
};

const getMyRecipes = async () => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const recipesContainer = document.getElementById("recipe-container");
            recipesContainer.innerHTML = "";

            const q = query(collection(db, "recipes"), where("userId", "==", user.uid));
            const querySnapshot = await getDocs(q);

            querySnapshot.forEach((doc) => {
                const recipe = doc.data();
                
                // Recipe Card with Image
                const recipeCard = `
                    <div class="col-md-4 mb-4">
                        <div class="card">
                            <img src="${recipe.imageUrl}" class="card-img-top" alt="${recipe.recipeName}" style="max-height: 200px; object-fit: cover;">
                            <div class="card-body">
                                <h5 class="card-title">${recipe.recipeName}</h5>
                                <p class="card-text">${recipe.ingredients}</p>
                                <p class="card-text">${recipe.instructions}</p>
                                <button class="btn btn-primary">Edit</button>
                                <button class="btn btn-danger">Delete</button>
                            </div>
                        </div>
                    </div>
                `;
                recipesContainer.innerHTML += recipeCard;
            });
        }
    });
};

// DOMContentLoaded pe My Recipes fetch karna
document.addEventListener('DOMContentLoaded', getMyRecipes);

// Render Recipes
const renderCreatedRecipes = (recipes) => {
    let recipeContainer = document.getElementById('recipe-container');
    if (!recipeContainer) {
        console.log('No recipe container found');
        return;
    }
    recipeContainer.innerHTML = '';
    recipes.forEach((recipe) => {
        let card = document.createElement('div');
        card.classList.add('col-md-4', 'mb-4');
        card.innerHTML = `
    <div class="card" style="border: 1px solid #e0e0e0; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); overflow: hidden; padding: 20px;">
        <div class="card-body">
            <h3 class="card-title" style="color: #333; font-weight: bold; text-align: center; margin-bottom: 20px;">${recipe?.name}</h3>
            
            <div style="margin-bottom: 15px;">
                <h5 style="font-weight: bold; color: #555; margin-bottom: 5px;">Category:</h5>
                <select class="form-select categorySelect" data-id="${recipe.id}" style="color: #777; padding-left: 10px; width: 100%; border-radius: 5px; border: 1px solid #ccc;">
                    <option value="">Select Category</option>
                    <option value="Salad" ${recipe?.category === 'Salad' ? 'selected' : ''}>Salad</option>
                    <option value="Starter" ${recipe?.category === 'Starter' ? 'selected' : ''}>Starter</option>
                    <option value="Lunch" ${recipe?.category === 'Lunch' ? 'selected' : ''}>Lunch</option>
                    <option value="Smoothies" ${recipe?.category === 'Smoothies' ? 'selected' : ''}>Smoothies</option>
                    <option value="Pizza" ${recipe?.category === 'Pizza' ? 'selected' : ''}>Pizza</option>
                    <option value="Dinner" ${recipe?.category === 'Dinner' ? 'selected' : ''}>Dinner</option>
                </select>
            </div>

            <div style="margin-bottom: 15px;">
                <h5 style="font-weight: bold; color: #555; margin-bottom: 5px;">Ingredients:</h5>
                <p style="color: #777; padding-left: 10px;">${recipe?.ingredients}</p>
            </div>
            <div style="text-align: center; margin-bottom: 15px;">
        <img src="${recipe?.imageUrl || 'default-image.jpg'}" 
             alt="Recipe Image" 
             style="width: 100%; height: auto; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
        </div>
            <div style="margin-bottom: 15px;">
                <h5 style="font-weight: bold; color: #555; margin-bottom: 5px;">Instructions:</h5>
                <p style="color: #777; padding-left: 10px;">${recipe?.instructions}</p>
            </div>
            
            <div style="margin-bottom: 15px;">
                <h5 style="font-weight: bold; color: #555; margin-bottom: 5px;">Nutritions:</h5>
                <p style="color: #777; padding-left: 10px;">${recipe?.nutritions || 'Not Available'}</p>
            </div>

            <div style="margin-bottom: 15px;">
                <h5 style="font-weight: bold; color: #555; margin-bottom: 5px;">Cooking Method:</h5>
                <p style="color: #777; padding-left: 10px;">${recipe?.cookingMethod || 'Not Available'}</p>
            </div>

            <div style="margin-bottom: 15px;">
                <h5 style="font-weight: bold; color: #555; margin-bottom: 5px;">Cuisine:</h5>
                <p style="color: #777; padding-left: 10px;">${recipe?.cusine || 'Not Available'}</p>
            </div>

            <div style="margin-bottom: 15px;">
                <h5 style="font-weight: bold; color: #555; margin-bottom: 5px;">Servings:</h5>
                <p style="color: #777; padding-left: 10px;">${recipe?.servings || 'Not Available'}</p>
            </div>

            <div style="text-align: center; margin-top: 20px;">
                <button class="editRecipeBtn" data-id="${recipe.id}" 
                    style="width: 120px; height: 40px; background-color: #fc791a; border: none; color: white; border-radius: 5px; cursor: pointer; margin-right: 10px; transition: background-color 0.3s;">
                    Edit
                </button>
                <button class="deleteRecipeBtn" data-id="${recipe.id}" 
                    style="width: 120px; height: 40px; background-color: #dc3545; border: none; color: white; border-radius: 5px; cursor: pointer; transition: background-color 0.3s;">
                    Delete
                </button>
            </div>
        </div>
    </div>
`;


        recipeContainer.appendChild(card);
    });
};

// Load Recipe Data for Editing
const loadRecipeData = async (recipeId) => {
    try {
        const docRef = doc(db, "recipe", recipeId);
        const docSnap = await getDocs(query(collection(db, "recipe"), where("__name__", "==", recipeId)));

        if (!docSnap.empty) {
            const recipeData = docSnap.docs[0].data();
            document.getElementById('recipeName').value = recipeData.name;
            document.getElementById('category').value = recipeData.category;
            document.getElementById('ingredients').value = recipeData.ingredients;
            document.getElementById('instructions').value = recipeData.instructions;
            document.getElementById('nutritions').value = recipeData.nutritions;
            document.getElementById('cooking_method').value = recipeData.nutritions;
            document.getElementById('cuisine').value = recipeData.cusine;
            document.getElementById('servings').value = recipeData.servings;


            editingRecipeId = recipeId;
            showModal();
        } else {
            console.log("No such recipe found.");
        }
    } catch (error) {
        console.error("Error loading recipe data:", error);
    }
};

// Update Recipe
const updateRecipe = async () => {
    if (!editingRecipeId) return;

    const updatedName = document.getElementById('recipeName').value;
    const updatedCategory = document.getElementById('category').value;
    const updatedIngredients = document.getElementById('ingredients').value;
    const updatedInstructions = document.getElementById('instructions').value;
    const updatedNutritions = document.getElementById('nutritions').value;
    const updatedcookinMethod = document.getElementById('cooking_method').value;
    const updatedcusine = document.getElementById('cuisine').value;
    const updatedServings = document.getElementById('servings').value;


    try {
        const docRef = doc(db, "recipe", editingRecipeId);
        await updateDoc(docRef, {
            name: updatedName,
            category: updatedCategory,
            ingredients: updatedIngredients,
            nutritions: updatedNutritions,
            instructions: updatedInstructions,
            cookingMethod: updatedcookinMethod,
            servings : updatedServings,
            cusine: updatedcusine,
            updatedAt: new Date()
        });
        console.log("Recipe updated successfully!");
        clearForm();
        hideModal();
        editingRecipeId = null;
    } catch (error) {
        console.error("Error updating recipe:", error);
    }
};

// Delete Recipe
const deleteRecipe = async (recipeId) => {
    try {
        const docRef = doc(db, "recipe", recipeId);
        await deleteDoc(docRef);
        console.log("Recipe deleted with ID:", recipeId);
    } catch (error) {
        console.error("Error deleting recipe:", error);
    }
}

// Event Listeners
document.getElementById('recipeUploadBtn')?.addEventListener('click', saveRecipe);
document.getElementById('updateRecipeBtn')?.addEventListener('click', updateRecipe);
document.getElementById('recipe-container')?.addEventListener('click', (event) => {
    const recipeId = event.target.getAttribute('data-id');
    if (event.target.classList.contains('editRecipeBtn')) {
        loadRecipeData(recipeId);
    }
    if (event.target.classList.contains('deleteRecipeBtn')) {
        deleteRecipe(recipeId);
    }
});

// Modal Functions
const showModal = () => {
    const modalContainer = document.getElementById('modalContainer');
    modalContainer.style.display = 'block';
    setTimeout(() => {
        // Ensure form elements are accessible
        document.getElementById('recipeName').focus();
    }, 100);
};
const hideModal = () => {
    const modalContainer = document.getElementById('modalContainer');
    modalContainer.style.display = 'none';
    clearForm();
};

const clearForm = () => {
    document.getElementById('recipeName').value = '';
    document.getElementById('category').value = '';
    document.getElementById('ingredients').value = '';
    document.getElementById('instructions').value = '';
    document.getElementById('nutritions').value = '';
    document.getElementById('cooking_method').value = '';
    document.getElementById('cuisine').value = '';
    document.getElementById('servings').value = '';


    editingRecipeId = null;
};

// DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    getAllRecipes();
    document.querySelector('.close-btn').addEventListener('click', hideModal);
    window.addEventListener('click', (event) => {
        const modalContainer = document.getElementById('modalContainer');
        if (event.target === modalContainer) {
            hideModal();
        }
    });
});
window.getMyRecipes = () => {
    console.log(222)
    getAllRecipes();
}