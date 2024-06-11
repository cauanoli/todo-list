import { nanoid } from "nanoid";

export function createTask({
    title,
    description,
    important,
    done,
    dueDate,
    dueTime,
    projectId,
    id = nanoid(),
}) {
    const createdDate = new Date();

    return {
        id,
        projectId,
        title,
        description,
        important,
        done,
        dueDate,
        dueTime,
        createdDate,
    };
}

export function toggleTaskDone(task) {
    return createTask({ ...task, done: !task.done });
}

export function updateTask(task, updatedTaskData) {
    return createTask({ ...task, ...updatedTaskData });
}
