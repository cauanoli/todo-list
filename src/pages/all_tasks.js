import { renderTask } from "../components/task";

export function renderAllTasksPage({ tasksNotDone = [], tasksDone = [] }) {
    const container = document.querySelector("#content");

    const title = document.createElement("h1");
    title.innerText = "All tasks";
    title.classList = "title";

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

    tasksContainer.appendChild(tasksNotDoneContainer);
    tasksContainer.appendChild(tasksDoneContainer);

    container.appendChild(title);
    container.appendChild(tasksContainer);
}
