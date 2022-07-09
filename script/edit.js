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

//!       danh sách hiện pet
var tableBodyEl1 = document.getElementById("tbody1");
function renderTableData() {
  tableBodyEl1.innerHTML = "";
  let petArr = localStorage.getItem("pet")
    ? JSON.parse(localStorage.getItem("pet"))
    : [];

  petArr.map((value, index) => {
    const row1 = document.createElement("tr");
    row1.innerHTML += `
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
    <td>
    <button type="button" class="btn btn-danger btn-delete" id="background"
    onclick="editpet(${index})">Edit</button>
    </td>
        </td>
`;
    tableBodyEl1.appendChild(row1);
  });
}

//!           5. Chức năng: Edit

function editpet(index) {
  let petArr = localStorage.getItem("pet")
    ? JSON.parse(localStorage.getItem("pet"))
    : [];
  document.getElementById(
    "edit"
  ).innerHTML = `<div class="container" id="main" >
  <div class="row justify-content-center align-items-center mt-4 " id ="container-form">
    <div class="col-lg-6 col-lg-offset-4">
      <form style="display:inline-block" id="none">
      <div class="form-group">
            <input type="hidden" id="index">
          </div>
        <div class="form-group row mb-3">
          <label for="input-id" class="col-sm-3 col-form-label">Pet ID</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" id="input-id" placeholder="Input ID" disabled>
          </div>
        </div>
        <div class="form-group row mb-3">
          <label for="input-name" class="col-sm-3 col-form-label">Pet Name</label>
          <div class="col-sm-5">
            <input type="text" class="form-control" id="input-name" placeholder="Input Name">
          </div>
          <label for="input-age" class="col-sm-1 col-form-label"
            style="text-align:right">Age</label>
          <div class="col-sm-3">
            <input type="number" class="form-control" id="input-age" placeholder="Input Age">
          </div>
        </div>
        <div class="form-group row mb-3">
          <label for="input-type" class="col-sm-3 col-form-label">Type</label>
          <div class="col-sm-9">
            <select class="form-control" id="input-type" onchange="clickchange()">
              <option>Select Type</option>
              <option>Dog</option>
              <option>Cat</option>
            </select>
          </div>
        </div>
        <div class="form-group row mb-3">
          <label for="input-weight" class="col-sm-3 col-form-label">Weight</label>
          <div class="col-sm-3">
            <input type="number" class="form-control" id="input-weight"
              placeholder="Input Weight">
          </div>

          <label for="input-length" class="col-sm-3 col-form-label"
            style="text-align:right">Length</label>
          <div class="col-sm-3">
            <input type="number" class="form-control" id="input-length"
              placeholder="Input Length">
          </div>
        </div>
        <div class="form-group row mb-3">
          <label class="col-sm-3 col-form-label">Color</label>
          <div class="col-sm-3">
            <input type="color" class="form-control" id="input-color-1">
          </div>
          <label for="input-breed" class="col-sm-3 col-form-label"
            style="text-align:right">Breed</label>
          <div class="col-sm-3">
            <select class="form-control" id="input-breed" >
            <option>${petArr[index].breed}</option>
            </select>
          </div>
        </div>
        <div class="form-group row mb-3">
          <div class="col-sm-3"></div>
          <div class="custom-control custom-checkbox col-sm-3">
            <input type="checkbox" class="custom-control-input" id="input-vaccinated">
            <label class="custom-control-label" for="input-vaccinated">Vaccinated</label>
          </div>
          <div class="custom-control custom-checkbox col-sm-3">
            <input type="checkbox" class="custom-control-input" id="input-dewormed">
            <label class="custom-control-label" for="input-dewormed">Dewormed</label>
          </div>
          <div class="custom-control custom-checkbox col-sm-3">
            <input type="checkbox" class="custom-control-input" id="input-sterilized">
            <label class="custom-control-label" for="input-sterilized">Sterilized</label>
          </div>
        </div>
        <button type="button" class="btn btn-primary" onclick="submitedit()" >Submit</button>
      </form>
    </div>
  </div>
</div>
`;

//* edit form breed
if (petArr[index].type == "Dog") {
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
        x.setAttribute("value", `${value.breed}`);
        var t = document.createTextNode(`${value.breed}`);
        x.appendChild(t);
        document.getElementById("input-breed").appendChild(x);
      });
    }
  });
} else {
  if (petArr[index].type === "Cat") {
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
          x.setAttribute("value", `${value.breed}`);
          var t = document.createTextNode(`${value.breed}`);
          x.appendChild(t);
          document.getElementById("input-breed").appendChild(x);
        });
      }
    });
  } else document.getElementById("input-breed").innerHTML = "Select Breed";
}



  //* try xuất lại giá trị pet

  
  console.log(petArr[index].breed)
  document.getElementById("input-id").value = petArr[index].id;
  document.getElementById("input-name").value = petArr[index].name;
  document.getElementById("input-age").value = petArr[index].age;
  document.getElementById("input-type").value = petArr[index].type;
  document.getElementById("input-weight").value = petArr[index].weight;
  document.getElementById("input-length").value = petArr[index].length;
  document.getElementById("input-color-1").value = petArr[index].color;
  document.getElementById("input-breed").value = petArr[index].breed;
  document.getElementById("input-vaccinated").checked =
    petArr[index].vaccinated;
  document.getElementById("input-dewormed").checked = petArr[index].dewormed;
  document.getElementById("input-sterilized").checked =
    petArr[index].sterilized;
  document.getElementById("index").value = index;
  console.log(petArr);
}
function submitedit() {
  //* edit object localstorage
  let petArr = localStorage.getItem("pet")
    ? JSON.parse(localStorage.getItem("pet"))
    : [];
  let index = document.getElementById("index").value;
  petArr[index] = {
    id: document.getElementById("input-id").value,
    name: document.getElementById("input-name").value,
    age: document.getElementById("input-age").value,
    type: document.getElementById("input-type").value,
    weight: document.getElementById("input-weight").value,
    length: document.getElementById("input-length").value,
    color: document.getElementById("input-color-1").value,
    breed: document.getElementById("input-breed").value,
    vaccinated: document.getElementById("input-vaccinated").checked,
    dewormed: document.getElementById("input-dewormed").checked,
    sterilized: document.getElementById("input-sterilized").checked,
    date: new Date(),
  };
  //* edit object localtorage breed
  let breedArr = localStorage.getItem("breedArr")
    ? JSON.parse(localStorage.getItem("breedArr"))
    : [];

  localStorage.setItem("pet", JSON.stringify(petArr));
  document.getElementById("none").style.display = "none";
  renderTableData();
  renderbreedArr();
}





var typeInput = document.getElementById("input-type");
function clickchange() {
  
}