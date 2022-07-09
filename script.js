"use strict";

//* 1.1-Bắt sự kiện
var submitBtn = document.getElementById("submit-btn");
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

var tableBodyEl = document.getElementById("tbody");
var tableBodyEl1 = document.getElementById("tbody1");
var tableBodyEl2 = document.getElementById("tbody2");
var BMI = document.getElementById("BMI-btn");
//* bắt đầu Click vào nút "Submit"
submitBtn.addEventListener("click", function (e) {
  //* 1.2-lấy dữ liệu từ input form
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: new Date(),
  };

  //* 1.3- validata dữ liệu hợp lệ
  //* trường hợp nhập thiếu dữ liệu
  if (
    data.id == "" ||
    data.name == "" ||
    data.weight == "" ||
    data.length == "" ||
    data.type == "" ||
    data.breed == ""
  ) {
    alert("Please fill out the form");
    return;
  }

  //* age chỉ nhận giá trị 1-15
  else {
    if (data.age < 1 || data.age > 15 || !data.age) {
      alert("Age must be between 1 and 15!");
      return;
    }
    //* weight chỉ nhận giá trị 1-15
    else {
      if (data.weight < 1 || data.weight > 15 || !data.weight) {
        alert("weight must be between 1 and 15!");
        return;
      }
      //* Length chỉ nhận giá trị 1-15
      else {
        if (data.length < 1 || data.length > 100 || !data.length) {
          alert("Length must be between 1 and 100!");
          return;
        }
        //* Bắt buộc phải chọn giá trị cho trường Type
        if (data.type == "Dog" || data.type == "Cat") {
        } else {
          alert("Please select Type!");
          return;
        }
      }
    }
  }

  //* Bắt buộc phải chọn giá trị cho trường Breed
  if (
    data.breed == "Tabby" ||
    data.breed == "Domestic Medium Hair" ||
    data.breed == "Mixed Breed" ||
    data.breed == "Domestic Short Hair" ||
    data.breed == "Terrier" ||
    data.breed == "Greyhound" ||
    data.breed == "Persian" ||
    data.breed == "Rottweiler"
  ) {
  } else {
    alert("Please select Breed!");
    return;
  }

  //*  giá trị id k bị trùng được push. nếu trùng báo lỗi
  if (!checkID(idInput)) {
    petArr[petArr.length] = data;
    renderTableData();
    resetForm();
  } else alert("ID must unique!");
});

//*lưu dữ liệu
const petArr = [];
console.log(petArr);

//* 1.3 giá trị ID không trùng đầu vào
function checkID(idInput) {
  var list = petArr;
  for (var i = 0; i < list.length; i++) {
    if (list[i].id == idInput.value) {
      return true;
    }
  }
}
//*1.5 danh sach all pet input

function renderTableData() {
  const row = document.createElement("tr");
  for (let i = 0; i < petArr.length; i++) {
    row.innerHTML = `

    <th scope="row">${petArr[i].id}</th>

    <td>${petArr[i].name}</td>

    <td>${petArr[i].age}</td>

    <td>${petArr[i].type}</td>

    <td>${petArr[i].weight} kg</td>

    <td>${petArr[i].length} cm</td>

    <td>${petArr[i].breed}</td>

    <td>

        <i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i>

    </td>

    <td><i class="bi ${
      petArr[i].vaccinated ? "bi-check-circle-fill" : "bi bi-x-circle-fill"
    } "></i></td>

    <td><i class="bi ${
      petArr[i].dewormed ? "bi-check-circle-fill" : "bi bi-x-circle-fill"
    } "></i></td>

    <td><i class="bi ${
      petArr[i].sterilized ? "bi-check-circle-fill" : "bi bi-x-circle-fill"
    } "></i></td>
    <td>${petArr[i].BMI === undefined ? "?" : petArr[i].BMI}</td>

    <td>${petArr[i].date.toLocaleDateString("en-US")}</td>

    <td>

    <button type="button" class="btn btn-danger btn-delete"

            id="btn-delete" data-id="${petArr[i].id}">Delete</button>
    
    </td>

        </td>

`;
  }
  tableBodyEl.appendChild(row);
}

//* xóa pet petArr hiện thị danh sách input

tableBodyEl.addEventListener("click", function (e) {
  if (e.target.id != "btn-delete") return;

  const petId = e.target.getAttribute("data-id");

  if (!petId) return;

  const isConfirm = confirm("Are you sure?");

  if (!isConfirm) return;
  for (let i = 0; i < petArr.length; i++) {
    if (petArr[i].id === petId) {
      petArr.splice(i, 1);
    }
  }
  tableBodyEl.innerHTML = "";
  renderTableData(petArr);
});
//* xóa pet healthyPetArr hiện thị danh sánh thú cưng khỏe mạnh

