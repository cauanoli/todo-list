import { createProject } from "./project";

function createProjectsStageManager() {
    const projects = [];

    function addNewProject(data) {
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
    };
}

export const StateManager = createProjectsStageManager();
