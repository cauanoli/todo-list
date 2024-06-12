// TODO: create way to edit and remove task
export function renderTask({ id, title, important, done, projectId }) {
    const task = document.createElement("div");
    task.classList = `task ${done ? "done" : ""} ${
        important ? "important" : ""
    }`;

    const taskDone = document.createElement("input");
    taskDone.classList = "task__done";
    taskDone.type = "checkbox";
    taskDone.checked = done;

    const taskDescription = document.createElement("div");
    taskDescription.classList = "task__description";

    const taskTitle = document.createElement("h2");
    taskTitle.innerText = title;
    taskTitle.classList = "task__description__title";

    const taskProject = document.createElement("p");
    // TODO: create way to get project name by id
    taskProject.innerText = getProjectNameById(projectId);
    taskProject.classList = "task__description__project";

    taskDescription.appendChild(taskTitle);
    taskDescription.appendChild(taskProject);

    const taskImportant = document.createElement("input");
    taskImportant.classList = "task__important";
    taskImportant.type = "checkbox";
    taskImportant.checked = important;

    task.appendChild(taskDone);
    task.appendChild(taskDescription);
    task.appendChild(taskImportant);

    return task;
}

// TODO: remove ; just for tests purposes
function getProjectNameById() {
    return "test";
}
