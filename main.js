const btnAdd = document.querySelector(".add-form");
const deleteAll = document.querySelector(".deleteAll-btn");
const tasks = document.querySelector(".tasks-list");
const input = document.querySelector(".input-text");
const inputContainer = document.querySelector(".input-container");
//
// const deleteBtn = tasks.querySelector("delete-btn");

let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
//Local Storage
function saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(taskList));
}

function form(e) {
  e.preventDefault();
  const taskname = input.value.trim();
  if (taskname.length < 1) {
    inputContainer.classList.add("empty-form");
    setTimeout(() => {
      inputContainer.classList.remove("empty-form");
    }, 200);
    return;
  } else if (
    taskList.some((e) => e.name.toLowerCase() === taskname.toLowerCase())
  ) {
    alert("Ya existe esta tarea");
    return;
  } else {
    taskList = [...taskList, { id: Date.now(), name: taskname }];

    //Para guardar las tareas se pueden bien crear los atributos en el spread, "id", "nombre", o tambien se puede crear un objeto y pasarle ese objeto
    //EJEMPLO:
    // taskList = [...taskList, objTasks];
    // let objTasks = {
    //   name: taskname,
    //   id: Date.now(),
    // };
    render();
    btnAdd.reset();
    toggleDeleteAll();
    saveToLocalStorage();
  }
}

//render
const createTask = (tarea) => {
  return `<li>${tarea.name}<img class="delete-btn" src="./img/delete.svg" alt="boton de borrar" data-id="${tarea.id}"></li>`;
};

function render() {
  tasks.innerHTML = taskList.map((task) => createTask(task)).join("");
  // taskList.map((task) => (tasks.innerHTML = createTask(task))); ESTE ESTA MAL, LO QUE HACE ES REEMPLAZAR LA QUE APARECE EN PANTALLA
}
//Delete tasks
const removeTask = (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const filterId = Number(e.target.dataset.id);
    taskList = taskList.filter((tareas) => tareas.id !== filterId);
    render();
    toggleDeleteAll();
    saveToLocalStorage();
  }
};

const removeAll = () => {
  taskList = [];
  render();
  toggleDeleteAll();
  saveToLocalStorage();
};

//remove all visibility
const toggleDeleteAll = () => {
  if (!taskList.length) {
    deleteAll.classList.add("hidden");
  } else {
    deleteAll.classList.remove("hidden");
  }
};
toggleDeleteAll();

//INIT
const init = () => {
  btnAdd.addEventListener("submit", form);
  tasks.addEventListener("click", removeTask);
  deleteAll.addEventListener("click", removeAll);
  document.addEventListener("DOMContentLoaded", toggleDeleteAll);
  document.addEventListener("DOMContentLoaded", render);
};

init();
