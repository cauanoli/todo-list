import { nanoid } from "nanoid";
import { isSameDay } from "date-fns";

import { isDone, isNotDone } from "./task";

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

    // get all todays tasks
    function getTodayTasks() {
        const todayTasks = tasks.filter((task) =>
            isSameDay(task.dueDate, Date.now())
        );

        return todayTasks;
    }

    // get all todays done tasks
    function getTodayDoneTasks() {
        const todayTasks = getTodayTasks();
        const todayDoneTasks = filterDoneTasks(todayTasks);
        return todayDoneTasks;
    }

    // get all todays not done tasks
    function getTodayNotDoneTasks() {
        const todayTasks = getTodayTasks();
        const todayNotDoneTasks = filterNotDoneTasks(todayTasks);
        return todayNotDoneTasks;
    }

    // get all done tasks
    function getDoneTasks() {
        const completedTasks = filterDoneTasks(tasks);
        return completedTasks;
    }

    // get all not completed tasks
    function getNotDoneTasks() {
        const notCompletedTasks = filterNotDoneTasks(tasks);
        return notCompletedTasks;
    }

    // get all important tasks
    function getImportantTasks() {
        const importantTasks = tasks.filter((task) => task.important);
        return importantTasks;
    }

    // update a task by id
    function updateTaskById(taskId, data) {
        const idOfTaskToUpdate = tasks.findIndex((task) => task.id === taskId);
        tasks[idOfTaskToUpdate] = { ...tasks[idOfTaskToUpdate], ...data };
    }

    return {
        name,
        id,
        getTasks,
        addTask,
        removeTaskById,
        getDoneTasks,
        getNotDoneTasks,
        getTodayDoneTasks,
        getTodayNotDoneTasks,
        getImportantTasks,
        updateTaskById,
    };
}

function filterDoneTasks(tasks) {
    const doneTasks = tasks.filter((task) => isDone(task));
    return doneTasks;
}

function filterNotDoneTasks(tasks) {
    const notDoneTasks = tasks.filter((task) => isNotDone(task));
    return notDoneTasks;
}
