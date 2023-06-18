document.addEventListener("DOMContentLoaded", function () {
  var taskInput = document.getElementById("task-input");
  var addBtn = document.getElementById("add-btn");
  var taskList = document.getElementById("task-list");

  function loadTasks() {
    var savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      taskList.innerHTML = savedTasks;
      attachListeners();
    }
  }
  loadTasks();

  addBtn.addEventListener("click", function () {
    var taskText = taskInput.value;
    if (taskText && taskText.trim() !== "") {
      addTask(taskText);
      taskInput.value = "";
      saveTasks();
    }
  });
  taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      addBtn.click();
    }
  });
  function addTask(taskText) {
    var taskItem = document.createElement("li");
    taskItem.classList.add("task-item");
    taskItem.innerHTML = ` <span>${taskText}</span>
    <span class="delete-btn">X</span>
    `;
    var deleteBtn = taskItem.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", function (event) {
      taskItem.remove();
      saveTasks();
    });
    taskItem.addEventListener("click", function () {
      taskItem.classList.toggle("completed");
      saveTasks();
    });

    taskList.appendChild(taskItem);
  }
  function saveTasks() {
    localStorage.setItem("tasks", taskList.innerHTML);
  }
  function attachListeners() {
    var deleteBtns = document.getElementsByClassName("delete-btn");
    for (var i = 0; i < deleteBtns.length; i++) {
      deleteBtns[i].addEventListener("click", function (event) {
        event.target.parentNode.remove();
        saveTasks();
      });
    }
  }
});
