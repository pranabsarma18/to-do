import { isBefore, startOfDay, differenceInDays } from "date-fns";

import {
    todoArr,
    updateTodo,
    deleteTodo,
    changeStatus
} from "./todo.js";

import {
    projectArr
} from "./project.js";
import {
    setCurrentProject,
    getCurrentProject
} from "./index.js"

function displayProjects(projectArr) {
    const projects = document.querySelector(".projects");
    projects.textContent = "";

    projectArr.forEach((project) => {
        const projectSection = document.createElement("button");
        projectSection.textContent = project.project;
        projectSection.dataset.project = project.project;
        const currentProject = getCurrentProject(project);
        if (project.id === currentProject.id) {
            projectSection.className = "project selected"
        }
        
        projectSection.addEventListener("click", (e) => {
            e.target.parentElement.querySelectorAll("button").forEach(button => {
            button.className = "project";
            });
            setCurrentProject();
            projectSection.className = "project selected"
            const projectTodos = todoArr.filter((todo) => todo.project.id === project.id);
            displayTodo(projectTodos);
        });

        projects.appendChild(projectSection);

    });
}

function displayProjectOptions(projectArr) {
    const projectSelect = document.querySelector("#project");
    projectSelect.textContent = ""

    projectArr.forEach((project) => {
        const option = document.createElement("option");

        option.value = project.project;
        option.textContent = project.project;

        projectSelect.appendChild(option);
    });
}

function displayProjectOptionsEdit(projectArr) {
    const projectSelectEdit = document.querySelector("#edit-project");
    console.log(projectArr)
    projectArr.forEach((project) => {
        const option = document.createElement("option");

        option.value = project.project;
        option.textContent = project.project;

        projectSelectEdit.appendChild(option);
    });
}

function displayTodo(todoArr) {
    const todos = document.querySelector(".main .todos")
    todos.textContent = "";
    todoArr.forEach((todo) => {
        const todoSection = document.createElement("div");
        todoSection.className = "todo";
        todoSection.dataset.id= todo.id;

        const summary = document.createElement("div");
        summary.className = "todo-summary"
        const detailsBtn = document.createElement("button")
        detailsBtn.className = "details-btn"
        detailsBtn.textContent = "⬇ Show more";

        const hideDetailsBtn = document.createElement("button")
        hideDetailsBtn.className = "hide-details-btn"
        hideDetailsBtn.textContent = "⬆ Hide Details";


        const details = document.createElement("div");
        details.className = "todo-details"
        
        const titleSection = document.createElement("div");
        titleSection.className = "title";
        titleSection.textContent = `Title: ${todo.title}`;

        const projectSection = document.createElement("div");
        projectSection.className = "project";
        projectSection.textContent = `Project: ${todo.project.project}`;

        const descriptionSection = document.createElement("div");
        descriptionSection.className = "description";
        descriptionSection.textContent = `Description: ${todo.description}`;



        const dueSection = document.createElement("div");
        dueSection.className = "due";
        let dueDate = new Date(todo.dueDate);
        dueDate = dueDate.toLocaleDateString("en-GB")
        dueSection.textContent = `Due by: ${dueDate}`;


        // Overdue
        const overDueSection = document.createElement("div");
        overDueSection.className = "overdue";
        const today = startOfDay(new Date());
        console.log(today)
        console.log(new Date(todo.dueDate))
        const overdue = isBefore(startOfDay(new Date(todo.dueDate)), today);
        console.log(overdue)
        const difInDays = differenceInDays(today, startOfDay(new Date(todo.dueDate)))
        console.log(difInDays)
        if (overdue) {
            overDueSection.textContent = `Status: Overdue by ${difInDays} days`;
            todoSection.className = "todo overdue"
        }
        else {
            overDueSection.textContent = "Status: In progress"
        }


        const notesSection = document.createElement("div");
        notesSection.className = "notes";
        notesSection.textContent = `Notes: ${todo.notes}`;

        const prioritySection = document.createElement("div");
        prioritySection.className = `priority ${todo.priority}`;
        prioritySection.textContent = `Priority: ${todo.priority}`;

        const todoActionBtn = document.createElement("div");
        todoActionBtn.className = "todo-actions";


        const statusBtn = document.createElement("button");
        statusBtn.className = `status-todo ${todo.checklist === "Complete" ? "complete" : "incomplete"}`;
        statusBtn.textContent = `${todo.checklist === "Complete" ? "Mark as incomplete" : "Mark as complete"}`;
        todoSection.className = `todo ${todo.checklist === "Complete" ? "complete" : "incomplete"}`

        statusBtn.addEventListener("click", () => {
            changeStatus(todo);
            statusBtn.className = `status-todo ${todo.checklist === "Complete" ? "complete" : "incomplete"}`;
            statusBtn.textContent = `${todo.checklist === "Complete" ? "Mark as incomplete" : "Mark as complete"}`;
            todoSection.className = `todo ${todo.checklist === "Complete" ? "complete" : "incomplete"}`
        });

        const editBtn = document.createElement("button");
        editBtn.className = "edit-todo"
        editBtn.textContent = "Edit"
        editBtn.dataset.id= todo.id;

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-todo"
        deleteBtn.textContent = "Delete"
        deleteBtn.dataset.id= todo.id;

        todoActionBtn.append(statusBtn, editBtn, deleteBtn)
        summary.append(titleSection, dueSection, prioritySection, detailsBtn)
        details.append(projectSection, descriptionSection, overDueSection, notesSection, todoActionBtn, hideDetailsBtn)
        todoSection.append(summary, details)

        todos.appendChild(todoSection)
    })

    detailsEventListener()
    hideDetailsEventListener()
    editTodoEventListener()
    deleteTodoEventListener()
}

