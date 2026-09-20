function makeProject(project) {
    const id = crypto.randomUUID();
    return { id, project };
}

let projectArr = [];

function saveProject(projectObject) {
    projectArr.push(projectObject);

    localStorage.setItem(
        "projects",
        JSON.stringify(projectArr)
    );
}

function getProject() {
    const storedProjects = JSON.parse(
        localStorage.getItem("projects")
        );
    projectArr.push(...storedProjects);
}





export {
    makeProject,
    projectArr,
    getProject,
    saveProject,
};