tableBodyEl1.addEventListener("click", function (e) {
  if (e.target.id != "btn-delete") return;

  const petId = e.target.getAttribute("data-id1");

  if (!petId) return;

  const isConfirm = confirm("Are you sure?");

  if (!isConfirm) return;
  for (let i = 0; i < healthyPetArr.length; i++) {
    if (healthyPetArr[i].id === petId) {
      healthyPetArr.splice(i, 1);
    }
  }
  for (let i = 0; i < petArr.length; i++) {
    if (petArr[i].id === petId) {
      petArr.splice(i, 1);
    }
  }
  tableBodyEl.innerHTML = "";
  renderTableData(petArr);
  tableBodyEl1.innerHTML = "";
  renderhealthyPetArr();
});
//* xóa pet petArrs hiển thị all pet
tableBodyEl2.addEventListener("click", function (e) {
  if (e.target.id != "btn-delete") return;

  const petId = e.target.getAttribute("data-id2");

  if (!petId) return;

  const isConfirm = confirm("Are you sure?");

  if (!isConfirm) return;

  petArrs.splice(
    petArrs.findIndex((pet) => pet.id == petId),
    1
  );

  renderpetArrs(petArrs);
});
// todo 3. hiễn thị Show All Pet và Show Healthy Pet
let healthyPetArr = [];
let petArrs = petArr;
console.log(petArrs);
console.log(healthyPetArr);
let healthy = document.getElementById("healthy-btn");
healthy.addEventListener("click", function () {
  if (healthy.innerText === "Show All Pet") {
    healthy.innerText = "Show Healthy Pet";
    tableBodyEl2.innerHTML = "";
    renderpetArrs(petArrs);
  } else {
    healthy.innerText = "Show All Pet";
    for (let i = 0; i < petArr.length; i++) {
      if (
        petArr[i].vaccinated == true &&
        petArr[i].dewormed == true &&
        petArr[i].sterilized == true
      ) {
        healthyPetArr.push(petArr[i]);
        renderhealthyPetArr();
      }
    }
  }
});
// todo 3. function renderhealthyPetArr() danh sách hiễn thị thú cưng khỏe mạnh

function renderhealthyPetArr() {
  tableBodyEl.innerHTML = "";
  tableBodyEl2.innerHTML = "";
  const row = document.createElement("tr");
  for (let i = 0; i < healthyPetArr.length; i++) {
    row.innerHTML = `

<th scope="row">${healthyPetArr[i].id}</th>

<td>${healthyPetArr[i].name}</td>

<td>${healthyPetArr[i].age}</td>

<td>${healthyPetArr[i].type}</td>

<td>${healthyPetArr[i].weight} kg</td>

<td>${healthyPetArr[i].length} cm</td>

<td>${healthyPetArr[i].breed}</td>

<td>

  <i class="bi bi-square-fill" style="color: ${healthyPetArr[i].color}"></i>

</td>

<td><i class="bi ${
      healthyPetArr[i].vaccinated
        ? "bi-check-circle-fill"
        : "bi bi-x-circle-fill"
    } "></i></td>

<td><i class="bi ${
      healthyPetArr[i].dewormed ? "bi-check-circle-fill" : "bi bi-x-circle-fill"
    } "></i></td>

<td><i class="bi ${
      healthyPetArr[i].sterilized
        ? "bi-check-circle-fill"
        : "bi bi-x-circle-fill"
    } "></i></td>
<td>${healthyPetArr[i].BMI === undefined ? "?" : healthyPetArr[i].BMI}</td>

<td>${healthyPetArr[i].date.toLocaleDateString("en-US")}</td>

<td>

<button type="button" class="btn btn-danger btn-delete"

      id="btn-delete" data-id1="${healthyPetArr[i].id}">Delete</button>

</td>

  </td>

`;

    tableBodyEl1.appendChild(row);
  }
}

// todo 3. function renderpetArrs() danh sách hiễn thị all thú cưng
function renderpetArrs(pets) {
  tableBodyEl1.innerHTML = "";
  tableBodyEl2.innerHTML = "";
  pets.forEach((pet) => {
    const row = document.createElement("tr");

    row.innerHTML = genRow(pet);

    tableBodyEl2.appendChild(row);
  });
}

function genRow(row) {
  return `

      <th scope="row">${row.id}</th>

      <td>${row.name}</td>

      <td>${row.age}</td>

      <td>${row.type}</td>

      <td>${row.weight} kg</td>

      <td>${row.length} cm</td>

      <td>${row.breed}</td>

      <td>

          <i class="bi bi-square-fill" style="color: ${row.color}"></i>

      </td>

      <td><i class="bi ${
        row.vaccinated ? "bi-check-circle-fill" : "bi bi-x-circle-fill"
      } "></i></td>

      <td><i class="bi ${
        row.dewormed ? "bi-check-circle-fill" : "bi bi-x-circle-fill"
      } "></i></td>

      <td><i class="bi ${
        row.sterilized ? "bi-check-circle-fill" : "bi bi-x-circle-fill"
      } "></i></td>
      <td>${row.BMI === undefined ? "?" : row.BMI}</td>

      <td>${row.date.toLocaleDateString("en-US")}</td>

      <td>

          <button type="button" class="btn btn-danger btn-delete"

          id="btn-delete" data-id2="${row.id}">Delete</button>

      </td>

  `;
}

// todo 7. hiện chỉ số BMI

BMI.addEventListener("click", function (BMI) {
  for (let i = 0; i < petArr.length; i++) {
    if (petArr[i].type === "Dog") {
      var BMIs = (
        (petArr[i].weight * 703) /
        (petArr[i].length * petArr[i].length)
      ).toFixed(2);
    } else {
      if (petArr[i].type === "Cat") {
        var BMIs = (
          (petArr[i].weight * 886) /
          (petArr[i].length * petArr[i].length)
        ).toFixed(2);
      }
    }
    petArr[i].BMI = BMIs;
    console.log(BMIs);
  }
  renderTableData(petArr);
  renderhealthyPetArr(healthyPetArr);
  renderpetArrs(petArrs);
});

// todo 1.6. xóa dữ liệu vừa nhập trên form
function resetForm() {
  document.getElementById("input-id").value = "";
  document.getElementById("input-name").value = "";
  document.getElementById("input-age").value = "";
  document.getElementById("input-type").value = "";
  document.getElementById("input-weight").value = "";
  document.getElementById("input-length").value = "";
  document.getElementById("input-color-1").value = "";
  document.getElementById("input-breed").value = "";
  document.getElementById("input-vaccinated").checked = "";
  document.getElementById("input-dewormed").checked = "";
  document.getElementById("input-sterilized").checked = "";
}
