import "./style.css";

import {
    makeProject,
    projectArr,
    saveProject,
    getProject,
} from "./project.js";

import {
    makeTodo,
    todoArr,
    saveTodo,
    updateTodo,
    deleteTodo,
    getTodo
} from "./todo.js";

import {
    displayProjects,
    displayProjectOptions,
    displayTodo,
} from "./dom.js";

function setCurrentProject(project) {
    currentProject = project;

    localStorage.setItem(
        "Current Project",
        JSON.stringify(currentProject)
    );
}

function getCurrentProject() {
    const storedCurrentProject = JSON.parse(
        localStorage.getItem("Current Project")
        );
    return storedCurrentProject
}

let currentProject;

if (localStorage.getItem("Current Project")) {
    console.log("found current project stored in local storage")
    currentProject = getCurrentProject()
}
else {
    const defaultProject = makeProject("Default");
    setCurrentProject(defaultProject)
}

const todoForm = document.querySelector("#todo-form")
todoForm.addEventListener("submit", (e) => {
        // const addDialog = document.querySelector("#todo-dialog");
        e.preventDefault()
        const title = document.querySelector("input#title").value;
        const project = document.querySelector("select#project").value
        const selectedProject = projectArr.find(
            (projectObj) => projectObj.project === project
            );
        // currentProject = selectedProject;
        setCurrentProject(selectedProject);
        const description = document.querySelector("textarea#description").value;
        const due= document.querySelector("input#due").value;
        const notes= document.querySelector("textarea#notes").value;
        const priority = document.querySelector("select#priority").value;

        const todo = makeTodo(title, description, due, priority, notes, "Incomplete", selectedProject)
        saveTodo(todo);

        const projectTodos = todoArr.filter((todo) => todo.project.id === selectedProject.id);
        displayTodo(projectTodos);

        todoDialog.close()
})


const addProjectBtn = document.querySelector("#add-project");
const projectDialog = document.querySelector("#project-dialog");

addProjectBtn.addEventListener("click", () => {
    document.querySelector("#project-form").reset();
    projectDialog.showModal();
});

const addTodoBtn = document.querySelector("#add-todo");
const todoDialog = document.querySelector("#todo-dialog");

addTodoBtn.addEventListener("click", () => {
    document.querySelector("#todo-form").reset();
    todoDialog.showModal();
});

const projectForm = document.querySelector("#project-form");
projectForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const projectName = document.querySelector("#project-name").value;
    const newProject = makeProject(projectName);
    saveProject(newProject);
    displayProjects(projectArr);
    displayProjectOptions(projectArr);
    projectDialog.close();
});


// ====================
// Initialization
// ====================
if (localStorage.getItem("projects")) {
    getProject()
}
else {
    saveProject(currentProject);
    
}
displayProjects(projectArr, currentProject);

if (localStorage.getItem("todos")) {
    getTodo()
    console.log("TODOs: ")
    console.log(todoArr)
}

const projectTodos = todoArr.filter(
    (todo) => todo.project.id === currentProject.id
);
displayTodo(projectTodos);

displayProjectOptions(projectArr);

export {setCurrentProject, getCurrentProject};