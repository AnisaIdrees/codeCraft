
let menuicn = document.querySelector(".menuicn");
let nav = document.querySelector(".navcontainer");

menuicn.addEventListener("click", () => {
  nav.classList.toggle("navclose");
})
/////////////////////////////////////////////////////////////////////////////////////
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
/////////////////////////////////////////////////////////////////////////////////////

const profileContainer = document.getElementById("profile-container");
const userManagementContainer = document.getElementById("userManagementContainer");
// const favContainer = document.getElementById("favouriteContainer");
const graph = document.getElementById("graph");
const info =document.getElementById('info')

const profileBtn = document.getElementById("profile-btn");
const userManagementBtn = document.getElementById("userManagement-btn");
// const favBtn = document.getElementById("favourite-btn"); // Ensure button exists

if (profileContainer || userManagementContainer) {
    // Profile Button Click Event
    profileBtn.onclick = function () {
        profileContainer.style.display = "block";
        userManagementContainer.style.display = "none";
        // favContainer.style.display = "none";
        graph.style.display = "none";
    };

    // User Management Button Click Event
    userManagementBtn.onclick = function () {
        userManagementContainer.style.display = "block";
        profileContainer.style.display = "none";
        // favContainer.style.display = "none";
        graph.style.display = "block";
        info.style.display="none"
    };



} else {
    console.error("One or more elements not found. Check IDs in your HTML.");
}


/////////////////////////////////////////////////////////////////////////////////////
import {
  auth,
  db,
  query,
  collection,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
  signOut, getDoc,
  setDoc,
  onAuthStateChanged,
}
  from "./firebase.configure.js"




const getAllUsers = async () => {
  try {
    const ref = query(collection(db, "users"));

    const unsubscribe = onSnapshot(ref, (querySnapshot) => {
      console.log(" Snapshot received, total users:", querySnapshot.size);

      if (querySnapshot.empty) {
        console.log("⚠ No matching documents.");
        return;
      }

      let index = 1;
      const usersTable = document.getElementById("all-users");
      usersTable.innerHTML = "";

      querySnapshot.forEach((_user) => {
        let user = _user.data();
        console.log("User Data:", user);


        let statusColor = user?.isActive ? "text-success " : "text-danger ";
        let statusText = user?.isActive ? "Active" : "Blocked";

        usersTable.innerHTML += `
                    <tr>
                        <th scope="row">${index++}</th>
                        <td>${user?.firstName || "N/A"}</td>  
                        <td>${user?.lastName || "N/A"}</td>   
                        <td>${user?.email || "N/A"}</td>      
                        <td>${user?.contactInfo || "N/A"}</td>  
                        <td class="${statusColor}">${statusText}</td> 
                        <td>
                            <button type="button" onclick="updateStatus('${_user.id}', ${user?.isActive})" class="btn btn-sm btn-outline-primary">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button type="button" onclick="deleteUser('${_user.id}')" class="btn btn-sm btn-outline-danger">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </td>
                    </tr>
                `;
      });
    });

  } catch (error) {
    console.error("Error fetching users:", error);
  }


};
window.updateStatus = async (id, currentStatus) => {
  try {
    const userRef = doc(db, "users", id);
    await updateDoc(userRef, {
      isActive: !currentStatus // Toggle active status
    });
    console.log("Status Updated Successfully");
  } catch (error) {
    console.error(" Error updating status:", error);
  }
};


///////////// delete button
window.deleteUser = async (id) => {
  try {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete!",
      cancelButtonText: "Cancel",
      width: "300px",
      padding: "10px",
      customClass: {
        popup: "small-popup"
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(doc(db, "users", id));
        Swal.fire({
          title: "Deleted!",
          text: "Admin has been removed.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
          width: "250px",
        });
        console.log(" User Deleted Successfully");
      }
    });

  } catch (error) {
    console.error("Error deleting user:", error);
    Swal.fire({
      title: "Error!",
      text: "Something went wrong.",
      icon: "error",
      width: "300px",
      showConfirmButton: false,
      timer: 1500
    });
  }
};

getAllUsers();
/////////////////////////////////////// logout//////////////////////////////////////

document.getElementById("signOut")?.addEventListener("click", async () => {
  try {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel"
    });

    if (result.isConfirmed) {
      await signOut(auth);
      Swal.fire("Logged Out!", "You have been logged out successfully.", "success");
      console.log("Logout hogya!");

     
      window.location.href = "/index.html";
    }
  } catch (error) {
    Swal.fire("Error!", "Logout nahi hua. Please try again.", "error");
    console.log("Logout nahiiiiii hua!", error);
  }
});


