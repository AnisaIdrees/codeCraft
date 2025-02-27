import { db, getAuth, doc, getDoc, setDoc, onAuthStateChanged } from "./firebase.config.js";
const auth = getAuth();

// 🌟 Image Upload Function
const uploadImage = async () => {
    const selectedImage = document.getElementById('image').files[0];
    if (!selectedImage) {
        alert("Please select an image first!");
        return;
    }
    const cloudName = 'dd0hhsmim';
    const presetName = 'firebaseXcloudinary';

    const formData = new FormData();
    formData.append("file", selectedImage);
    formData.append("upload_preset", presetName);

    try {
        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: "POST",
            body: formData
        });

        const data = await res.json();
        console.log('Uploaded:', data);
        const imageUrl = data.secure_url;

        const imageElement = document.getElementById("profileImage");
        imageElement.src = imageUrl;
        imageElement.style.display = "block";
        imageElement.style.maxWidth = "200px";
        imageElement.style.borderRadius = "50%";
        imageElement.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";

        // Firestore mein URL Save
        await setDoc(doc(db, "users", auth.currentUser.uid), {
            profileImage: imageUrl
        }, { merge: true });

        console.log("Image URL saved to Firestore!");

    } catch (error) {
        console.error('Upload Error:', error);
        alert("Failed to upload image. Please try again.");
    }
};

// 🌟 Function to Load Image
const loadProfileImage = async (user) => {
    if (user) {
        try {
            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
                const userData = userSnap.data();
                if (userData.profileImage) {
                    const imageElement = document.getElementById("profileImage");
                    imageElement.src = userData.profileImage;
                    imageElement.style.display = "block";
                    imageElement.style.maxWidth = "200px";
                    imageElement.style.borderRadius = "50%";
                    imageElement.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
                }
            } else {
                console.log("No such document!");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    } else {
        console.log("No user is logged in.");
    }
};

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('uploadImage')?.addEventListener('click', uploadImage);

    onAuthStateChanged(auth, (user) => {
        if (user) {
            loadProfileImage(user);
        } else {
            console.log("User not logged in.");
        }
    });
});