function editDisplay(todoObject, projectArr) {
    const dialog = document.createElement("dialog");
    dialog.id = "edit-dialog";

    const heading = document.createElement("h2");
    heading.textContent = "Edit TODO";

    const form = document.createElement("form");
    form.id = "edit-todo-form";

    // Title
    const titleLabel = document.createElement("label");
    titleLabel.htmlFor = "edit-title";
    titleLabel.textContent = "Title:";

    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.id = "edit-title";
    titleInput.name = "title";
    titleInput.value = `${todoObject.title}`

    // Project
    const projectLabel = document.createElement("label");
    projectLabel.htmlFor = "edit-project";
    projectLabel.textContent = "Project:";

    const projectInput = document.createElement("select");
    projectInput.id = "edit-project";
    projectInput.name = "project";

    // Description
    const descriptionLabel = document.createElement("label");
    descriptionLabel.htmlFor = "edit-description";
    descriptionLabel.textContent = "Description:";

    const descriptionInput = document.createElement("textarea");
    descriptionInput.id = "edit-description";
    descriptionInput.name = "description";
    descriptionInput.value = `${todoObject.description}`

    // Due Date
    const dueLabel = document.createElement("label");
    dueLabel.htmlFor = "edit-due";
    dueLabel.textContent = "Due Date:";


    const dueInput = document.createElement("input");
    dueInput.type = "date";
    dueInput.id = "edit-due";
    dueInput.name = "due";
    dueInput.value = `${todoObject.dueDate}`

    // Notes
    const notesLabel = document.createElement("label");
    notesLabel.htmlFor = "edit-notes";
    notesLabel.textContent = "Notes:";

    const notesInput = document.createElement("textarea");
    notesInput.id = "edit-notes";
    notesInput.name = "notes";
    notesInput.value = `${todoObject.notes}`

    // Priority
    const priorityLabel = document.createElement("label");
    priorityLabel.htmlFor = "edit-priority";
    priorityLabel.textContent = "Priority:";

    const prioritySelect = document.createElement("select");
    prioritySelect.id = "edit-priority";
    prioritySelect.name = "priority";

    const highOption = document.createElement("option");
    highOption.value = "high";
    highOption.textContent = "High";

    const mediumOption = document.createElement("option");
    mediumOption.value = "medium";
    mediumOption.textContent = "Medium";

    const lowOption = document.createElement("option");
    lowOption.value = "low";
    lowOption.textContent = "Low";

    prioritySelect.append(
        highOption,
        mediumOption,
        lowOption
    );
    prioritySelect.value = `${todoObject.priority}`

    // Submit button
    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Save Changes";

    // Cancel button
    const cancelButton = document.createElement("button");
    cancelButton.type = "button";
    cancelButton.textContent = "Cancel";

    cancelButton.addEventListener("click", (e) => {
        dialog.close();
        dialog.remove();
    });

    // Add everything to form
    form.append(
        titleLabel,
        titleInput,
        projectLabel,
        projectInput,
        descriptionLabel,
        descriptionInput,
        dueLabel,
        dueInput,
        notesLabel,
        notesInput,
        priorityLabel,
        prioritySelect,
        submitButton
    );


    // Add everything to dialog
    dialog.append(
        heading,
        form,
        cancelButton
    );

    // Add dialog to document
    document.body.append(dialog);
    dialog.showModal();
    
    // Make the current selected Project as Default
    displayProjectOptionsEdit(projectArr);
    projectInput.value = `${todoObject.project.project}`;

    editTodoFormSubmitEventListener(todoObject, dialog)
}

