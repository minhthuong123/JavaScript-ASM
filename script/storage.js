"use strict";
//todo Bắt dầu sự kiện và lưu dữ liệu vào LocalStorage

  function saveToStorage(){
    localStorage.setItem("pet", JSON.stringify(petArr));
  }
  function getFromStorage(pet) {
    return localStorage.getItem("pet");
}
 
 