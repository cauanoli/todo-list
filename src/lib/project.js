import { nanoid } from "nanoid";
import { isSameDay, isToday } from "date-fns";

import { isDone, isNotDone, isImportant } from "./task";

export function createProject({ name, id = nanoid() }) {
    const _tasks = [];

    // get all project tasks
    function getTasks() {
        return _tasks;
    }

    // add a task to project
    function addTask(task) {
        _tasks.push(task);
    }

    // remove a task with id
    function removeTaskById(id) {
        _tasks = _tasks.filter((task) => task.id !== id);
    }

    // get all todays tasks
    function getTodayTasks() {
        const todayTasks = _tasks.filter((task) => {
            return isToday(new Date(task.dueDate));
        });

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
        const completedTasks = filterDoneTasks(_tasks);
        return completedTasks;
    }

    // get all not completed tasks
    function getNotDoneTasks() {
        const notCompletedTasks = filterNotDoneTasks(_tasks);
        return notCompletedTasks;
    }

    // get all important tasks
    function getImportantTasks() {
        const importantTasks = filterImportantTasks(_tasks);
        return importantTasks;
    }

    // get important done tasks
    function getImportantDoneTasks() {
        const importantTasks = getImportantTasks();
        const importantDoneTasks = filterDoneTasks(importantTasks);

        return importantDoneTasks;
    }

    // get important not done tasks
    function getImportantNotDoneTasks() {
        const importantTasks = getImportantTasks();
        const importantNotDoneTasks = filterNotDoneTasks(importantTasks);
        return importantNotDoneTasks;
    }

    // update a task by id
    function updateTaskById(taskId, data) {
        const idOfTaskToUpdate = _tasks.findIndex((task) => task.id === taskId);
        _tasks[idOfTaskToUpdate] = { ..._tasks[idOfTaskToUpdate], ...data };
    }

    function getTaskById(id) {
        return _tasks.find((task) => task.id === id);
    }

    function removeTaskById(taskId) {
        const idOfTaskToRemove = _tasks.findIndex((task) => task.id === taskId);
        _tasks.splice(idOfTaskToRemove, 1);
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
        getImportantDoneTasks,
        getImportantNotDoneTasks,
        updateTaskById,
        getTaskById,
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

function filterImportantTasks(tasks) {
    const importantTasks = tasks.filter((task) => isImportant(task));
    return importantTasks;
}
