"use strict";
//todo 4. Home Page

function renderlogin() {
    let btnLogout = document.getElementById("btn-logout");
  let currentUser = localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser"))
    : [];
  if (currentUser.length > 0) {
    document.getElementById("login-modal").style.display = "none";
    document.getElementById("main-content").style.display = "inline-block";
    document.getElementById(
      "welcome-message"
    ).innerHTML = `Welcome ${currentUser[0].firstName}`;
    
    //todo 5. Chức năng Logout
    btnLogout.addEventListener("click", ()=>{
        document.getElementById("login-modal").style.display = "inline-block";
        document.getElementById("main-content").style.display = "none";
        localStorage.removeItem("currentUser")
    });
  } else {
    if (currentUser.length == 0) {
      document.getElementById("login-modal").style.display = "inline-block";
      document.getElementById("main-content").style.display = "none";
    }
  }
}

