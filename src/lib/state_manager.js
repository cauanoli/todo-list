import { createProject } from "./project";
import {
    TODAY_TASKS_PAGE,
    ALL_TASKS_PAGE,
    IMPORTANT_TASKS_PAGE,
    DEFAULT_PROJECT_NAME,
} from "../constants";
import {
    goToAllTasksPage,
    goToImportantTasksPage,
    goToTodayTasksPage,
} from "./pages";
import { createTask } from "./task";

function createProjectsStageManager() {
    let currentPage;
    const projects = [];
    const _pages = {
        [TODAY_TASKS_PAGE]: {
            name: TODAY_TASKS_PAGE,
            render: goToTodayTasksPage,
        },
        [IMPORTANT_TASKS_PAGE]: {
            name: IMPORTANT_TASKS_PAGE,
            render: goToImportantTasksPage,
        },
        [ALL_TASKS_PAGE]: {
            name: ALL_TASKS_PAGE,
            render: goToAllTasksPage,
        },
    };

    function addNewProject(data) {
        if (!data.name) {
            data.name = DEFAULT_PROJECT_NAME;
        }

        let project = getProjectByName(data.name);

        if (!project) {
            const newProject = createProject({ ...data });
            projects.push(newProject);
            return newProject;
        }

        return project;
    }

    function getProjects() {
        return projects;
    }

    function getProjectById(id) {
        const projectFound = projects.find((project) => project.id === id);
        return projectFound;
    }

    function getProjectNameById(id) {
        const project = getProjectById(id);
        return project.name;
    }

    function getProjectByName(name) {
        const projectFound = projects.find((project) => project.name === name);
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

    function toggleTaskDoneById({ id, projectId }) {
        const project = getProjectById(projectId);
        const task = project.getTaskById(id);
        project.updateTaskById(id, { ...task, done: !task.done });
    }

    function toggleTaskImportantById({ id, projectId }) {
        const project = getProjectById(projectId);
        const task = project.getTaskById(id);
        project.updateTaskById(id, { ...task, important: !task.important });
    }

    function editTaskById(id, { project, ...data }) {
        const projectFound = getProjectByName(project);
        console.log(projectFound);

        if (!projectFound) {
            const newProject = addNewProject({
                name: project,
            });

            newProject.addTask(
                createTask({
                    id,
                    ...data,
                    projectId: newProject.id,
                })
            );

            const oldProject = getProjectById(data.projectId);
            oldProject.removeTaskById(id);
        } else if (projectFound.id !== data.projectId) {
            const pastTaskProject = StateManager.getProjectById(data.projectId);
            pastTaskProject.removeTaskById(data.id);
            projectFound.addTask(
                createTask({
                    id,
                    ...data,
                    projectId: projectFound.id,
                })
            );
        } else {
            projectFound.updateTaskById(id, data);
        }
    }

    function setCurrentPageName(pageName) {
        currentPage = pageName;
    }

    function getCurrentPage() {
        return _pages[currentPage];
    }

    function addPage({ name, render }) {
        if (!_pages[name]) {
            _pages[name] = {
                name,
                render,
            };
        }
    }

    function removeTaskById({ id, projectId }) {
        const project = getProjectById(projectId);
        project.removeTaskById(id);
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
        getProjectNameById,
        getProjectByName,
        toggleTaskDoneById,
        toggleTaskImportantById,
        setCurrentPageName,
        getCurrentPage,
        addPage,
        editTaskById,
        removeTaskById,
    };
}

export const StateManager = createProjectsStageManager();
