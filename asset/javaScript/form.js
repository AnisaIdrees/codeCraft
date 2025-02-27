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
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
  db, doc, setDoc, getDoc, updateDoc 
} from "./firebase.config.js"

// Sign up new users with signup page
const auth = getAuth();
const register = async (e) => {
  e.preventDefault();
  let email = document.getElementById('email').value;
  let password = document.getElementById('Password').value;
  let confirmPassword = document.getElementById('exampleInputPassword').value;
  let setValid = document.querySelector('.sameValidation')
  let firstName = document.getElementById('firstName').value
  let lastName = document.getElementById('lastName').value
  let contactInfo = document.getElementById('contactInfo').value
  console.log(firstName, lastName, contactInfo);

  if (password === confirmPassword) {
    setValid.innerHTML = `<p style="color: green;">Password Matched</p>`;
  } else {
    setValid.innerHTML = `<p style="color: red;">Password not Matched</p>`
    return
  }
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('User Created:', user);
    // firebase data store
    await setDoc(doc(db, "users", user.uid), {
      firstName,
      email,
      lastName,
      contactInfo,
      isActive: true
      // userName
    });
    window.location.pathname = '/codeCraft/';
    console.log('user addded to database');
  } catch (error) {
    console.error("Signup Error:", error.code, error.message);
    alert(error.message);
    if (userCredential?.user) {
      window.location.pathname = '/codeCraft';
    }
  }
};
document.getElementById('submit')?.addEventListener('click', register);

// Sign in existing users 

const signIn = (e) => {
  e.preventDefault()

  let email = document.getElementById('email').value
  let password = document.getElementById('password').value

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('user', user);
      if (userCredential?.user) {
        if (user) {
          // alert('Login Successfull')

          if (user.email==='admin12@gmail.com') {
            window.location.pathname = '/codeCraft/asset/html/adminDashboard.html'; // Admin Dashboard

            Swal.fire({
              title: "✅Login Successful!",
              text: "Welcome to" + email,
              icon: "success",
              confirmButtonText: "OK",
          });

          } else {
            window.location.pathname = '/codeCraft'; // User Dashboard

            Swal.fire({
              title: "✅Login Successful!",
              text: "Welcome to ", email,
              icon: "success",
              confirmButtonText: "OK",
          });

          }
          // window.location.pathname = 'index.html';
        }
      }
    })
    .catch((error) => {
      // alert('Invalid Credentials',error)
      const errorCode = error.code;
      const errorMessage = error.message;
      Swal.fire({
        title: "❌ Login Failed!",
        text: error.message,
        icon: "error",
        confirmButtonText: "Try Again",
    });
      // ..
    });
  console.log(email, password)
}
document.getElementById('signIn')?.addEventListener('click', signIn)

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    console.log('No user login');
    return

  }
  let username = document.getElementById('username');
  let email = document.getElementById('email');
  let name = document.getElementById('name');
  let profileName = document.getElementById('profileName');
  let profileElement = document.getElementById('profile');
  let userLoginElement = document.getElementById('userLogin');

  if (user) {
    if (userLoginElement) {
      userLoginElement.parentNode.remove();
      let loginSec = document.querySelector('.login-sec')
      let logOutBtn = document.createElement('button')
      logOutBtn.id = 'logOut'
      logOutBtn.type = 'button'
      logOutBtn.innerText = 'log out'
      logOutBtn.classList.add('logOutBtn')
      loginSec.appendChild(logOutBtn)
      logOutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Log Out button pe click hua');
        
        const auth = getAuth();
        signOut(auth).then(() => {
          window.location.pathname = '/asset/html/login.html';
        }).catch((error) => {
          console.error('Sign out error:', error);
        });
      });
    
    }
  } else {
    // Remove profile button if No User is Logged In
    if (profileElement) {
      profileElement.parentNode.remove();
    }
  }
});

// Authentication with google
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
const google = () => {
  const result = signInWithPopup(auth, provider)
    .then((result) => {
      window.location.href = "/codeCraft/"
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      // ...
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}
document.querySelector('.google')?.addEventListener('click', google)

// forgot password
const forgotPasword = (e) => {
  e.preventDefault()
  let email = document.getElementById('email').value
  if (!email) {
    alert('Enter Valid Email')
  }
  sendPasswordResetEmail(auth, email)
    .then(() => {
      alert('Password reset email sent Sucsessfully');

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
}
document.getElementById('forgotPasword')?.addEventListener('click', forgotPasword)

// update password;

const updateUserPassword = async () => {
  try {
    const user = auth.currentUser;
    if (!user) {
      alert("No user is logged in!");
      return;
    }
    const oldPassword = document.getElementById("oldPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    if (!oldPassword || !newPassword) {
      alert("Please enter both old and new passwords.");
      return;
    }
    //Reauthenticate User
    const credential = EmailAuthProvider.credential(user.email, oldPassword);
    await reauthenticateWithCredential(user, credential);
    console.log("User reauthenticated successfully!");

    // Update Password
    await updatePassword(user, newPassword);
    alert("Password updated successfully!");
  } catch (error) {
    console.error("Error updating password:", error);
    alert(error.message);
  }
};
document.getElementById("updatePassword")?.addEventListener("click", updateUserPassword);

// uodate profile input name 
const updateProfileName = async () => {

  let username = document.getElementById('username').value
  const userRef = doc(db, "users", auth.currentUser.uid);
  console.log(username, auth.currentUser.uid);

  await updateDoc(userRef, {
    username: username
  });
  console.log('updated');

}

document.getElementById('userNameupd')?.addEventListener('click', updateProfileName)
