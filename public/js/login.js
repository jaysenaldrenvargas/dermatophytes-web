function login() {
    var sign_email = document.getElementById("inputEmail").value;
    var sign_password = document.getElementById("inputPassword").value;

    firebase.auth().signInWithEmailAndPassword(sign_email, sign_password)
        .then(() => {
            window.location.href = "index.html";
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorCode + " | " + errorMessage);
        }
        );
}

var input = document.getElementById("inputPassword");
input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("btn_login").click();
    }
});
