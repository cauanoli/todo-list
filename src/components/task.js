import { StateManager } from "../lib/state_manager";
import { reloadPage } from "../lib/pages";

export function renderTask({
    id,
    title,
    important,
    done,
    projectId,
    dueDate,
    dueTime,
}) {
    const taskContainer = document.createElement("details");
    const task = document.createElement("summary");
    const projectName = StateManager.getProjectNameById(projectId);

    task.classList = `task ${done ? "done" : ""} ${
        important ? "important" : ""
    }`;

    const taskDone = document.createElement("input");
    taskDone.classList = "task__done";
    taskDone.type = "checkbox";
    taskDone.checked = done;

    taskDone.addEventListener("click", () => {
        StateManager.toggleTaskDoneById({ id, projectId });
        reloadPage();
    });

    const taskDescription = document.createElement("div");
    taskDescription.classList = "task__description";

    const taskTitle = document.createElement("h2");
    taskTitle.innerText = title;
    taskTitle.classList = "task__description__title";

    const taskProject = document.createElement("p");

    taskProject.innerText = projectName;
    taskProject.classList = "task__description__project";

    taskDescription.appendChild(taskTitle);
    taskDescription.appendChild(taskProject);

    const taskImportant = document.createElement("input");
    taskImportant.classList = "task__important";
    taskImportant.type = "checkbox";
    taskImportant.checked = important;

    taskImportant.addEventListener("click", () => {
        StateManager.toggleTaskImportantById({ id, projectId });
        reloadPage();
    });

    task.appendChild(taskDone);
    task.appendChild(taskDescription);
    task.appendChild(taskImportant);

    const editTaskContainer = document.createElement("div");
    editTaskContainer.classList = "task__edit-task";

    const editForm = document.createElement("form");
    editForm.classList = "task__edit-task__form form";

    // TODO: finish implementing way to edit and remove task
    const editTitleField = createEditTaskField({
        name: "title",
        type: "text",
        value: title,
        id: "edit-task-title",
    });

    const editProjectField = createEditTaskField({
        name: "project",
        type: "text",
        value: projectName,
        id: "edit-task-project",
    });

    const editDueDateField = createEditTaskField({
        name: "dueDate",
        label: "due date",
        type: "date",
        value: dueDate,
        id: "edit-task-due-date",
    });

    const editDueTimeField = createEditTaskField({
        name: "dueTime",
        type: "time",
        label: "due time",
        value: dueTime,
        id: "edit-task-due-time",
    });

    const deleteTaskButton = document.createElement("button");
    deleteTaskButton.classList = "button task__edit-task__delete-button bg-red";
    deleteTaskButton.innerText = "delete task";
    deleteTaskButton.type = "button";

    deleteTaskButton.addEventListener("click", () => {
        StateManager.removeTaskById({ id, projectId });
        reloadPage();
    });

    const confirmEditButton = document.createElement("button");
    confirmEditButton.type = "submit";
    confirmEditButton.innerText = "confirm edit";
    confirmEditButton.classList = "button inverted";

    editForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const newTaskData = {};

        for (let [key, value] of formData) {
            newTaskData[key] = value;
        }

        StateManager.editTaskById(id, { projectId, ...newTaskData });
        reloadPage();
    });

    editForm.appendChild(editTitleField);
    editForm.appendChild(editProjectField);
    editForm.appendChild(editDueDateField);
    editForm.appendChild(editDueTimeField);
    editForm.appendChild(confirmEditButton);
    editForm.appendChild(deleteTaskButton);

    editTaskContainer.appendChild(editForm);

    taskContainer.appendChild(task);
    taskContainer.appendChild(editTaskContainer);

    return taskContainer;
}

function createEditTaskField({ name, label, type, value, id }) {
    const formField = document.createElement("div");
    formField.classList = "form__field";

    const labelElement = document.createElement("label");
    labelElement.for = id;
    labelElement.innerText = label ?? name;

    const input = document.createElement("input");
    input.type = type;
    input.value = value;
    input.name = name;
    input.id = id;

    formField.appendChild(labelElement);
    formField.appendChild(input);

    return formField;
}
