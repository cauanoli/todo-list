import { renderTask } from "../components/task";
import { sortByImportance } from "../lib/task";

export function renderTasks({
    tasksDone = [],
    tasksNotDone = [],
    byImportance = true,
}) {
    if (byImportance) {
        tasksDone = sortByImportance(tasksDone);
        tasksNotDone = sortByImportance(tasksNotDone);
    }

    const tasksContainer = document.createElement("div");
    tasksContainer.classList = "tasks";

    const tasksNotDoneContainer = document.createElement("div");
    tasksNotDoneContainer.classList = "tasks__not-done";

    tasksNotDone.forEach((task) => {
        tasksNotDoneContainer.appendChild(renderTask(task));
    });

    const tasksDoneDetails = document.createElement("details");
    const tasksDoneTitle = document.createElement("summary");
    tasksDoneTitle.innerText = "Done";

    const tasksDoneContainer = document.createElement("div");
    tasksDoneContainer.classList = "tasks__done";

    tasksDone.forEach((task) => {
        tasksDoneContainer.appendChild(renderTask(task));
    });

    tasksDoneDetails.appendChild(tasksDoneTitle);
    tasksDoneDetails.appendChild(tasksDoneContainer);

    tasksContainer.appendChild(tasksNotDoneContainer);
    tasksContainer.appendChild(tasksDoneDetails);

    return tasksContainer;
}
