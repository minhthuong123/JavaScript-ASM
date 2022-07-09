"use strict";

//!          1. Bổ sung Animation cho Sidebar
const sidebar = document.getElementById("sidebar");
sidebar.addEventListener("click", function() {
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

//* Bắt sự kiện
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
var BMI = document.getElementById("BMI-btn");
//* bắt đầu Click vào nút "Submit"
submitBtn.addEventListener("click", function(e) {
    //* -lấy dữ liệu từ input form
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
        date: new Date().toLocaleDateString("en-GB"),
    };

    //*  validata dữ liệu hợp lệ
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
                if (data.type == "Dog" || data.type == "Cat") {} else {
                    alert("Please select Type!");
                    return;
                }
            }
        }
    }
    /*
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
*/
    //*  giá trị id k bị trùng được push. nếu trùng báo lỗi
    if (!checkID(idInput)) {
        petArr[petArr.length] = data;
    } else alert("ID must unique!");
    saveToStorage();
    renderTableData();
    resetForm();
});
let petArr = localStorage.getItem("pet") ?
    JSON.parse(localStorage.getItem("pet")) : [];
console.log(petArr)
    //* giá trị ID không trùng đầu vào
function checkID(idInput) {
    for (var i = 0; i < petArr.length; i++) {
        if (petArr[i].id == idInput.value) {
            return true;
        }
    }
}

//!           4. Hiển thị Breed trên form
//* lọc danh sách breed
function clickchange() {
    if (typeInput.value === "Dog") {
        document.getElementById("input-breed").innerHTML = "";
        let breedArr = localStorage.getItem("breedArr") ?
            JSON.parse(localStorage.getItem("breedArr")) : [];
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
            let breedArr = localStorage.getItem("breedArr") ?
                JSON.parse(localStorage.getItem("breedArr")) : [];
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
        } else(document.getElementById("input-breed").innerHTML = "Select Breed");
    }
}

//!       danh sách hiện pet
var tableBodyEl = document.getElementById("tbody");

function renderTableData() {
    tableBodyEl.innerHTML = "";
    let petArr = localStorage.getItem("pet") ?
        JSON.parse(localStorage.getItem("pet")) : [];

    petArr.map((value, index) => {
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
    <td>
    <button type="button" class="btn btn-danger btn-delete"
    onclick="deletepet(${index})">Delete</button> 
    </td>
        </td>
`;
        tableBodyEl.appendChild(row);
    });
}

//todo xóa danh sách hiện thị Breed
function deletepet(index) {
    let petArr = localStorage.getItem("pet") ?
        JSON.parse(localStorage.getItem("pet")) : [];
    const isConfirm = confirm("Are you sure?");
    if (!isConfirm) return;
    petArr.splice(index, 1);
    localStorage.setItem("pet", JSON.stringify(petArr));
    renderTableData();
}

// todo xóa dữ liệu vừa nhập trên form
function resetForm() {
    document.getElementById("input-id").value = "";
    document.getElementById("input-name").value = "";
    document.getElementById("input-age").value = "";
    document.getElementById("input-type").value = "Select Type";
    document.getElementById("input-weight").value = "";
    document.getElementById("input-length").value = "";
    document.getElementById("input-breed").value = "";
    document.getElementById("input-vaccinated").checked = "";
    document.getElementById("input-dewormed").checked = "";
    document.getElementById("input-sterilized").checked = "";
}

// todo 3. hiễn thị Show All Pet và Show Healthy Pet
let healthyPetArr = [];

let healthy = document.getElementById("healthy-btn");
healthy.addEventListener("click", function() {
    if (healthy.innerText === "Show All Pet") {
        healthy.innerText = "Show Healthy Pet";
        renderTableData();
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

function renderhealthyPetArr() {
    tableBodyEl.innerHTML = "";
    healthyPetArr.map((value, index) => {
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
    <td>
    <button type="button" class="btn btn-danger btn-delete"
    onclick="deletepet(${index})">Delete</button> 
    </td>
        </td>
`;
        tableBodyEl.appendChild(row);
    });
}