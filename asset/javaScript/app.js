import {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    sendPasswordResetEmail,
    db,
    doc,
    setDoc,
    getDoc,
} from "./firebase.configure.js"
////------------------------------------- register/ signup----------------------------------------------////
const register = async (ele) => {
    ele.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    console.log(email, password);

    const adminRef = doc(db, "admins", "adminInfo"); 
    const adminDoc = await getDoc(adminRef);


    try {
        
        const adminRef = doc(db, "admins", "adminInfo");
        const adminDoc = await getDoc(adminRef);

        if (adminDoc.exists()) {
            Swal.fire({
                title: " Admin Already Exists!",
                text: "Only one admin is allowed.",
                icon: "error",
                confirmButtonText: "OK",
            });
            return;
        }

        let userCredential = await createUserWithEmailAndPassword(auth, email, password);
        let user = userCredential.user;

        await setDoc(adminRef, {   
            uid: user.uid,
            email,
            role: "admin",
        });

        console.log(" Admin Registered:", user.uid);

        Swal.fire({
            title: " Admin Sign-Up Successful!",
            text: "Welcome " + email,
            icon: "success",
            confirmButtonText: "OK",
        });

    } catch (error) {
        console.log(error.message);
        Swal.fire({
            title: "❌ Error!",
            text: error.message,
            icon: "error",
            confirmButtonText: "Try Again",
        });
    }

}

document.getElementById('signUpBtn')?.addEventListener('click', register)

////------------------------------------- login/ signIn----------------------------------------------////

const login = async (ele) => {
    ele.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    console.log(email, password);



    try {
        let userLogin = await signInWithEmailAndPassword(auth, email, password);
        let user = userLogin.user;

        
        const adminRef = doc(db, "admins", "adminInfo"); 
        const adminDoc = await getDoc(adminRef);

        if (adminDoc.exists()) {
            const adminData = adminDoc.data();

            if (adminData.uid === user.uid) {
                Swal.fire({
                    title: "✅ Admin Login Successful!",
                    text: "Welcome Admin " + email,
                    icon: "success",
                    confirmButtonText: "OK",
                });

                window.location.href = "/asset/html/adminDashboard.html";
            } else {
                Swal.fire({
                    title: "❌ Access Denied!",
                    text: "You are not an admin.",
                    icon: "error",
                    confirmButtonText: "OK",
                });

                // Logout non-admin users
                await signOut(auth);
            }
        } else {
            Swal.fire({
                title: "❌ Admin Not Found!",
                text: "No admin is registered.",
                icon: "error",
                confirmButtonText: "OK",
            });
        }

    } catch (error) {
        console.log(error.message);
        Swal.fire({
            title: "❌ Login Failed!",
            text: error.message,
            icon: "error",
            confirmButtonText: "Try Again",
        });
    }
}

document.getElementById('loginBtn')?.addEventListener('click', login);

////------------------------------------- login with  google----------------------------------------------////

const provider = new GoogleAuthProvider();


provider.setCustomParameters({ prompt: "select_account" });

const signWithGoogle = async () => {

    try {
        const result = await signInWithPopup(auth, provider)
        console.log("user google sy signIn hochuka hai.");
        console.log(result.user);

        Swal.fire({
            title: "🎉 Google Sign-In Successful!",
            text: "Welcome, " + result.user.displayName,
            icon: "success",
            confirmButtonText: "OK",
        });

    } catch (error) {
        console.log(error.message);
    }
};

document.getElementById("sigInWithGoogle")?.addEventListener("click", signWithGoogle);

/////-------------------------------------logout------------------------------------------//////

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
        
        }
    } catch (error) {
        Swal.fire("Error!", "Logout nahi hua. Please try again.", "error");
        console.log("Logout nahiiiiii hua!", error);
    }
});

/////-------------------------------------forgot password----------------------------------------//////


const forgotPassword = async () => {
    const email = document.getElementById("email").value;

    if (!email) {
        Swal.fire({
            title: "⚠️ Error!",
            text: "Please enter your email address.",
            icon: "warning",
            confirmButtonText: "OK",
        });
        return;
    }

    try {
        await sendPasswordResetEmail(auth, email);
        Swal.fire({
            title: "📧 Email Sent!",
            text: "Check your inbox for the password reset link.",
            icon: "success",
            confirmButtonText: "OK",
        });
    } catch (error) {
        Swal.fire({
            title: "❌ Error!",
            text: error.message,
            icon: "error",
            confirmButtonText: "Try Again",
        });
        console.log(error.message);
    }
};

document.getElementById("forgotPswrd")?.addEventListener("click", forgotPassword);
