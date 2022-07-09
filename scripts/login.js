"use strict";

//todo 3. Chức năng Login
let loginSubmit = document.getElementById("btn-submit");
let loginUsername = document.getElementById("input-username");
let loginPassword = document.getElementById("input-password");
//* điều kiện đăng nhập
loginSubmit.addEventListener("click", () => {
    let login = {
        username: loginUsername.value,
        password: loginPassword.value,
    };
    let userArr = localStorage.getItem("data") ?
        JSON.parse(localStorage.getItem("data")) : [];
    for (let i = 0; i < userArr.length; i++) {
        if (
            userArr[i].username == login.username &&
            userArr[i].password == login.password
        ) {
            let currentUser = localStorage.getItem("currentUser") ?
                JSON.parse(localStorage.getItem("currentUser")) : [];
            currentUser.push({
                currentusername: login.username,
                currentpassword: login.password,
                firstName: userArr[i].firstName,
            });
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
            alert("Logged in successfully");
            window.location.href = "../index.html";

            return
        } else {
            if (!login.username || !login.password) {
                alert("Please enter full information");
                return;
            } else {
                if (login.password.length < 8) {
                    alert("Password must be more than 8 characters");
                    return;
                } else {
                    alert("Login failed");
                    return;
                }
            }
        }
    }
    renderlogin();
});