// //////////////// graph///////////////////////////////
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 2000,
    easing: 'easeInOutBounce'
  }
};

let barCtx = document.getElementById("barChart").getContext("2d");
new Chart(barCtx, {
  type: "bar",
  data: {
    labels: ["Pizza", "Pasta", "Burger", "Sushi", "Tacos"],
    datasets: [{
      label: " 🩷 Favorites",
      data: [20,15 , 10, 6, 9],
      backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0", "#9966ff"],
      borderRadius: 8
    }]
  },
  options: {
    ...chartOptions,
    scales: { y: { beginAtZero: true } }
  }
});

let pieCtx = document.getElementById("pieChart").getContext("2d");
new Chart(pieCtx, {
  type: "doughnut",
  data: {
    labels: ["Pizza", "Pasta", "Burger", "Sushi", "Tacos"],
    datasets: [{
      label: "Favorite Distribution",
      data: [5, 8, 14, 10, 3],
      backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0", "#9966ff"],
      hoverOffset: 8
    }]
  },
  options: chartOptions
});

let lineCtx = document.getElementById("lineChart").getContext("2d");
new Chart(lineCtx, {
  type: "line",
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [{
      label: "User Engagement",
      data: [5, 15, 25, 40, 60],
      borderColor: "#36a2eb",
      backgroundColor: "rgba(54, 162, 235, 0.3)",
      fill: true,
      tension: 0.4
    }]
  },
  options: chartOptions
});



//------------------------------------ updat admin profile ----------------------------------------------------------//

const fetchProfileData = async (user) => {
  if (!user) {
    console.log("❌ No user logged in!");
    return;
  }

  const userId = user.uid;
  const userRef = doc(db, "admins", userId);

  try {
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      const userData = docSnap.data();
      console.log("✅ Profile Data Fetched:", userData);

      //  Update UI
      document.getElementById("profile-name").innerText = userData.name || "No Name";
      document.getElementById("profile-email").innerText = userData.email || "No Email";
      document.getElementById("profile-contact").innerText = userData.contact || "No Contact";
      document.getElementById("profile-img").src = userData.profileImage || "default-profile.jpg";
      document.getElementById("modalProfileImg").src = userData.profileImage || "default-profile.jpg";
    } else {
      console.log("❌ No Profile Data Found!");
    }
  } catch (error) {
    console.error("❌ Error Fetching Profile Data:", error);
  }
};

// Profile Update Function
const uploadImg = async (user) => {
  if (!user) {
    alert("User not logged in!");
    return;
  }

  const userId = user.uid;
  const userRef = doc(db, "admins", userId);
  const docSnap = await getDoc(userRef);

  let profileImageUrl = document.getElementById("profile-img").src;
  const name = document.getElementById("nameInput").value;
  const email = document.getElementById("emailInput").value;
  const contact = document.getElementById("contactInput").value;

  if (!name || !email || !contact) {
    alert("Please fill all fields!");
    return;
  }

 
  const fileInput = document.getElementById("modalFileInput");
  if (fileInput.files.length > 0) {
    const selectedImg = fileInput.files[0];

    const cloudName = "dp7lcxxhn";
    const presetName = "firebaseXcloudinary";
    const formData = new FormData();
    formData.append("file", selectedImg);
    formData.append("upload_preset", presetName);

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData
            });
    const data = await response.json();
    if (data.secure_url) {
      profileImageUrl = data.secure_url;
    } else {
      alert("Upload failed. Try again.");
      return;
    }
  } catch (error) {
    console.error("❌ Upload Error:", error);
    alert("Something went wrong!");
    return;
  }
}

try {
  if (docSnap.exists()) {
    // Update Existing Document
    await updateDoc(userRef, { name, email, contact, profileImage: profileImageUrl });
    console.log("✅ Firestore Updated Successfully!");
  } else {
    // Create New Document If It Doesn't Exist
    await setDoc(userRef, { name, email, contact, profileImage: profileImageUrl });
    console.log(" New Firestore Document Created!");
  }

  alert("Profile updated successfully!");
  closeModal();


  fetchProfileData(user);
} catch (error) {
  console.error("❌ Firestore Update Error:", error);
  alert("Failed to update profile in Firestore!");
}
};

// Ensure User is Logged In Before Fetching Profile Data
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("✅ User Logged In:", user.uid);
    fetchProfileData(user);

 
    document.getElementById("uploadBtn").addEventListener("click", () => uploadImg(user));
  } else {
    console.log("❌ No User Logged In!");
  }
});
