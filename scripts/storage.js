"use strict";
//* lưu data localstorage register
function saveToStorage() {
    localStorage.setItem("data", JSON.stringify(userArr));
}
let userArr = localStorage.getItem("data") ?
    JSON.parse(localStorage.getItem("data")) : [];

