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
var idInput = document.getElementById("input-id");
var nameInput = document.getElementById("input-name");
var ageInput = document.getElementById("input-age");
var typeInput = document.getElementById("input-type");
var weightInput = document.getElementById("input-weight");
var lengthInput = document.getElementById("input-length");
var colorInput = document.getElementById("input-color-1");
var breedInput = document.getElementById("input-breed");
var vaccinatedInput = document.getElementById("input-vaccinated");
var dewormedInput = document.getElementById("input-dewormed");
var sterilizedInput = document.getElementById("input-sterilized");
let findpet = document.getElementById("find-btn");
findpet.addEventListener("click", function () {
  let petArr = localStorage.getItem("pet")
    ? JSON.parse(localStorage.getItem("pet"))
    : [];
  let petSearch = [];
 
  if (idInput.value) {
    petSearch = petArr.filter((value) => {
      return value.id.toUpperCase().includes(idInput.value.toUpperCase());
    });
  } else {
    if (nameInput.value) {
      petSearch = petArr.filter((value) => {
        return value.name.toUpperCase().includes(nameInput.value.toUpperCase());
      });
    } else {
      if (typeInput.value) {
        petSearch = petArr.filter((value) => {
          return value.type
            .toUpperCase()
            .includes(typeInput.value.toUpperCase());
        });
      } else {
        if (breedInput.value) {
          petSearch = petArr.filter((value) => {
            return value.breed
              .toUpperCase()
              .includes(breedInput.value.toUpperCase());
          });
        } 
      }
    }
  }

//* search checked
  if (vaccinatedInput.checked == true) {
    petSearch = petArr.filter((value) => {
      return value.vaccinated == true;
    });
  
  }else {
    if ((dewormedInput.checked == true)) {
      petSearch = petArr.filter((value) => {
        return value.dewormed == true;
      });
    } else {
      if (sterilizedInput.checked == true) {
        petSearch = petArr.filter((value) => {
          return value.sterilized == true;
        });
      }
    }
  }
  console.log(petSearch);
  renderpetSearch(petSearch);
});

//!       danh sách hiện pet
var tableBodyEl = document.getElementById("tbody");
function renderpetSearch(petSearch) {
  tableBodyEl.innerHTML = "";
  petSearch.map((value, index) => {
    const row = document.createElement("tr");
    row.innerHTML += `
    <th scope="row">${value.id}</th>
    <td>${value.name}</td>
    <td>${value.age}</td>
    <td>${value.type}</td>
    <td>${value.weight} kg</td>
    <td>${value.length} cm</td>
    <td>${value.breed}</td>
    <td>
        <i class="bi bi-square-fill" style="color: ${value.color}"></i>
    </td>
    <td><i class="bi ${
      value.vaccinated ? "bi-check-circle-fill" : "bi bi-x-circle-fill"
    } "></i></td>
    <td><i class="bi ${
      value.dewormed ? "bi-check-circle-fill" : "bi bi-x-circle-fill"
    } "></i></td>
    <td><i class="bi ${
      value.sterilized ? "bi-check-circle-fill" : "bi bi-x-circle-fill"
    } "></i></td>
    <td>${value.date}</td>
    `;
    tableBodyEl.appendChild(row);
  });
}

//! hiển thị Select Breed Search pet
function clickchange() {
  if (typeInput.value === "Dog") {
    document.getElementById("input-breed").innerHTML = "";
    let breedArr = localStorage.getItem("breedArr")
      ? JSON.parse(localStorage.getItem("breedArr"))
      : [];
    breedArr.map((value) => {
      if (value.type === "Dog") {
        let breedArrS = [];
        breedArrS.push(value);
        breedArrS.map((value, index) => {
          var x = document.createElement("OPTION");
          x.setAttribute("index", `${index}`);
          x.setAttribute("value", `${value.breed}`);
          var t = document.createTextNode(`${value.breed}`);
          x.appendChild(t);
          document.getElementById("input-breed").appendChild(x);
        });
      }
    });
  } else {
    if (typeInput.value === "Cat") {
      document.getElementById("input-breed").innerHTML = "";
      let breedArr = localStorage.getItem("breedArr")
        ? JSON.parse(localStorage.getItem("breedArr"))
        : [];
      breedArr.map((value) => {
        if (value.type === "Cat") {
          let breedArrS = [];
          breedArrS.push(value);
          breedArrS.map((value, index) => {
            var x = document.createElement("OPTION");
            x.setAttribute("index", `${index}`);
            x.setAttribute("value", `${value.breed}`);
            var t = document.createTextNode(`${value.breed}`);
            x.appendChild(t);
            document.getElementById("input-breed").appendChild(x);
          });
        }
      });
    } else (document.getElementById("input-breed").innerHTML = "Select Breed");
  }
}