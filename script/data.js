"use strict";
//!          1. Bổ sung Animation cho Sidebar
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
//!    Chức năng Import dữ liệu upload vào localtorage
let importData = document.getElementById("import-btn");
let inputFile = document.getElementById("input-file");

importData.addEventListener("click", function (event) {
  event.preventDefault();
  if (!inputFile.value.length) return;
  let reader = new FileReader();
  reader.onload = logFile;
  reader.readAsText(inputFile.files[0]);
});
function logFile(event) {
  let str = event.target.result;
  console.log("string", str);
  localStorage.setItem("pet", str);
}

//!    Chức năng Export dữ liệu download localtorage

let exportData = document.getElementById("export-btn");
function exportToJsonFile(jsonData) {
  let dataStr = JSON.stringify(jsonData);
  let dataUri =
    "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

  let exportFileDefaultName = "dataPet.json";

  let linkElement = document.createElement("a");
  linkElement.setAttribute("href", dataUri);
  linkElement.setAttribute("download", exportFileDefaultName);
  linkElement.click();
}
exportData.addEventListener("click", function () {
  let petArr = localStorage.getItem("pet")
    ? JSON.parse(localStorage.getItem("pet"))
    : [];
  exportToJsonFile(petArr);
});

let petArr = localStorage.getItem("pet")
    ? JSON.parse(localStorage.getItem("pet"))
    : [];
console.log(petArr)