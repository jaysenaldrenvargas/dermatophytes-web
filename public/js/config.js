// https://firebase.google.com/docs/web/setup#available-libraries
const firebaseConfig = {
    apiKey: "AIzaSyDkOPi1CqexpFqs-AoZX4KUclBXN7Je3cE",
    authDomain: "dcdduip-online.firebaseapp.com",
    databaseURL: "https://dcdduip-online-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "dcdduip-online",
    storageBucket: "dcdduip-online.appspot.com",
    messagingSenderId: "8287410065",
    appId: "1:8287410065:web:6a64d3a4a2d59d0a02ac30"
};

firebase.initializeApp(firebaseConfig);


firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log(user.email);
    } else {
        // if (window.location.pathname != "/public/login.html") {
        if (window.location.pathname != "/login.html") {
            window.location.href = "login.html";
        }
    }
});


function signout() {
    firebase.auth().signOut().then(() => {
        console.log("signout.");
        window.location.href = "login.html";
    }).catch((error) => {
        alert(error)
    });
}