function deleteDisplay(todoObj) {
    const dialog = document.createElement("dialog");
    dialog.id = "delete-dialog";

    const heading = document.createElement("h2");
    heading.textContent = "Delete TODO";

       // Final Delete button
    const submitButton = document.createElement("button");
    submitButton.type = "button";
    submitButton.className = "delete-todo-dialog"
    submitButton.textContent = "Delete";

    // Cancel delete button
    const cancelButton = document.createElement("button");
    cancelButton.type = "button";
    cancelButton.textContent = "Cancel Delete";

    cancelButton.addEventListener("click", (e) => {
        dialog.close();
        dialog.remove();
    });

    dialog.append(
        heading,
        submitButton,
        cancelButton
    );

    document.body.append(dialog);
    dialog.showModal();

    deleteTodoSubmitBtnEventListener(todoObj, dialog)
}

// ====================
// Event Listeners
// ====================

function detailsEventListener() {
    const detailsBtns = document.querySelectorAll(".details-btn")
    detailsBtns.forEach((detailsBtn) => {
        detailsBtn.addEventListener('click', (e) => {
            console.log("clicked")
            e.preventDefault()
            var content = e.target.parentElement.nextElementSibling;
            if (content.style.maxHeight){
                content.style.maxHeight = null;
            } else {
                const hideBtn = e.target.parentElement.nextElementSibling.querySelector(".hide-details-btn")
                hideBtn.style.display = "block";
                content.style.maxHeight = content.scrollHeight + "px";
                detailsBtn.style.display = "none";
        }
    })
})
}

function hideDetailsEventListener() {
    const hideDetailsBtns = document.querySelectorAll(".hide-details-btn")
    hideDetailsBtns.forEach((hideDetailsBtn) => {
        hideDetailsBtn.addEventListener('click', (e) => {
            e.preventDefault()
            var content = e.target.parentElement;
            if (content.style.maxHeight){
                const detailsBtn = e.target.parentElement.previousElementSibling.querySelector(".details-btn")
                detailsBtn.style.display = "block"
                content.style.maxHeight = null;
                hideDetailsBtn.style.display = "none";
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
        }
    })
})
}

function editTodoEventListener() 
{
    const editTodos = document.querySelectorAll(".edit-todo");
    console.log(editTodos)
    editTodos.forEach((editTodo) => {
        editTodo.addEventListener("click", (e) => {
        e.preventDefault()
        const todoId = e.target.dataset.id;
        const todoObj = todoArr.find((obj) => {
            return (obj.id === todoId)
        })
        editDisplay(todoObj, projectArr);

        })
    })
}

function deleteTodoEventListener() {
    const deleteTodos = document.querySelectorAll(".delete-todo");
    deleteTodos.forEach((deleteTodo) => {
        deleteTodo.addEventListener("click", (e) => {
        e.preventDefault()
        const todoId = e.target.dataset.id;
        const todoObj = todoArr.find((obj) => {
            return (obj.id === todoId)
        })
        deleteDisplay(todoObj);
        })
    })
}

function editTodoFormSubmitEventListener(todoObject, dialog) {
    const editTodoForm = document.querySelector("#edit-todo-form");
    editTodoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        todoObject.title = document.querySelector("input#edit-title").value;
        const project = document.querySelector("select#edit-project").value;
        const selectedProject = projectArr.find(
            (projectObj) => projectObj.project === project
            );
        todoObject.project = selectedProject;
        setCurrentProject(selectedProject);
        todoObject.description = document.querySelector("textarea#edit-description").value;
        todoObject.dueDate= document.querySelector("input#edit-due").value;
        todoObject.notes= document.querySelector("textarea#edit-notes").value;
        todoObject.priority = document.querySelector("select#edit-priority").value;
        updateTodo(todoObject);

        dialog.remove();

        const projectTodos = todoArr.filter((todo) => todo.project.id === selectedProject.id);
        displayTodo(projectTodos);
    })
}

function deleteTodoSubmitBtnEventListener(todoObject, dialog) {
    const deleteConfirmBtn = document.querySelector(".delete-todo-dialog")
    deleteConfirmBtn.addEventListener('click', () => {
        deleteTodo(todoObject)
        const deleteTodos = document.querySelectorAll(".delete-todo");
        deleteTodos.forEach((deleteTodo) => {
            if (deleteTodo.dataset.id === todoObject.id) {
                const todoTobeDeleted = document.querySelector(`.todo[data-id="${deleteTodo.dataset.id}"]`);
                todoTobeDeleted.remove()
            }
        })
        dialog.remove();

        // const projectTodos = todoArr.filter((todo) => todo.project === currentProject);
        // displayTodo(projectTodos);
    })
}

export {
    displayProjects,
    displayProjectOptions,
    displayProjectOptionsEdit,
    displayTodo,
    editDisplay,
    deleteDisplay,
    editTodoEventListener,
    deleteTodoEventListener,
    editTodoFormSubmitEventListener,
    deleteTodoSubmitBtnEventListener,
};