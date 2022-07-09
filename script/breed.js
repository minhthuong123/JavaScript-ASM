"use strict";

//todo 1. Bổ sung Animation cho Sidebar
const sidebar = document.getElementById("sidebar");
sidebar.addEventListener("click", function () {
  if (sidebar.className === "active") {
    const classes = sidebar.classList;
    classes.remove("active");
  } else {
    if (sidebar.className === "") {
      const classes = sidebar.classList;
      classes.add("active");
    }
  }
});

const submitBtnbreed = document.getElementById("submit-btn");
//todo Bắt sự kiên vào input Breed
submitBtnbreed.addEventListener("click", function () {
  const Inputbreed = document.getElementById("input-breed").value;
  const Inputtype = document.getElementById("input-type").value;

  if (Inputbreed == "" || Inputbreed == "") {
    alert("Please fill out the form");
    return;
  } else {
    if (Inputtype == "Dog" || Inputtype == "Cat") {
    } else {
      alert("Please select Type!");
      return;
    }
  }
  let breedArr = localStorage.getItem("breedArr")
    ? JSON.parse(localStorage.getItem("breedArr"))
    : [];
  breedArr.push({
    breed: Inputbreed,
    type: Inputtype,
  });
  localStorage.setItem("breedArr", JSON.stringify(breedArr));
  renderbreedArr();
  breedToStorage();
  renderBreed();
});
//!         3. Chức năng: quản lý Breed
//todo Hiển thị danh sách breed
const tableBody = document.getElementById("tbody2");
function renderbreedArr() {
  tableBody.innerHTML = "";
  let breedArr = localStorage.getItem("breedArr")
    ? JSON.parse(localStorage.getItem("breedArr"))
    : [];
  breedArr.map((value, index) => {
    const row = document.createElement("tr");
    row.innerHTML += `  
      <th scope="row">${index + 1}</th>
      <td>${value.breed}</td>
      <td>${value.type}</td>
      <td>
      <button type="button" class="btn btn-danger btn-delete"
              onclick="deletebreed(${index})">Delete</button>  
      </td>
          </td>
  `;
    tableBody.appendChild(row);
  });
}

//todo xóa danh sách hiện thị Breed
function deletebreed(index) {
  let breedArr = localStorage.getItem("breedArr")
    ? JSON.parse(localStorage.getItem("breedArr"))
    : [];
  const isConfirm = confirm("Are you sure?");
  if (!isConfirm) return;
  breedArr.splice(index, 1);
  localStorage.setItem("breedArr", JSON.stringify(breedArr));
  tableBody.innerHTML = "";
  renderbreedArr();
}
