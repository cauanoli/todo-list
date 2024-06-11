import { nanoid } from "nanoid";

export function createTask({
    title,
    description,
    important,
    done,
    dueDate,
    dueTime,
    projectId,
}) {
    const createdDate = new Date();
    let id = nanoid();

    function toggleDone() {
        done = !done;
    }

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
        toggleDone,
    };
}
