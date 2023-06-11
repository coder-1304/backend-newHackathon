const draggables = document.querySelectorAll(".task");
const droppables = document.querySelectorAll(".swim-lane");
console.log('drag.js served............')
draggables.forEach((task) => {

  task.addEventListener("dragstart", (event) => {
    task.classList.add("is-dragging");

    console.log("dragging");
  });
  task.addEventListener("dragend", () => {
    task.classList.remove("is-dragging");
    console.log(event.target)
  });
});

droppables.forEach((zone) => {
  zone.addEventListener("dragover", (e) => {
    e.preventDefault();

    const bottomTask = insertAboveTask(zone, e.clientY);
    const curTask = document.querySelector(".is-dragging");

    if (!bottomTask) {
      zone.appendChild(curTask);
    } else {
      zone.insertBefore(curTask, bottomTask);
    }
  });
});

const insertAboveTask = (zone, mouseY) => {
  const els = zone.querySelectorAll(".task:not(.is-dragging)");

  let closestTask = null;
  let closestOffset = Number.NEGATIVE_INFINITY;

  els.forEach((task) => {
    const { top } = task.getBoundingClientRect();

    const offset = mouseY - top;

    if (offset < 0 && offset > closestOffset) {
      closestOffset = offset;
      closestTask = task;
    }
  });

  return closestTask;
};


function getData() {
  const toDo = document.getElementById('todo-lane');

  // Select all elements with the class 'myClass' inside the div
  const elements = toDo.querySelectorAll('.task');
  console.log('Current elements in To Do Lane')
  // Loop through the elements and log their innerHTML
  elements.forEach(element => {
    console.log(element.innerHTML);
  });
}