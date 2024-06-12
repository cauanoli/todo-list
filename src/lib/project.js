import { nanoid } from "nanoid";

export function createProject({ name, tasks = [] }) {
    let id = nanoid();

    // get all project tasks
    function getTasks() {
        return tasks;
    }

    // add a task to project
    function addTask(task) {
        tasks.push(task);
    }

    // remove a task with id
    function removeTaskById(id) {
        tasks = tasks.filter((task) => task.id !== id);
    }

    // TODO: get all todays tasks

    // get all done tasks
    function getDoneTasks() {
        const completedTasks = tasks.filter((task) => task.done);
        return completedTasks;
    }

    // get all not completed tasks
    function getNotDoneTasks() {
        const notCompletedTasks = tasks.filter((task) => !task.done);
        return notCompletedTasks;
    }

    // get all important tasks
    function getImportantTasks() {
        const importantTasks = tasks.filter((task) => tasks.important);
        return importantTasks;
    }

    // update a task by id
    function updateTask(taskId, data) {
        const idOfTaskToUpdate = tasks.findIndex((task) => task.id === taskId);
        tasks[idOfTaskToUpdate] = { ...tasks[idOfTaskToUpdate], ...data };
    }

    return {
        name,
        id,
        getTasks,
        getDoneTasks,
        getNotDoneTasks,
        addTask,
        removeTaskById,
    };
}
