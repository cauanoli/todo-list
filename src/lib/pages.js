import { StateManager } from "./state_manager";
import { renderProjectsButtons } from "../components/project-button-list";
import {
    renderTodayTasks,
    renderAllTasksPage,
    renderImportantTasks,
    renderProjectTasks,
} from "../pages";

import { createTask } from "./task";

let projectsButtons = document.querySelectorAll(".project-button");
const todayTasksButton = document.querySelector("#today-tasks-button");
const allTasksButton = document.querySelector("#all-tasks-button");
const importantTasksButton = document.querySelector("#important-tasks-button");

export function goToTodayTasksPage() {
    resetCurrentPage();
    resetButtonsActive();
    renderTodayTasks({
        todayDoneTasks: StateManager.getTodayDoneTasks(),
        todayNotDoneTasks: StateManager.getTodayNotDoneTasks(),
    });
    todayTasksButton.classList.add("active");
}

export function goToAllTasksPage() {
    resetCurrentPage();
    resetButtonsActive();
    renderAllTasksPage({
        tasksDone: StateManager.getDoneTasks(),
        tasksNotDone: StateManager.getNotDoneTasks(),
    });
    allTasksButton.classList.add("active");
}

export function goToImportantTasksPage() {
    resetCurrentPage();
    resetButtonsActive();
    renderImportantTasks({
        tasksDone: StateManager.getImportantDoneTasks(),
        tasksNotDone: StateManager.getImportantNotDoneTasks(),
    });
    importantTasksButton.classList.add("active");
}

export function goToProjectPage(
    project,
    button = [...projectsButtons].find(
        (projectButton) => projectButton["data-id"] === project.id
    )
) {
    resetCurrentPage();
    resetButtonsActive();
    renderProjectTasks(project);
    button.classList.add("active");
}

export function updateProjectButtons() {
    renderProjectsButtons(StateManager.getProjects());
    projectsButtons = document.querySelectorAll(".project-button");
}

function resetCurrentPage() {
    [...content.childNodes].forEach((child) => {
        content.removeChild(child);
    });
}

function resetButtonsActive() {
    [todayTasksButton, allTasksButton, importantTasksButton].forEach(
        (button) => {
            button.classList.remove("active");
        }
    );

    projectsButtons.forEach((button) => {
        button.classList.remove("active");
    });
}

export function addEvents() {
    addMenuEvents();
    addTaskDialogEvents();
    addProjectDialogEvents();
}

function addTaskDialogEvents() {
    const openDialogButton = document.querySelector("#add-task-button");
    const addTaskDialog = document.querySelector("#add-task-dialog");
    const addTaskForm = addTaskDialog.querySelector("form");

    openDialogButton.addEventListener("click", () => {
        addTaskDialog.showModal();
    });

    addTaskForm.addEventListener("submit", (event) => {
        const data = new FormData(event.target);
        const newTask = {};

        for (const [key, value] of data) {
            if (key !== "project") {
                newTask[key] = value;
            }
        }

        const project = StateManager.addNewProject({
            name: data.get("project"),
        });

        project.addTask(
            createTask({
                ...newTask,
                projectId: project.id,
            })
        );

        updateProjectButtons();
        addProjectButtonEvents();
        goToProjectPage(project);
    });
}

function addProjectDialogEvents() {
    const openDialogButton = document.querySelector("#add-project-button");
    const dialog = document.querySelector("#add-project-dialog");
    const form = dialog.querySelector("form");

    openDialogButton.addEventListener("click", () => {
        dialog.showModal();
    });

    form.addEventListener("submit", (event) => {
        const data = new FormData(event.target);

        StateManager.addNewProject({
            name: data.get("name"),
        });

        updateProjectButtons();
        addProjectButtonEvents();
    });
}

function addMenuEvents() {
    todayTasksButton.addEventListener("click", () => {
        goToTodayTasksPage();
    });

    allTasksButton.addEventListener("click", () => {
        goToAllTasksPage();
    });

    importantTasksButton.addEventListener("click", () => {
        goToImportantTasksPage();
    });

    addProjectButtonEvents();
}

function addProjectButtonEvents() {
    projectsButtons.forEach((button) => {
        button.addEventListener("click", () => {
            goToProjectPage(
                StateManager.getProjectById(button["data-id"]),
                button
            );
        });
    });
}
