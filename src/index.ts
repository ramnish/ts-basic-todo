import {v4 as uuidV4} from "uuid"


type Task = {
 id: string,
 title: string,
 completed: boolean,
 createdAt: Date, 
}

const tasks : Task[] = loadTasks()
const list = document.querySelector<HTMLUListElement>("#list")
const form = document.querySelector<HTMLFormElement>("#new-task-form")
const input = document.querySelector<HTMLInputElement>("#new-task-title")

tasks.forEach(addListItem);

form?.addEventListener("submit",  e => {
  e.preventDefault()
  if (input?.value == "" || input?.value == null) return
  const task : Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date()
  }
  tasks.push(task)
  addListItem(task)
  saveTasks();
  input.value = ""
});

function addListItem(task : Task) {
  const item = document.createElement("li")
  const label = document.createElement("label")
  const checkbox = document.createElement("input")
  checkbox.type = "checkbox"
  checkbox.checked = task.completed
  checkbox.addEventListener("change" , e => {
    task.completed = checkbox.checked    
    console.log(tasks)
  })
  label.append(checkbox, task.title)
  item.append(label)
  list?.append(item)
}

function loadTasks() : Task[] {
  const taskJSON = localStorage.getItem("tasks");
  if (taskJSON == null) return []
  return JSON.parse(taskJSON);
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}