import { renderProjectsButtons } from "./components/project-button-list";
import { createTask } from "./lib/task";

import { renderProjectTasks } from "./pages/project";
import { renderTodayTasks } from "./pages/today_tasks";
import { renderImportantTasks } from "./pages/important_tasks";
import { renderAllTasksPage } from "./pages/all_tasks";

import { StateManager } from "./lib/state_manager";

(function () {
    const content = document.querySelector("#content");

    const todayTasksButton = document.querySelector("#today-tasks-button");
    const allTasksButton = document.querySelector("#all-tasks-button");
    const importantTasksButton = document.querySelector(
        "#important-tasks-button"
    );
    let projectsButtons = document.querySelectorAll(".project-button");

    function init() {
        renderProjectsButtons(StateManager.getProjects());
        updateProjectButtons();
        addEvents();
        goToTodayTasksPage();
    }

    function updateProjectButtons() {
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

    function addEvents() {
        addMenuEvents();
        addTaskDialogEvents();
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

            console.log(project.getTasks());

            updateProjectButtons();
            addProjectButtonEvents();
            goToProjectPage(project);
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

    function goToTodayTasksPage() {
        resetCurrentPage();
        resetButtonsActive();
        renderTodayTasks({
            todayDoneTasks: StateManager.getTodayDoneTasks(),
            todayNotDoneTasks: StateManager.getTodayNotDoneTasks(),
        });
        todayTasksButton.classList.add("active");
    }

    function goToAllTasksPage() {
        resetCurrentPage();
        resetButtonsActive();
        renderAllTasksPage({
            tasksDone: StateManager.getDoneTasks(),
            tasksNotDone: StateManager.getNotDoneTasks(),
        });
        allTasksButton.classList.add("active");
    }

    function goToImportantTasksPage() {
        resetCurrentPage();
        resetButtonsActive();
        renderImportantTasks({
            tasksDone: StateManager.getImportantDoneTasks(),
            tasksNotDone: StateManager.getImportantNotDoneTasks(),
        });
        importantTasksButton.classList.add("active");
    }

    function goToProjectPage(
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

    function test() {
        const project = StateManager.addNewProject({
            name: "hahaha",
        });

        project.addTask(
            createTask({
                title: "life",
                done: true,
                description: "hjahaa",
                dueDate: new Date(),
                dueTime: "12:20",
                important: false,
                projectId: project.id,
            })
        );

        project.addTask(
            createTask({
                title: "haha",
                done: false,
                description: "hjahaa",
                dueDate: new Date("2023/10/23"),
                dueTime: "12:20",
                important: true,
                projectId: project.id,
            })
        );

        const project2 = StateManager.addNewProject({
            name: "other project",
        });

        project2.addTask(
            createTask({
                title: "task",
                description: "another task",
                done: false,
                dueDate: new Date(),
                dueTime: "10:32",
                important: false,
                projectId: project2.id,
            })
        );
    }

    test();
    init();
})();
