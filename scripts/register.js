"use strict";
//todo 2. Chức năng Register
let btnSubmit = document.getElementById("btn-submit");
let inputFirstname = document.getElementById("input-firstname");
let inputLastname = document.getElementById("input-lastname");
let inputUsername = document.getElementById("input-username");
let inputPassword = document.getElementById("input-password");
let passwordConfirm = document.getElementById("input-password-confirm");

btnSubmit.addEventListener("click", () => {
    let data = {
        firstName: inputFirstname.value,
        lastname: inputLastname.value,
        username: inputUsername.value,
        password: inputPassword.value,
        passwordConfirm: passwordConfirm.value,
    };
    if (!data.firstName ||
        !data.lastname ||
        !data.username ||
        !data.password ||
        !data.passwordConfirm
    ) {
        alert("Please enter full information");
        return;
    } else {
        if (data.password.length < 8) {
            alert("Password must be more than 8 characters");
            return;
        } else {
            if (data.password !== data.passwordConfirm) {
                alert("Password and Confirm Password must be the same");
                return;
            } else {
                if (!checkUser(inputUsername)) {
                    let userS = new User(
                        data.firstName,
                        data.lastname,
                        data.username,
                        data.password
                    );
                    userArr.push(userS);
                    window.location.href = "../pages/login.html";
                    saveToStorage();
                    alert("Sign Up Success");
                } else {
                    alert("Username already used");
                    return;
                }
            }
        }
    }
});
//* check username
function checkUser(inputUsername) {
    let userArr = localStorage.getItem("data") ?
        JSON.parse(localStorage.getItem("data")) :
        [];
    for (let i = 0; i < userArr.length; i++) {
        if (userArr[i].username === inputUsername.value) {
            return true;
        }
    }
}