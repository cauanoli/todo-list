import { renderProjectsButtons } from "./components/project-button-list";
import { createProject } from "./lib/project";
import { createTask } from "./lib/task";

import { renderProjectTasks } from "./pages/project";
import { renderTodayTasks } from "./pages/today_tasks";
import { renderImportantTasks } from "./pages/important_tasks";
import { renderAllTasksPage } from "./pages/all_tasks";

function createProjectsStageManager() {
    const projects = [];

    function addNewProject(data) {
        const newProject = createProject({ ...data });
        projects.push(newProject);
        return newProject;
    }

    function getProjects() {
        return projects;
    }

    function getProjectById(id) {
        const projectFound = projects.find((project) => project.id === id);
        return projectFound;
    }

    function getDoneTasks() {
        const doneTasks = projects
            .map((project) => project.getDoneTasks())
            .flat();
        return doneTasks;
    }

    function getNotDoneTasks() {
        const notDoneTasks = projects
            .map((project) => project.getNotDoneTasks())
            .flat();
        return notDoneTasks;
    }

    function getTodayDoneTasks() {
        const allTodayDoneTasks = projects
            .map((project) => project.getTodayDoneTasks())
            .flat();

        return allTodayDoneTasks;
    }

    function getTodayNotDoneTasks() {
        const allTodayNotDoneTasks = projects
            .map((project) => project.getTodayNotDoneTasks())
            .flat();

        return allTodayNotDoneTasks;
    }

    function getImportantDoneTasks() {
        const importantDoneTasks = projects
            .map((project) => project.getImportantDoneTasks())
            .flat();
        return importantDoneTasks;
    }

    function getImportantNotDoneTasks() {
        const importantNotDoneTasks = projects
            .map((project) => project.getImportantNotDoneTasks())
            .flat();

        return importantNotDoneTasks;
    }

    return {
        getTodayDoneTasks,
        getTodayNotDoneTasks,
        getImportantDoneTasks,
        getImportantNotDoneTasks,
        getDoneTasks,
        getNotDoneTasks,
        getProjects,
        addNewProject,
        getProjectById,
    };
}

(function () {
    const StateManager = createProjectsStageManager();
    const content = document.querySelector("#content");

    const todayTasksButton = document.querySelector("#today-tasks-button");
    const allTasksButton = document.querySelector("#all-tasks-button");
    const importantTasksButton = document.querySelector(
        "#important-tasks-button"
    );
    let projectsButtons = document.querySelectorAll(".project-button");
    console.log(projectsButtons);

    function init() {
        renderProjectsButtons(StateManager.getProjects());
        updateProjectButtons();
        addMenuEvents();
        goToTodayTasksPage();
    }

    function updateProjectButtons() {
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

        console.log(projectsButtons);
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

    function goToProjectPage(project, button) {
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
