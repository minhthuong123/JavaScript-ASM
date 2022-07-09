"use strict";
//todo 8. Hiển thị Todo List
let btnaddtodolist = document.getElementById("btn-add");
let inputtodolist = document.getElementById("input-task");

//*a. Lưu dữ liệu vào LocalStorage
btnaddtodolist.addEventListener("click", () => {
  let inputtask = inputtodolist.value;
  if (!inputtask) {
    alert("Please select");
    return;
  } else {
    //* lưu data localstorage todo list

    let currentUser = localStorage.getItem("currentUser")
      ? JSON.parse(localStorage.getItem("currentUser"))
      : [];
    currentUser.map((value) => {
      let todoArr = localStorage.getItem("owner")
        ? JSON.parse(localStorage.getItem("owner"))
        : [];

      todoArr.push({
        task: inputtask,
        owner: value.currentusername,
        isDone: false,
      });
      localStorage.setItem("owner", JSON.stringify(todoArr));
    });
  }

  rendertask();
});

//* b. Hiển thị các Task
let todolist = document.getElementById("todo-list");
rendertask();
function rendertask() {
  let currentName;
  let currentUser = localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser"))
    : [];
  currentUser.map((value) => {
    currentName = value.currentusername;
  });
  let todoArr = localStorage.getItem("owner")
    ? JSON.parse(localStorage.getItem("owner"))
    : [];
  todolist.innerHTML = "";
  let HTML = "";
  todoArr.map((value, index) => {
    if (value.owner == currentName) {
      if (value.isDone == false) {
        HTML += `<li onclick="checkedTasks(${index})">${value.task}<span class="close" onclick="deleteTask(${index})">×</span></li>`;

      } else if (value.isDone == true) {
        HTML += `<li onclick="checkedTasks(${index})" class="checked">${value.task}<span class="close" onclick="deleteTask(${index})">×</span></li>`;
      }
    }
  });
          document.getElementById("todo-list").innerHTML = HTML;
}
rendertask();
// //* checked tasks
function checkedTasks(index) {
  let todoArr = localStorage.getItem("owner")
    ? JSON.parse(localStorage.getItem("owner"))
    : [];
  if (todoArr[index].isDone == false) {
    todoArr[index].isDone = true;
    localStorage.setItem("owner", JSON.stringify(todoArr));
    rendertask();
  } else {
    if (todoArr[index].isDone == true) {
      todoArr[index].isDone = false;
      localStorage.setItem("owner", JSON.stringify(todoArr));
      rendertask();
    }
  }
}

//* d. Delete Task
function deleteTask(index) {
  let todoArr = localStorage.getItem("owner")
    ? JSON.parse(localStorage.getItem("owner"))
    : [];
  todoArr.splice(index, 1);
  localStorage.setItem("owner", JSON.stringify(todoArr));
  todolist.innerHTML = "";
  rendertask();
}
