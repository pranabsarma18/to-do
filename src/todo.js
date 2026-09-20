let todoArr = [];

function makeTodo(
    title,
    description,
    dueDate,
    priority,
    notes,
    checklist = "Incomplete",
    project
) {
    const id = crypto.randomUUID();

    return {
        id,
        title,
        description,
        dueDate,
        priority,
        notes,
        checklist,
        project,
    };
}

function changeStatus(todoObject) {
    if (todoObject.checklist === "Incomplete") {
        todoObject.checklist = "Complete";
    } else {
        todoObject.checklist = "Incomplete";
    }
    updateTodo(todoObject)
}

function saveTodo(todoObject) {
    todoArr.push(todoObject);
    localStorage.setItem(
        "todos",
        JSON.stringify(todoArr)
    );
}

function getTodo() {
    const storedTodos = JSON.parse(
        localStorage.getItem("todos")
        );
    todoArr.push(...storedTodos);
}

function updateTodo(todoObj) {
    todoArr.forEach((obj, i) => {
        if (obj.id === todoObj.id) {
            todoArr[i] = todoObj;
        }
    });

    localStorage.setItem(
        "todos",
        JSON.stringify(todoArr)
    );
}

function deleteTodo(todoObj) {
    todoArr.forEach((obj, i) => {
        if (obj.id === todoObj.id) {
            todoArr.splice(i, 1);
        }
    });

    localStorage.setItem(
        "todos",
        JSON.stringify(todoArr)
    );
}

export {
    makeTodo,
    todoArr,
    getTodo,
    saveTodo,
    updateTodo,
    deleteTodo,
    changeStatus,
};